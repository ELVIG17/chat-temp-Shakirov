import type { RequestHandler } from 'express'
import type { ZodSchema } from 'zod'

export const validate =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (e: any) {
      return res.status(400).json({ message: 'Validation error', details: e?.errors ?? String(e) })
    }
  }