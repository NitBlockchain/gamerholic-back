import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn,
  OneToOne, OneToMany, AfterInsert, AfterUpdate, BaseEntity, JoinColumn
} from "typeorm";

@Entity({ schema: "public" })
export class tournaments extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  tournament: string;

  @Column({ type: 'varchar', nullable: true, default: '0' })
  user: string;

  @Column("json", { nullable: true })
  details: any; // game,prize,min-players,winstreak

  @Column("json", { nullable: true })
  players: any; // name,avatar,win streak

  @Column("json", { nullable: true })
  games: any; // player1,player2,challenge_id,winner

  @CreateDateColumn()
  date_created: string;

  @Column({ type: 'int', nullable: true, default: '0' })
  active: number;

  @Column("json", { nullable: true })
  winner: any; // name,avatar,win streak

  @Column("json", { nullable: true })
  disputes: any; //

  static async gTournament(game: string) {
    return await this.createQueryBuilder("game")
      .where("game = :game", { game: game })
      .getOne();
  }

  static bTOURNAMENTS() {
    return this.createQueryBuilder("games")
      .where("games.active = :one", { one: 1 })
      .getMany();
  }
  static bMyWins(user: any) {
    return this.createQueryBuilder("games")
      .where("games.player1 = :user", { user: user })
      .orWhere("games.player2  = :user", { user: user })
      .getMany();
  }

}
