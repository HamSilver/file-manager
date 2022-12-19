import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { cwd, stdout } from "node:process";

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
          console.log("Operation failed\n");
        });
        stream.pipe(stdout);
      } else {
        console.log("Invalid input\n");
      }
    } catch (_) {
      console.log("Operation failed\n");
    }
  }
}
