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
  ) : Promise<FileView> {
    //Setting fieldname to original name. For some reason original name is undefined in React, 
    //even though it is displayed in the console correctly.
    body.files[0].fieldname = body.files[0].originalname; 
    body.files[0].created = new Date();
    const result = await this.filePersistedRepository.create(body.files[0]);
    return FileView.convertToView(result)
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
      viewList.push(FileView.convertToView(f))
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





  @get('/files/ids', {
    responses: {
      '200': {
        description: 'File id list',
        content: {'application/json': {schema: {type: "string"}}},
      },
    },
  })
  async getIds(@param.query.object('where', getWhereSchemaFor(FileView)) where?: Where,)
  : Promise<Array<string>> {
    const result = await this.filePersistedRepository.find();
    //console.log(result)
    return result.map(file => file._id);
  }





  @get('/files/{id}', {
    responses: {
      '200': {
        description: 'FileObject model instance',
        content: {'application/json': {schema: {'x-ts-type': FilePersisted}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Partial<FileView>> {
    return FileView.convertToView(await this.filePersistedRepository.findById(id));
  }




  @patch('/files/{id}', {
    responses: {
      '204': {
        description: 'FileObject PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() fileObject: FileView,
  ): Promise<void> {
    const persistedFile = await this.filePersistedRepository.findById(id);
    persistedFile.fieldname = fileObject.fieldname;
    persistedFile.originalname = fileObject.originalname;
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
    @param.path.string('id') id: string,
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
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.filePersistedRepository.deleteById(id);
  }
}
