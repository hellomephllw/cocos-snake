const player = require('player');

cc.Class({
    extends: cc.Component,

    properties: {
        player,
        otherHead: {
            default: null,
            type: cc.Prefab,
        },
        body: {
            default: null,
            type: cc.Prefab,
        },
        otherPlayer: {
            default: null,
            type: cc.SpriteFrame,
        },
        container: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('load game');
    },

    start() {
    },

    update(dt) {
        this.player.updatePlayer(dt);
    },

    // methods
});