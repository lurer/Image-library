import {DefaultCrudRepository} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { FileObject } from '../models/file-object.model';

export class FileObjectRepository extends DefaultCrudRepository<
  FileObject,
  typeof FileObject.prototype.id
> {
  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource,
  ) {
    super(FileObject, dataSource);
  }
}
