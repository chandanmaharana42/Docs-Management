import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashList:any[]=[];
  currentDoc:any;
  curIndex:any;
  emptyList:boolean = false;
  deletePopup:boolean = false;
  deleteAll:boolean = false;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.trashList = JSON.parse(sessionStorage.getItem("trashList")!);
    if(this.trashList == null || this.trashList.length == 0){
      this.emptyList = true;
    }
  }
  openWorkSpace(){
    this.messageEvent.emit('1');
  }
  openPopup(i:any){
    this.curIndex= i;
    this.currentDoc = this.trashList[i];
    this.deletePopup = true;
  }
  openPopupforAll(){
    this.deletePopup = true;
    this.deleteAll = true;
    this.currentDoc="";
  }
  deleteAllDocsFromTrash(){
    sessionStorage.removeItem("trashList");
    this.deleteAll = false;
    this.deletePopup = false;
    this.trashList = [];
    this.toast.success("Trash bin is empty","Success");
    this.trashList = JSON.parse(sessionStorage.getItem("trashList")!);
    if(this.trashList == null || this.trashList.length == 0){
      this.emptyList = true;
    }
  }
  deleteDocPer(i:any){
    this.trashList.splice(i,1);
    sessionStorage.setItem("trashList",JSON.stringify(this.trashList));
    this.deletePopup = false;
    this.currentDoc = "";
    this.curIndex = "";
    this.toast.success("Docuement deleted successfully","Success");
    this.trashList = JSON.parse(sessionStorage.getItem("trashList")!);
    if(this.trashList == null || this.trashList.length == 0){
      this.emptyList = true;
    }
  }
  canceldeletePopup(){
    this.deleteAll = false;
    this.deletePopup = false;
  }
}
