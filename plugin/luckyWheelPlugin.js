'use strict';

/**
 * @typedef {Object} Prize
 * @property {string} id
 * @property {string} name
 * @property {'digital'|'physical'} type
 * @property {number} probability - percentage from 0 to 100.
 * @property {number} stock
 * @property {string} znsTemplateId
 */

/**
 * @typedef {Object} Player
 * @property {string} fullName
 * @property {string} phone
 * @property {string} createdAt
 */

/**
 * @typedef {Object} PlayResult
 * @property {boolean} alreadyPlayed
 * @property {Player} player
 * @property {Prize|null} prize
 * @property {string} message
 * @property {string} playedAt
 */

class LuckyWheelPlugin {
  /**
   * @param {{prizes: Prize[], znsSender?: Function, now?: Function}} config
   */
  constructor(config) {
    if (!config || !Array.isArray(config.prizes) || config.prizes.length === 0) {
      throw new Error('Danh sách quà không hợp lệ.');
    }

    this.prizes = config.prizes.map((p) => ({ ...p }));
    this.players = new Map();
    this.playHistory = [];
    this.znsLogs = [];
    this.znsSender = config.znsSender || (async () => ({ success: true, messageId: 'mock-zns-id' }));
    this.now = config.now || (() => new Date().toISOString());

    this.#validatePrizeConfiguration();
  }

  #validatePrizeConfiguration() {
    const total = this.prizes.reduce((sum, prize) => sum + prize.probability, 0);
    if (total > 100) {
      throw new Error('Tổng tỷ lệ trúng không được vượt quá 100%.');
    }

    this.prizes.forEach((prize) => {
      if (prize.stock < 0) {
        throw new Error(`Tồn kho của quà ${prize.name} không hợp lệ.`);
      }
      if (prize.probability < 0 || prize.probability > 100) {
        throw new Error(`Tỷ lệ của quà ${prize.name} phải từ 0-100%.`);
      }
    });
  }

  /**
   * @param {{fullName: string, phone: string}} payload
   * @returns {Promise<PlayResult>}
   */
  async play(payload) {
    const fullName = `${payload?.fullName || ''}`.trim();
    const phone = LuckyWheelPlugin.normalizePhone(payload?.phone);

    if (!fullName) {
      throw new Error('Vui lòng nhập họ tên.');
    }
    if (!LuckyWheelPlugin.isValidPhone(phone)) {
      throw new Error('Số điện thoại không hợp lệ.');
    }

    const existing = this.players.get(phone);
    if (existing) {
      return {
        alreadyPlayed: true,
        player: existing,
        prize: null,
        playedAt: this.now(),
        message: 'Số điện thoại đã tham gia trò chơi.'
      };
    }

    const player = { fullName, phone, createdAt: this.now() };
    this.players.set(phone, player);

    const prize = this.#drawPrize();
    const playedAt = this.now();

    const result = {
      alreadyPlayed: false,
      player,
      prize,
      playedAt,
      message: prize ? `Chúc mừng bạn nhận được: ${prize.name}` : 'Cảm ơn bạn đã tham gia!'
    };

    this.playHistory.push(result);

    await this.#sendZnsConfirmation(player, prize, playedAt);

    return result;
  }

  #drawPrize() {
    const availablePrizes = this.prizes.filter((prize) => prize.stock > 0 && prize.probability > 0);
    if (availablePrizes.length === 0) return null;

    const roll = Math.random() * 100;
    let cumulative = 0;

    for (const prize of availablePrizes) {
      cumulative += prize.probability;
      if (roll <= cumulative) {
        prize.stock -= 1;
        return { ...prize };
      }
    }

    return null;
  }

  async #sendZnsConfirmation(player, prize, playedAt) {
    const payload = {
      phone: player.phone,
      fullName: player.fullName,
      playedAt,
      giftType: prize?.type || 'none',
      giftName: prize?.name || 'Không trúng quà',
      templateId: prize?.znsTemplateId || 'default-template'
    };

    try {
      const response = await this.znsSender(payload);
      this.znsLogs.push({
        success: true,
        payload,
        response,
        createdAt: this.now()
      });
    } catch (error) {
      this.znsLogs.push({
        success: false,
        payload,
        error: error instanceof Error ? error.message : String(error),
        createdAt: this.now()
      });
    }
  }

  getDashboard() {
    const totalPlays = this.playHistory.length;
    const wonCount = this.playHistory.filter((item) => item.prize).length;

    return {
      totalPlays,
      uniquePlayers: this.players.size,
      wonCount,
      loseCount: totalPlays - wonCount,
      znsSuccess: this.znsLogs.filter((log) => log.success).length,
      znsFailed: this.znsLogs.filter((log) => !log.success).length,
      gifts: this.prizes.map((prize) => ({
        id: prize.id,
        name: prize.name,
        remainingStock: prize.stock,
        probability: prize.probability
      }))
    };
  }

  getPlayers({ phone } = {}) {
    const items = [...this.players.values()];
    if (!phone) return items;
    const normalized = LuckyWheelPlugin.normalizePhone(phone);
    return items.filter((item) => item.phone === normalized);
  }

  exportData() {
    return {
      players: [...this.players.values()],
      plays: [...this.playHistory],
      znsLogs: [...this.znsLogs]
    };
  }

  static normalizePhone(phone) {
    return `${phone || ''}`.replace(/\D/g, '');
  }

  static isValidPhone(phone) {
    return /^0\d{9,10}$/.test(phone);
  }
}

module.exports = { LuckyWheelPlugin };
