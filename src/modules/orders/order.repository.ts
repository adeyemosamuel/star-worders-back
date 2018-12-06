import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends BaseRepository<Order> { }