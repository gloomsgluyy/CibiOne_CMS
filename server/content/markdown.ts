export function sanitizeMarkdown(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\]\((?:javascript|data|vbscript):[^)]*\)/gi, "](#)");
}
