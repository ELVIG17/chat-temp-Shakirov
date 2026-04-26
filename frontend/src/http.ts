const API_URL = import.meta.env.VITE_API_URL as string

export function setToken(token: string) {
  localStorage.setItem('token', token)
}
export function getToken() {
  return localStorage.getItem('token')
}
export function clearToken() {
  localStorage.removeItem('token')
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken()

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) throw new Error(data?.message ?? `HTTP ${res.status}`)
  return data as T
}