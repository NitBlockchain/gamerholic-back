import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn,
  OneToOne, OneToMany, AfterInsert, AfterUpdate, BaseEntity, JoinColumn
} from "typeorm";

@Entity({ schema: "public" })
export class chat extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  chat: string;

  @Column({ type: 'varchar', nullable: true, default: '0' })
  identifier: string;

  @Column("json", { nullable: true })
  messages: any; // game,amount,rules,txid,referee

  @CreateDateColumn()
  date_created: string;

  @Column("json", { nullable: true })
  users: any;

  @Column({ type: 'int', nullable: true, default: '0' })/// global,tournament,DM
  type: number;

  // static gCHATS(user1: any, user2: any) {
  //   return this.createQueryBuilder("chat")
  //     .where("chat.identifier = :identifier", { identifier: identifier })
  //     .andWhere("chat.user2 = :user2", { user2: user2 })
  //     .orWhere("chat.user1  = :user2", { user2: user2 })
  //     .andWhere("chat.user2 = :user1", { user1: user1 })
  //     .getOne();
  // }
  static gCHATS(identifier: any) {
    return this.createQueryBuilder("chat")
      .where("chat.identifier = :identifier", { identifier: identifier })
      .getOne();
  }
  static async gMyChats(user: string) {
    return await this.createQueryBuilder("game")
      .where("identifier = :identifier", { identifier: user })
      .getOne();
  }

  static async gGlobal() {
    return await this.createQueryBuilder("game")
      .where("type = :type", { type: 1 })
      .getOne();
  }
  static bTournamentChat(id: string) {
    return this.createQueryBuilder("games")
      .where("identifier = :identifier", { identifier: id })
      .getOne();
  }
  static bGlobalChat(id: any) {
    return this.createQueryBuilder("games")
      .where("identifier = :identifier", { identifier: id })
      .getOne();
  }

}
