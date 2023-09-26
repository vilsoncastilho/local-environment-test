
import { Router } from 'express';

import { StateChangeController } from '@modules/stateChanges/infra/http/controllers/StateChangeController';

export const stateChangeRouter = Router();

const stateChangeController = new StateChangeController();

stateChangeRouter.get('/', stateChangeController.index);
