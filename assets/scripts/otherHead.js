const
    baseNode = require('baseNode');

cc.Class({
    extends: baseNode,

    properties: {
        body: {
            default: null,
            type: cc.Prefab,
        },
        otherPlayer: {
            default: null,
            type: cc.Prefab,
        },
        bodies: [],
        disabledBodies: [],
        _constDirectionLeft: 'left',
        _constDirectionRight: 'right',
        _constDirectionTop: 'top',
        _constDirectionBottom: 'bottom',
        direction: '',
        speed: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {
        console.log('start other head');
    },

    // update(dt) {},

    // methods
    updateHead(dt) {
        this.accumulatingTime(dt);
        this.updateBodies(dt);
        // 每隔bodyDelayTime时间，通知一次
        if (this.isOverThanDelayTime()) {
            this.activeOneBody();
            this.updateHistoryPositions();
            this.clearCurrentPositions();
            this.notifyFirstBodyUpdatePositions();
            this.clearAccumulativeCount();
        }
        this.moveAction(dt);
        this.recordCurrentPosition();
    },

    init() {
        console.log('init other head');
        // this.increaseBody();

        this.initHeadPosition();
        this.initDirection();

    },

    initHeadPosition() {
        let headPositions = JSON.parse('[{"x":-920.5499999999951,"y":518.7000000000002},{"x":-918.1499999999951,"y":518.7000000000002},{"x":-915.5999999999951,"y":518.7000000000002},{"x":-913.1999999999952,"y":518.7000000000002},{"x":-910.6499999999952,"y":518.7000000000002},{"x":-908.0999999999952,"y":518.7000000000002},{"x":-905.6999999999953,"y":518.7000000000002},{"x":-902.9999999999952,"y":518.7000000000002},{"x":-900.5999999999952,"y":518.7000000000002},{"x":-898.1999999999953,"y":518.7000000000002},{"x":-895.4999999999952,"y":518.7000000000002},{"x":-893.0999999999952,"y":518.7000000000002},{"x":-890.5499999999953,"y":518.7000000000002},{"x":-888.1499999999953,"y":518.7000000000002},{"x":-885.5999999999954,"y":518.7000000000002},{"x":-883.0499999999954,"y":518.7000000000002},{"x":-880.4999999999955,"y":518.7000000000002},{"x":-877.9499999999955,"y":518.7000000000002},{"x":-875.5499999999955,"y":518.7000000000002},{"x":-872.9999999999956,"y":518.7000000000002},{"x":-870.7499999999956,"y":518.7000000000002},{"x":-868.1999999999956,"y":518.7000000000002},{"x":-865.4999999999956,"y":518.7000000000002},{"x":-863.0999999999956,"y":518.7000000000002},{"x":-860.3999999999955,"y":518.7000000000002},{"x":-858.1499999999955,"y":518.7000000000002},{"x":-855.5999999999956,"y":518.7000000000002},{"x":-853.0499999999956,"y":518.7000000000002},{"x":-850.4999999999957,"y":518.7000000000002},{"x":-848.0999999999957,"y":518.7000000000002}]');
        // this.node.x = headPositions[0].x;
        // this.node.y = headPositions[0].y;
        this.node.setPosition(headPositions[0].x, headPositions[0].y);

        this.increaseBody();
        this.increaseBody();

        let firstBody = this.bodies[0];
        let firstBodyCpn = firstBody.getComponent('body');
        let secondBody = this.bodies[1].getComponent('body');
        let secondBodyCpn = secondBody.getComponent('body');

        let positions1 = JSON.parse('[{"x":-995.6999999999947,"y":518.7000000000002},{"x":-993.1499999999947,"y":518.7000000000002},{"x":-990.5999999999948,"y":518.7000000000002},{"x":-988.1999999999948,"y":518.7000000000002},{"x":-985.4999999999948,"y":518.7000000000002},{"x":-983.2499999999948,"y":518.7000000000002},{"x":-980.6999999999948,"y":518.7000000000002},{"x":-978.1499999999949,"y":518.7000000000002},{"x":-975.5999999999949,"y":518.7000000000002},{"x":-973.1999999999949,"y":518.7000000000002},{"x":-970.1999999999949,"y":518.7000000000002},{"x":-968.0999999999949,"y":518.7000000000002},{"x":-965.549999999995,"y":518.7000000000002},{"x":-962.8499999999949,"y":518.7000000000002},{"x":-960.5999999999949,"y":518.7000000000002},{"x":-958.049999999995,"y":518.7000000000002},{"x":-955.1999999999949,"y":518.7000000000002},{"x":-952.9499999999949,"y":518.7000000000002},{"x":-950.549999999995,"y":518.7000000000002},{"x":-947.249999999995,"y":518.7000000000002},{"x":-945.599999999995,"y":518.7000000000002},{"x":-943.0499999999951,"y":518.7000000000002},{"x":-940.6499999999951,"y":518.7000000000002},{"x":-938.0999999999951,"y":518.7000000000002},{"x":-935.0999999999951,"y":518.7000000000002},{"x":-933.1499999999951,"y":518.7000000000002},{"x":-930.449999999995,"y":518.7000000000002},{"x":-928.199999999995,"y":518.7000000000002},{"x":-925.6499999999951,"y":518.7000000000002},{"x":-922.949999999995,"y":518.7000000000002}]');
        let positions2 = JSON.parse('[{"x":-1073.0999999999954,"y":518.7000000000002},{"x":-1070.6999999999953,"y":518.7000000000002},{"x":-1068.1499999999953,"y":518.7000000000002},{"x":-1065.7499999999952,"y":518.7000000000002},{"x":-1062.5999999999951,"y":518.7000000000002},{"x":-1060.649999999995,"y":518.7000000000002},{"x":-1058.0999999999951,"y":518.7000000000002},{"x":-1054.949999999995,"y":518.7000000000002},{"x":-1053.299999999995,"y":518.7000000000002},{"x":-1050.599999999995,"y":518.7000000000002},{"x":-1048.049999999995,"y":518.7000000000002},{"x":-1043.249999999995,"y":518.7000000000002},{"x":-1040.549999999995,"y":518.7000000000002},{"x":-1038.1499999999949,"y":518.7000000000002},{"x":-1035.7499999999948,"y":518.7000000000002},{"x":-1033.1999999999948,"y":518.7000000000002},{"x":-1030.7999999999947,"y":518.7000000000002},{"x":-1028.0999999999947,"y":518.7000000000002},{"x":-1025.6999999999946,"y":518.7000000000002},{"x":-1023.1499999999946,"y":518.7000000000002},{"x":-1020.5999999999947,"y":518.7000000000002},{"x":-1018.1999999999947,"y":518.7000000000002},{"x":-1015.6499999999947,"y":518.7000000000002},{"x":-1012.9499999999947,"y":518.7000000000002},{"x":-1010.6999999999947,"y":518.7000000000002},{"x":-1008.2999999999947,"y":518.7000000000002},{"x":-1005.5999999999947,"y":518.7000000000002},{"x":-1003.1999999999947,"y":518.7000000000002},{"x":-1000.4999999999947,"y":518.7000000000002},{"x":-998.2499999999947,"y":518.7000000000002}]');

        firstBodyCpn.addBelongHead(this.node);
        firstBodyCpn.addBeforeBody(null);
        firstBodyCpn.addNextBody(secondBody);
        firstBodyCpn.currentTimePositions = positions1;

        secondBodyCpn.addBelongHead(this.node);
        secondBodyCpn.addBeforeBody(firstBody);
        firstBodyCpn.currentTimePositions = positions2;
    },

    initDirection() {
        let directions = [this._constDirectionLeft, this._constDirectionRight, this._constDirectionTop, this._constDirectionBottom];
        if (this.direction === '') {
            // this.direction = directions[parseInt(4 * Math.random())];
            this.direction = this._constDirectionRight;
        }
    },

    increaseBody() {
        let bodyNode = cc.instantiate('body');

        console.log('------');
        console.log(this.node.parent, bodyNode, this.body);
        this.node.parent.addChild(bodyNode);
        // this.disabledBodies.push(bodyNode);
        this.bodies.push(bodyNode);

        bodyNode.setPosition(0, 0);
        bodyNode.setLocalZOrder(-this.disabledBodies.length - 1);
    },

    updateBodies(dt) {
        this.bodies.map(bodyNode => bodyNode.getComponent('body').updateBody(dt));
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

    moveAction(dt) {
        this.node.x += this.getDistanceX() * dt;
        this.node.y += this.getDistanceY() * dt;
    },

    getDistanceX() {
        if (this.direction === this._constDirectionLeft) {
            return -1 * this.speed;
        }
        if (this.direction === this._constDirectionRight) {
            return this.speed;
        }
        return 0;
    },

    getDistanceY() {
        if (this.direction === this._constDirectionTop) {
            return this.speed;
        }
        if (this.direction === this._constDirectionBottom) {
            return -1 * this.speed;
        }
        return 0;
    },

    clearCurrentPositions() {
        this.currentTimePositions = [];
    },

    recordCurrentPosition() {
        let _this = this;
        this.currentTimePositions.push({
            x: _this.node.x,
            y: _this.node.y
        });
    },

    notifyFirstBodyUpdatePositions() {
        if (this.bodies.length > 0) {
            let firstBodyCpn = this.bodies[0].getComponent('body');

            // 通知第一个
            this.notifyBodiesUpdatePositions(firstBodyCpn, this.historyTimePositions);
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

});