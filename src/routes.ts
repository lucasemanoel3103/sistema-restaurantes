import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    return res.json({name: 'Fast food'})
})

export {router};