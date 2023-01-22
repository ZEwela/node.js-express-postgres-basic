import { Router } from 'express';
import { BadRequestError, NotfoundError } from '../utils/errors';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();

  return res.send(users);
});

router.get('/:userId', async (req, res, next) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  ).catch((error) => next(new BadRequestError(error)));
  return res.send(user);
});

router.delete('/:userId', async (req, res, next) => {
  const result = await req.context.models.User.destroy({
    where: { id: req.params.userId }
  }).catch((error) => next (new NotfoundError(error)));
    
    return res.send(true);
});

export default router;