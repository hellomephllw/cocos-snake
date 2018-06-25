const baseRole = require('baseRole');

cc.Class({
    extends: baseRole,

    properties: {
        angle: 0,
        //避免由于帧数原因引起的抖动
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
        return this.speed * Math.cos(this.angle);
    },

    getDistanceY() {
        return this.speed * Math.sin(this.angle);
    },

    generatePositionIncrement(interval) {
        if (this.positionIncrementPool.length <= 60) {
            this.positionIncrementPool.push({
                x: this.getDistanceX() * interval,
                y: this.getDistanceY() * interval,
            });
        }
    },

});