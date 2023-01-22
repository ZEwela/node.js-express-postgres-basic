import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();

  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  return res.send(user);
});

router.delete('/:userId', async (req, res) => {
  const result = await req.context.models.User.destroy({
    where: { id: req.params.userId }
  });
    return res.send(true);
});

export default router;