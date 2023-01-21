import 'dotenv/config';
import models from './models';
import routes from './routes';
import express from 'express';
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';


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
app.use((req, res, next) => {
    req.context = {
        models,
        me: users[1],
    };
    next();
});

app.use('/session', routes.session);
app.use('/messages', routes.message);
app.use('/users', routes.user);

app.listen(port, () => 
    console.log(`Example app listening on port ${port}`),
);