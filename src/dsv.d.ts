// dsv-supported file extension declarations
declare module "*.csv" {
  const content: {
    [key: string]: string;
    [key: number]: string;
  }[];
  export default content;
}

declare module "*.tsv" {
  const content: {
    [key: string]: string;
    [key: number]: string;
  }[];
  export default content;
}
