import { EOL, cpus, homedir, userInfo, arch } from "os";import * as msg from "./messages.mjs";

export class Os {
  async do() {
    try {
      const args = arguments[0];
      const param = `${args.length ? args[0] : ""}`.trim();
      switch (param) {
        case "--EOL":
          console.log(JSON.stringify(EOL));
          break;
        case "--cpus":
          console.log(cpus());
          break;
        case "--homedir":
          console.log(homedir());
          break;
        case "--username":
          console.log(userInfo().username);
          break;
        case "--architecture":
          console.log(arch());
          break;
        default:
          msg.show(msg.INVALID);
      }
    } catch (_) {
      msg.show(msg.FAILED);
    }
  }
}
