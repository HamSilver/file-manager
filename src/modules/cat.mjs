import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { cwd, stdout } from "node:process";
import * as msg from "./messages.mjs";

export class Cat {
  async do() {
    try {
      const args = arguments[0];
      const file = `${args.length ? args[0] : ""}`.trim();
      if (file) {
        const stream = createReadStream(resolve(cwd(), file), {
          encoding: "utf8",
        });
        stream.on("error", () => {
          msg.show(msg.FAILED);
        });
        stream.pipe(stdout);
        stream.on("end", () => {
          msg.show(msg.WHERE);
        });
      } else {
        msg.show(msg.INVALID);
      }
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
