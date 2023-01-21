import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

router.put('/:userId', (req, res) => {
    return res.send(`Received a PUT HTTP method on user/${req.params.userId} resource`);
});

router.delete('/:userId', (req, res) => {
    const {
      [req.params.userId]: user,
      ...otherUsers
    } = req.context.models.users;
    
    req.context.models.users = otherUsers;
    return res.send(user);
});

export default router;