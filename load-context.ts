import { type PlatformProxy } from "wrangler";

interface Env {
  /*
   * Process
   */

  readonly CF_PAGES?: 1;
  readonly CF_PAGES_COMMIT_SHA?: string;
  readonly CF_PAGES_BRANCH?: string;
  readonly CF_PAGES_URL?: string;

  /*
   * Environment Variables
   */

  readonly ENVIRONMENT?: "development" | "production";

  /* GrowthBook */

  readonly GROWTHBOOK_API_HOST?: string;
  readonly GROWTHBOOK_CLIENT_KEY?: string;
  readonly GROWTHBOOK_DECRYPTION_KEY?: string;

  /* AMap */

  readonly AMAP_API_KEY?: string;
  readonly AMAP_API_VERSION?: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
