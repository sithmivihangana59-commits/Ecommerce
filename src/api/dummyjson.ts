import type { Product, ProductListResponse } from "../types/product";

const BASE = "https://dummyjson.com";

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export function getProducts(limit = 24, skip = 0): Promise<ProductListResponse> {
  return safeFetch<ProductListResponse>(`${BASE}/products?limit=${limit}&skip=${skip}`);
}

export function searchProducts(query: string, limit = 24, skip = 0): Promise<ProductListResponse> {
  const q = encodeURIComponent(query.trim());
  return safeFetch<ProductListResponse>(`${BASE}/products/search?q=${q}&limit=${limit}&skip=${skip}`);
}

export function getCategories(): Promise<string[]> {
  return safeFetch<string[]>(`${BASE}/products/categories`);
}

export function getProductsByCategory(category: string, limit = 24, skip = 0): Promise<ProductListResponse> {
  const c = encodeURIComponent(category);
  return safeFetch<ProductListResponse>(`${BASE}/products/category/${c}?limit=${limit}&skip=${skip}`);
}

export function getProductById(id: number): Promise<Product> {
  return safeFetch<Product>(`${BASE}/products/${id}`);
}