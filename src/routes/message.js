import { v4 as uuidv4 } from 'uuid';
import { request, Router } from 'express';
import { BadRequestError, NotfoundError } from '../utils/errors';


const router = Router();

router.get('/', async (req, res) => {
    const messages = await req.context.models.Message.findAll();
    return res.send(messages);
});

router.get('/:messageId', async (req, res, next) => {
    const message = await req.context.models.Message.findByPk(
        req.params.messageId,
    ).catch((error) => next(new BadRequestError(error)));

    return res.send(message);
});

router.post('/', async (req, res, next) => {
    const message = await req.context.models.Message.create({
        text: req.body.text,
        userId: req.context.me.id,
    }).catch((error) => next(new BadRequestError(error)));

  return res.send(message);
});


router.delete('/:messageId', async (req, res, next) => {
  const element = await req.context.models.Message.findByPk(
    req.params.messageId,
  );
  if (!element) {
    const newerror = new Error('Not Found');
    newerror.statusCode = 404;
    next(newerror);
  } else {
    const result = await req.context.models.Message.destroy({
        where: { id: req.params.messageId },
    }).catch((error) => next(new BadRequestError(error)));
    
    return res.send(true);
  }
});

export default router;