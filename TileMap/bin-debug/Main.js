var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.tilesize = 64;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        this.touchEnabled = true;
        this.map = new GameMap();
        this.addChild(this.map);
        //this.player = new Player();
        //this.addChild(this.player);
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        var startx = 0;
        var starty = 0;
        var endx = 0;
        var endy = 0;
        var astar;
        var numCols = 10;
        var numRows = 10;
        this.grid = new Grid(numCols, numRows);
        for (var i = 0; i < mapconfig.length; i++) {
            this.grid.setWalkable(mapconfig[i].x, mapconfig[i].y, mapconfig[i].walkable);
        }
        this.grid.setStartNode(startx, starty);
        this.grid.setEndNode(endx, endy);
        var astar = new AStar();
        astar.findPath(this.grid);
        var path = astar.getpath();
        for (var i = 0; i < path.length; i++) {
            console.log("x:" + path[i].x + " y:" + path[i].y + "\n");
        }
        var playerStage = new egret.DisplayObjectContainer();
        playerStage.width = this.stage.stageWidth;
        playerStage.height = this.stage.stageHeight;
        this.addChild(playerStage);
        //var startpointX = -210;
        //var startpointY = -100;
        var startpointX = 0;
        var startpointY = 0;
        //playerStage.anchorOffsetX = 60;
        //playerStage.anchorOffsetY = 70;
        var targetpointX;
        var targetpointY;
        var sign;
        var reachend;
        var reachtarget;
        var indexofpath;
        indexofpath = 0;
        sign = 0; //状态标志
        reachtarget = true;
        reachend = true;
        var playeridle01 = this.createBitmapByName("idle_png");
        var playermove01 = this.createBitmapByName("walk01_png");
        var playermove02 = this.createBitmapByName("walk02_png");
        var playermove03 = this.createBitmapByName("walk03_png");
        var startState0 = function () {
            var startidleanime = function () {
                playerStage.addChild(playeridle01);
                var anime01 = egret.Tween.get(playeridle01);
                anime01.to({ "alpha": 1 }, 0);
                anime01.call(startidleanime, self);
            };
            startidleanime();
        };
        var stopState0 = function () {
            var stopidleanime = function () {
                egret.Tween.removeAllTweens();
                playeridle01.alpha = 0;
            };
            stopidleanime();
        };
        var startState1 = function () {
            var startmoveanime = function () {
                playerStage.addChild(playermove01);
                playerStage.addChild(playermove02);
                playerStage.addChild(playermove03);
                var anime01 = egret.Tween.get(playermove01);
                var anime02 = egret.Tween.get(playermove02);
                var anime03 = egret.Tween.get(playermove03);
                anime01.to({ "alpha": 1 }, 0);
                anime02.to({ "alpha": 0 }, 0);
                anime03.to({ "alpha": 0 }, 0);
                anime01.wait(100);
                anime02.wait(100);
                anime03.wait(100);
                anime01.to({ "alpha": 0 }, 0);
                anime02.to({ "alpha": 1 }, 0);
                anime03.to({ "alpha": 0 }, 0);
                anime01.wait(100);
                anime02.wait(100);
                anime03.wait(100);
                anime01.to({ "alpha": 0 }, 0);
                anime02.to({ "alpha": 0 }, 0);
                anime03.to({ "alpha": 1 }, 0);
                anime01.call(startmoveanime, self);
            };
            var startmove = function () {
                var playerpointX;
                var playerpointY;
                var speed;
                speed = 1; //设置速度
                var anime01 = egret.Tween.get(playerStage); //开始移动
                var anime02 = egret.Tween.get(playerStage);
                //var anime03 = egret.Tween.get(this);
                playerpointX = playerStage.x;
                playerpointY = playerStage.y;
                var distance = Math.sqrt(Math.pow((playerpointX - targetpointX), 2) + Math.pow((playerpointY - targetpointY), 2));
                var time = distance / speed * 2;
                anime01.to({ "x": targetpointX }, time);
                anime02.to({ "y": targetpointY }, time);
                //anime03.wait(time);
                anime01.call(changeTarget);
            };
            startmoveanime();
            startmove();
        };
        var stopState1 = function () {
            var stopmoveanime = function () {
                playermove01.alpha = 0;
                playermove02.alpha = 0;
                playermove03.alpha = 0;
                egret.Tween.removeAllTweens();
            };
            stopmoveanime();
        };
        var playeridleState = new PlayerState(startState0, stopState0); //三个状态的初始化
        var playermoveState = new PlayerState(startState1, stopState1);
        var currentState = playeridleState;
        function notetouchpos(e) {
            //targetpointX = e.stageX;
            //targetpointY = e.stageY;
            indexofpath = 0;
            //astar.clearpath();
            startx = Math.floor(playerStage.x / this.tilesize);
            starty = Math.floor(playerStage.y / this.tilesize);
            endx = Math.floor(e.stageX / this.tilesize);
            endy = Math.floor(e.stageY / this.tilesize);
            console.log("startX:" + startx + " starty:" + starty + "\n");
            console.log("endx:" + endx + " endy:" + endy + "\n");
            this.grid.setStartNode(startx, starty);
            this.grid.setEndNode(endx, endy);
            astar.findPath(this.grid);
            path = astar.getpath();
            for (var i = 0; i < path.length; i++) {
                console.log("[" + i + "]  x:" + path[i].x + " y:" + path[i].y + "\n");
            }
            targetpointX = path[indexofpath].x * 64;
            targetpointY = path[indexofpath].y * 64;
            reachtarget = false;
            //reachend = false;
            sign = 1;
            checkState();
        }
        var checkState = function () {
            switch (sign) {
                case 0:
                    changeState(playeridleState);
                    break;
                case 1:
                    changeState(playermoveState);
                    break;
            }
        };
        var changeState = function (nextState) {
            currentState.onExit();
            currentState = nextState;
            currentState.onEnter();
        };
        changeState(playeridleState); //生成人物，放在初始位置
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, notetouchpos, this);
        var changeTarget = function () {
            if (playerStage.x == targetpointX && playerStage.y == targetpointY) {
                //console.log("changeTarget");
                indexofpath++;
                if (indexofpath < path.length) {
                    targetpointX = path[indexofpath].x * 64;
                    targetpointY = path[indexofpath].y * 64;
                    //console.log("index:"+ indexofpath +"\n");
                    //console.log("path["+ indexofpath + "].x:" + path[indexofpath].x +"\n");
                    //console.log("path["+ indexofpath + "].y:" + path[indexofpath].y +"\n");
                    //console.log("size:" + this.tilesize + "\n");
                    //console.log("targetx(pro):" +path[indexofpath].x * this.tilesize + "\n");
                    //console.log("targety(pro):" +path[indexofpath].y * this.tilesize + "\n");         
                    //console.log("targetx:" + targetpointX + " targety:"+ targetpointY + "\n");
                    sign = 1;
                    checkState();
                }
                else {
                    path = [];
                    indexofpath = 0;
                    sign = 0;
                    checkState();
                }
            }
        };
    };
    /*
        private onTap(event: egret.TouchEvent) {
    
            var startx = Math.floor(this.player.x/this.tilesize);
            var starty = Math.floor(this.player.y/this.tilesize);
            var endx = Math.floor(event.stageX/this.tilesize);
            var endy = Math.floor(event.stageY/this.tilesize);
            
            this.grid.setStartNode(startx,starty);
            this.grid.setEndNode(endx,endy);
    
            var astar = new AStar();
            astar.findPath(this.grid);
    
            var path = astar.getpath();
    
            for(var i = 0; i < path.length; i++){
    
                this.player.Move(new Vector2D(path[i].x,path[i].y));
            }
    
    
        }
    */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
var PlayerState = (function () {
    function PlayerState(enter, exit) {
        this.onenter = enter;
        this.onexit = exit;
    }
    var d = __define,c=PlayerState,p=c.prototype;
    p.onEnter = function () {
        this.onenter();
    };
    p.onExit = function () {
        this.onexit();
    };
    return PlayerState;
}());
egret.registerClass(PlayerState,'PlayerState',["State"]);
//# sourceMappingURL=Main.js.map