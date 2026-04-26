import 'dotenv/config'
import { z } from 'zod'

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3002),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),

  JWT_SECRET: z.string().min(16),

  SOCKET_MAX_HTTP_BUFFER: z.coerce.number().default(5),

  DATABASE_URL: z.string().min(1),
})

export const env = EnvSchema.parse(process.env)