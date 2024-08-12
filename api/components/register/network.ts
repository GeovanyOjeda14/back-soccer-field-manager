import { Router, Request, Response } from 'express';
import { promiseResolver} from '../../../response/promise_resolver';
import RegisterController from "./controller";

const router = Router();
const registerController = new RegisterController();

router.post('/', function(req: Request, res: Response) { promiseResolver(registerController.createMember(req.body), res, 'User') });

export = router;