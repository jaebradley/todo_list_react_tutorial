"use strict";

var Task = React.createClass({
	handleClick: function() {
		this.props.handleUserSelection(this.props.name, this.props.type);
	},
	render: function() {
		return (
		 	<tr className="taskData" name={this.props.name} type={this.props.type} onClick={this.handleClick}>
		 		<td>{this.props.name}</td>
	 		</tr>
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
			<table className="taskList">
				<caption>{this.props.caption}</caption>
				<tbody>
					{taskList}
				</tbody>
			</table>
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
		// TODO: this is hacky but I can't think of a better solution
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

		this.setState({
			incompleteTasks: incompleteTasks,
			completeTasks: completeTasks
		});
	},
	render: function() {

		return (
			<div className="todo">
				<h1>Todo List</h1>
				<List tasks={this.state.incompleteTasks} caption="Incomplete" onUserSelection={this.handleUserSelection} />
				<List tasks={this.state.completeTasks} caption="Complete" onUserSelection={this.handleUserSelection} />
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