import apiClient from './axiosInstance';

export interface RefereeRegistrationRequest {
  fullname: string;
  email: string;
  password: string;
  license: string;
  experience: number;
}

export const registerRefereeApi = async (data: RefereeRegistrationRequest): Promise<void> => {
  await apiClient.post('/api/referees/registro', data);
};

export interface AssignedMatch {
  matchId: string;
  localTeamName: string;
  visitorTeamName: string;
  dateTime: string;
  field: string;
}

export interface RefereeResponse {
  id: string;
  fullname: string;
  email: string;
  assignedMatches: AssignedMatch[];
}

export const getRefereeByIdApi = async (id: string): Promise<RefereeResponse> => {
  const response = await apiClient.get<RefereeResponse>(`/api/referees/${id}`);
  return response.data;
};
