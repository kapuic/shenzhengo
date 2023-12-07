// @ts-check
// @ts-expect-error
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:jsx-a11y/strict",
  ],
  plugins: ["simple-import-sort", "jsdoc", "hooks", "jsx-a11y"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-non-null-assertion": "error",
    "import/consistent-type-specifier-style": ["warn", "prefer-inline"],
    "import/newline-after-import": "warn",
    "import/no-duplicates": ["warn", { "prefer-inline": true }],
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "react/jsx-curly-brace-presence": ["warn", "never"],
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: "last",
        reservedFirst: true,
      },
    ],
    "hooks/sort": [
      "warn",
      {
        groups: [
          /** Features Control */
          ...[
            require("@growthbook/growthbook-react").useFeatureIsOn, // Scope: Meta, ↩️ Readonly Value, Complexity: 1
            require("@growthbook/growthbook-react").useFeatureValue, // Scope: Meta, ↩️ Readonly Value, Complexity: 1
            require("@growthbook/growthbook-react").useFeature, // Scope: Meta, ↩️ Readonly Value, Complexity: 2
            require("@growthbook/growthbook-react").useExperiment, // Scope: Meta, ↩️ Readonly Value, Complexity: 2
            require("@growthbook/growthbook-react").useGrowthBook, // Scope: Meta, ↩️ Returns Complex, Complexity: 3
          ],

          /** Data Loading and Fetching */
          ...[
            { name: "useAppLoaderData" }, // Scope: Context, ↩️ Readonly Value, Complexity: Simple
            { name: "useAppMapContext" }, // Scope: Context, ↩️ Readonly Value, Complexity: Simple

            require("@remix-run/react").useRouteLoaderData, // Scope: Context, ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useMatches, // Scope: Context, ↩️ Readonly Value, Complexity: Complex
            require("@remix-run/react").useLoaderData, // Scope: Route, ↩️ Readonly Value
            require("@remix-run/react").useActionData, // Scope: Route, ↩️ Readonly Value
            require("@remix-run/react").useRouteError, // Scope: Route, Special Case, ↩️ Readonly Value
            require("@remix-run/react").useAsyncValue, // Scope: `<Await />`, ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useAsyncError, // Scope: `<Await />`, ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useOutletContext, // Scope: Children, ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useOutlet, // Scope: Children, ↩️ Readonly Value, Complexity: Complex

            require("@remix-run/react").useFetcher, // ↩️ Returns Complex
            require("@remix-run/react").useFetchers, // ↩️ Readonly Value
            // ^ Summary of `useFetcher`.
            require("@remix-run/react").useRevalidator, // ▶️ Executes Function
            // ^ Revalidation is typically used after fetching.
          ],

          /** Location and Navigation */
          ...[
            require("@remix-run/react").useParams, // ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useSearchParams, // ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useMatch, // ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useLocation, // ↩️ Returns Value, Complexity: Complex

            require("@remix-run/react").useNavigation, // ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useNavigationType, // ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useNavigate, // ↩️ Runnable Function
            require("@remix-run/react").useBlocker, // ↩️ Returns Complex
            require("@remix-run/react").unstable_usePrompt, // ▶️ Executes Function
            // ^ Abstraction of `unstable_useBlocker`.

            require("@remix-run/react").useHref, // ↩️ Readonly Value, Return Complexity: Simple
            require("@remix-run/react").useResolvedPath, // ↩️ Readonly Value, Return Complexity: Complex
          ],

          /** Integration (requires loading environmental data) */
          ...[
            require("@growthbook/growthbook-react").useGrowthBookSSR, // ▶️ Executes Function
          ],

          /** Form and Submission */
          ...[
            require("@remix-run/react").useFormAction, // ↩️ Readonly Value, Complexity: Simple
            require("@remix-run/react").useSubmit, // ↩️ Runnable Function, Complexity: Complex
          ],

          /** Component: React */
          ...[
            // Context Hooks
            require("react").useContext, // ↩️ Readonly Value

            // State-Related Hooks
            require("react").useState, // ↩️ Returns Value, Complexity: Simple
            require("react").useReducer, // ↩️ Returns Value, Complexity: Complex
            // ^ Alternative to `useState`.
            require("react").useRef, // ↩️ Returns Value, Complexity: Simple
            require("react").useSyncExternalStore, // ↩️ Readonly Value, Complexity: Complex

            // Computation And Memoization Hooks
            require("react").useDeferredValue, // ↩️ Readonly Value, Complexity: Simple
            require("react").useMemo, // ↩️ Readonly Value, Complexity: Complex
            require("react").useCallback, // ↩️ Readonly Value, Complexity: Complex
            require("@remix-run/react").useBeforeUnload, // ▶️ Executes Function
            // ^ Must be after `useCallback`.

            // Effect Hooks
            // Commonly used hooks are sorted first.
            require("react").useEffect, // ▶️ Executes Function
            require("react").useLayoutEffect, // ▶️ Executes Function
            require("react").useInsertionEffect, // ▶️ Executes Function

            // Other Hooks
            // Alphabetical order.
            require("react").useImperativeHandle, // ▶️ Executes Function
            require("react").useTransition, // ↩️ Returns Value

            // Debug Hooks
            require("react").useDebugValue, // ▶️ Executes Function
          ],

          /** Component: HTML */
          ...[
            require("usehooks-ts").useMediaQuery, // ↩️ Readonly Value
            require("react").useId, // ↩️ Readonly Value
          ],
        ].map(({ name }) => name),
      },
    ],
  },
  ignorePatterns: ["functions/", "public/build/"],
};
