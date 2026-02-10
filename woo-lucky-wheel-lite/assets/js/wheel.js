(function ($) {
  const state = {
    spinning: false,
    hasSpun: localStorage.getItem('wllHasSpun') === '1',
    angle: 0,
  };

  const $overlay = $('#wll-overlay');
  const $title = $('#wll-title');
  const $subtitle = $('#wll-subtitle');
  const $form = $('#wll-form');
  const $email = $('#wll-email');
  const $spinButton = $('#wll-spin');
  const $result = $('#wll-result');
  const canvas = document.getElementById('wll-wheel-canvas');

  if (!canvas || !$overlay.length) {
    return;
  }

  const ctx = canvas.getContext('2d');
  const prizes = WLL_Wheel.prizes || [];
  const colors = WLL_Wheel.colors || ['#f59e0b'];

  function drawWheel(rotation = 0) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = canvas.width / 2 - 6;
    const arc = (Math.PI * 2) / prizes.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    prizes.forEach((prize, i) => {
      const start = i * arc;
      const end = start + arc;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      ctx.save();
      ctx.rotate(start + arc / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(prize.label, radius - 12, 5);
      ctx.restore();
    });

    ctx.restore();
  }

  function showModal() {
    if (state.hasSpun) {
      return;
    }

    $title.text(WLL_Wheel.title || 'Lucky Wheel');
    $subtitle.text(WLL_Wheel.subtitle || '');
    $spinButton.text(WLL_Wheel.buttonText || 'Spin');

    drawWheel();
    $overlay.removeClass('wll-hidden');
  }

  function closeModal() {
    $overlay.addClass('wll-hidden');
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function spinToPrize(prizeIndex, done) {
    const segment = (Math.PI * 2) / prizes.length;
    const pointerAngle = -Math.PI / 2;
    const targetCenter = prizeIndex * segment + segment / 2;

    const fullSpins = 5;
    const final = fullSpins * Math.PI * 2 + (pointerAngle - targetCenter);

    const startAngle = state.angle;
    const endAngle = startAngle + final;
    const duration = 4500;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(progress);
      state.angle = startAngle + (endAngle - startAngle) * eased;
      drawWheel(state.angle);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else if (typeof done === 'function') {
        done();
      }
    }

    requestAnimationFrame(tick);
  }

  $('#wll-close').on('click', closeModal);
  $overlay.on('click', function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  $form.on('submit', function (e) {
    e.preventDefault();

    if (state.spinning) {
      return;
    }

    if (state.hasSpun) {
      $result.text(WLL_Wheel.alreadySpunMessage);
      return;
    }

    const email = ($email.val() || '').toString().trim();
    if (!email || !email.includes('@')) {
      $result.text(WLL_Wheel.invalidEmailMessage);
      return;
    }

    state.spinning = true;
    $spinButton.prop('disabled', true).text('...');
    $result.text('');

    $.post(WLL_Wheel.ajaxUrl, {
      action: 'wll_spin',
      nonce: WLL_Wheel.nonce,
      email,
    })
      .done(function (resp) {
        if (!resp || !resp.success) {
          throw new Error(resp?.data?.message || 'Có lỗi xảy ra.');
        }

        spinToPrize(resp.data.prizeIndex, function () {
          state.hasSpun = true;
          localStorage.setItem('wllHasSpun', '1');
          $result.text(resp.data.message);
          $spinButton.text('Đã quay');
          setTimeout(closeModal, 3000);
        });
      })
      .fail(function (xhr) {
        const fallback = 'Không thể quay lúc này. Vui lòng thử lại.';
        $result.text(xhr?.responseJSON?.data?.message || fallback);
      })
      .always(function () {
        state.spinning = false;
        $spinButton.prop('disabled', false);
      });
  });

  setTimeout(showModal, Math.max(0, Number(WLL_Wheel.delay || 0)) * 1000);
})(jQuery);
