import { Router } from 'express'
import { z } from 'zod'
import { authRequired, type AuthRequest } from '../middleware/auth'
import { validate } from '../middleware/validate'
import * as ProductService from '../services/product.service'

export const productRouter = Router()

productRouter.use(authRequired)

productRouter.get('/', async (req: AuthRequest, res) => {
  const items = await ProductService.list(req.user!.userId)
  res.json(items)
})

productRouter.get('/:id', async (req: AuthRequest, res) => {
  const item = await ProductService.get(req.user!.userId, req.params.id)
  if (!item) return res.status(404).json({ message: 'Not found' })
  res.json(item)
})

productRouter.post(
  '/',
  validate(
    z.object({
      name: z.string().min(1),
      price: z.number().int().nonnegative(),
    }),
  ),
  async (req: AuthRequest, res) => {
    const item = await ProductService.create(req.user!.userId, req.body)
    res.status(201).json(item)
  },
)

productRouter.put(
  '/:id',
  validate(
    z.object({
      name: z.string().min(1).optional(),
      price: z.number().int().nonnegative().optional(),
    }),
  ),
  async (req: AuthRequest, res) => {
    const ok = await ProductService.update(req.user!.userId, req.params.id, req.body)
    if (!ok) return res.status(404).json({ message: 'Not found' })
    res.json({ ok: true })
  },
)

productRouter.delete('/:id', async (req: AuthRequest, res) => {
  const ok = await ProductService.remove(req.user!.userId, req.params.id)
  if (!ok) return res.status(404).json({ message: 'Not found' })
  res.json({ ok: true })
})