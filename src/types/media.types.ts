export type MediaType = "movie" | "tvshow";

export function isMediaType(value: string): value is MediaType {
  return value === "movie" || value === "tvshow";
}
