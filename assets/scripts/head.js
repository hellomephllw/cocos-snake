const baseHead = require('baseHead');

cc.Class({
    extends: baseHead,

    properties: {
        headCurrentPositionsIncrement: [],
        currentX: 0,
        currentY: 0,
        speed: 1
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
            playerCpn.notifyFirstBodyUpdatePositions();
            this.clearAccumulativeCount();
        }
        this.moveAction(dt);
    },

    generatePositionIncrement(interval) {
        this.positionIncrementPool.push({
            x: this.getDistanceX() * interval,
            y: this.getDistanceY() * interval,
        });
    },

    moveAction(dt) {
        if (this.positionIncrementPool && this.positionIncrementPool.length > 0) {
            let nextPosition = this.positionIncrementPool.shift();
            let incrementX = nextPosition.x;
            let incrementY = nextPosition.y;

            this.headCurrentPositionsIncrement.push(nextPosition);
            this.currentX += incrementX;
            this.currentY += incrementY;

            this.node.x += incrementX;
            this.node.y += incrementY;

            this.recordCurrentPosition();
        }
    },

    getDistanceX() {
        if (this.direction === this._constDirectionLeft) {
            return -1 * this.speed;
        }
        if (this.direction === this._constDirectionRight) {
            return this.speed;
        }
        return 0;
    },

    getDistanceY() {
        if (this.direction === this._constDirectionTop) {
            return this.speed;
        }
        if (this.direction === this._constDirectionBottom) {
            return -1 * this.speed;
        }
        return 0;
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

    clearPositionIncrementPool() {
        this.positionIncrementPool = [];
    },

    clearCurrentPositions() {
        console.log(this.currentTimePositions);
        this.currentTimePositions = [];
        this.headCurrentPositionsIncrement = [];
    },

    recordCurrentPosition() {
        let _this = this;
        this.currentTimePositions.push({
            x: _this.currentX,
            y: _this.currentY
        });
    },

});
