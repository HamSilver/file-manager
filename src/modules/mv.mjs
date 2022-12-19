import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { cwd } from "node:process";
import * as msg from "./messages.mjs";

export class Mv {
  async do() {
    try {
      const args = arguments[0];
      if (Array.isArray(args) && args.length >= 2) {
        const fileFrom = resolve(cwd(), args[0]);
        const fileTo = resolve(cwd(), args[1], basename(fileFrom));
        const fromStream = createReadStream(fileFrom);
        const toStream = createWriteStream(fileTo, { flags: "wx" });
        await fromStream.pipe(toStream);
        await rm(fileFrom, { recursive: true });
        msg.show(msg.WHERE);
      } else {
        msg.show(msg.INVALID);
      }
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
