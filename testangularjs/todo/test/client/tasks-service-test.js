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

  it('add should call service, register success function', (done) => {
    httpBackend.expectPOST('tasks', newTaskJSON)
               .respond(200, 'added')

    const success = data => {
      expect(data).to.eql('added');
      done();
    };

    service.add(newTaskJSON, success, notCalled);
    httpBackend.flush();
  });

  it('add should call service, register error function', (done) => {
    httpBackend.expectPOST('tasks', newTaskJSON)
               .respond(500, 'server error')

    const error = (error, status) => {
      expect(error).to.eql('server error');
      expect(status).to.eql(500);
      done();
    };

    service.add(newTaskJSON, notCalled, error);
    httpBackend.flush();
  });

  it('delete should call service, register success function', (done) => {
    const sampleTaskId = '1234123412341234';
    httpBackend.expectDELETE(`tasks/${sampleTaskId}`)
               .respond(200, 'deleted')

    const success = data => {
      expect(data).to.eql('deleted');
      done();
    };

    service.delete(sampleTaskId, success, notCalled);
    httpBackend.flush();
  });

  it('delete should call service, register error function', (done) => {
    const sampleTaskId = '1234123412341234';
    httpBackend.expectDELETE(`tasks/${sampleTaskId}`)
               .respond(500, 'server error')

    const error = data => {
      expect(data).to.eql('server error');
      done();
    };

    service.delete(sampleTaskId, notCalled, error);
    httpBackend.flush();
  });
});
