export interface IGetStatusSumByMachineDTO {
  machine_name: string;
  status: 'operational' | 'non_operational';
  start_time?: Date | string;
  end_time?: Date | string;
}
