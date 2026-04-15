import apiClient from './axiosInstance';

export interface OrganizerRegistrationRequest {
  fullname: string;
  email: string;
  password: string;
  authToken: string;
}

export const registerOrganizadorApi = async (data: OrganizerRegistrationRequest): Promise<void> => {
  await apiClient.post('/api/auth/registro/organizador', data);
};
