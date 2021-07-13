import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    //return this.repository.createQueryBuilder()
    // Complete usando query builder
    return await this.repository
      .createQueryBuilder('games')
      .where('lower(games.title) like :title ', { title: `%${param.toLowerCase()}%` })
      .getMany();

  }

  async countAllGames(): Promise<[{ count: string }]> {
    // return this.repository.query(); // Complete usando raw query
    return await this.repository.query('SELECT count(*) FROM games;');
  }

  async findUsersByGameId(id: string): Promise<User[] | any> {
    // return this.repository.createQueryBuilder()
    // Complete usando query builder
    const users = await this.repository.createQueryBuilder('games').


      select('users').leftJoinAndSelect("games.users", "users").getMany();
    console.log(users);
    return users;

  }
}
