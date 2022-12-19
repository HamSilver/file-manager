import { cwd } from "node:process";

export const WHERE = "where";
export const INVALID = "invalid";
export const FAILED = "failed";
export const WELCOME = "welcome";
export const BYE = "bye";
export const show = (type, user = "") => {
  switch (type) {
    case WELCOME:
      console.log(`Welcome to the File Manager, ${user}!\n`);
      break;
    case BYE:
      console.log(`Thank you for using File Manager, ${user}!`);
      break;
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
