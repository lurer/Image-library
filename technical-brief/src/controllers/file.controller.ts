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

export class FileController {
  constructor(
    @repository(FileObjectRepository)
    public fileObjectRepository : FileObjectRepository,
  ) {}


  @post('/files', {
    responses: {
      '200': {
        description: 'FileObject model instance',
        content: {'application/json': {schema: {'x-ts-type': FileObject}}},
      },
    },
  })
  async create(@requestBody() fileObject: FileObject): Promise<FileObject> {
    return await this.fileObjectRepository.create(fileObject);
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
  async findById(@param.path.number('id') id: number): Promise<FileObject> {
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
    @param.path.number('id') id: number,
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
    @param.path.number('id') id: number,
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
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.fileObjectRepository.deleteById(id);
  }
}
