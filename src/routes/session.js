import { Router } from 'express';

const router = Router();

// you break the rules of being entirely RESTful, because you offer an API endpoint 
// for a very specific feature. It will not be the first time you break the laws of REST,
// because most often REST is not fully implemented RESTful but rather RESTish.
router.get('/', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.context.me.id,
  );
  return res.send(user);
});

export default router;