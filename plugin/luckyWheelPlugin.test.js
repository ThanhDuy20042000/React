'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { LuckyWheelPlugin } = require('./luckyWheelPlugin');

test('không cho phép cùng SĐT chơi nhiều hơn một lần', async () => {
  const plugin = new LuckyWheelPlugin({
    prizes: [
      { id: 'p1', name: 'Voucher 20%', type: 'digital', probability: 100, stock: 10, znsTemplateId: 'tpl-1' }
    ]
  });

  const first = await plugin.play({ fullName: 'An', phone: '0909123456' });
  const second = await plugin.play({ fullName: 'An', phone: '0909 123 456' });

  assert.equal(first.alreadyPlayed, false);
  assert.equal(second.alreadyPlayed, true);
  assert.equal(second.message, 'Số điện thoại đã tham gia trò chơi.');
});

test('trừ tồn kho quà sau khi trúng', async () => {
  const plugin = new LuckyWheelPlugin({
    prizes: [
      { id: 'p1', name: 'Balo', type: 'physical', probability: 100, stock: 1, znsTemplateId: 'tpl-2' }
    ]
  });

  const first = await plugin.play({ fullName: 'Bình', phone: '0911222333' });
  const second = await plugin.play({ fullName: 'Cường', phone: '0911222444' });

  assert.equal(first.prize.name, 'Balo');
  assert.equal(second.prize, null);

  const dashboard = plugin.getDashboard();
  assert.equal(dashboard.gifts[0].remainingStock, 0);
});

test('ghi log lỗi ZNS khi gửi thất bại', async () => {
  const plugin = new LuckyWheelPlugin({
    prizes: [
      { id: 'p1', name: 'Móc khóa', type: 'physical', probability: 100, stock: 2, znsTemplateId: 'tpl-3' }
    ],
    znsSender: async () => {
      throw new Error('ZNS timeout');
    }
  });

  await plugin.play({ fullName: 'Dung', phone: '0988777666' });
  const exported = plugin.exportData();

  assert.equal(exported.znsLogs.length, 1);
  assert.equal(exported.znsLogs[0].success, false);
  assert.match(exported.znsLogs[0].error, /timeout/i);
});
