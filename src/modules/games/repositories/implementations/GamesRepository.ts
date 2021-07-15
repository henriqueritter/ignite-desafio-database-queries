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

  async findUsersByGameId(id: string): Promise<User[]> {
    // return this.repository.createQueryBuilder() // Complete usando query builder
    // .createQueryBuilder('games')
    // .where('games.id=:id', { id })
    // .innerJoinAndSelect('games.users', 'users')
<<<<<<< HEAD
    // .getMany()
=======
    // .getOneOrFail()
>>>>>>> a44736201dac9d0c479866bf30adcc42e7dd62fb
    const users = await this.repository
      .createQueryBuilder()
      .relation(Game, 'users')
      .of(id)
      .loadMany()

    return users;

  }
}
