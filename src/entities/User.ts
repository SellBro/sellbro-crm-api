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

  @Column('varchar')
  username: string;

  // TODO: add email validation
  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => TableName, (table) => table.user)
  tables: TableName[];
}

export default User;
