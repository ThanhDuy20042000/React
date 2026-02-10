<?php
/**
 * Plugin Name: Woo Lucky Wheel Lite
 * Description: Popup vòng quay may mắn thu thập email và tặng mã giảm giá WooCommerce.
 * Version: 1.0.0
 * Author: Codex
 * Text Domain: woo-lucky-wheel-lite
 */

if (!defined('ABSPATH')) {
    exit;
}

class WLL_Woo_Lucky_Wheel_Lite
{
    const OPTION_KEY = 'wll_settings';
    const NONCE_ACTION = 'wll_spin_nonce';

    public function __construct()
    {
        register_activation_hook(__FILE__, [$this, 'activate']);

        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_init', [$this, 'register_settings']);

        add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('wp_footer', [$this, 'render_popup_markup']);

        add_action('wp_ajax_wll_spin', [$this, 'handle_spin']);
        add_action('wp_ajax_nopriv_wll_spin', [$this, 'handle_spin']);
    }

    public function activate()
    {
        if (!get_option(self::OPTION_KEY)) {
            add_option(self::OPTION_KEY, $this->default_settings());
        }
    }

    private function default_settings()
    {
        return [
            'enabled' => 1,
            'delay_seconds' => 5,
            'title' => 'Vòng quay may mắn',
            'subtitle' => 'Nhập email để nhận cơ hội quay và trúng mã giảm giá ngay!',
            'button_text' => 'Quay ngay',
            'colors' => ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#ef4444', '#8b5cf6'],
            'prizes' => [
                ['label' => '10% OFF', 'weight' => 20, 'type' => 'percent', 'value' => 10],
                ['label' => '20% OFF', 'weight' => 10, 'type' => 'percent', 'value' => 20],
                ['label' => '50.000đ OFF', 'weight' => 15, 'type' => 'fixed', 'value' => 50000],
                ['label' => 'Free Shipping', 'weight' => 10, 'type' => 'free_shipping', 'value' => 0],
                ['label' => 'Không trúng', 'weight' => 45, 'type' => 'none', 'value' => 0],
            ],
        ];
    }

    public function register_admin_menu()
    {
        add_submenu_page(
            'woocommerce',
            __('Lucky Wheel', 'woo-lucky-wheel-lite'),
            __('Lucky Wheel', 'woo-lucky-wheel-lite'),
            'manage_options',
            'wll-lucky-wheel',
            [$this, 'render_settings_page']
        );
    }

    public function register_settings()
    {
        register_setting('wll_settings_group', self::OPTION_KEY, [$this, 'sanitize_settings']);
    }

    public function sanitize_settings($input)
    {
        $defaults = $this->default_settings();

        $sanitized = [
            'enabled' => !empty($input['enabled']) ? 1 : 0,
            'delay_seconds' => max(0, absint($input['delay_seconds'] ?? $defaults['delay_seconds'])),
            'title' => sanitize_text_field($input['title'] ?? $defaults['title']),
            'subtitle' => sanitize_text_field($input['subtitle'] ?? $defaults['subtitle']),
            'button_text' => sanitize_text_field($input['button_text'] ?? $defaults['button_text']),
            'colors' => $defaults['colors'],
            'prizes' => $defaults['prizes'],
        ];

        if (!empty($input['colors'])) {
            $colors = array_map('sanitize_hex_color', array_filter((array) $input['colors']));
            $colors = array_values(array_filter($colors));
            if (!empty($colors)) {
                $sanitized['colors'] = $colors;
            }
        }

        if (!empty($input['prizes_json'])) {
            $decoded = json_decode(wp_unslash($input['prizes_json']), true);
            if (is_array($decoded) && !empty($decoded)) {
                $prizes = [];
                foreach ($decoded as $prize) {
                    if (empty($prize['label'])) {
                        continue;
                    }
                    $prizes[] = [
                        'label' => sanitize_text_field($prize['label']),
                        'weight' => max(1, absint($prize['weight'] ?? 1)),
                        'type' => sanitize_key($prize['type'] ?? 'none'),
                        'value' => floatval($prize['value'] ?? 0),
                    ];
                }

                if (!empty($prizes)) {
                    $sanitized['prizes'] = $prizes;
                }
            }
        }

        return $sanitized;
    }

