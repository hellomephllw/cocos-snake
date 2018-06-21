const
    baseNode = require('baseNode');

cc.Class({
    extends: baseNode,

    properties: {
        body: {
            default: null,
            type: cc.Prefab,
        },
        me: {
            default: null,
            type: cc.Node,
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
        console.log('load snake');

        console.log(this.node.getPosition());
        console.log(this.node);

        this.increaseBody();

        this.increaseBody();
        this.initDirection();
        this.setInputControl();
    },

    start() {
        console.log('start head');
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

    updateBodies(dt) {
        this.bodies.map(bodyNode => bodyNode.getComponent('body').updateBody(dt));
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

    initDirection() {
        let directions = [this._constDirectionLeft, this._constDirectionRight, this._constDirectionTop, this._constDirectionBottom];
        if (this.direction === '') {
            this.direction = directions[parseInt(4 * Math.random())];
        }
    },

    clearCurrentPositions() {
        this.currentTimePositions = [];
    },

    recordCurrentPosition() {
        this.currentTimePositions.push({
            x: this.node.x,
            y: this.node.y
        });
    },

    increaseBody() {
        let bodyNode = cc.instantiate(this.body);

        this.me.addChild(bodyNode);
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

    setInputControl() {
        // 添加键盘事件监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, event => {
            switch(event.keyCode) {
                case cc.KEY.left:
                    this.direction = this._constDirectionLeft;
                    break;
                case cc.KEY.right:
                    this.direction = this._constDirectionRight;
                    break;
                case cc.KEY.up:
                    this.direction = this._constDirectionTop;
                    break;
                case cc.KEY.down:
                    this.direction = this._constDirectionBottom;
                    break;
            }
        });
    }

});
