import { ViteDevServer } from "vite";
// import * as esbuild from "esbuild";

export let devPlugin = () => {
  return {
    name: "dev-plugin",
    configureServer(server: ViteDevServer) {
      require("esbuild").buildSync({
        entryPoints: ["./src/main/mainEntry.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/mainEntry.js",
        external: ["electron"],
      });
      server?.httpServer?.once("listening", () => {
        let { spawn } = require("child_process");
        let addressInfo = server.httpServer!.address();
        console.log(addressInfo, "addressInfo");
        if (!addressInfo || typeof addressInfo === "string") return;
        let httpAddress = `http://localhost:${addressInfo.port}`;
        // let httpAddress = `http://${addressInfo.address}:${addressInfo.port}`;
        console.log(httpAddress, "httpAddress");
        let electronProcess = spawn(
          require("electron").toString(),
          ["./dist/mainEntry.js", httpAddress],
          {
            cwd: process.cwd(),
            stdio: "inherit",
          }
        );
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};

export let getReplacer = () => {
  let externalModels = [
    "os",
    "fs",
    "path",
    "events",
    "child_process",
    "crypto",
    "http",
    "buffer",
    "url",
    "better-sqlite3",
    "knex",
  ];
  let result = {} as any;
  for (let item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  result["electron"] = () => {
    let electronModules = [
      "clipboard",
      "ipcRenderer",
      "nativeImage",
      "shell",
      "webFrame",
    ].join(",");
    return {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules}} = require('electron');export {${electronModules}}`,
    };
  };
  return result;
};
