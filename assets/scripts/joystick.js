cc.Class({
    extends: cc.Component,

    properties: {
        ctx: null,
        playerCpn: null,
        currentAngle: 0,
    },

    //life cycle
    onLoad() {

    },

    //methods
    init() {
        //获取运行场景的可见大小。
        let visiSize = cc.director.getVisibleSize();
        console.log('visiSize', visiSize.width, visiSize.height);

        this.initCtx();
        this.createCircleBoundary(60 + 20, this.getZeroYCoord() + 20 + 60, 60);
        this.createCircleBall(60 + 20, this.getZeroYCoord() + 20 + 60, 20);
    },

    initCtx() {
        this.ctx = this.node.addComponent(cc.Graphics);
    },

    createCircleBoundary(x, y, r) {
        this.ctx.circle(x, y, r);
        this.ctx.fillColor = cc.hexToColor('#f0f0f0');
        this.ctx.fill();
    },

    createCircleBall(x, y, r) {
        this.ctx.circle(x, y, r);
        this.ctx.fillColor = cc.hexToColor('#666');
        this.ctx.fill();
    },

    //修正y，该值相当于0
    getZeroYCoord() {
        let joystickWorldPosition = this.node.convertToWorldSpaceAR(this.node.getPosition());

        return -joystickWorldPosition.y;
    },

    onTouchStartEventHandler(event) {
        this.moveCircleBallAction(event);
        this.notifyPlayerUpdateAngle();
    },

    onTouchMoveEventHandler(event) {
        this.moveCircleBallAction(event);
        this.notifyPlayerUpdateAngle();
    },

    onTouchEndEventHandler() {
        this.resetCircleBallAction();
    },

    onTouchCancelEventHandler() {
        this.resetCircleBallAction();
    },

    moveCircleBallAction(event) {
        let clickWorldPosition = this.node.convertToWorldSpaceAR(event.getLocation());

        let angle = this.getAngle(clickWorldPosition);
        this.angle = angle;

        let isInJoystickBoundary = this.isInJoystickBoundary(clickWorldPosition);

        if (isInJoystickBoundary) {
            this.moveToClickPosition(clickWorldPosition);
        } else {
            this.moveToBoundaryOfClickDirection(angle);
        }
    },

    resetCircleBallAction() {
        this.ctx.clear();
        this.createCircleBoundary(60 + 20, this.getZeroYCoord() + 60 + 20, 60);
        this.createCircleBall(60 + 20, this.getZeroYCoord() + 60 + 20, 20);
    },

    notifyPlayerUpdateAngle() {
        this.playerCpn.updateAngle(this.angle);
    },

    getAngle(clickWorldPosition) {
        let joystickWorldPosition = this.node.convertToWorldSpaceAR(this.node.getPosition());
        let joystickBoundaryWorldPosition = {
            x: joystickWorldPosition.x + 60 + 20,
            y: joystickWorldPosition.y + 60 + 20
        };

        let angle = Math.atan2(clickWorldPosition.y - joystickBoundaryWorldPosition.y, clickWorldPosition.x - joystickBoundaryWorldPosition.x);

        if (angle < 0) {
            angle += Math.PI * 2;
        }

        return angle;
    },

    isInJoystickBoundary(clickWorldPosition) {
        let joystickWorldPosition = this.node.convertToWorldSpaceAR(this.node.getPosition());
        let joystickBoundaryWorldPosition = {
            x: joystickWorldPosition.x + 60 + 20,
            y: joystickWorldPosition.y + 60 + 20
        };

        let distance = Math.sqrt(Math.pow(clickWorldPosition.x - joystickBoundaryWorldPosition.x, 2) + Math.pow(clickWorldPosition.y - joystickBoundaryWorldPosition.y, 2));

        return distance <= (60 - 20);
    },

    moveToClickPosition(clickWorldPosition) {
        this.ctx.clear();
        this.createCircleBoundary(60 + 20, this.getZeroYCoord() + 60 + 20, 60);
        this.createCircleBall(clickWorldPosition.x, this.getZeroYCoord() + clickWorldPosition.y + this.getZeroYCoord(), 20);
    },

    moveToBoundaryOfClickDirection(angle) {
        let x = Math.cos(angle) * (60 - 20);
        let y = Math.sin(angle) * (60 - 20);

        this.ctx.clear();
        this.createCircleBoundary(60 + 20, this.getZeroYCoord() + 60 + 20, 60);
        this.createCircleBall(x + 60 + 20, y + this.getZeroYCoord() + 60 + 20, 20);
    },

});