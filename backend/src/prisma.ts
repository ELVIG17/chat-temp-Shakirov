import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'
import { env } from './env'

if (!env.DATABASE_URL.startsWith('file:')) {
  throw new Error('For SQLite DATABASE_URL must start with "file:"')
}

const filePath = env.DATABASE_URL.slice('file:'.length)
const absPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)

// ВАЖНО: сюда нужен путь к файлу (без префикса file:)
const adapter = new PrismaBetterSqlite3({ url: absPath })

export const prisma = new PrismaClient({ adapter })