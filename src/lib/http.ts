const baseURL = 'localhost:3000';

export async function http<T = any>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(baseURL + url, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
