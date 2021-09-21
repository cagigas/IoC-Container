# IoC Container in javascript
IoC Container (a.k.a. DI Container) library for implementing automatic dependency injection.

Support objects and classes, and handle Circle Dependencies.

### Register Classes
```
const project = class Project {
  constructor() {
    this.value = 1
  }
}
ioc.register('project', project)
```

### Retrieve Clasees
```
const project1 = ioc.get('project')
```

### Register Classes with Dependencies
```
const task = { test: 'done' }
const project = class Project {
    constructor(task) {
        this.task = task
    }
}
ioc.register('task', task)
ioc.register('project', project, ['task'])
```


#Run Lint
npm install
npm run lint

#Run tests
npm install
npm run test

#Run demo
npm install
npm start
