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

  @Column({ type: 'int', nullable: true, default: '0' })/// global,tournament,DM
  type: number;


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
