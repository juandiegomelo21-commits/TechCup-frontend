import apiClient from './axiosInstance';

export interface TeamResponse {
  id: string;
  teamName: string;
  shieldUrl: string;
  uniformColors: string[];
  captainName: string;
  captainId: string;
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

export interface CreateTeamRequest {
  teamName: string;
  shieldUrl: string;
  uniformColors: string[];
  captainId: string;
  playerIds: string[];
}

export const createTeamApi = async (data: CreateTeamRequest): Promise<TeamResponse> => {
  const response = await apiClient.post<TeamResponse>('/api/teams', data);
  return response.data;
};

export const invitePlayerApi = async (teamId: string, playerId: string): Promise<void> => {
  await apiClient.post(`/api/teams/${teamId}/players/${playerId}`);
};
