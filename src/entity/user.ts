import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn,
  OneToOne, OneToMany, AfterInsert, AfterUpdate, BaseEntity, JoinColumn
} from "typeorm";

@Entity({ schema: "public" })
export class user extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  user: string;

  @Column("json", { nullable: true })
  profile: any; // name, avatar, last login, first name, last name, address, city, state, zip, adult, login code, banned,wins,losses

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column("json", { nullable: true })
  tokens: any; // type, brand, pin

  @Column({ type: 'varchar', length: 1000, nullable: true, default: '' })
  password: string;

  @Column("varchar", { nullable: false, default: '' })
  device_id: string;

  @Column("json", { nullable: true })
  devices: any; // type, brand, pin

  @Column("json", { nullable: true })
  wallet: any; // [owo] [bitcoin]

  @Column({ type: 'int', nullable: true, default: '0' })/// 0 user is not logged in 1 user is logged in
  active: number;

  @Column({ type: 'int', nullable: true, default: '0' })/// 0 user is not logged in 1 user is logged in
  admin: number;

  @Column("json", { nullable: true })
  gamesPlayed: any; // games  this user played

  @Column("json", { nullable: true })
  activeGame: any; // active  challenge

  @Column({ type: 'double precision', nullable: true, default: '0' })
  lat: any;

  @Column({ type: 'double precision', nullable: true, default: '0' })
  lng: any;

  @Column("geometry")
  geo: string | Object;


  static async auth(token: string, user_id: string) {
    return await this.createQueryBuilder("user")
      .where("token = :token", { token: token })
      .andWhere("user_id = :user_id", { user_id: user_id })
      .getOne();
  }

  static async gID(user: string) {
    return await this.createQueryBuilder("user")
      .where("user.user = :user", { user: user })
      .getOne();
  }

  static async gDevice(device: string) {
    return await this.createQueryBuilder("user")
      .where("device_id = :device_id", { device_id: device })
      .getOne();
  }


  static async gEMAIL(email: string) {
    return await this.createQueryBuilder("user")
      .where(`user.profile ::jsonb @> \'{"email":"${email}"}\'`)
      .getOne();
  }
  static async gPHONE(phone: string) {
    return await this.createQueryBuilder("user")
      .where(`user.profile ::jsonb @> \'{"phone":"${phone}"}\'`)
      .getOne();
  }

  static async gNAME(name: string) {
    return await this.createQueryBuilder("user")
      .where(`user.profile ::jsonb @> \'{"name":"${name}"}\'`)
      .getOne();
  }





}
