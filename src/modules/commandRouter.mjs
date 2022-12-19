export class CommandRouter {
  commands = new Map();

  register(name, cmd) {
    this.commands.set(name, cmd);
  }

  isExist(name) {
    return this.commands.has(name) ? true : false;
  }

  execute(name, ...args) {
    return this.commands.get(name)(...args);
  }
}
