const
    baseBody = require('baseBody'),
    head = require('head');

cc.Class({
    extends: baseBody,

    properties: {
        belongHead: null,
        beforeBody: null,
        nextBody: null,
        currentTimePositionsIndex: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('load body');
    },

    start () {

    },

    // update (dt) {},

    // methods
    initBodyPositionData(data) {
        this.currentTimePositions = data;
    },

    initBodyPosition(data, index) {
        this.node.setPosition(data[index].x, data[index].y);
    },

    initBodyZOrder(num) {
        this.node.setLocalZOrder(num);
    },

    updateBody(dt) {
        this.moveAction();
    },

    updateCurrentPositions(newPositions) {
        this.currentTimePositions = newPositions;
    },

    updateCurrentTimePositionsIndex() {
        this.currentTimePositionsIndex = 0;
    },

    addBelongHead(node) {
        this.belongHead = node;
    },

    addBeforeBody(node) {
        this.beforeBody = node;
    },

    addNextBody(node) {
        this.nextBody = node;
    },

    hasNextBody() {
        return this.nextBody !== null;
    },

    moveAction() {
        let index = this.currentTimePositions.length - 1 > this.currentTimePositionsIndex ? this.currentTimePositionsIndex++ : this.currentTimePositionsIndex;
        let position = this.currentTimePositions[index];

        if (position) {
            this.node.setPosition(position.x, position.y);
        }
    }
});
