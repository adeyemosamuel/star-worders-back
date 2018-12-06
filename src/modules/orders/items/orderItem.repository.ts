import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OrderItem } from './orderItem.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends BaseRepository<OrderItem> { }