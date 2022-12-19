import { chdir } from "node:process";

export class Up {
  async do() {
    try {
      await chdir("..");
      msg.show(msg.WHERE);
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
