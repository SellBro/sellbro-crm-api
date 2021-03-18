import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import is from 'utils/validations';

import { FieldName, User } from '.';

@Entity()
class TableName extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    userId: is.required(),
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tables)
  user: User;

  @Column('integer')
  userId: number;

  @OneToMany(() => FieldName, (fieldName) => fieldName.tableName)
  fieldNames: FieldName[];
}

export default TableName;
