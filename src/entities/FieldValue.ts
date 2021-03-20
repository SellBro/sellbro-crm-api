import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import is from 'utils/validations';
import { FieldName } from '.';

@Entity('field_value')
class FieldValue extends BaseEntity {
  static validations = {
    fieldNameId: is.required(),
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  value: string;

  @Column('integer')
  listPosition: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => FieldName, (fieldName) => fieldName.fieldValues)
  fieldName: FieldName;

  @Column('integer')
  fieldNameId: number;

  @Column('integer')
  userId: number;
}

export default FieldValue;
