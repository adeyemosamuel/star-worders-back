import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import * as cors from 'cors';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    initializeTransactionalContext();
    app.use(cors());
    await app.listen(5000);
}

bootstrap();