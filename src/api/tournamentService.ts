import apiClient from './axiosInstance';

export interface TournamentResponse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  registrationFee: number;
  maxTeams: number;
  rules: string;
  currentState: string;
}

export interface CreateTournamentRequest {
  name: string;
  startDate: string;
  endDate: string;
  registrationFee: number;
  maxTeams: number;
  rules: string;
}

export const getTournamentsApi = async (): Promise<TournamentResponse[]> => {
  const response = await apiClient.get<TournamentResponse[]>('/api/tournaments');
  return response.data;
};

export const getTournamentByIdApi = async (id: string): Promise<TournamentResponse> => {
  const response = await apiClient.get<TournamentResponse>(`/api/tournaments/${id}`);
  return response.data;
};

export const createTournamentApi = async (data: CreateTournamentRequest): Promise<TournamentResponse> => {
  const response = await apiClient.post<TournamentResponse>('/api/tournaments', data);
  return response.data;
};
