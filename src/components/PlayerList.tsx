import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLAYER_MATCHES } from './queries';

export const PlayerList: React.FC = () => {
  const [summonerName, setSummonerName] = useState('');
  const [region, setRegion] = useState('na1'); // Default region
  console.log('Selected Region:', region);

  const { loading, error, data } = useQuery(GET_PLAYER_MATCHES, {
    variables: { summonerName, region },
    skip: !summonerName,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Search for a Summoner</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter summoner name"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="na1">NA</option>
        <option value="euw1">EUW</option>
        <option value="eun1">EUNE</option>
        <option value="kr">Korea</option>
        <option value="jp1">Japan</option>
        <option value="br1">Brazil</option>
        <option value="la1">LAN (Latin America North)</option>
        <option value="la2">LAS (Latin America South)</option>
        <option value="oc1">Oceania</option>
        <option value="ru">Russia</option>
        <option value="tr1">Turkey</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.getPlayerMatches.map((match: any) => (
            <li key={match.matchId}>Match ID: {match.matchId}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
