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

export const registerPlayerApi = async (data: RegisterPlayerRequest): Promise<void> => {
  await apiClient.post('/api/players/registro', data);
};

export interface PlayerSearchResult {
  id: string;
  fullname: string;
  position: string;
  dorsalNumber: number;
  photoUrl: string | null;
  playerType: string;
  semester: number | null;
  age: number;
  gender: string;
  available: boolean;
}

export const searchPlayersApi = async (params: {
  name?: string;
  position?: string;
  semester?: number;
  minAge?: number;
  maxAge?: number;
  gender?: string;
}): Promise<PlayerSearchResult[]> => {
  const response = await apiClient.get<PlayerSearchResult[]>('/api/players/search', { params });
  return response.data;
};

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
  isCaptain: boolean;
  semester: number | null;
  relationship: string | null;
  playerType?: string;
}

export const getPlayerByIdApi = async (id: string): Promise<PlayerResponse> => {
  const response = await apiClient.get<PlayerResponse>(`/api/players/${id}`);
  return response.data;
};
