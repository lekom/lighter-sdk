export interface StatusResponse {
  status: string;
  version?: string;
  timestamp?: number;
}

export interface InfoResponse {
  transfer_fee_info?: TransferFeeInfo;
  withdrawal_delay?: number;
}

export interface TransferFeeInfo {
  fee_percentage?: string;
  minimum_fee?: string;
  maximum_fee?: string;
}
