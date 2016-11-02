var Vector2D = (function () {
    function Vector2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.Posx = 0;
        this.Posy = 0;
        this.Posx = x;
        this.Posy = y;
    }
    var d = __define,c=Vector2D,p=c.prototype;
    d(p, "x"
        ,function () {
            return this.Posx;
        }
        ,function (x) {
            this.Posx = x;
        }
    );
    d(p, "y"
        ,function () {
            return this.Posy;
        }
        ,function (y) {
            this.Posy = y;
        }
    );
    return Vector2D;
}());
egret.registerClass(Vector2D,'Vector2D');
//# sourceMappingURL=Vector2D.js.map