import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { FilePersisted } from '../models/file-persisted.model';

export class FilePersistedRepository extends DefaultCrudRepository<
  FilePersisted,
  typeof FilePersisted.prototype._id
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(FilePersisted, dataSource);
  }
}
