// Workaround for TS not resolving markdown-it ESM types correctly and treating them as 'any'
declare module "markdown-it" {
  import MarkdownIt from "markdown-it";
  export default MarkdownIt;
}
