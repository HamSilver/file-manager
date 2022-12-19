import { rename } from "node:fs/promises";
import { resolve } from "node:path";
import { cwd } from "node:process";
import * as msg from "./messages.mjs";

export class Rn {
  async do() {
    try {
      const args = arguments[0];
      if (Array.isArray(args) && args.length >= 2) {
        const fileFrom = resolve(cwd(), args[0]);
        const fileTo = resolve(cwd(), args[1]);
        await rename(fileFrom, fileTo);
        msg.show(msg.WHERE);
      } else {
        msg.show(msg.INVALID);
      }
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
