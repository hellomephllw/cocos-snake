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

    updateAngle(angle) {
        this.head.changeAngle(angle);
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

    notifyFirstBodyToUpdatePositions() {
        if (this.bodies.length > 0) {
            let firstBodyCpn = this.bodies[0].getComponent('body');

            // 通知第一个
            this.notifyBodiesToUpdatePositions(firstBodyCpn, this.head.historyTimePositions);
        }
    },

    notifyBodiesToUpdatePositions(bodyCpn, historyTimePositions) {
        bodyCpn.updateHistoryPositions();
        bodyCpn.updateCurrentPositions(historyTimePositions);
        bodyCpn.updateCurrentTimePositionsIndex();

        // 递归往下通知
        if (bodyCpn.hasNextBody()) {
            this.notifyBodiesToUpdatePositions(bodyCpn.nextBody.getComponent('body'), bodyCpn.historyTimePositions);
        }
    },

    notifyContainerUpdatePositions(dt) {
        this.container.getComponent('container').updateContainer(dt);
    },

});