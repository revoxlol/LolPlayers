import { gql } from '@apollo/client';

// Fetch matches for a given player
export const GET_PLAYER_MATCHES = gql`
  query GetPlayerMatches($summonerName: String!, $region: String!) {
    getPlayerMatches(summonerName: $summonerName, region: $region) {
      matchId
      gameDuration
      gameMode
      players {
        playerName
        kills
        deaths
        assists
      }
    }
  }
`;

// Fetch detailed match data
export const GET_MATCH_DETAILS = gql`
  query GetMatchDetails($matchId: String!) {
    getMatchDetails(matchId: $matchId) {
      matchId
      gameDuration
      gameMode
      players {
        playerName
        kills
        deaths
        assists
      }
    }
  }
`;
