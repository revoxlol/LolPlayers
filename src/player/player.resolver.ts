import { Resolver, Query, Args } from '@nestjs/graphql';
import { PlayerService } from './player.service';
import { Match } from './match.model';  //

@Resolver()
export class PlayerResolver {
  constructor(private playerService: PlayerService) {}

  
  @Query(() => [Match])
  async getPlayerMatches(
    @Args('summonerName') summonerName: string,
    @Args('region') region: string,
  ) {
   
    const matches = await this.playerService.getPlayerMatches(summonerName, region);

    return matches.map(match => ({
      matchId: match.gameId,
      gameDuration: match.gameDuration,
      gameMode: match.gameMode,
      players: match.participants.map(player => ({
        playerName: player.summonerName,
        kills: player.stats.kills,
        deaths: player.stats.deaths,
        assists: player.stats.assists,
      })),
    }));
  }

  
  @Query(() => Match)
  async getMatchDetails(
    @Args('matchId') matchId: string,
    @Args('region') region: string,
  ) {
    console.log('Received region in backend:', region);
    
    const match = await this.playerService.getMatchDetails(matchId, region);

    return {
      matchId: match.gameId,
      gameDuration: match.gameDuration,
      gameMode: match.gameMode,
      players: match.participants.map(player => ({
        playerName: player.summonerName,
        kills: player.stats.kills,
        deaths: player.stats.deaths,
        assists: player.stats.assists,
      })),
    };
  }
}
