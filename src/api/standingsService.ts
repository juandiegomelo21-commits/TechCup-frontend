import apiClient from './axiosInstance';

export interface TeamStanding {
  position: number;
  teamId: string;
  teamName: string;
  shieldUrl: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesDrawn: number;
  matchesLost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalsDifference: number;
  points: number;
}

export interface StandingsResponse {
  tournamentId: string;
  tournamentName: string;
  standings: TeamStanding[];
}

export const getStandingsApi = async (tournamentId: string): Promise<StandingsResponse> => {
  const response = await apiClient.get<StandingsResponse>(`/api/standings/tournament/${tournamentId}`);
  return response.data;
};
