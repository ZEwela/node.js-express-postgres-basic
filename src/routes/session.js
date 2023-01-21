import { Router } from 'express';

const router = Router();

// you break the rules of being entirely RESTful, because you offer an API endpoint 
// for a very specific feature. It will not be the first time you break the laws of REST,
// because most often REST is not fully implemented RESTful but rather RESTish.
router.get('/', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

export default router;