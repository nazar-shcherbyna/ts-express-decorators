import { NextFunction, Request, Response } from "express"
import { get, controller, use, bodyValidator, post } from "./decorators"

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('logger');
    next()
}

@controller('/auth')
class LoginController {

    @get('/login')
    @use(logger)
    getLogin(req: Request, res: Response): void {
        res.send(`
            <form action="" method="post">
                <div>
                    <label for="">Email</label>
                    <input type="email" name="email">
                </div>
                <div>
                    <label for="">Password</label>
                    <input type="password" name="password">
                </div>
                <button>Submit</button>
            </form>
        `)
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body

        if (email === 'a@a.a' && password === '1234') {
            req.session = { loggedIn: true }
            res.redirect('/')
        } else {
            res.send('You must provide an email property. Invalid emaip or password')
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined
        res.redirect('/')
    }
}