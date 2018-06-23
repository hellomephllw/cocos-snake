const baseNode = require('baseNode');

cc.Class({
    extends: baseNode,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad() {},

    start() {},

    update(dt) {},

    // methods
    increaseBody(disabledBodies) {
        let bodyNode = cc.instantiate(this.body);

        this.node.addChild(bodyNode);
        disabledBodies.push(bodyNode);

        bodyNode.setPosition(0, 0);
    },

});