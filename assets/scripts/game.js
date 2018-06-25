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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('load game');

        this.joystick.getComponent('joystick').init();

        cc.director.setDisplayStats(false);

        this.addPlayerToJoystick();

        this.gameGlobalEventListener();

        this.gameGlobalInterval(interval => {
            this.player.playerInterval(interval);
            this.otherPlayer.playerInterval(interval);
        });
    },

    start() {
        let data = {
            accumulativeCount: 1,
            direction: 'right',
            headPositions: [{x: -920.5499999999951,y:518.7000000000002}],
            bodiesPosition: [
                [{"x":-995.6999999999947,"y":518.7000000000002},{"x":-993.1499999999947,"y":518.7000000000002},{"x":-990.5999999999948,"y":518.7000000000002},{"x":-988.1999999999948,"y":518.7000000000002},{"x":-985.4999999999948,"y":518.7000000000002},{"x":-983.2499999999948,"y":518.7000000000002},{"x":-980.6999999999948,"y":518.7000000000002},{"x":-978.1499999999949,"y":518.7000000000002},{"x":-975.5999999999949,"y":518.7000000000002},{"x":-973.1999999999949,"y":518.7000000000002},{"x":-970.1999999999949,"y":518.7000000000002},{"x":-968.0999999999949,"y":518.7000000000002},{"x":-965.549999999995,"y":518.7000000000002},{"x":-962.8499999999949,"y":518.7000000000002},{"x":-960.5999999999949,"y":518.7000000000002},{"x":-958.049999999995,"y":518.7000000000002},{"x":-955.1999999999949,"y":518.7000000000002},{"x":-952.9499999999949,"y":518.7000000000002},{"x":-950.549999999995,"y":518.7000000000002},{"x":-947.249999999995,"y":518.7000000000002},{"x":-945.599999999995,"y":518.7000000000002},{"x":-943.0499999999951,"y":518.7000000000002},{"x":-940.6499999999951,"y":518.7000000000002},{"x":-938.0999999999951,"y":518.7000000000002},{"x":-935.0999999999951,"y":518.7000000000002},{"x":-933.1499999999951,"y":518.7000000000002},{"x":-930.449999999995,"y":518.7000000000002},{"x":-928.199999999995,"y":518.7000000000002},{"x":-925.6499999999951,"y":518.7000000000002},{"x":-922.949999999995,"y":518.7000000000002}],
                [{"x":-1073.0999999999954,"y":518.7000000000002},{"x":-1070.6999999999953,"y":518.7000000000002},{"x":-1068.1499999999953,"y":518.7000000000002},{"x":-1065.7499999999952,"y":518.7000000000002},{"x":-1062.5999999999951,"y":518.7000000000002},{"x":-1060.649999999995,"y":518.7000000000002},{"x":-1058.0999999999951,"y":518.7000000000002},{"x":-1054.949999999995,"y":518.7000000000002},{"x":-1053.299999999995,"y":518.7000000000002},{"x":-1050.599999999995,"y":518.7000000000002},{"x":-1048.049999999995,"y":518.7000000000002},{"x":-1043.249999999995,"y":518.7000000000002},{"x":-1040.549999999995,"y":518.7000000000002},{"x":-1038.1499999999949,"y":518.7000000000002},{"x":-1035.7499999999948,"y":518.7000000000002},{"x":-1033.1999999999948,"y":518.7000000000002},{"x":-1030.7999999999947,"y":518.7000000000002},{"x":-1028.0999999999947,"y":518.7000000000002},{"x":-1025.6999999999946,"y":518.7000000000002},{"x":-1023.1499999999946,"y":518.7000000000002},{"x":-1020.5999999999947,"y":518.7000000000002},{"x":-1018.1999999999947,"y":518.7000000000002},{"x":-1015.6499999999947,"y":518.7000000000002},{"x":-1012.9499999999947,"y":518.7000000000002},{"x":-1010.6999999999947,"y":518.7000000000002},{"x":-1008.2999999999947,"y":518.7000000000002},{"x":-1005.5999999999947,"y":518.7000000000002},{"x":-1003.1999999999947,"y":518.7000000000002},{"x":-1000.4999999999947,"y":518.7000000000002},{"x":-998.2499999999947,"y":518.7000000000002}]
            ]
        };

        // this.otherPlayer.create(data);
    },

    update(dt) {

        // return ;
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