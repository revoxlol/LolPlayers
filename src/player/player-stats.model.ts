import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PlayerStats {
  @Field()
  playerName: string;

  @Field(() => Int)
  kills: number;

  @Field(() => Int)
  deaths: number;

  @Field(() => Int)
  assists: number;
}
