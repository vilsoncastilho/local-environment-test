import { Router } from 'express';

import { stateChangeRouter } from '@modules/stateChanges/infra/http/routes/stateChange.routes';
import { aggregateRouter } from '@modules/stateChanges/infra/http/routes/aggregate.routes';

export const router = Router();

router.use('/api/state_change', stateChangeRouter);
router.use('/api/aggregate', aggregateRouter);
