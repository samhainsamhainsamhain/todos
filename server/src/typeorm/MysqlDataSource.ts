import { DataSource } from 'typeorm';
import entities from './Entities';

const MysqlDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'admin',
  password: 'admin',
  database: 'todonet_mysql',
  entities,
});

MysqlDataSource.initialize();

export default MysqlDataSource;
