import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { FileObject } from '../models/file-object.model';

export class FileObjectRepository extends DefaultCrudRepository<
  FileObject,
  typeof FileObject.prototype._id
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(FileObject, dataSource);
  }
}
