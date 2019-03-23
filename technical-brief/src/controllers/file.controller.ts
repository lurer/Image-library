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

import {FileObjectRepository} from '../repositories';
import { FileObject } from '../models/file-object.model';
import { FileBody } from '../models/types';

export class FileController {
  constructor(
    @repository(FileObjectRepository)
    public fileObjectRepository : FileObjectRepository,
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
  ) : Promise<FileObject> {
    //Setting fieldname to original name. For some reason original name is undefined in React, 
    //even though it is displayed in the console correctly.
    body.files[0].fieldname = body.files[0].originalname; 
    return await this.fileObjectRepository.create(body.files[0]);
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
    @param.query.object('where', getWhereSchemaFor(FileObject)) where?: Where,
  ): Promise<Count> {
    return await this.fileObjectRepository.count(where);
  }

  @get('/files', {
    responses: {
      '200': {
        description: 'Array of FileObject model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': FileObject}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(FileObject)) filter?: Filter,
  ): Promise<FileObject[]> {
    return await this.fileObjectRepository.find(filter);
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
    @requestBody() fileObject: FileObject,
    @param.query.object('where', getWhereSchemaFor(FileObject)) where?: Where,
  ): Promise<Count> {
    return await this.fileObjectRepository.updateAll(fileObject, where);
  }

  @get('/files/{id}', {
    responses: {
      '200': {
        description: 'FileObject model instance',
        content: {'application/json': {schema: {'x-ts-type': FileObject}}},
      },
    },
  })
  async findById(@param.path.number('id') id: string): Promise<FileObject> {
    return await this.fileObjectRepository.findById(id);
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
    @requestBody() fileObject: FileObject,
  ): Promise<void> {
    await this.fileObjectRepository.updateById(id, fileObject);
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
    @requestBody() fileObject: FileObject,
  ): Promise<void> {
    await this.fileObjectRepository.replaceById(id, fileObject);
  }

  @del('/files/{id}', {
    responses: {
      '204': {
        description: 'FileObject DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.fileObjectRepository.deleteById(id);
  }
}
