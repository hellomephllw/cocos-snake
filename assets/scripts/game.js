const
    head = require('head'),
    body = require('body');

cc.Class({
    extends: cc.Component,

    properties: {
        head,
        body,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('load game');
    },

    start() {

    },

    update(dt) {
        this.head.updateHead(dt);
    },

    // methods
});