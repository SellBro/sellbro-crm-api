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
import is from 'utils/validations';
import { TableName, FieldValue } from '.';

@Entity('field_name')
class FieldName extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    type: [is.required(), is.oneOf(Object.values(FieldNameType))],
    tableNameId: is.required(),
  };

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

  @Column('integer')
  tableNameId: number;

  @OneToMany(() => FieldValue, (fieldValue) => fieldValue.fieldName)
  fieldValues: FieldValue[];
}

export default FieldName;
