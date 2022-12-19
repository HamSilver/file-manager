import { chdir } from "node:process";
import * as msg from "./messages.mjs";

export class Cd {
  async do() {
    try {
      const args = arguments[0];
      const pathToGo = `${args.length ? args[0] : ''}`.trim();
      if (pathToGo) {
        await chdir(pathToGo);
      } else {
        msg.show(msg.INVALID);
      }
      msg.show(msg.WHERE);
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
