import { prisma } from '../prisma'

export function list(userId: string) {
  return prisma.post.findMany({ where: { authorId: userId }, orderBy: { createdAt: 'desc' } })
}
export function get(userId: string, id: string) {
  return prisma.post.findFirst({ where: { id, authorId: userId } })
}
export function create(userId: string, data: { title: string; body: string }) {
  return prisma.post.create({ data: { ...data, authorId: userId } })
}
export async function update(userId: string, id: string, data: { title?: string; body?: string }) {
  const res = await prisma.post.updateMany({ where: { id, authorId: userId }, data })
  return res.count > 0
}
export async function remove(userId: string, id: string) {
  const res = await prisma.post.deleteMany({ where: { id, authorId: userId } })
  return res.count > 0
}