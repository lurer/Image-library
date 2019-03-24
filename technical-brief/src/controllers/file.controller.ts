import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';

import {FilePersistedRepository} from '../repositories';
import { FilePersisted } from '../models/file-persisted.model';
import { FileBody } from '../models/types';
import { FileView } from '../models/file-view.model';

export class FileController {
  constructor(
    @repository(FilePersistedRepository)
    public filePersistedRepository : FilePersistedRepository,
  ) {}

  /**
   * Using the MultipartFormDataBodyParser to parse multipart/form-data 
   * @param body FileBody
   */
  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: '',
      },
    },
  })
  async create(
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        "multipart/form-data": {
          schema: {type: 'object'},
        },
      },
    })
    body: FileBody,
  ) : Promise<FilePersisted> {
    //Setting fieldname to original name. For some reason original name is undefined in React, 
    //even though it is displayed in the console correctly.
    body.files[0].fieldname = body.files[0].originalname; 
    body.files[0].created = new Date();
    return await this.filePersistedRepository.create(body.files[0]);
  }

  
  @get('/files/count', {
    responses: {
      '200': {
        description: 'FileObject model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(FilePersisted)) where?: Where,
  ): Promise<Count> {
    return await this.filePersistedRepository.count(where);
  }

  @get('/files', {
    responses: {
      '200': {
        description: 'Array of FileObject model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': FilePersisted}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(FilePersisted)) filter?: Filter,
  ): Promise<Array<Partial<FileView>>> {
    let files = await this.filePersistedRepository.find(filter);
    let viewList = new Array<Partial<FileView>>();
    files.forEach((f) => {
      viewList.push({
        _id: f._id,
        created: f.created,
        encoding: f.encoding,
        fieldname: f.fieldname,
        mimetype: f.mimetype,
        originalname: f.originalname,
        size: f.size,
        data: Buffer.from(f.buffer).toString("base64")
      })
    })
    return viewList;
  }

  @patch('/files', {
    responses: {
      '200': {
        description: 'FileObject PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() fileObject: FilePersisted,
    @param.query.object('where', getWhereSchemaFor(FilePersisted)) where?: Where,
  ): Promise<Count> {
    return await this.filePersistedRepository.updateAll(fileObject, where);
  }

  @get('/files/{id}', {
    responses: {
      '200': {
        description: 'FileObject model instance',
        content: {'application/json': {schema: {'x-ts-type': FilePersisted}}},
      },
    },
  })
  async findById(@param.path.number('id') id: string): Promise<FilePersisted> {
    return await this.filePersistedRepository.findById(id);
  }

  @patch('/files/{id}', {
    responses: {
      '204': {
        description: 'FileObject PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody() fileObject: FilePersisted,
  ): Promise<void> {
    await this.filePersistedRepository.updateById(id, fileObject);
  }

  @put('/files/{id}', {
    responses: {
      '204': {
        description: 'FileObject PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() fileObject: FilePersisted,
  ): Promise<void> {
    await this.filePersistedRepository.replaceById(id, fileObject);
  }

  @del('/files/{id}', {
    responses: {
      '204': {
        description: 'FileObject DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.filePersistedRepository.deleteById(id);
  }
}
