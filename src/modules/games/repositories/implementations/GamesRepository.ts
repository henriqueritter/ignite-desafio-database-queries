import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[] | any> { //todo arrumar any
    //return this.repository.createQueryBuilder()
    // Complete usando query builder
    const games = await this.repository.createQueryBuilder('games').where(`games.title like '%${param}%'`).getOneOrFail();
    console.log(games);
    return games;

  }

  async countAllGames(): Promise<[{ count: string }]> {
    // return this.repository.query(); // Complete usando raw query
    return await this.repository.query('SELECT count(*) FROM games;')


  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // return this.repository.createQueryBuilder()
    // Complete usando query builder
    const user1 = new User();
    const user2 = new User();
    const users = [user1, user2]

    return users;
  }
}
