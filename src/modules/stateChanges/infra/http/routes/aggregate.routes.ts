import { Router } from 'express';

import { AggregateController } from '@modules/stateChanges/infra/http/controllers/AggregateController';

export const aggregateRouter = Router();

const aggregateController = new AggregateController();

aggregateRouter.get('/', aggregateController.index);
