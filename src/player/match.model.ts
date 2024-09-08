import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PlayerStats } from './player-stats.model';  // Import PlayerStats model

@ObjectType()
export class Match {
  @Field()
  matchId: string;

  @Field(() => Int)
  gameDuration: number;

  @Field()
  gameMode: string;

  @Field(() => [PlayerStats])
  players: PlayerStats[];
}
