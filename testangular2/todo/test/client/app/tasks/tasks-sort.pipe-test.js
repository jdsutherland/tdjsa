describe('tasks-sort pipe tests', function() {
  let sortPipe;

  beforeEach(function() {
    sortPipe = new app.TasksSortPipe;
  });

  it('should have the pipes name set to sort', () => {
    const annotations = Reflect.getMetadata('annotations', app.TasksSortPipe)[0];

    expect(annotations.name).to.eql('sort');
  });

});

