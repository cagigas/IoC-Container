const IoC = require("./src/IoC");

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

console.log(project1)
