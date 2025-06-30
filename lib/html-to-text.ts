export function htmlToText(html: string): string {
  if (!html) return ""

  // Remove HTML tags and decode HTML entities
  return html
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
    .replace(/&amp;/g, "&") // Replace ampersands
    .replace(/&lt;/g, "<") // Replace less than
    .replace(/&gt;/g, ">") // Replace greater than
    .replace(/&quot;/g, '"') // Replace quotes
    .replace(/&#39;/g, "'") // Replace apostrophes
    .replace(/&hellip;/g, "...") // Replace ellipsis
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim()
}

export function truncateText(text: string, maxLength = 150): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}
