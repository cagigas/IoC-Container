import IoC from './IoC'

describe('Test the IoC Container', () => {
  test('Create container and resolve class instance', () => {
    const ioc = new IoC()
    const project = class Project {
      constructor() {
        this.value = 1
      }
    }
    ioc.register('project', project)
    const project1 = ioc.get('project')
    expect(project1.value).toBe(1)
  })


  test('Create container and resolve a new class instance with same key', () => {
    const ioc = new IoC()
    const project = class Project {
      constructor() {
        this.value = 1
      }
    }
    ioc.register('project', project)
    const project1 = ioc.get('project')
    project1.value = 2
    expect(project1.value).toBe(2)

    const project2 = ioc.get('project')
    expect(project2.value).toBe(1)
  })

  test('Resolve class object dependency', () => {
    const ioc = new IoC()
    const task = { test: 'done'}
    const project = class Project {
        constructor(task) {
            this.task = task
        }
    }
    ioc.register('task', task)
    ioc.register('project', project, ['task'])
    const project1 = ioc.get('project')
    expect(project1.task.test).toBe('done')
  })

  test('Resolve class class dependency', () => {
    const ioc = new IoC()
    const task = class Task {
        constructor(project) {
            this.value = 5
        }
    }
    const project = class Project {
        constructor(task) {
            this.task = task
        }
    }
    ioc.register('task', task)
    ioc.register('project', project, ['task'])
    const project1 = ioc.get('project')
    expect(project1.task.value).toBe(5)
  })
  
  test('Resolve circular dependency', () => {
    const ioc = new IoC()
    const task = class Task {
        constructor(project) {
            this.project = project
            this.value = 5
        }
    }
    const project = class Project {
        constructor(task) {
            this.task = task
        }
    }
    ioc.register('task', task, ['project'])
    ioc.register('project', project, ['task'])
    const project1 = ioc.get('project', true)
    expect(project1.task.value).toBe(5)
  })
})
