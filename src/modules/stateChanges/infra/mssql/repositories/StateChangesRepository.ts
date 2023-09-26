import sql from 'mssql';

import { StateChange } from '@modules/stateChanges/infra/mssql/entities/StateChange';
import { IStateChangesRepository } from "@modules/stateChanges/repositories/IStateChangesReporitory";

import { IGetStateChangesDTO } from '@modules/stateChanges/dtos/IGetStateChangesDTO';
import { IGetStatusSumByMachineDTO } from '@modules/stateChanges/dtos/IGetStatusSumByMachineDTO';

export class StateChangesRepository implements IStateChangesRepository {
  public async list({
    machine_name,
    order,
  }: IGetStateChangesDTO): Promise<StateChange[]> {
    const baseQuery = `SELECT * FROM future_plastics_state_change`;

    const filterByMachine = machine_name
      ? ` WHERE machine_name = '${machine_name}'`
      : '';

    const filterByOrder = order
      ? ` ORDER BY start_time ${order}`
      : '';

    const finalQuery = baseQuery.concat(filterByMachine);

    console.log('[StateChangesRepository] (list) query: ', finalQuery)

    const stateChanges = await sql.query(finalQuery)
      .then((res: sql.IResult<StateChange[]>) => res.recordset)

    return stateChanges;
  }

  public async getStatusSumByMachine({
    machine_name,
    status,
    start_time,
    end_time,
  }: IGetStatusSumByMachineDTO): Promise<number> {
    const baseQuery = `
      SELECT SUM(duration) AS status_sum
      FROM future_plastics_state_change
      WHERE machine_name = '${machine_name}'
      AND status = '${status}'
    `;

    const filterByStartQuery = start_time
      ? ` AND start_time >= '${start_time}'`
      : '';

    const filterByEndQuery = end_time
      ? ` AND end_time <= '${end_time}'`
      : '';

    const finalQuery = baseQuery.concat(filterByStartQuery, filterByEndQuery);

    console.log('[StateChangesRepository] (getStatusSumByMachine) query: ', baseQuery)

    const statusSum = await sql.query(baseQuery)
      .then((res) => res.recordset[0].status_sum/3600)
      .catch(() => {
        throw new Error('The start_time/end_time parameter is invalid.');
      });

    return statusSum;
  }
}
