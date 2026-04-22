import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {},
  client: {},
  // You only need to destructure client variables:
  experimental__runtimeEnv: {},
});
