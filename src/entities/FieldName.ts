import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FieldNameType } from 'utils/constants';
import { TableName, FieldValue } from '.';

@Entity()
class FieldName extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  type: FieldNameType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => TableName, (tableName) => tableName.fieldNames)
  tableName: number;

  @OneToMany(() => FieldValue, (fieldValue) => fieldValue.fieldName)
  fieldValues: FieldValue[];
}

export default FieldName;
