const basePlayer = require('basePlayer');

cc.Class({
    extends: basePlayer,

    properties: {
        otherHead: {
            default: null,
            type: cc.Prefab,
        },
        body: {
            default: null,
            type: cc.Prefab,
        },
        // 数组元素的数据结构{head: null, bodies: [], disabledBodies: []}
        otherPlayers: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('load game');
    },

    start() {},

    update(dt) {},

    // methods
    updateOtherPlayers() {

    },

    // playerData的数据结构{accumulativeCount: 0, direction: '', headPositions: [], bodiesPosition: []}
    // bodiesPosition的数据结构[[{x: 0, y: 0}, {x: 0, y: 0}], [{x: 0, y:0}, {x: 0, y:0}]]
    create(playerData) {
        console.log('other player create');
        let otherPlayer = {head: null, bodies: [], disabledBodies: []};

        this.createHead(otherPlayer);
        this.createBodies(otherPlayer, playerData);

        console.log(otherPlayer);

        this.init(otherPlayer, playerData);
        // let headNode = cc.instantiate(this.otherHead);
        // headNode.parent = this.node;
        // let headNodeCpn = headNode.getComponent('otherHead');
        // headNodeCpn.init();
        //
        // let positions1 = JSON.parse('[{"x":-995.6999999999947,"y":518.7000000000002},{"x":-993.1499999999947,"y":518.7000000000002},{"x":-990.5999999999948,"y":518.7000000000002},{"x":-988.1999999999948,"y":518.7000000000002},{"x":-985.4999999999948,"y":518.7000000000002},{"x":-983.2499999999948,"y":518.7000000000002},{"x":-980.6999999999948,"y":518.7000000000002},{"x":-978.1499999999949,"y":518.7000000000002},{"x":-975.5999999999949,"y":518.7000000000002},{"x":-973.1999999999949,"y":518.7000000000002},{"x":-970.1999999999949,"y":518.7000000000002},{"x":-968.0999999999949,"y":518.7000000000002},{"x":-965.549999999995,"y":518.7000000000002},{"x":-962.8499999999949,"y":518.7000000000002},{"x":-960.5999999999949,"y":518.7000000000002},{"x":-958.049999999995,"y":518.7000000000002},{"x":-955.1999999999949,"y":518.7000000000002},{"x":-952.9499999999949,"y":518.7000000000002},{"x":-950.549999999995,"y":518.7000000000002},{"x":-947.249999999995,"y":518.7000000000002},{"x":-945.599999999995,"y":518.7000000000002},{"x":-943.0499999999951,"y":518.7000000000002},{"x":-940.6499999999951,"y":518.7000000000002},{"x":-938.0999999999951,"y":518.7000000000002},{"x":-935.0999999999951,"y":518.7000000000002},{"x":-933.1499999999951,"y":518.7000000000002},{"x":-930.449999999995,"y":518.7000000000002},{"x":-928.199999999995,"y":518.7000000000002},{"x":-925.6499999999951,"y":518.7000000000002},{"x":-922.949999999995,"y":518.7000000000002}]');
        // let bodyNode = cc.instantiate(this.body);
        // this.node.addChild(bodyNode);
        // bodyNode.setPosition(positions1[0].x, positions1[0].y);
        // bodyNode.setLocalZOrder(-1);
        //
        //
        // let positions2 = JSON.parse('[{"x":-1073.0999999999954,"y":518.7000000000002},{"x":-1070.6999999999953,"y":518.7000000000002},{"x":-1068.1499999999953,"y":518.7000000000002},{"x":-1065.7499999999952,"y":518.7000000000002},{"x":-1062.5999999999951,"y":518.7000000000002},{"x":-1060.649999999995,"y":518.7000000000002},{"x":-1058.0999999999951,"y":518.7000000000002},{"x":-1054.949999999995,"y":518.7000000000002},{"x":-1053.299999999995,"y":518.7000000000002},{"x":-1050.599999999995,"y":518.7000000000002},{"x":-1048.049999999995,"y":518.7000000000002},{"x":-1043.249999999995,"y":518.7000000000002},{"x":-1040.549999999995,"y":518.7000000000002},{"x":-1038.1499999999949,"y":518.7000000000002},{"x":-1035.7499999999948,"y":518.7000000000002},{"x":-1033.1999999999948,"y":518.7000000000002},{"x":-1030.7999999999947,"y":518.7000000000002},{"x":-1028.0999999999947,"y":518.7000000000002},{"x":-1025.6999999999946,"y":518.7000000000002},{"x":-1023.1499999999946,"y":518.7000000000002},{"x":-1020.5999999999947,"y":518.7000000000002},{"x":-1018.1999999999947,"y":518.7000000000002},{"x":-1015.6499999999947,"y":518.7000000000002},{"x":-1012.9499999999947,"y":518.7000000000002},{"x":-1010.6999999999947,"y":518.7000000000002},{"x":-1008.2999999999947,"y":518.7000000000002},{"x":-1005.5999999999947,"y":518.7000000000002},{"x":-1003.1999999999947,"y":518.7000000000002},{"x":-1000.4999999999947,"y":518.7000000000002},{"x":-998.2499999999947,"y":518.7000000000002}]');
        // bodyNode = cc.instantiate(this.body);
        // this.node.addChild(bodyNode);
        // bodyNode.setPosition(positions2[0].x, positions2[0].y);
        // bodyNode.setLocalZOrder(-1);
    },

    createHead(otherPlayer) {
        let otherHead = cc.instantiate(this.otherHead);
        otherPlayer.head = otherHead;
        // 所有head和body都是otherPlayer的子节点
        this.node.addChild(otherHead);
    },

    createBodies(otherPlayer, playerData) {
        if (playerData && playerData.bodiesPosition) {
            playerData.bodiesPosition.map(() => {
                this.increaseBody(otherPlayer.disabledBodies);
                this.activeThisBody(otherPlayer);
            });
        }
    },

    activeThisBody(otherPlayer) {
        otherPlayer.bodies.push(otherPlayer.disabledBodies.shift());
    },

    init(otherPlayer, playerData) {
        /**
         * 1.head的positionData
         * 2.head的方向
         * 3.head的count
         * 4.head的节点数据
         * 5.body的positionData
         * 6.body的节点数据
         * 7.初始化body之间的关系
         */
        this.initHead(otherPlayer, playerData);
        this.initBodies(otherPlayer, playerData);
    },

    initHead(otherPlayer, playerData) {
        otherPlayer.head.getComponent('otherHead').init(playerData);
    },

    initBodies(otherPlayer, playerData) {
        let head = otherPlayer.head;
        let bodies = otherPlayer.bodies;
        for (let i = 0, len = bodies.length; i < len; ++i) {
            let currBody = bodies[i];
            let currBodyCpn = currBody.getComponent('body');
            let data = playerData.bodiesPosition[i];

            currBodyCpn.initBodyPositionData(data);
            currBodyCpn.initBodyPosition(data, playerData.accumulativeCount - 1);
            currBodyCpn.initBodyZOrder(-i - 2);
            if (i === 0) {
                currBodyCpn.addBeforeBody(null);
            } else {
                currBodyCpn.addBeforeBody(bodies[i - 1]);
            }
            if (i !== len - 1) {
                currBodyCpn.addNextBody(bodies[i + 1]);
            }
            currBodyCpn.addBelongHead(head);
        }
    },

    changeOtherPlayersHeadDirection() {

    },

});