import {Entity, model, property} from '@loopback/repository';

@model()
export class FilePersisted extends Entity {
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
    type: 'date',
    required: true,
  })
  created: Date;

  @property({
    type: 'string',
    id: true,
  })
  _id: string;


  constructor(data?: Partial<FilePersisted>) {
    super(data);
  }
}
