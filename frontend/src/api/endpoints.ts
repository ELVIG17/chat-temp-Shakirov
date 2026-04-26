import { api } from './http'

export type LoginResponse = { token: string }

export type Post = { id: string; title: string; body: string; createdAt: string; updatedAt: string }
export type Product = { id: string; name: string; price: number; createdAt: string; updatedAt: string }
export type News = { id: string; title: string; text: string; createdAt: string; updatedAt: string }

export const AuthAPI = {
  register: (email: string, password: string) =>
    api<{ id: string; email: string; createdAt: string }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    ),
  login: (email: string, password: string) =>
    api<LoginResponse>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    ),
}

export const PostsAPI = {
  list: () => api<Post[]>('/api/posts'),
  create: (title: string, body: string) =>
    api<Post>('/api/posts', { method: 'POST', body: JSON.stringify({ title, body }) }),
  update: (id: string, patch: Partial<Pick<Post, 'title' | 'body'>>) =>
    api<{ ok: true }>(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify(patch) }),
  remove: (id: string) => api<{ ok: true }>(`/api/posts/${id}`, { method: 'DELETE' }),
}

export const ProductsAPI = {
  list: () => api<Product[]>('/api/products'),
  create: (name: string, price: number) =>
    api<Product>('/api/products', { method: 'POST', body: JSON.stringify({ name, price }) }),
  update: (id: string, patch: Partial<Pick<Product, 'name' | 'price'>>) =>
    api<{ ok: true }>(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(patch) }),
  remove: (id: string) => api<{ ok: true }>(`/api/products/${id}`, { method: 'DELETE' }),
}

export const NewsAPI = {
  list: () => api<News[]>('/api/news'),
  create: (title: string, text: string) =>
    api<News>('/api/news', { method: 'POST', body: JSON.stringify({ title, text }) }),
  update: (id: string, patch: Partial<Pick<News, 'title' | 'text'>>) =>
    api<{ ok: true }>(`/api/news/${id}`, { method: 'PUT', body: JSON.stringify(patch) }),
  remove: (id: string) => api<{ ok: true }>(`/api/news/${id}`, { method: 'DELETE' }),
}