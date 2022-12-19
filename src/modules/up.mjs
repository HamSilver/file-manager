import { chdir, cwd, stdout } from "node:process";

export class Up {
  async do() {
    try {
      await chdir('..');
      console.log(`You are currently in ${cwd()}> `);
    } catch (e) {
      stdout.write("Operation failed\n");
    }
  }
}
