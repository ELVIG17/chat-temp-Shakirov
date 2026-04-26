import { Router } from 'express'
import { z } from 'zod'
import { authRequired, type AuthRequest } from '../middleware/auth'
import { validate } from '../middleware/validate'
import * as PostService from '../services/post.service'

export const postRouter = Router()
postRouter.use(authRequired)

postRouter.get('/', async (req: AuthRequest, res) => res.json(await PostService.list(req.user!.userId)))

postRouter.get('/:id', async (req: AuthRequest, res) => {
  const item = await PostService.get(req.user!.userId, req.params.id)
  if (!item) return res.status(404).json({ message: 'Not found' })
  res.json(item)
})

postRouter.post(
  '/',
  validate(z.object({ title: z.string().min(1), body: z.string().min(1) })),
  async (req: AuthRequest, res) => {
    const item = await PostService.create(req.user!.userId, req.body)
    res.status(201).json(item)
  },
)

postRouter.put(
  '/:id',
  validate(z.object({ title: z.string().min(1).optional(), body: z.string().min(1).optional() })),
  async (req: AuthRequest, res) => {
    const ok = await PostService.update(req.user!.userId, req.params.id, req.body)
    if (!ok) return res.status(404).json({ message: 'Not found' })
    res.json({ ok: true })
  },
)

postRouter.delete('/:id', async (req: AuthRequest, res) => {
  const ok = await PostService.remove(req.user!.userId, req.params.id)
  if (!ok) return res.status(404).json({ message: 'Not found' })
  res.json({ ok: true })
})