import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileBackendService } from '../shared/file-backend';

@Component({
  selector: 'app-doc-workspace',
  templateUrl: './doc-workspace.component.html',
  styleUrls: ['./doc-workspace.component.scss']
})
export class DocWorkspaceComponent implements OnInit {
  docsList:any[]=[];
  trashList:any[]=[];
  @Input() searchText :any;
  @Output() messageEvent = new EventEmitter<string>();
  emptyList:boolean = false;
  constructor(private fileBackendService: FileBackendService,
    private toast:ToastrService) { 
   
    }

  ngOnInit(): void {
    this.docsList = JSON.parse(sessionStorage.getItem("uploadedFiles")!);
    if(this.docsList == null || this.docsList.length == 0){
      this.emptyList = true;
    }

    console.log(this.docsList);
  }
  openUpload(){
    this.messageEvent.emit('2');
  }
  deleteDoc(i:any){
    let item = this.docsList[i];
    this.trashList.push(item);
    this.docsList.splice(i,1);
    sessionStorage.setItem("uploadedFiles",JSON.stringify(this.docsList));
    sessionStorage.setItem("trashList",JSON.stringify(this.trashList));
    this.toast.success("Document moved to Trash","Deleted");
    this.docsList = JSON.parse(sessionStorage.getItem("uploadedFiles")!);
    if(this.docsList == null || this.docsList.length == 0){
      this.emptyList = true;
    }
  }
}
