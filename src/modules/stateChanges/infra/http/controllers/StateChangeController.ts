import { Request, Response } from 'express';
import { ZodError, z } from 'zod';

import { StateChangesRepository } from '@modules/stateChanges/infra/mssql/repositories/StateChangesRepository'
import { GetStateChangesService } from '@modules/stateChanges/services/GetStateChangesService';

export class StateChangeController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const registerQuerySchema = z.object({
        machine: z.string().optional(),
        status: z.enum(['operational', 'non_operational']).optional(),
        start_time: z.string().transform(Date).optional(),
        end_time: z.string().transform(Date).optional(),
        order: z.enum(['asc', 'desc']).optional(),
        page_size: z.string().optional(),
        page: z.string().optional(),
      });

      const {
        machine,
        status,
        start_time,
        end_time,
        order,
        page_size,
        page,
      } = registerQuerySchema.parse(req.query);

      const stateChangesRepository = new StateChangesRepository();
      const getStateChanges = new GetStateChangesService(stateChangesRepository);

      const machineData = await getStateChanges.execute({
        machine_name: machine,
        status,
        start_time,
        end_time,
        order: order ? order : 'asc',
        page_size: page_size ? Number(page_size) : 10,
        page: page ? Number(page) : 1,
      });

      return res.status(200).json(machineData);
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
