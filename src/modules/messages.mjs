import { cwd } from "node:process";

export const WHERE = 'where';
export const INVALID = 'invalid';
export const FAILED = 'failed';
export const show = (type) => {
  switch (type) {
    case WHERE:
      console.log(`You are currently in ${cwd()}> `);
      break;
    case INVALID:
      console.log("Invalid input\n");
      break;
    case FAILED:
      console.log("Operation failed\n");
      break;
    default:
      console.log("\n");
  }
};
