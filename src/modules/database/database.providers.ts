import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'database.sqlite',
        enableWAL: true,
        entities: [__dirname + '../**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
