import 'dotenv/config';
import models, {sequelize} from './models';
import routes from './routes';
import express from 'express';
import cors from 'cors';



const port = process.env.PORT;

const app = express();

// third-party Express middleware (CORS) -application-level
app.use(cors());

// built-in Express middleware (body parser) -application-level
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom Express middleware  that determines a pseudo authenticated user that is 
// sending the request. In the following case, the authenticated user is the user 
// with the identifier 1 which gets assigned as me property to the request object 
// -application-level
app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('rwieruch'),
    };
    next();
});

app.use('/session', routes.session);
app.use('/messages', routes.message);
app.use('/users', routes.user);

const eraseDatabaseOnSync = true;

sequelize.sync({force: eraseDatabaseOnSync}).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsersWithMessages();
    }

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});

const createUsersWithMessages = async () => {
    await models.User.create(
        {
            username: 'rwieruch',
            messages: [
                {
                    text: 'Published the Road to learn React',
                },
            ],
        },
        {
            include: [models.Message],
        },
    );

  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};