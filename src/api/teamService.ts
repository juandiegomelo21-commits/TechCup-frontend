import apiClient from './axiosInstance';

export interface TeamResponse {
  id: string;
  teamName: string;
  shieldUrl: string;
  uniformColors: string[];
  captainName: string;
  players: string[];
}

export const getTeamsApi = async (): Promise<TeamResponse[]> => {
  const response = await apiClient.get<TeamResponse[]>('/api/teams');
  return response.data;
};

export const getTeamByIdApi = async (id: string): Promise<TeamResponse> => {
  const response = await apiClient.get<TeamResponse>(`/api/teams/${id}`);
  return response.data;
};
