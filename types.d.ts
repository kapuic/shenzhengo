// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppLoadContext from "@remix-run/cloudflare";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV?: "production" | "development";
      readonly CF_PAGES?: string;
      readonly CF_PAGES_COMMIT_SHA?: string;
      readonly CF_PAGES_BRANCH?: string;
      readonly CF_PAGES_URL?: string;
    }
  }

  interface Request {
    /**
     * The `request.cf` object on an inbound `Request` contains information
     * about the request provided by Cloudflare’s global network.
     * [Source](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties)
     */
    cf: {
      /** ASN of the incoming request, for example, `395747`. */
      asn: string;
      /**
       * The organization which owns the ASN of the incoming request, for
       * example, `Google Cloud`.
       */
      asOrganization: string;
      /**
       * Only set when using Cloudflare Bot Management. Object with the
       * following properties: `score`, `verifiedBot`, `staticResource`,
       * `ja3Hash`, and `detectionIds`. Refer to [Bot Management
       * Variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/)
       * for more details.
       */
      botManagement?: {
        /**
         * **Bot Score**
         *
         * An integer between 1-99 that indicates [Cloudflare’s level of
         * certainty](https://developers.cloudflare.com/bots/concepts/bot-score/)
         * that a request comes from a bot.
         */
        score: number;
        /**
         * **Verified Bot**
         *
         * A boolean value that is true if the request comes from a good bot,
         * like Google or Bing. Most customers choose to allow this traffic. For
         * more details, see [Traffic from known
         * bots](https://developers.cloudflare.com/firewall/known-issues-and-faq/#how-does-firewall-rules-handle-traffic-from-known-bots).
         */
        verifiedBot: boolean;
        /**
         * **Serves Static Resource**
         *
         * An identifier that matches [file
         * extensions](https://developers.cloudflare.com/bots/reference/static-resources/)
         * for many types of static resources. Use this variable if you send
         * emails that retrieve static images.
         */
        staticResource: boolean;
        /**
         * **ja3Hash**
         *
         * A [**JA3
         * Fingerprint**](https://developers.cloudflare.com/bots/concepts/ja3-fingerprint/)
         * helps you profile specific SSL/TLS clients across different
         * destination IPs, Ports, and X509 certificates.
         */
        ja3Hash: string;
        js_detection: { passed: boolean };
        /**
         * **Bot Detection IDs**
         *
         * List of IDs that correlate to the Bot Management heuristic detections
         * made on a request (you can have multiple heuristic detections on the
         * same request).
         */
        detectionIds: string[];
      };
      /**
       * If Cloudflare replaces the value of the `Accept-Encoding` header, the
       * original value is stored in the `clientAcceptEncoding` property, for
       * example, `"gzip, deflate, br"`.
       */
      clientAcceptEncoding?: string;
      /**
       * The three-letter
       * [`IATA`](https://en.wikipedia.org/wiki/IATA_airport_code) airport code
       * of the data center that the request hit, for example, `"DFW"`.
       */
      colo: string;
      /**
       * Country of the incoming request. The two-letter country code in the
       * request. This is the same value as that provided in the `CF-IPCountry`
       * header, for example, `"US"`.
       */
      country: string;
      /**
       * If the country of the incoming request is in the EU, this will return
       * `"1"`. Otherwise, this property will be omitted.
       */
      isEUCountry?: "1";
      /** HTTP Protocol, for example, `"HTTP/2"`. */
      httpProtocol: string;
      /**
       * The browser-requested prioritization information in the request object,
       * for example, `"weight=192;exclusive=0;group=3;group-weight=127"`.
       */
      requestPriority?: string;
      /**
       * The cipher for the connection to Cloudflare, for example,
       * `"AEAD-AES128-GCM-SHA256"`.
       */
      tlsCipher: string;
      /**
       * Only set when using Cloudflare Access or API Shield (mTLS). Object with
       * the following properties: `certFingerprintSHA1`,
       * `certFingerprintSHA256`, `certIssuerDN`, `certIssuerDNLegacy`,
       * `certIssuerDNRFC2253`, `certIssuerSKI`, `certIssuerSerial`,
       * `certNotAfter`, `certNotBefore`, `certPresented`, `certRevoked`,
       * `certSKI`, `certSerial`, `certSubjectDN`, `certSubjectDNLegacy`,
       * `certSubjectDNRFC2253`, `certVerified`.
       */
      tlsClientAuth?: {
        certFingerprintSHA1: string;
        certFingerprintSHA256: string;
        certIssuerDN: string;
        certIssuerDNLegacy: string;
        certIssuerDNRFC2253: string;
        certIssuerSKI: string;
        certIssuerSerial: string;
        certNotAfter: Date;
        certNotBefore: Date;
        certPresented: boolean;
        certRevoked: boolean;
        certSKI: string;
        certSerial: string;
        certSubjectDN: string;
        certSubjectDNLegacy: string;
        certSubjectDNRFC2253: string;
        certVerified: "SUCCESS" | "FAILED";
      };
      /**
       * The TLS version of the connection to Cloudflare, for example,
       * `TLSv1.3`.
       */
      tlsVersion: string;
      /** City of the incoming request, for example, `"Austin"`. */
      city?: string | null;
      /** Continent of the incoming request, for example, `"NA"`. */
      continent?: string | null;
      /** Latitude of the incoming request, for example, `"30.27130"`. */
      latitude?: string | null;
      /** Longitude of the incoming request, for example, `"-97.74260"`. */
      longitude?: string | null;
      /** Postal code of the incoming request, for example, `"78701"`. */
      postalCode?: string | null;
      /** Metro code (DMA) of the incoming request, for example, `"635"`. */
      metroCode?: string | null;
      /**
       * If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)
       * name for the first level region associated with the IP address of the
       * incoming request, for example, `"Texas"`.
       */
      region?: string | null;
      /**
       * If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)
       * code for the first-level region associated with the IP address of the
       * incoming request, for example, `"TX"`.
       */
      regionCode?: string | null;
      /** Timezone of the incoming request, for example, `"America/Chicago"`. */
      timezone?: string | null;
    };
  }
}

module "@remix-run/cloudflare" {
  export interface AppLoadContext
    extends EventContext<
      {
        /*
         * Process
         */

        readonly NODE_ENV: "production" | "development";
        readonly CF_PAGES?: 1;
        readonly CF_PAGES_COMMIT_SHA?: string;
        readonly CF_PAGES_BRANCH?: string;
        readonly CF_PAGES_URL?: string;

        /*
         * Environment Variables
         */

        /* GrowthBook */

        readonly GROWTHBOOK_API_HOST?: string;
        readonly GROWTHBOOK_CLIENT_KEY?: string;
        readonly GROWTHBOOK_DECRYPTION_KEY?: string;
      },
      unknown,
      Record<string, unknown>
    > {}
}
