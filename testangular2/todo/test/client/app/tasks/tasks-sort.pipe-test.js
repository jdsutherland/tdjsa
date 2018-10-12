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

  it('should sort tasks based on year, then month', () => {
    const task1 = {name: 'task a', month: 1, day: 10, year: 2017};
    const task2 = {name: 'task b', month: 2, day: 10, year: 2016};
    const task3 = {name: 'task c', month: 1, day: 10, year: 2016};

    const sorted = sortPipe.transform([task1, task2, task3]);

    expect(sorted).to.eql([task3, task2, task1]);
  });

  it('should sort tasks based on year, month then day', () => {
    const task1 = {name: 'task a', month: 1, day: 13, year: 2016};
    const task2 = {name: 'task b', month: 1, day: 10, year: 2016};
    const task3 = {name: 'task c', month: 1, day: 12, year: 2016};

    const sorted = sortPipe.transform([task1, task2, task3]);

    expect(sorted).to.eql([task2, task3, task1]);
  });

  it('should sort tasks based on year, month, day then name', () => {
    const task1 = {name: 'task b', month: 1, day: 10, year: 2016};
    const task2 = {name: 'task c', month: 1, day: 10, year: 2016};
    const task3 = {name: 'task d', month: 1, day: 3, year: 2015};
    const task4 = {name: 'task a', month: 1, day: 10, year: 2016};

    const sorted = sortPipe.transform([task1, task2, task3, task4]);

    expect(sorted).to.eql([task3, task4, task1, task2]);
  });

});

