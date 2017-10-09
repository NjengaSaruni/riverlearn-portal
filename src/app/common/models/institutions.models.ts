import {AbstractBase} from './common.models';
/**
 * Created by saruni on 8/13/17.
 */
export class InstitutionType extends AbstractBase {
  name: string;
  levels: number;
  divisions_name: string;
}
export class Institution extends AbstractBase {
  name: string;
  motto: string;
  phone_number: string;
  email: string;
  website: string;
  logo: string;
  physical_address: string;
  postal_address: string;
  type: InstitutionType;
  domain: string;
}
