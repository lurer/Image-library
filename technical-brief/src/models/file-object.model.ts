import {Entity, model, property} from '@loopback/repository';

@model()
export class FileObject extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  fieldname: string;

  @property({
    type: 'string',
    required: true,
  })
  originalname: string;

  @property({
    type: 'string',
    required: true,
  })
  encoding: string;

  @property({
    type: 'string',
    required: true,
  })
  mimetype: string;

  @property({
    type: 'buffer',
    required: true,
  })
  buffer: Buffer;

  @property({
    type: 'number',
    required: true,
  })
  size: number;

  @property({
    type: 'number',
    id: true,
  })
  id: number;


  constructor(data?: Partial<FileObject>) {
    super(data);
  }
}
