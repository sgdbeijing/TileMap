interface Observer {

	onchange(type:string,data:any):void;

}

class EventEmitter{

	private _list:Observer[]=[];

	public constructor() {
	}

	add(o:Observer) {
		this._list.push(o);

	}

	remove(o:Observer) {
		var index = this._list.indexOf(o);
		this._list.splice(index);

	}

	notify(type:string,data:any) {
		for(var i =0; i<this._list.length; i++) {
			var Observer = this._list[i];
			Observer.onchange(type,data);

		}

	}


}

class TaskService extends EventEmitter {

	private _tasks:Task[] = [];

	constructor() {
		super();
	}

	public finishTask(task:Task){





	}


}

class TaskPanel implements Observer {

	onchange(type:string,data:any):void {


	}

}

class Task{


	id:number;
	name:string;


}


function run() {


	var task = new Task();
	var taskservice = new TaskService();
	var panel = new TaskPanel();
	taskservice.add(panel);



}