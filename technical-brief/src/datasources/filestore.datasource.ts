import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './filestore.datasource.json';

export class FilestoreDataSource extends juggler.DataSource {
  static dataSourceName = 'filestore';

  constructor(
    @inject('datasources.config.filestore', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
