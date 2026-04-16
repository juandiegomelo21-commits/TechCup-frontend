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
