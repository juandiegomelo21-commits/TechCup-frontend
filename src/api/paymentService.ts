import apiClient from './axiosInstance';

export type PaymentStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

export interface PaymentResponse {
  id: string;
  teamId: string;
  teamName: string;
  receiptUrl: string;
  amount: number;
  currentStatus: PaymentStatus;
}

export const uploadReceiptApi = async (teamId: string, receiptUrl: string): Promise<PaymentResponse> => {
  const response = await apiClient.post<PaymentResponse>('/api/payments/upload', { teamId, receiptUrl });
  return response.data;
};

export const getPaymentByTeamApi = async (teamId: string): Promise<PaymentResponse> => {
  const response = await apiClient.get<PaymentResponse>(`/api/payments/team/${teamId}`);
  return response.data;
};
