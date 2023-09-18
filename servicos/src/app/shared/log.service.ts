import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
  constructor() {}

  consoleLog(message: string) {
    console.log(message);
  }
}
