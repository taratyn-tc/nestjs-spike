import { Greeted } from './greeted.entity';
import { DataSource } from 'typeorm';

export const greetedProviders = [
  {
    provide: 'GREETED_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Greeted),
    inject: ['DATA_SOURCE'],
  },
];
