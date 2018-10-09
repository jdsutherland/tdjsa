var jGetTasks = callback => {
	jCallService({method: 'GET', url: '/tasks' }, jUpdateTasks)
};

var jCallService = (options, callback) => {
	$.ajax({
		method: options.method,
		url: options.url,
		headers: {
			'Content-Type': options.contentType || 'text/plain'
		},
		data: options.data,
		dataType: 'text',
		contentType: options.contentType,
		success: function(data, status, xhr) {
			callback(200, data);
		},
		error: function(xhr, status, errorThrown) {
			callback(xhr.status, errorThrown);
		},
	});
};

var jUpdateTasks = (status, response) => {
	if (status !== 200) {
		const message = `${response} (status: ${status})`;
		$('#message').html(message);
		return;
	}

	const tasks = $.parseJSON(response);
	$('#taskscount').html(tasks.length);

	_jSetTableHTML(tasks);
};

var jAddTask = () => {
	const aDate = new Date($('#date').val());
	const newTask = {
		name: $('#name').val(),
		month: aDate.getMonth() + 1,
		day: aDate.getDate(),
		year: aDate.getFullYear()
	};

	if (validateTask(newTask)) {
		jCallService({
			method: 'POST',
			url: '/tasks',
			contentType: 'application/json',
			data: JSON.stringify(newTask)
		}, jUpdateMessage);
	} else {
		jUpdateMessage(0, 'invalid task');
	}

	return false;
};

var jUpdateMessage = (status, response) => {
	const message = `${response} (status: ${status})`;
	$('#message').html(message);
	jGetTasks();
};

var jDeleteTask = (taskId) => {
	jCallService({
		method: 'DELETE',
		url: `/tasks/${taskId}`,
	}, jUpdateMessage);
}


var jInitpage = () => {
	jGetTasks();
	$('#submit').click (jAddTask);
}

function _jSetTableHTML(tasks) {
	const row = (task) => {
		return `
		<tr>
			<td>${task.name}</td>
			<td>${task.month}/${task.day}/${task.year}</td>
			<td><A onclick="deleteTask('${task._id}');">delete</A></td>
		</tr>`;
	}

	const table = `
		<table>
			${tasks.map(row).join('')}
		</table>`;

	$('#tasks').html(table);
}

$(document).ready(jInitpage);
