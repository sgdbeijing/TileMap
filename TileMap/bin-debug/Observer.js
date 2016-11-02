var EventEmitter = (function () {
    function EventEmitter() {
        this._list = [];
    }
    var d = __define,c=EventEmitter,p=c.prototype;
    p.add = function (o) {
        this._list.push(o);
    };
    p.remove = function (o) {
        var index = this._list.indexOf(o);
        this._list.splice(index);
    };
    p.notify = function (type, data) {
        for (var i = 0; i < this._list.length; i++) {
            var Observer = this._list[i];
            Observer.onchange(type, data);
        }
    };
    return EventEmitter;
}());
egret.registerClass(EventEmitter,'EventEmitter');
var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        _super.call(this);
        this._tasks = [];
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.finishTask = function (task) {
    };
    return TaskService;
}(EventEmitter));
egret.registerClass(TaskService,'TaskService');
var TaskPanel = (function () {
    function TaskPanel() {
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onchange = function (type, data) {
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var Task = (function () {
    function Task() {
    }
    var d = __define,c=Task,p=c.prototype;
    return Task;
}());
egret.registerClass(Task,'Task');
function run() {
    var task = new Task();
    var taskservice = new TaskService();
    var panel = new TaskPanel();
    taskservice.add(panel);
}
//# sourceMappingURL=Observer.js.map