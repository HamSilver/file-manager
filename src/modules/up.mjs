import { chdir, cwd } from "node:process";

export class Up {
  async do() {
    try {
      await chdir('..');
      console.log(`You are currently in ${cwd()}> `);
    } catch (_) {
      console.log("Operation failed\n");
    }
  }
}
