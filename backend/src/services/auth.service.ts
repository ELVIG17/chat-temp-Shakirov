import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma'
import { env } from '../env'

export async function register(email: string, password: string) {
  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hash },
    select: { id: true, email: true, createdAt: true },
  })
  return user
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return null

  const token = jwt.sign({ userId: user.id, email: user.email }, env.JWT_SECRET, { expiresIn: '7d' })
  return { token }
}