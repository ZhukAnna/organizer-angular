import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {
    Parse.initialize('YOUR_APP_ID', '', 'YOUR_MASTER_KEY');
    (Parse as any).serverURL = 'https://parse.server-url.ru/parse';
    (Parse as any).liveQueryServerURL = 'wss://parse.server-url.ru/live/';
  }

  getClassExtend(className: string) {
    return Parse.Object.extend(className);
  }

  query(cl: any) {
    return new Parse.Query(cl);
  }
}
