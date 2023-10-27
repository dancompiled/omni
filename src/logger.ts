import pino from "pino";
import { ENV } from "./env";

function createLogger(env: string) {
  if (env === "production") {
    return pino();
  }

  return pino({
    transport: {
      target: "pino-pretty",
    },
  });
}

export const LOGGER = createLogger(ENV.NODE_ENV);
