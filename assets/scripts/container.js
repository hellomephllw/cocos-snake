
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
    updateContainer(dt) {
        this.moveAction(dt);
    },

    moveAction(dt) {
        let headPositionsIncrement = this.head.getComponent('head').headCurrentPositionsIncrement;
        let headPositionIncrement = headPositionsIncrement.shift();

        this.node.x -= headPositionIncrement.x;
        this.node.y -= headPositionIncrement.y;
    },
});
