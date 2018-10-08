var getTasks = (callback) => {
	callService({method: 'GET', url: '/tasks' }, updateTasks)
};

var callService = () => {};

var updateTasks = (status, response) => {
	if (status !== 200) {
		const message = `${response} (status: ${status})`;
		document.getElementById('message').innerHTML = message;
		return;
	}

	const tasks = JSON.parse(response);
	document.getElementById('taskscount').innerHTML = tasks.length;

	_setTableHTML(tasks);
};

var _setTableHTML = tasks => {
	var row = (task) => {
		return `<tr><td>${task.name}</td>
			<td>${task.month}/${task.day}/${task.year}</td></tr>`;
	}

	var table = `<table>${tasks.map(row).join('')}</table>`;
	document.getElementById('tasks').innerHTML = table;
}
