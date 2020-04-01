import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn,
  OneToOne, OneToMany, AfterInsert, AfterUpdate, BaseEntity, JoinColumn
} from "typeorm";

@Entity({ schema: "public" })
export class referee extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  refid: string;

  @Column({ type: 'varchar', length: 200 })
  user: string;

  @Column("json", { nullable: true })
  profile: any; // name, avatar,disputecount

  @Column({ type: 'int', nullable: true, default: '0' })/// 0 user is not logged in 1 user is logged in
  active: number;

  @Column({ type: 'int', nullable: true, default: '0' })/// 0 user is not logged in 1 user is logged in
  online: number;

  @Column("json", { nullable: true })
  games: any; // games  this user referred

  static async gREF(user: string) {
    return await this.createQueryBuilder("user")
      .where("user.user = :user", { user: user })
      .getOne();
  }

  static async bREFS() {
    return await this.createQueryBuilder("user")
      .where("user.online = :one", { one: 1 })
      .getMany();
  }

  static async gGAME(game: string) {
    return await this.createQueryBuilder("user")
      .where(`user.games ::jsonb @> \'{"game":"${game}"}\'`)
      .getOne();
  }





}
