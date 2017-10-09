import DateTimeFormat = Intl.DateTimeFormat;
import {AbstractBareBase, AbstractBase} from './common.models';
import {Institution} from './institutions.models';
/**
 * Created by saruni on 4/9/17.
 */

export class Permission {
  id: number;
  codename: string;
}

export class Group {
  id: number;
  name: string;
}

export class Image extends  AbstractBase{
  caption: string
  url: string
  description: string;
}

export class AccountType extends AbstractBase {
  name: string;
  notes: string;
}

export class Profile extends AbstractBase {
  name: string;
}

export class User extends AbstractBareBase {
  password: string;
  last_login: DateTimeFormat;
  is_superuser: boolean;
  username: string;
  date_of_birth: Date;
  email: string;
  employee_number: number;
  first_name: string;
  middle_name: string;
  nickname: string;
  last_name: string;
  full_name: string;
  mobile: string;
  id_number: string;
  groups: Group[];
  user_permissions: Permission[];
  profile: Profile;
  institution: Institution;
  account_type: AccountType;
  gender: string;
  is_admin: boolean;
  domain: string;
}

export class JoinRequest extends AbstractBase {
  institution: Institution;
  notes: string;
  approved: boolean;
  approved_by: User;
}

export class Token extends AbstractBase {
  token: Token;
}
