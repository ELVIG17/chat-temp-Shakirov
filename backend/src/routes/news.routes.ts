import { Router } from 'express'
import { z } from 'zod'
import { authRequired, type AuthRequest } from '../middleware/auth'
import { validate } from '../middleware/validate'
import * as NewsService from '../services/news.service'

export const newsRouter = Router()

newsRouter.use(authRequired)

newsRouter.get('/', async (req: AuthRequest, res) => {
  const items = await NewsService.list(req.user!.userId)
  res.json(items)
})

newsRouter.get('/:id', async (req: AuthRequest<{ id: string }>, res) => {
  const item = await NewsService.get(req.user!.userId, req.params.id)
  if (!item) return res.status(404).json({ message: 'Not found' })
  res.json(item)
})

newsRouter.post(
  '/',
  validate(
    z.object({
      title: z.string().min(1),
      text: z.string().min(1),
    }),
  ),
  async (req: AuthRequest, res) => {
    const item = await NewsService.create(req.user!.userId, req.body)
    res.status(201).json(item)
  },
)

newsRouter.put('/:id', /* validate(...) */ async (req: AuthRequest<{ id: string }>, res) => {
  const ok = await NewsService.update(req.user!.userId, req.params.id, req.body)
  if (!ok) return res.status(404).json({ message: 'Not found' })
  res.json({ ok: true })
})

newsRouter.delete('/:id', async (req: AuthRequest<{ id: string }>, res) => {
  const ok = await NewsService.remove(req.user!.userId, req.params.id)
  if (!ok) return res.status(404).json({ message: 'Not found' })
  res.json({ ok: true })
})