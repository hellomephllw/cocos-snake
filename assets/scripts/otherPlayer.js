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
        this.otherPlayers.map(otherPlayer => {
            let otherHeadCpn = otherPlayer.head.getComponent('otherHead');
            otherHeadCpn.updateHead();
            this.updateBodies();
        });
    },

    // playerData的数据结构{accumulativeCount: 0, direction: '', headPositions: [], bodiesPosition: []}
    // bodiesPosition的数据结构[[{x: 0, y: 0}, {x: 0, y: 0}], [{x: 0, y:0}, {x: 0, y:0}]]
    create(playerData) {
        console.log('other player create');
        let otherPlayer = {head: null, bodies: [], disabledBodies: []};

        this.createHead(otherPlayer);
        this.createBodies(otherPlayer, playerData);

        this.init(otherPlayer, playerData);

        this.otherPlayers.push(otherPlayer);
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

    updateBodies() {

    },

    changeOtherPlayersHeadDirection() {

    },

});