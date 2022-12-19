import { readdir } from "node:fs/promises";
import { cwd } from "node:process";

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
      console.log(`You are currently in ${cwd()}> `);
    } catch (_) {
      console.log("Operation failed\n");
    }
  }
}
