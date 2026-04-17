import apiClient from './axiosInstance';

export interface RegisterPlayerRequest {
  fullname: string;
  email: string;
  password: string;
  numberID: number;
  position: string;
  dorsalNumber: number;
  photoUrl: string | null;
  haveTeam: boolean;
  age: number;
  gender: string;
  captain: boolean;
  playerType: string;
  semester?: number;
  relativeId?: number;
  relationship?: string;
}

export interface PlayerResponse {
  id: string;
  fullname: string;
  email: string;
  position: string;
  dorsalNumber: number;
  photoUrl: string | null;
  haveTeam: boolean;
  disponible: boolean;
  age: number;
  gender: string;
  captain: boolean;
  semester: number;
  relationship: string | null;
}

export const registerPlayerApi = async (data: RegisterPlayerRequest): Promise<void> => {
  await apiClient.post('/api/players/registro', data);
};

export const getPlayersApi = async (): Promise<PlayerResponse[]> => {
  const response = await apiClient.get<PlayerResponse[]>('/api/players');
  return response.data;
};

export const getPlayerByIdApi = async (id: string): Promise<PlayerResponse> => {
  const response = await apiClient.get<PlayerResponse>(`/api/players/${id}`);
  return response.data;
};
