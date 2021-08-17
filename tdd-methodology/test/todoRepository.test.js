const { describe, it, before, afterEach } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');

const TodoRepository = require('../src/todoRepository');

describe('To-do Repository', () => {
  let todoRepository;
  let sandbox;

  before(() => {  
    todoRepository = new TodoRepository();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  })
  
  describe('methods signatures', () => {
    it('Should call insertOne from loki js', () => {
      const functionName = "insertOne";

      const expectReturn = true;

      const data = { name: 'Jackson Burke' };

      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectReturn);

      const result = todoRepository.create(data);

      expect(result).to.be.ok;
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok;
    });

    it('Should call find from loki js', () => {
      const mockDatabase = [
        {
          name: 'Sophia Adkins',
          age: 90,
          meta: { revision: 0, created: 1611185653507, version: 0 },
          '$loki': 1
        }, 
      ];

      const functionName = "find";

      const expectReturn = mockDatabase;

      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectReturn);

      const result = todoRepository.list();

      expect(result).to.be.deep.equal(expectReturn);
      expect(todoRepository.schedule[functionName].calledOnce);
    });
  });
});