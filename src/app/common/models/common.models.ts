/**
 * Created by saruni on 8/13/17.
 */

import DateTimeFormat = Intl.DateTimeFormat;
import {User} from './users.models';

export abstract class AbstractBareBase {
  id: string;
  active: Boolean;
  deleted: Boolean;
  created_at: Date;
  updated_at: Date;
}
export abstract class AbstractBase extends AbstractBareBase{
  created_by: User;
}

export class Subject extends AbstractBase {
  name: string;
  description: string;
}

export class _Comment extends AbstractBase {
  title: string;
  content: string;
}

export class Color {
  id: number;
  name: string;
  hex: string;
}
