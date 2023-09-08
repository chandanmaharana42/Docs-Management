 
 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';
import { User } from './user';
 
 @Injectable({
   providedIn: 'root'
 })
 export class FileBackendService {
    messageFromWorkspace:number = 1;
   constructor() { }

  getUploadedFiles() {
    return JSON.parse(sessionStorage.getItem("uploadedFiles")!);
  }
}