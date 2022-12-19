import { argv, stdin, stdout, chdir } from "node:process";
import { resolve } from "node:path";
import { homedir } from "node:os";
import readline from "node:readline";
import { CommandRouter, Cd, Up, Ls, Cat, Add, Rn, Cp } from "./index.mjs";

export class App {
  username = "";

  commandRouter = new CommandRouter();

  rlStream = readline.createInterface({ input: stdin, output: stdout });

  async init() {
    this.username = this.getUsername();
    console.log(`Welcome to the File Manager, ${this.username}!\n`);
    await chdir(resolve(homedir()));
    this.addCommands();
    this.rlStream.on("line", async (line) => {
      if (line.trim() === "") return;
      const cmdParts = line.split` `.filter((v)=>v);
      if (this.commandRouter.isExist(cmdParts[0])) {
        this.commandRouter.execute(
          cmdParts[0],
          cmdParts.length > 1 ? cmdParts.slice(1) : []
        );
      }
    });
    this.rlStream.on("SIGINT", () => {
      this.onClose();
    });
  }

  getUsername() {
    const argFiltered = argv.filter((arg) => arg.startsWith("--username"));
    if (argFiltered.length) {
      const result = argFiltered[0].split`=`[1];
      if (result) {
        return result;
      }
    }
    return "Anonimous";
  }

  addCommands() {
    this.commandRouter.register("cd", new Cd().do);
    this.commandRouter.register("up", new Up().do);
    this.commandRouter.register("ls", new Ls().do);
    this.commandRouter.register("cat", new Cat().do);
    this.commandRouter.register("add", new Add().do);
    this.commandRouter.register("rn", new Rn().do);
    this.commandRouter.register("cp", new Cp().do);
    this.commandRouter.register(".exit", () => this.onClose());
  }

  onClose() {
    console.log(`Thank you for using File Manager, ${this.username}!`);
    this.rlStream.close();
  }
}
