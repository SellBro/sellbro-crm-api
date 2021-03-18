import bcryptjs from 'bcryptjs';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import is from 'utils/validations';

import { TableName } from '.';

@Entity()
class User extends BaseEntity {
  static validations = {
    email: [is.required(), is.email()],
    password: [is.required(), is.maxLength(200)],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { default: 'New User' })
  username: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => TableName, (table) => table.user)
  tables: TableName[];

  hashPassword() {
    this.password = bcryptjs.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(input: string) {
    return bcryptjs.compareSync(input, this.password);
  }
}

export default User;
