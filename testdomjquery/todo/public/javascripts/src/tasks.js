var getTasks = (callback) => {
	callService({method: 'GET', url: '/tasks' }, updateTasks)
};

var callService = () => {};

var updateTasks = () => {};
