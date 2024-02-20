import { Plugin } from "esbuild";
import { TextDecoder } from "util";
import path from "path";
import { csvParse, tsvParse, DSVRowArray } from "d3-dsv";
import fs from "fs-extra";
import tosource from "tosource";

interface DsvPluginOptions {
  transform?: (
    data: DSVRowArray,
    type: "CSV" | "TSV"
  ) => DSVRowArray | undefined;
}

export const dsvPlugin = (options: DsvPluginOptions): Plugin => ({
  name: "dsv",
  setup(build) {
    build.onResolve({ filter: /\.(csv|tsv)$/ }, (args) => {
      if (args.resolveDir === "") return;
      
      const filePath = path.isAbsolute(args.path)
          ? args.path
          : path.join(args.resolveDir, args.path);
      return {
        path: filePath,
        watchFiles: [filePath],
        namespace: "dsv"
      };
    });
    build.onLoad({ filter: /.*/, namespace: "dsv" }, async (args) => {
      const fileContent = new TextDecoder().decode(
          await fs.readFile(args.path)
        ),
        extension = path.extname(args.path),
        parser = { ".csv": csvParse, ".tsv": tsvParse },
        type = extension === ".csv" ? "CSV" : "TSV";

      let parsedContent = parser[extension](fileContent);

      if (
        options?.transform &&
        options.transform(parsedContent, type) !== undefined
      )
        parsedContent = options.transform(parsedContent, type);

      return {
        contents: `export default ${tosource(parsedContent)};`
      };
    });
  }
});
