import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_MATCH_DETAILS = gql`
  query getMatchDetails($matchId: String!) {
    getMatchDetails(matchId: $matchId)
  }
`;

export const MatchDetails: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { data, loading, error } = useQuery(GET_MATCH_DETAILS, {
    variables: { matchId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Match Details</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
