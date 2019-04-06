import {model, property, Model} from '@loopback/repository';
import { FilePersisted } from './file-persisted.model';

@model()
export class FileView extends Model {
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
    type: 'string',
    required: true,
  })
  data: string;

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


  constructor(data?: Partial<FileView>) {
    super(data);
  }

  public static convertToView(f: FilePersisted) : FileView {
    const viewModel : Partial<FileView> = {
      _id: f._id,
      created: f.created,
      encoding: f.encoding,
      fieldname: f.fieldname,
      mimetype: f.mimetype,
      originalname: f.originalname,
      size: f.size,
      data: Buffer.from(f.buffer).toString("base64")
    }
    return viewModel as FileView
  }
}
