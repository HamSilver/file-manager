import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { cwd } from "node:process";
import * as msg from "./messages.mjs";

export class Add {
  async do() {
    try {
      const args = arguments[0];
      const file = `${args.length ? args[0] : ""}`.trim();
      if (file) {
        await writeFile(resolve(cwd(), file), "", { flag: "wx" });
        msg.show(msg.WHERE);
      } else {
        msg.show(msg.INVALID);
      }
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
