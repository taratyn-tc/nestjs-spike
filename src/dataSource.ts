import { DataSource } from 'typeorm';
import { dataSourceOptions } from './dataSourceConfig';

// you probably don't want this, you want `dataSourceConfig`.
// This is mainly used by the TypeORM migrations tool.
export const dataSource = new DataSource(dataSourceOptions);
