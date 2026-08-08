import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWhatsAppLink(customUrl?: string): string {
  const defaultText = "hello sir looking for an enquiry about afsar academy";
  const fallback = `https://wa.me/919052407878?text=${encodeURIComponent(defaultText)}`;
  
  if (!customUrl) return fallback;
  
  let url = customUrl.trim();
  if (!url.startsWith("http")) {
    const num = url.replace(/\D/g, "");
    const cleanNum = num.length === 10 ? `91${num}` : num;
    url = `https://wa.me/${cleanNum}`;
  }
  
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.searchParams.has("text")) {
      parsedUrl.searchParams.set("text", defaultText);
    }
    return parsedUrl.toString();
  } catch {
    if (!url.includes("text=")) {
      const sep = url.includes("?") ? "&" : "?";
      return `${url}${sep}text=${encodeURIComponent(defaultText)}`;
    }
    return url;
  }
}
