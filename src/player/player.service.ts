import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PlayerService {
  private riotApiKey: string;

  constructor(private configService: ConfigService) {
    this.riotApiKey = this.configService.get<string>('RIOT_API_KEY');
  }

  async getPlayerMatches(summonerName: string, region: string) {
    const summonerData = await this.getSummonerData(summonerName, region);
    const matchData = await this.getMatchList(summonerData.puuid, region);
    return matchData;
  }

  private async getSummonerData(summonerName: string, region: string) {
    const platformRouting = this.getPlatformRouting(region);
    const url = `https://${platformRouting}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${this.riotApiKey}`;
    
    console.log('API URL (Summoner Data):', url);
    
    try {
      const response = await axios.get(url);
      console.log('API Response (Summoner Data):', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error (Summoner Data):', error.response ? error.response.data : error.message);
      throw error;
    }
  }
  
  private async getMatchList(puuid: string, region: string) {
    const matchRegion = this.getMatchRegion(region); // Use match region for Match V5 API
    const url = `https://${matchRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${this.riotApiKey}`;
    console.log('API URL (Match List):', url);
  
    try {
      const response = await axios.get(url);
      console.log('API Response (Match List):', response.data);
      const matchIds = response.data.slice(0, 10);
      const matchDetails = await Promise.all(
        matchIds.map(async (matchId) => this.getMatchDetails(matchId, matchRegion)) // Pass matchRegion here
      );
      return matchDetails;
    } catch (error) {
      console.error('API Error (Match List):', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  public async getMatchDetails(matchId: string, region: string) {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.riotApiKey}`;
    console.log('API URL (Match Details):', url);
    
    try {
      const response = await axios.get(url);
      console.log('API Response (Match Details):', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error (Match Details):', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  private getPlatformRouting(region: string): string {
    const platformMap: { [key: string]: string } = {
      na1: 'na1',
      euw1: 'euw1',
      eun1: 'eun1',
      kr: 'kr',
      jp1: 'jp1',
      br1: 'br1',
      la1: 'la1',
      la2: 'la2',
      oc1: 'oc1',
      tr1: 'tr1',
      ru: 'ru',
    };
    return platformMap[region] || 'na1';
  }

  private getMatchRegion(region: string): string {
    const regionMap: { [key: string]: string } = {
      na1: 'americas',
      br1: 'americas',
      la1: 'americas',
      la2: 'americas',
      oc1: 'americas',
      euw1: 'europe',
      eun1: 'europe',
      tr1: 'europe',
      ru: 'europe',
      kr: 'asia',
      jp1: 'asia',
    };
    return regionMap[region] || 'americas';
  }
}
