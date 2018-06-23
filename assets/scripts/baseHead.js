const baseRole = require('baseRole');

cc.Class({
    extends: baseRole,

    properties: {
        _constDirectionLeft: 'left',
        _constDirectionRight: 'right',
        _constDirectionTop: 'top',
        _constDirectionBottom: 'bottom',
        direction: '',
        positionIncrementPool: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {},

    // update (dt) {},

    // methods
    clearCurrentPositions() {
        this.currentTimePositions = [];
    },

    recordCurrentPosition() {
        this.currentTimePositions.push({
            x: this.currentX,
            y: this.currentY,
        });
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

    generatePositionIncrement(interval) {
        this.positionIncrementPool.push({
            x: this.getDistanceX() * interval,
            y: this.getDistanceY() * interval,
        });
    },

});