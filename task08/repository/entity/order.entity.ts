import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import UserEntity from './user.entity';
import CartEntity from './cart.entity';

enum OrderStatus {
  CREATED = 'created',
  COMPLETED = 'completed',
}

@Entity('orders')
export default class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => CartEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @Column()
  paymentType: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  creditCard: string;

  @Column({ nullable: true })
  comments: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @Column()
  total: number;
}
