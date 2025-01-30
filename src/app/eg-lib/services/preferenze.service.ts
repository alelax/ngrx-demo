import {Injectable} from '@angular/core';
import {Preferenza} from 'eg-lib/models';
import {PreferenzeRequest} from 'eg-lib/models';
import {BaseService} from 'eg-lib/core';

//@Injectable()
@Injectable({providedIn: 'root'})
export class PreferenzeService extends BaseService<Preferenza, PreferenzeRequest> {
  constructor() {
    super();
    this._url = 'https://webapitest.easygold.pro/api/vi1/crm/preferenze';
    this._key = 'CrmID';
  }
}
