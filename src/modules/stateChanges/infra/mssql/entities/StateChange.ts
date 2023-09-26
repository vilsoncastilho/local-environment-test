export type StateChange = {
  state_change_id: number;
  machine_name: string;
  start_time: Date;
  end_time: Date;
  status: string;
  reason_code: string;
  duration: number;
}
