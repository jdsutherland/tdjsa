describe('tasks-sort pipe tests', function() {
  let sortPipe;

  beforeEach(function() {
    sortPipe = new app.TasksSortPipe;
  });

  it('should have the pipes name set to sort', () => {
    const annotations = Reflect.getMetadata('annotations', app.TasksSortPipe)[0];

    expect(annotations.name).to.eql('sort');
  });

  it('should sort tasks based on year', () => {
    const task1 = {name: 'task a', month: 1, day: 10, year: 2017};
    const task2 = {name: 'task b', month: 1, day: 10, year: 2016};

    const sorted = sortPipe.transform([task1, task2]);

    expect(sorted).to.eql([task2, task1]);
  });
});

