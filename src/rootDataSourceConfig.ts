import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  enableWAL: true,

  // path.join causes problems with generation?
  entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceOptions);

export const RootDataSourceConfig: TypeOrmModuleOptions = {
  ...dataSourceOptions,
};
