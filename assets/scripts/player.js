const
    head = require('head');

cc.Class({
    extends: cc.Component,

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
        this.increaseBody();
        this.increaseBody();
    },

    // update(dt) {},

    // methods
    updatePlayer(dt) {
        this.updateBodies(dt);
        this.head.updateHead(dt);
        this.notifyContainerUpdatePositions(dt);
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

    increaseBody() {
        let bodyNode = cc.instantiate(this.body);

        this.node.addChild(bodyNode);
        this.disabledBodies.push(bodyNode);

        bodyNode.setPosition(0, 0);
        bodyNode.setLocalZOrder(-this.disabledBodies.length - 1);
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

    updateBodies(dt) {
        this.bodies.map(bodyNode => bodyNode.getComponent('body').updateBody(dt));
    },

    notifyContainerUpdatePositions(dt) {
        this.container.getComponent('container').updateContainer(dt);
    },

});