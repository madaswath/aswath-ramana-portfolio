export function httpsHref(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return url.href;
  } catch {
    return null;
  }
}

export function mailtoHref(value: string): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null;
  return `mailto:${value}`;
}

export function telHref(value: string): string | null {
  if (!/^\+?[0-9][0-9\s().-]{6,}$/.test(value)) return null;
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}
