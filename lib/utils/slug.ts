export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}

export function slugToName(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) // Capitalize first letter of each word
}
