import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FieldName } from '.';

@Entity()
class FieldValue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  value: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => FieldName, (fieldName) => fieldName.fieldValues)
  fieldName: FieldName;
}

export default FieldValue;
