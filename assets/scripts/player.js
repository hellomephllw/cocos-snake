const
    head = require('head'),
    basePlayer = require('basePlayer');

cc.Class({
    extends: basePlayer,

    properties: {
        head,
        body: {
            default: null,
            type: cc.Prefab,
        },
        container: {
            default: null,
            type: cc.Node,
        },
        bodies: [],
        disabledBodies: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('load player');
        this.setInputControl();
    },

    start() {
        this.increaseBody(this.disabledBodies);
        this.increaseBody(this.disabledBodies);
        this.increaseBody(this.disabledBodies);
    },

    // update(dt) {},

    // methods
    updatePlayer(dt) {
        this.updateBodies(dt, this.bodies);
        this.head.updateHead(dt);
        this.notifyContainerUpdatePositions(dt);
    },

    playerInterval(interval) {
        this.head.generatePositionIncrement(interval);
    },

    setInputControl() {
        let headCpn = this.head.getComponent('head');
        // 添加键盘事件监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, event => {
            switch(event.keyCode) {
                case cc.KEY.left:
                    this.head.changeDirection(headCpn._constDirectionLeft);
                    break;
                case cc.KEY.right:
                    this.head.changeDirection(headCpn._constDirectionRight);
                    break;
                case cc.KEY.up:
                    this.head.changeDirection(headCpn._constDirectionTop);
                    break;
                case cc.KEY.down:
                    this.head.changeDirection(headCpn._constDirectionBottom);
                    break;
            }
        });
    },

    activeOneBody() {
        if (this.disabledBodies.length > 0) {
            let newBody = this.disabledBodies.shift();
            let newBodyCpn = newBody.getComponent('body');
            let lastBody = this.bodies[this.bodies.length - 1];

            this.bodies.push(newBody);

            if (this.bodies.length === 1) {
                newBodyCpn.addBeforeBody(null);
            } else {
                lastBody.getComponent('body').addNextBody(newBody);
                newBodyCpn.addBeforeBody(lastBody);
            }
            newBodyCpn.addBelongHead(this.node);
            newBodyCpn.initBodyZOrder(-this.bodies.length - 1);
        }
    },

    notifyFirstBodyUpdatePositions() {
        if (this.bodies.length > 0) {
            let firstBodyCpn = this.bodies[0].getComponent('body');

            // 通知第一个
            this.notifyBodiesUpdatePositions(firstBodyCpn, this.head.historyTimePositions);
        }
    },

    notifyBodiesUpdatePositions(bodyCpn, historyTimePositions) {
        bodyCpn.updateHistoryPositions();
        bodyCpn.updateCurrentPositions(historyTimePositions);
        bodyCpn.updateCurrentTimePositionsIndex();

        // 递归往下通知
        if (bodyCpn.hasNextBody()) {
            this.notifyBodiesUpdatePositions(bodyCpn.nextBody.getComponent('body'), bodyCpn.historyTimePositions);
        }
    },

    notifyContainerUpdatePositions(dt) {
        this.container.getComponent('container').updateContainer(dt);
    },

});