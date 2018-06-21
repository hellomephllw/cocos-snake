const
    baseNode = require('baseNode'),
    head = require('head');

cc.Class({
    extends: baseNode,

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
    init() {
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
