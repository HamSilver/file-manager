import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { basename, resolve } from "node:path";
import { cwd } from "node:process";
import * as msg from "./messages.mjs";

export class Compress {
  async do() {
    try {
      const args = arguments[0];
      if (Array.isArray(args) && args.length >= 2) {
        const fileFrom = resolve(cwd(), args[0]);
        const fileTo = resolve(cwd(), args[1], `${basename(fileFrom)}.br`);
        const fromStream = createReadStream(fileFrom);
        const toStream = createWriteStream(fileTo, { flags: "wx" });
        const brCmp = createBrotliCompress();
        await fromStream.pipe(brCmp).pipe(toStream);
        msg.show(msg.WHERE);
      } else {
        msg.show(msg.INVALID);
      }
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
