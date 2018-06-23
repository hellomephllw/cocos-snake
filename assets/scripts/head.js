const baseHead = require('baseHead');

cc.Class({
    extends: baseHead,

    properties: {
        headCurrentPositionsIncrement: [],
        currentX: 0,
        currentY: 0,
        speed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('load snake');
    },

    start() {
        console.log('start head');
        this.initDirection();
    },

    // update(dt) {},

    // methods
    updateHead(dt) {
        let playerCpn = this.node.parent.getComponent('player');
        this.accumulatingTime(dt);
        // 每隔bodyDelayTime时间，通知一次
        if (this.isOverThanDelayTime()) {
            playerCpn.activeOneBody();
            this.updateHistoryPositions();
            this.clearCurrentPositions();
            this.clearHeadCurrentPositionsIncrement();
            playerCpn.notifyFirstBodyToUpdatePositions();
            this.clearAccumulativeCount();
        }
        this.moveAction(dt);
    },

    moveAction(dt) {
        if (this.positionIncrementPool && this.positionIncrementPool.length > 0) {
            let nextPositionIncrement = this.positionIncrementPool.shift();

            this.recordCurrentPositionIncrement(nextPositionIncrement);

            let incrementX = nextPositionIncrement.x;
            let incrementY = nextPositionIncrement.y;
            this.currentX += incrementX;
            this.currentY += incrementY;
            this.node.x += incrementX;
            this.node.y += incrementY;

            this.recordCurrentPosition();
        }
    },

    initDirection() {
        let directions = [this._constDirectionLeft, this._constDirectionRight, this._constDirectionTop, this._constDirectionBottom];
        if (this.direction === '') {
            this.direction = directions[parseInt(4 * Math.random())];
        }
    },

    changeDirection(direction) {
        this.direction = direction;
        this.clearPositionIncrementPool();
    },

    clearHeadCurrentPositionsIncrement() {
        this.headCurrentPositionsIncrement = [];
    },

    clearPositionIncrementPool() {
        this.positionIncrementPool = [];
    },

    recordCurrentPositionIncrement(nextPositionIncrement) {
        this.headCurrentPositionsIncrement.push(nextPositionIncrement);
    },

});
