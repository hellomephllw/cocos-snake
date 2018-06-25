cc.Class({
    extends: cc.Component,

    properties: {
        ctx: null
    },

    onLoad() {
        console.log('background onload');
    },

    start() {
        this.renderBackground();
    },

    init() {
        this.initCtx();
    },

    initCtx() {
        this.ctx = this.node.addComponent(cc.Graphics);
    },

    renderBackground() {
        console.log('render background');
        this.ctx.circle(0, 0, 2800);
        this.ctx.fillColor = cc.hexToColor('#6495ED');
        this.ctx.fill();
    },

});