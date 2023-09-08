
import {
  Resolve,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileBackendService } from './file-backend';
@Injectable()
export class RouteResolver implements Resolve<Observable<any>> {
  constructor(private fileService: FileBackendService) {}

  resolve(): Observable<any> {
    return this.fileService.getUploadedFiles();
  }
}
