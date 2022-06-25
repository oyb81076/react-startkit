import { Router } from 'express';

import { article, user } from './mocks';
import { curd, list, uuid } from './utils';

const router = Router();
router.use((_req, res, next) => {
  const { json } = res;
  res.json = (obj: unknown) => json.call(res, { error: false, data: obj });
  next();
});
router.post('/login', (_req, res) => res.json({ ok: true }));
router.get('/session', (_req, res) => res.json({}));
// 细节的
router
  .post('/user', (req, res) => res.json({ ...req.body, id: uuid() }))
  .delete('/user/:id', (req, res) => res.json({ id: req.params.id }))
  .put('/user/:id', (req, res) => res.json(req.body))
  .get('/user/:id', (req, res) => res.json({ ...user(), id: req.params.id }))
  .get('/user', (_req, res) => res.json(list(user, 30)));
// 粗糙的批量生产
router.use('/article', curd(article));
export default router;
