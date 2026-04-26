import { prisma } from '../prisma'

export function list(userId: string) {
  return prisma.product.findMany({ where: { authorId: userId }, orderBy: { createdAt: 'desc' } })
}
export function get(userId: string, id: string) {
  return prisma.product.findFirst({ where: { id, authorId: userId } })
}
export function create(userId: string, data: { name: string; price: number }) {
  return prisma.product.create({ data: { ...data, authorId: userId } })
}
export async function update(userId: string, id: string, data: { name?: string; price?: number }) {
  const res = await prisma.product.updateMany({ where: { id, authorId: userId }, data })
  return res.count > 0
}
export async function remove(userId: string, id: string) {
  const res = await prisma.product.deleteMany({ where: { id, authorId: userId } })
  return res.count > 0
}