describe('tasks service test', () => {
  let service;
  let httpBackend;
  const notCalled = () => { throw 'not expected'; };

  const newTaskJSON = { name: 'task a', month: 6, day: 10, year: 2016 };

  beforeEach(module('todoapp'));

  beforeEach(inject((TasksService, $httpBackend) => {
    service = TasksService;
    httpBackend = $httpBackend;
  }));

  it('get should call service, register success function', (done) => {
    httpBackend.expectGET('tasks')
               .respond(200, '...some data...')

    const success = (data, status) => {
      expect(status).to.eql(200);
      expect(data).to.eql('...some data...');
      done();
    };

    service.get(success, notCalled);

    httpBackend.flush();
  });

  it('get should call service, register error function', (done) => {
    httpBackend.expectGET('tasks')
               .respond(404, 'Not Found')

    const error = (data, status) => {
      expect(status).to.eql(404);
      expect(data).to.eql('Not Found');
      done();
    };

    service.get(notCalled, error);

    httpBackend.flush();
  });

});
