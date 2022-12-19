import { resolve } from "node:path";
import { chdir, cwd, stdout } from "node:process";

export class Cd {
  async do() {
    try {
      const pathToGo = arguments[0];
      await chdir(`${pathToGo}`);
      console.log(`You are currently in ${cwd()}> `);
    } catch (e) {
      console.log(e);
      stdout.write("Operation failed\n");
    }
  }
}
