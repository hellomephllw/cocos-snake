cc.Class({
    extends: cc.Component,

    properties: {
        ctx: null
    },

    //life cycle
    onLoad() {

    },

    //methods
    init() {
        this.initCtx();
        this.initPosition();
        this.createCircleBoundary();
        this.createCircleBall();
    },

    initCtx() {
        this.ctx = this.node.addComponent(cc.Graphics);
    },

    initPosition() {
        let x = 0 + 60 + 20;
        let y = this.getZeroYCoord() + 60 + 20;

        this.node.setPosition(x, y);
    },

    createCircleBoundary() {
        this.ctx.circle(0, 0, 60);
        this.ctx.fillColor = cc.hexToColor('#f0f0f0');
        this.ctx.fill();
    },

    createCircleBall() {
        this.ctx.circle(0, 0, 20);
        this.ctx.fillColor = cc.hexToColor('#666');
        this.ctx.fill();
    },

    getZeroYCoord() {
        let idealHeight = 375;

        return (idealHeight - this.getCanvasTotalYCoordOfHeight()) / 2
    },

    getCanvasTotalYCoordOfHeight() {
        let windowWidth = document.body.clientWidth;
        let windowHeight = document.body.clientHeight;

        let idealWidth = 667;
        let idealHeight = 375;

        const canvasRealityHeight = windowWidth * (idealHeight / idealWidth);

        return idealHeight * (windowHeight / canvasRealityHeight);
    },

    getYCoordOffsetValFromBoundary() {
        let idealHeight = 375;

        let offsetY = (idealHeight - this.getCanvasTotalYCoordOfHeight()) / 2;

        return Math.abs(offsetY);
    },

});