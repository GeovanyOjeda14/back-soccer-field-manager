import { Router, Request, Response } from 'express';
import { promiseResolver} from '../../../response/promise_resolver';
import LoginController from "./controller";

const router = Router();
const loginController = new LoginController();

router.post('/', function(req: Request, res: Response) { promiseResolver(loginController.login(req.body), res, 'User') });

export = router;