import { chdir, cwd, stdout } from "node:process";

export class Cd {
  async do() {
    try {
      const args = arguments[0];
      const pathToGo = `${args.length ? args[0] : ''}`.trim();
      if (pathToGo) {
        await chdir(pathToGo);
      } else {
        console.log('Invalid input\n');
      }
      console.log(`You are currently in ${cwd()}> `);
    } catch (_) {
      console.log("Operation failed\n");
    }
  }
}
