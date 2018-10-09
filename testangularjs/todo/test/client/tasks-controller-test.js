describe('tasks controller test', () => {
  let controller;

  beforeEach(module('todoapp'));

  beforeEach(inject($controller => {
    controller = $controller('TasksController');
  }));

  it('should pass canary', () => {
    expect(true).to.eql(true);
  });

  it('tasks should be empty on create', () => {
    expect(controller.tasks).to.eql([]);
  });

  it('message should be empty on create', () => {
    expect(controller.message).to.eql('');
  });

})
