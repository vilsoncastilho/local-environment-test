import { Request, Response } from 'express';
import { ZodError, z } from 'zod';

import { StateChangesRepository } from '@modules/stateChanges/infra/mssql/repositories/StateChangesRepository';
import { GetAggregateService } from '@modules/stateChanges/services/GetAggregateService';

export class AggregateController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const registerQuerySchema = z.object({
        machine: z.string(),
        start_time: z.string().optional(),
        end_time: z.string().optional(),
      });

      const {
        machine,
        start_time,
        end_time,
      } = registerQuerySchema.parse(req.query);

      const stateChangesRepository = new StateChangesRepository();
      const getAggregate = new GetAggregateService(stateChangesRepository);

      const machineData = await getAggregate.execute({
        machine_name: machine,
        start_time,
        end_time,
      });

      return res.json(machineData);
    } catch (err) {
      if (err instanceof(ZodError)) {
        return res.status(400).json(err.issues);
      } else if (err instanceof(Error)) {
        return res.status(400).json({ message: err.message});
      } else {
        return res.status(500);
      }
    }
  }
}
