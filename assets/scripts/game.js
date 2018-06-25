const
    player = require('player'),
    otherPlayer = require('otherPlayer');

cc.Class({
    extends: cc.Component,

    properties: {
        player,
        otherPlayer,
        otherHead: {
            default: null,
            type: cc.Prefab,
        },
        body: {
            default: null,
            type: cc.Prefab,
        },
        container: {
            default: null,
            type: cc.Node,
        },
        joystick: {
            default: null,
            type: cc.Node,
        },
        background: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('load game');

        this.background.getComponent('background').init();

        this.joystick.getComponent('joystick').init();

        cc.director.setDisplayStats(false);

        this.addPlayerToJoystick();

        this.gameGlobalEventListener();

        this.gameGlobalInterval(interval => {
            this.player.playerInterval(interval);
            this.otherPlayer.playerInterval(interval);
        });

        let angles = [0, Math.PI * 3 / 2, Math.PI, Math.PI / 2];
        let count = 0;
        setInterval(() => {
            if (count === 4) count = 0;
            this.otherPlayer.changeOtherPlayersHeadDirection({
                id: 1,
                angle: angles[count++],
            });
        }, 3000);
    },

    start() {
        let data = {
            id: 1,
            accumulativeCount: 1,
            angle: 0,
            headPositions: [{x: 100,y: 100}],
            bodiesPosition: [],
        };

        this.otherPlayer.create(data);
    },

    update(dt) {
        this.player.updatePlayer(dt);
        this.otherPlayer.updateOtherPlayers(dt);
    },

    // methods
    gameGlobalInterval(callback) {
        let interval = 0.016;
        let startTime = new Date().getTime();
        let timer = setTimeout(loop, interval * 1000);
        function loop() {
            clearTimeout(timer);

            let nextInterval = 0;
            let currTime = new Date().getTime();
            let intervalTime = currTime - startTime;
            if (intervalTime < interval * 1000) {
                nextInterval = interval * 1000 - intervalTime;
            }

            callback(interval);

            timer = setTimeout(loop, nextInterval);
        }
    },

    gameGlobalEventListener() {
        let joystick = this.joystick.getComponent('joystick');
        this.node.on(cc.Node.EventType.TOUCH_START, joystick.onTouchStartEventHandler, joystick);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, joystick.onTouchMoveEventHandler, joystick);
        this.node.on(cc.Node.EventType.TOUCH_END, joystick.onTouchEndEventHandler, joystick);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, joystick.onTouchCancelEventHandler, joystick);
    },

    addPlayerToJoystick() {
        let joystick = this.joystick.getComponent('joystick');
        joystick.playerCpn = this.player;
    },

});