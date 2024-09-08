import { Resolver, Query, Args } from '@nestjs/graphql';
import { PlayerService } from './player.service';
import { Match } from './match.model';  // Import your Match model

@Resolver()
export class PlayerResolver {
  constructor(private playerService: PlayerService) {}

  // Update the return type to an array of Match objects
  @Query(() => [Match])
  async getPlayerMatches(
    @Args('summonerName') summonerName: string,
    @Args('region') region: string,
  ) {
    // Fetch match data from the service and map it to the Match model
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

  // Update the return type to a Match object
  @Query(() => Match)
  async getMatchDetails(
    @Args('matchId') matchId: string,
    @Args('region') region: string,
  ) {
    console.log('Received region in backend:', region);
    // Fetch detailed match data from the service
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
