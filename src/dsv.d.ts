// dsv-supported file extension declarations
declare module "*.csv" {
  const content: Record<string | number, string>[];
  export default content;
}

declare module "*.tsv" {
  const content: Record<string | number, string>[];
  export default content;
}
