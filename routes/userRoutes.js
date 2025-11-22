//expressClass/routes/userRoutes.js

import express from 'express';
import { login, text } from '../controller/userController.js';
const Router = express.Router();

Router.post('/login', login);
Router.get('/text', text);

export default Router;
