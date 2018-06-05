declare module "dedent" {
  declare function dedent(
    strings: string | Array<string>,
    ...values: Array<string>
  ): string;
  declare export default dedent;
}
