var getTasks = (callback) => {
	callService({method: 'GET', url: '/tasks' }, updateTasks)
};

var callService = (options, callback) => {
	var xhr = new XMLHttpRequest();
	xhr.open(options.method, options.url);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			callback(xhr.status, xhr.response);
		}
	}

	xhr.send();
};

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

var initpage = () => {
	getTasks();
}

var addTask = () => {
	const aDate = new Date(document.getElementById('date').value);
	const newTask = {
		name: document.getElementById('name').value,
		month: aDate.getMonth() + 1,
		day: aDate.getDate(),
		year: aDate.getFullYear()
	};

	callService({
		method: 'POST',
		url: '/tasks',
		contentType: 'application/json',
		data: JSON.stringify(newTask)
	}, updateMessage);
};

var updateMessage = () => {
};

window.onload = initpage;

function _setTableHTML(tasks) {
	const row = (task) => {
		return `
		<tr>
			<td>${task.name}</td>
			<td>${task.month}/${task.day}/${task.year}</td>
	 	</tr>`;
	}

	const table = `
		<table>
			${tasks.map(row).join('')}
		</table>`;

	document.getElementById('tasks').innerHTML = table;
}
