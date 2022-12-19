import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { cwd } from "node:process";
import * as msg from "./messages.mjs";

export class Rm {
  async do() {
    try {
      const args = arguments[0];
      if (Array.isArray(args) && args.length) {
        const file = resolve(cwd(), args[0]);
        await rm(file, { recursive: true });
        msg.show(msg.WHERE);
      } else {
        msg.show(msg.INVALID);
      }
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
