const baseNode = require('baseNode');

cc.Class({
    extends: baseNode,

    properties: {
        // 每个元素的数据结构为：{x: 1, y: 2}
        currentTimePositions: [],
        // 每个元素的数据结构为：{x: 1, y: 2}
        historyTimePositions: [],
        bodyDelayTime: .3,
        accumulativeCount: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {},

    // update (dt) {},

    // methods
    accumulatingTime(dt) {
        this.accumulativeCount += 1;
    },

    isOverThanDelayTime() {
        // 平均每分钟刷60帧
        return this.bodyDelayTime * 60 <= this.accumulativeCount;
    },

    clearAccumulativeCount() {
        this.accumulativeCount = 0;
    },

    updateHistoryPositions() {
        this.historyTimePositions = this.currentTimePositions;
    },
});