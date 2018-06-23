const baseHead = require('baseHead');

cc.Class({
    extends: baseHead,

    properties: {
        speed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {},

    start() {},

    // update(dt) {},

    // methods
    updateHead(dt) {
        // let playerCpn = this.node.parent.getComponent('otherPlayer');
        // this.accumulatingTime(dt);
        // // 每隔bodyDelayTime时间，通知一次
        // if (this.isOverThanDelayTime()) {
        //     playerCpn.activeOneBody();
        //     this.updateHistoryPositions();
        //     this.clearCurrentPositions();
        //     playerCpn.notifyFirstBodyUpdatePositions();
        //     this.clearAccumulativeCount();
        // }
        // this.moveAction(dt);
        // this.recordCurrentPosition();
    },

    init(playerData) {
        this.initHeadPositionsData(playerData);
        this.initHeadAccumulativeCount(playerData);
        this.initHeadDirection();
        this.initHeadPosition(playerData);
        this.initHeadZOrder();
    },

    initHeadPositionsData(playerData) {
        this.currentTimePositions = playerData.headPositions;
    },

    initHeadAccumulativeCount(playerData) {
        this.accumulativeCount = playerData.accumulativeCount;
    },

    initHeadDirection(playerData) {
        let directions = [this._constDirectionLeft, this._constDirectionRight, this._constDirectionTop, this._constDirectionBottom];
        if (this.direction === '') {
            this.direction = directions[parseInt(4 * Math.random())];
        } else {
            this.direction = playerData.direction;
        }
    },

    initHeadPosition(playerData) {
        let headPositions = playerData.headPositions;
        let len = headPositions.length;
        this.node.setPosition(headPositions[len - 1].x, headPositions[len - 1].y);
    },

    initHeadZOrder() {
    },

});