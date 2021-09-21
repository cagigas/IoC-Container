class IoC {
  constructor() {
    this._services = new Map()
    this._global = new Map()
  }

  register(name, definition, dependencies) {
    this._services.set(name, {definition, dependencies})
  }

  get(name, original) {
    const c = this._services.get(name)
    if(c === undefined) throw new Error(`Container doesn't know type ${name}`);
    else if(this._isClass(c.definition)) return this._createInstance(c)
    else return c.definition
  }

  _getResolvedDependencies(service) {
    let classDependencies = []
    if(service.dependencies) {
      classDependencies = service.dependencies.map((dep) => {
        if(this._global.has(dep)) return undefined
        else {
          this._global.set(dep)
          return this.get(dep)
        }
      })
    }
    return classDependencies
  }

  _createInstance(service) {
    return new service.definition(...this._getResolvedDependencies(service))
  }

  _isClass(definition) {
    return typeof definition === 'function'
  }
}
module.exports = IoC
