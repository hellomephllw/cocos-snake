
cc.Class({
    extends: cc.Component,

    properties: {
        head: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    // methods
    updateBackground(dt) {
        this.moveAction(dt);
    },

    moveAction(dt) {
        let headPositionsIncrement = this.head.getComponent('head').headCurrentPositionsIncrement;
        let headPositionIncrement = headPositionsIncrement[headPositionsIncrement.length - 1];

        this.node.x -= headPositionIncrement.x;
        this.node.y -= headPositionIncrement.y;
    },
});
