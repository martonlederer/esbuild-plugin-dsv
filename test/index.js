const { dsvPlugin } = require("../dist"),
  { assert } = require("chai"),
  { build } = require("esbuild");

describe("DSV esbuild tests", () => {
  it("Loads .tsv and .csv files", (done) => {
    test("basic")
      .then((res) => {
        assert(res);
        done();
      })
      .catch(done);
  });
});

function test(test, options) {
  return build({
    entryPoints: [`tests/basic.ts`],
    bundle: true,
    outfile: `dist/${test}.js`,
    plugins: [dsvPlugin(options)]
  }).catch(() => process.exit(1));
}
