"use strict";

var Task = React.createClass({
	render: function() {
		return (
			<p>{this.props.name}</p>
		);
	}
});

var List = React.createClass({
	render: function() {
		var taskList = [];
		this.props.tasks.forEach(function(task) {
			taskList.push(<Task name={task.name} key={task.name} />);
		});

		return (
			<div>
				{taskList}
			</div>
		);
	}
});

var Todo = React.createClass({
	render: function() {
		var incompleteTasks = [];
		var completeTasks = [];
		console.log(this.props.allTasks);
		this.props.allTasks.forEach(function(task) {
			if (task.type == "complete") {
				completeTasks.push(task);
			} else {
				incompleteTasks.push(task);
			}
		});

		return (
			<div className="todo">
				<h1>Todo List</h1>
				<div className="incompleteTasks">
					<h2>Incomplete Tasks</h2>
					<List tasks={incompleteTasks} />
				</div>
				<div className="completeTasks">
					<h2>Complete Tasks</h2>
					<List tasks={completeTasks} />
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