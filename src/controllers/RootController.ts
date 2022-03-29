import { NextFunction, Request, Response } from "express"
import { controller, get, use } from "./decorators"

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session?.loggedIn) {
        next()
        return
    }
    res.status(403)
    res.send(`Acces is denied`)
}

@controller('')
class RootController {

    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session?.loggedIn) {
            res.send(`
                <div>
                    <h3>You are logged in</h3>
                    <a href="/auth/logout">logout</a>
                </div>
            `)
        } else {
            res.send(`
            <div>
                <h3>You are not logged in</h3>
                <a href="/auth/login">login</a>
            </div>
        `)
        }
    }
    
    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to protected route, logged in user')
    }
}