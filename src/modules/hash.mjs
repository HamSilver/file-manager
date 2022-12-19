import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

import { resolve } from "node:path";
import { cwd } from "node:process";
import * as msg from "./messages.mjs";

export class Hash {
  async do() {
    try {
      const args = arguments[0];
      if (Array.isArray(args) && args.length) {
        const file = resolve(cwd(), args[0]);
        const data = await readFile(file, { encoding: "utf8" });
        const hash = createHash("sha256");
        console.log(hash.update(data).digest("hex"));
        msg.show(msg.WHERE);
      } else {
        msg.show(msg.INVALID);
      }
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
