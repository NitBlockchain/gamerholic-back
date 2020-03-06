import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn,
  OneToOne, OneToMany, AfterInsert, AfterUpdate, BaseEntity, JoinColumn
} from "typeorm";

@Entity({ schema: "public" })
export class game extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  challenge: string;

  @Column({ type: 'varchar', nullable: true, default: '0' })
  player1: string;

  @Column({ type: 'varchar', nullable: true, default: '0' })
  player2: string;

  @Column({ type: 'varchar', nullable: true, default: '0' })
  ref: string;

  @Column("json", { nullable: true })
  details: any; // game,amount,rules,txid,referee

  @CreateDateColumn()
  date_created: string;

  @Column("json", { nullable: true })
  results: any; // score, winner

  @Column("json", { nullable: true })
  chat: any; // chat for this game

  @Column({ type: 'int', nullable: true, default: '0' })
  active: number;

  @Column({ type: 'int', nullable: true, default: '0' })
  won: number;

  @Column("json", { nullable: true })
  disputes: any; //

  static async gChallenge(challenge: string) {
    return await this.createQueryBuilder("games")
      .where("games.challenge = :challenge", { challenge: challenge })
      .getOne();
  }

  // static async gGAME(phone: string) {
  //   return await this.createQueryBuilder("user")
  //     .where(`user.profile ::jsonb @> \'{"phone":"${phone}"}\'`)
  //     .getOne();
  // }

  static bCHALLENGES() {
    return this.createQueryBuilder("games")
      .where("games.active = :one", { one: 1 })
      .getMany();
  }
  static bMyGames(user: any) {
    return this.createQueryBuilder("games")
      .orderBy("games.challenge", "DESC")
      .where("games.player1 = :user", { user: user })
      .andWhere("games.active = :one", { one: 1 })
      .orWhere("games.player2  = :user", { user: user })
      .getOne();
  }

}
