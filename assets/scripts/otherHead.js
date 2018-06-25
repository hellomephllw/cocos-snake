const baseHead = require('baseHead');

cc.Class({
    extends: baseHead,

    properties: {
        currentX: 0,
        currentY: 0,
        speed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {},

    start() {},

    // update(dt) {},

    // methods
    updateHead(dt, otherPlayer) {
        let otherPlayerCpn = this.node.parent.getComponent('otherPlayer');
        this.accumulatingTime(dt);
        // 每隔bodyDelayTime时间，通知一次
        if (this.isOverThanDelayTime()) {
            otherPlayerCpn.activeOneBody(otherPlayer);
            this.updateHistoryPositions();
            this.clearCurrentPositions();
            otherPlayerCpn.notifyFirstBodyToUpdatePositions(otherPlayer);
            this.clearAccumulativeCount();
        }
        this.moveAction(dt);
    },

    init(playerData) {
        this.initHeadPositionsData(playerData);
        this.initHeadAccumulativeCount(playerData);
        this.initHeadAngle(playerData);
        this.initHeadPosition(playerData);
        this.initHeadZOrder();
    },

    initHeadPositionsData(playerData) {
        this.currentTimePositions = playerData.headPositions;
    },

    initHeadAccumulativeCount(playerData) {
        this.accumulativeCount = playerData.accumulativeCount;
    },

    initHeadAngle(playerData) {
        this.angle = playerData.angle;
    },

    initHeadPosition(playerData) {
        let headPositions = playerData.headPositions;
        let len = headPositions.length;
        this.node.setPosition(headPositions[len - 1].x, headPositions[len - 1].y);

        let otherHeadCpn = this.node.getComponent('otherHead');
        otherHeadCpn.currentX = headPositions[len - 1].x;
        otherHeadCpn.currentY = headPositions[len - 1].y;
    },

    initHeadZOrder() {},

    moveAction(dt) {
        if (this.positionIncrementPool && this.positionIncrementPool.length > 0) {
            let nextPositionIncrement = this.positionIncrementPool.shift();

            let incrementX = nextPositionIncrement.x;
            let incrementY = nextPositionIncrement.y;
            this.currentX += incrementX;
            this.currentY += incrementY;
            this.node.x += incrementX;
            this.node.y += incrementY;

            this.recordCurrentPosition();
        }
    },

    changeHeadAngle(angle) {
        this.angle = angle;
    },

});