import express from 'express'
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['1234'] }))
app.use(AppRouter.getInstance())

app.listen(3000, () => {
    console.log('app listen');
})