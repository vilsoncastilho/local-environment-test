import { IStateChangesRepository } from '@modules/stateChanges/repositories/IStateChangesReporitory';

interface IRequest {
  machine_name: string;
  start_time?: Date | string;
  end_time?: Date | string;
}

export class GetAggregateService {
  constructor(private stateChangesRepository: IStateChangesRepository) {}

  public async execute({
    machine_name,
    start_time,
    end_time
  }: IRequest) {
    const operationalSum = await this.stateChangesRepository.getStatusSumByMachine({
      machine_name,
      status: 'operational',
      start_time,
      end_time,
    });

    const nonOperationalSum = await this.stateChangesRepository.getStatusSumByMachine({
      machine_name,
      status: 'non_operational',
      start_time,
      end_time,
    });

    const unformatedUtilization = operationalSum / (operationalSum + nonOperationalSum);

    const utilization = Number((unformatedUtilization * 100).toFixed(2));

    const utilizationData = {
      machine: machine_name,
      utilization,
    };

    return utilizationData;
  }
}
