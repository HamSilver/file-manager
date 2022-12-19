import { argv, stdin, stdout, chdir } from "node:process";
import { resolve } from "node:path";
import { homedir } from "node:os";
import { CommandRouter } from "./commandRouter.mjs";
import { Cd } from "./cd.mjs";
import { Up } from "./up.mjs";
import readline from "node:readline";

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
      const cmdParts = line.split` `;
      if (this.commandRouter.isExist(cmdParts[0])) {
        this.commandRouter.execute(
          cmdParts[0],
          cmdParts.length > 1 ? line.split` `.slice(1) : []
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
    this.commandRouter.register(".exit", () => this.onClose());
  }

  onClose() {
    console.log(`Thank you for using File Manager, ${this.username}!`);
    this.rlStream.close();
  }
}
