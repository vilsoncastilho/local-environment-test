import { IStateChangesRepository } from '@modules/stateChanges/repositories/IStateChangesReporitory';

import { paginate } from '@shared/utils/paginate';

interface IRequest {
  machine_name?: string;
  status?: 'operational' | 'non_operational';
  start_time?: Date | string;
  end_time?: Date | string;
  order: 'asc' | 'desc';
  page_size: number;
  page: number;
}

export class GetStateChangesService {
  constructor(private stateChangesRepository: IStateChangesRepository) {}

  public async execute({
    machine_name,
    status,
    start_time,
    end_time,
    order,
    page_size,
    page,
  }: IRequest) {
    const stateChanges = await this.stateChangesRepository.list({
      machine_name,
      order,
    });

    const filteredStateChanges = stateChanges.filter(item =>
      status ? item.status === status : item &&
      start_time ? item.start_time >= start_time : item &&
      end_time ? item.end_time <= end_time : item
    );

    const paginatedData = paginate({
      array: filteredStateChanges,
      page_size,
      page_number: page,
    });

    return paginatedData;
  }
}
