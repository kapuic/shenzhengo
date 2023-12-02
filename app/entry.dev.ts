import { Chalk } from "chalk";

const chalk = new Chalk({ level: 1 });
const nativeFetch = globalThis.fetch;

globalThis.fetch = async (...args) => {
  console.debug(
    `${chalk.bold(
      `(FETCH) ${
        args[0] instanceof Request ? args[0].method : args[1]?.method ?? "GET"
      }`,
    )} ${
      typeof args[0] === "string"
        ? args[0]
        : args[0] instanceof URL
          ? args[0].href
          : // @ts-expect-error
            args[0].url
    } ...`,
  );

  // @ts-expect-error
  const response = await nativeFetch(...args);

  console.debug(
    `${chalk.bold(
      `(FETCH) ${
        args[0] instanceof Request ? args[0].method : args[1]?.method ?? "GET"
      }`,
    )} ${
      typeof args[0] === "string"
        ? args[0]
        : args[0] instanceof URL
          ? args[0].href
          : // @ts-expect-error
            args[0].url
    } ${chalk[response.ok ? "green" : "red"](
      `${chalk.bold(response.status)} ${response.statusText}`,
    )}`,
  );
  return response;
};
