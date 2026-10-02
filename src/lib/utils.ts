import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

export function htmlToPlainText(html: string) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>|<\/div>|<\/li>|<\/h[1-6]>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, value: string) => {
      if (value.startsWith("#")) {
        const isHexadecimal = value[1]?.toLowerCase() === "x";
        const codePoint = Number.parseInt(
          value.slice(isHexadecimal ? 2 : 1),
          isHexadecimal ? 16 : 10,
        );

        return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
      }

      return HTML_ENTITIES[value.toLowerCase()] ?? entity;
    })
    .replace(/\s+/g, " ")
    .trim();
}
