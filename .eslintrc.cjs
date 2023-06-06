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
          // Routes
          "useMatches", // Remix
          "useRouteData", // Remix
          "useLoaderData", // Remix
          "useActionData", // Remix
          "useParams", // Remix
          "useSearchParams", // Remix

          // Navigation
          "useLocation", // Remix
          "useNavigation", // Remix
          "useNavigate", // Remix

          // Data
          "useFetcher", // Remix
          "useFetchers", // Remix
          "useRevalidator", // Remix

          // Forms
          "useSubmit", // Remix
          "useFormAction", // Remix

          // Misc
          "useBeforeUnload", // Remix

          // Components
          "useState", // React
          "useRef", // React
          "useMemo", // React
          "useEffect", // React
          "useCallback", // React
          "useContext", // React
          "useReducer", // React
          "useImperativeHandle", // React
          "useLayoutEffect", // React
          "useDebugValue", // React

          "useGuard",

          // Other Features
          "useHydrated",
        ],
      },
    ],
  },
  ignorePatterns: ["functions/", "public/build/"],
};
