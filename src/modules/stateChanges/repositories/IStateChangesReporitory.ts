import { StateChange } from '@modules/stateChanges/infra/mssql/entities/StateChange';

import { IGetStateChangesDTO } from '@modules/stateChanges/dtos/IGetStateChangesDTO';
import { IGetStatusSumByMachineDTO } from '@modules/stateChanges/dtos/IGetStatusSumByMachineDTO';

export interface IStateChangesRepository {
  list({ machine_name, order }: IGetStateChangesDTO): Promise<StateChange[]>;
  getStatusSumByMachine({
    machine_name,
    status,
    start_time,
    end_time,
  }: IGetStatusSumByMachineDTO): Promise<number>;
}
