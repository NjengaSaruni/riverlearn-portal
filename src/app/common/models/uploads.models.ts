import {AbstractBase} from './common.models';
/**
 * Created by saruni on 8/20/17.
 */

export class File extends AbstractBase {
  title: string;
  url: any;
  description: string
}

export class Image extends AbstractBase {
  caption: string;
  url: any;
  description: string
}
