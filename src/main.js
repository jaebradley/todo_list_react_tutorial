"use strict";

var Task = React.createClass({
	handleClick: function() {
		console.log(this.props.name);
		console.log(this.props.type);
		this.props.handleUserSelection(this.props.name, this.props.type);
	},
	render: function() {
		return (
		 	<div name={this.props.name} type={this.props.type} onClick={this.handleClick}><p>{this.props.name}</p></div>
		);
	}
});

var List = React.createClass({
	render: function() {
		var taskList = [];
		this.props.tasks.forEach(function(task) {
			taskList.push(<Task name={task.name} key={task.name} type={task.type} handleUserSelection={this.props.onUserSelection} />);
		}.bind(this));

		return (
			<div>
				{taskList}
			</div>
		);
	}
});

var Todo = React.createClass({
	getInitialState: function() {
		var incompleteTasks = [];
		var completeTasks = [];
		this.props.allTasks.forEach(function(task) {
			if (task.type == "complete") {
				completeTasks.push(task);
			} else {
				incompleteTasks.push(task);
			}
		});

		return {
			incompleteTasks: incompleteTasks,
			completeTasks: completeTasks
		};
	},
	handleUserSelection: function(taskName, taskType) {
		var newTaskType;
		if ("complete" == taskType) {
			newTaskType = "incomplete";
		} else {
			newTaskType = "complete";
		};

		for (var task in TASKS) {
			if (taskName == TASKS[task]["name"]) {
				TASKS[task]["type"] = newTaskType;
			}
		}

		var incompleteTasks = [];
		var completeTasks = [];
		this.props.allTasks.forEach(function(task) {
			if (task.type == "complete") {
				completeTasks.push(task);
			} else {
				incompleteTasks.push(task);
			}
		});

		console.log(TASKS);

		this.setState({
			incompleteTasks: incompleteTasks,
			completeTasks: completeTasks
		});
	},
	render: function() {

		return (
			<div className="todo">
				<h1>Todo List</h1>
				<div className="incompleteTasks">
					<h2>Incomplete Tasks</h2>
					<List tasks={this.state.incompleteTasks} onUserSelection={this.handleUserSelection} />
				</div>
				<div className="completeTasks">
					<h2>Complete Tasks</h2>
					<List tasks={this.state.completeTasks} onUserSelection={this.handleUserSelection} />
				</div>
			</div>
		);
	}
});

var TASKS = [
  {name: 'Pick up milk', type: 'complete'},
  {name: 'Buy iPod', type: 'incomplete'},
  {name: 'Pick up dry cleaning', type: 'incomplete'},
  {name: 'Fill up tank', type: 'complete'}
];

ReactDOM.render(
  <Todo allTasks={TASKS} />,
  document.getElementById('content')
);