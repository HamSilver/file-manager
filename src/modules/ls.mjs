import { readdir } from "node:fs/promises";
import { cwd } from "node:process";
import * as msg from "./messages.mjs";

export class Ls {
  async do() {
    try {
      const nameSort = (a, b) => (a.name > b.name ? 1 : -1);
      const entries = await readdir(cwd(), { withFileTypes: true });
      const dirs = entries.filter((e) => e.isDirectory()).sort(nameSort);
      const files = entries.filter((e) => !e.isDirectory()).sort(nameSort);
      const result = [...dirs, ...files].map((entry) => ({
        Name: entry.name,
        Type: entry.isDirectory() ? "directory" : "file",
      }));
      console.table(result);
      msg.show(msg.WHERE);
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
