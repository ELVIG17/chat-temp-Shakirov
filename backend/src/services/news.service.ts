import { prisma } from '../prisma'

export function list(userId: string) {
  return prisma.news.findMany({ where: { authorId: userId }, orderBy: { createdAt: 'desc' } })
}
export function get(userId: string, id: string) {
  return prisma.news.findFirst({ where: { id, authorId: userId } })
}
export function create(userId: string, data: { title: string; text: string }) {
  return prisma.news.create({ data: { ...data, authorId: userId } })
}
export async function update(userId: string, id: string, data: { title?: string; text?: string }) {
  const res = await prisma.news.updateMany({ where: { id, authorId: userId }, data })
  return res.count > 0
}
export async function remove(userId: string, id: string) {
  const res = await prisma.news.deleteMany({ where: { id, authorId: userId } })
  return res.count > 0
}