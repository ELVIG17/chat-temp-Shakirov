import { Router } from 'express'
import { z } from 'zod'
import * as AuthService from '../services/auth.service'
import { validate } from '../middleware/validate'
import { prisma } from '../prisma'

export const authRouter = Router()

authRouter.post(
  '/register',
  validate(z.object({ email: z.string().email(), password: z.string().min(6) })),
  async (req, res) => {
    try {
      const user = await AuthService.register(req.body.email, req.body.password)
      res.json(user)
    } catch (e: any) {
      // unique email
      if (e?.code === 'P2002') return res.status(409).json({ message: 'Email already exists' })
      throw e
    }
  },
)

authRouter.post(
  '/login',
  validate(z.object({ email: z.string().email(), password: z.string().min(1) })),
  async (req, res) => {
    const result = await AuthService.login(req.body.email, req.body.password)
    if (!result) return res.status(401).json({ message: 'Bad credentials' })
    res.json(result)
  },
)