    private function get_settings()
    {
        return wp_parse_args(get_option(self::OPTION_KEY, []), $this->default_settings());
    }

    public function render_settings_page()
    {
        $settings = $this->get_settings();
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('Woo Lucky Wheel Lite', 'woo-lucky-wheel-lite'); ?></h1>
            <form method="post" action="options.php">
                <?php settings_fields('wll_settings_group'); ?>
                <table class="form-table" role="presentation">
                    <tbody>
                    <tr>
                        <th scope="row"><?php esc_html_e('Bật popup', 'woo-lucky-wheel-lite'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="<?php echo esc_attr(self::OPTION_KEY); ?>[enabled]" value="1" <?php checked($settings['enabled'], 1); ?> />
                                <?php esc_html_e('Hiển thị vòng quay ở frontend', 'woo-lucky-wheel-lite'); ?>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Độ trễ hiển thị (giây)', 'woo-lucky-wheel-lite'); ?></th>
                        <td>
                            <input type="number" min="0" name="<?php echo esc_attr(self::OPTION_KEY); ?>[delay_seconds]" value="<?php echo esc_attr($settings['delay_seconds']); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Tiêu đề', 'woo-lucky-wheel-lite'); ?></th>
                        <td>
                            <input type="text" class="regular-text" name="<?php echo esc_attr(self::OPTION_KEY); ?>[title]" value="<?php echo esc_attr($settings['title']); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Mô tả', 'woo-lucky-wheel-lite'); ?></th>
                        <td>
                            <input type="text" class="regular-text" name="<?php echo esc_attr(self::OPTION_KEY); ?>[subtitle]" value="<?php echo esc_attr($settings['subtitle']); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Text nút quay', 'woo-lucky-wheel-lite'); ?></th>
                        <td>
                            <input type="text" class="regular-text" name="<?php echo esc_attr(self::OPTION_KEY); ?>[button_text]" value="<?php echo esc_attr($settings['button_text']); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Màu vòng quay', 'woo-lucky-wheel-lite'); ?></th>
                        <td>
                            <?php foreach ($settings['colors'] as $idx => $color) : ?>
                                <input type="color" name="<?php echo esc_attr(self::OPTION_KEY); ?>[colors][<?php echo esc_attr($idx); ?>]" value="<?php echo esc_attr($color); ?>" />
                            <?php endforeach; ?>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Cấu hình phần thưởng (JSON)', 'woo-lucky-wheel-lite'); ?></th>
                        <td>
                            <textarea name="<?php echo esc_attr(self::OPTION_KEY); ?>[prizes_json]" rows="12" cols="80"><?php echo esc_textarea(wp_json_encode($settings['prizes'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)); ?></textarea>
                            <p class="description"><?php esc_html_e('Mỗi item: label, weight, type (percent|fixed|free_shipping|none), value', 'woo-lucky-wheel-lite'); ?></p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }

    public function enqueue_assets()
    {
        $settings = $this->get_settings();
        if (empty($settings['enabled']) || is_admin()) {
            return;
        }

        wp_enqueue_style(
            'wll-wheel-css',
            plugin_dir_url(__FILE__) . 'assets/css/wheel.css',
            [],
            '1.0.0'
        );

        wp_enqueue_script(
            'wll-wheel-js',
            plugin_dir_url(__FILE__) . 'assets/js/wheel.js',
            ['jquery'],
            '1.0.0',
            true
        );

        wp_localize_script('wll-wheel-js', 'WLL_Wheel', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce(self::NONCE_ACTION),
            'delay' => intval($settings['delay_seconds']),
            'title' => $settings['title'],
            'subtitle' => $settings['subtitle'],
            'buttonText' => $settings['button_text'],
            'prizes' => $settings['prizes'],
            'colors' => $settings['colors'],
            'alreadySpunMessage' => __('Bạn đã quay rồi. Vui lòng quay lại sau.', 'woo-lucky-wheel-lite'),
            'invalidEmailMessage' => __('Email không hợp lệ.', 'woo-lucky-wheel-lite'),
        ]);
    }

    public function render_popup_markup()
    {
        $settings = $this->get_settings();
        if (empty($settings['enabled']) || is_admin()) {
            return;
        }
        ?>
        <div id="wll-overlay" class="wll-hidden">
            <div id="wll-modal" role="dialog" aria-modal="true" aria-labelledby="wll-title">
                <button id="wll-close" type="button" aria-label="Close">×</button>
                <h2 id="wll-title"></h2>
                <p id="wll-subtitle"></p>
                <canvas id="wll-wheel-canvas" width="320" height="320"></canvas>
                <div class="wll-pointer"></div>
                <form id="wll-form">
                    <input id="wll-email" type="email" required placeholder="you@example.com" />
                    <button id="wll-spin" type="submit"></button>
                </form>
                <div id="wll-result" aria-live="polite"></div>
            </div>
        </div>
        <?php
    }

    public function handle_spin()
    {
        check_ajax_referer(self::NONCE_ACTION, 'nonce');

        $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
        if (!is_email($email)) {
            wp_send_json_error(['message' => __('Email không hợp lệ.', 'woo-lucky-wheel-lite')], 400);
        }

        $key = 'wll_spin_' . md5($email);
        if (get_transient($key)) {
            wp_send_json_error(['message' => __('Email này đã quay trong 24h qua.', 'woo-lucky-wheel-lite')], 429);
        }

        $settings = $this->get_settings();
        $prizeIndex = $this->pick_weighted_index($settings['prizes']);
        $prize = $settings['prizes'][$prizeIndex];

        $couponCode = '';
        if ($prize['type'] !== 'none') {
            $couponCode = $this->generate_coupon_for_prize($email, $prize);
        }

        set_transient($key, 1, DAY_IN_SECONDS);

        $message = sprintf(__('Bạn trúng: %s', 'woo-lucky-wheel-lite'), $prize['label']);
        if (!empty($couponCode)) {
            $message .= ' - ' . sprintf(__('Mã giảm giá: %s', 'woo-lucky-wheel-lite'), $couponCode);
        }

        wp_send_json_success([
            'prizeIndex' => $prizeIndex,
            'message' => $message,
            'couponCode' => $couponCode,
        ]);
    }

    private function pick_weighted_index($prizes)
    {
        $total = 0;
        foreach ($prizes as $prize) {
            $total += max(1, intval($prize['weight']));
        }

        $random = wp_rand(1, $total);
        $current = 0;

        foreach ($prizes as $index => $prize) {
            $current += max(1, intval($prize['weight']));
            if ($random <= $current) {
                return $index;
            }
        }

        return array_key_last($prizes);
    }

    private function generate_coupon_for_prize($email, $prize)
    {
        if (!class_exists('WC_Coupon')) {
            return '';
        }

        $code = 'LUCKY-' . strtoupper(wp_generate_password(8, false, false));
        $coupon = [
            'post_title' => $code,
            'post_content' => 'Generated by Woo Lucky Wheel Lite',
            'post_status' => 'publish',
            'post_author' => 1,
            'post_type' => 'shop_coupon',
        ];

        $couponId = wp_insert_post($coupon);
        if (is_wp_error($couponId) || !$couponId) {
            return '';
        }

        update_post_meta($couponId, 'discount_type', $prize['type'] === 'fixed' ? 'fixed_cart' : 'percent');
        update_post_meta($couponId, 'coupon_amount', floatval($prize['value']));
        update_post_meta($couponId, 'free_shipping', $prize['type'] === 'free_shipping' ? 'yes' : 'no');
        update_post_meta($couponId, 'usage_limit', 1);
        update_post_meta($couponId, 'usage_limit_per_user', 1);
        update_post_meta($couponId, 'customer_email', [$email]);
        update_post_meta($couponId, 'date_expires', strtotime('+7 days'));

        return $code;
    }
}

new WLL_Woo_Lucky_Wheel_Lite();
