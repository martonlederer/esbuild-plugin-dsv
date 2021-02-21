# esbuild-plugin-dsv

Use .tsv and .csv files as ES6 modules.

## Install

```sh
yarn add -D esbuild-plugin-dsv
```

or

```sh
npm i -D esbuild-plugin-dsv
```

## Usage

Add to your esbuild plugins list:

```js
const esbuild = require("esbuild");
const { dsvPlugin } = require("esbuild-plugin-dsv");

esbuild.build({
  ...
  plugins: [
    dsvPlugin()
  ]
  ...
});
```

## Options

You can customize how `esbuild-plugin-dsv` parses `.tsv` and `.csv` files the following way:

```js
dsvPlugin({
  // options
});
```

### `transform`

With this function, you can mutate the parsed/resolved `.tsv` and `.csv` files:

```js
  transform(data, extension) {
    // transform the file
    // the data holds a "DSVRowArray" type data
    // parsed from the imported file
    // read more about it here:
    // https://github.com/d3/d3-dsv#csvParse
    // https://github.com/d3/d3-dsv#tsvParse
    // the extension can be "TSV" or "CSV"
    return data;
  }
```
