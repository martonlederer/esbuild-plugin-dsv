import { Plugin } from "esbuild";
import { TextDecoder } from "util";
import path from "path";
import { csvParse, tsvParse } from "d3-dsv";
import fs from "fs-extra";
import tosource from "tosource";

export const dsvPlugin = (): Plugin => ({
  name: "dsv",
  setup(build) {
    build.onResolve({ filter: /\.(csv|tsv)$/ }, (args) => {
      if (args.resolveDir === "") return;

      return {
        path: path.isAbsolute(args.path)
          ? args.path
          : path.join(args.resolveDir, args.path),
        namespace: "dsv"
      };
    });
    build.onLoad({ filter: /.*/, namespace: "dsv" }, async (args) => {
      const fileContent = new TextDecoder().decode(
          await fs.readFile(args.path)
        ),
        extension = path.extname(args.path),
        parser = { ".csv": csvParse, ".tsv": tsvParse },
        parsedContent = parser[extension](fileContent);

      return {
        contents: `export default ${tosource(parsedContent)}`
      };
    });
  }
});
