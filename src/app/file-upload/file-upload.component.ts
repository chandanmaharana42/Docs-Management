import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../shared/user';

interface FileWithProgress extends File {
  progress: number;
}
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  completed:boolean = false;
  @Output() messageEvent = new EventEmitter<string>();
  uploadProgress: number[] = [];
  uploadErrors = {
    size: '',
    count: ''
  };
  files: FileWithProgress[] = [];
  currentUser! : User;
  existingFiles:any[]=[];

  constructor(
    private toast : ToastrService) {

      if(sessionStorage.getItem("uploadedFiles") !== null){
        this.existingFiles = JSON.parse(sessionStorage.getItem("uploadedFiles")!);
      }
      else{
        this.existingFiles = [];
      }
    }

  ngOnInit(): void {
    
  }

  onFilesSelected(event: any): void {
    this.uploadErrors.size = "";
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i] as FileWithProgress;
        this.uploadFile(file);
      }
    }
  }




  uploadFile(file: FileWithProgress): void {
    this.currentUser = JSON.parse(localStorage.getItem("user")!);
    if (file.size > 1 * 1024 * 1024) { // 1 MB in bytes
      this.uploadErrors.size = 'File size limit exceeded (1 MB max).';
      this.toast.warning("File size limit exceeded (1 MB max).","Warning");
      return;
    }
    let fileName = file.name;
      let fileType = file.type;
      let today = new Date(); 
      let time = today. getHours() + ":" + today. getMinutes() + ":" + today;
      
    const fileReader = new FileReader();
    fileReader.onload=()=>{
      let fileData = fileReader.result as string;
              let fileToUpload = {
                  "name": fileName,
                  "data": fileData,
                  "uploader" : this.currentUser.firstName +" "+ this.currentUser.lastName,
                  "date" : today,
                  "time" : time,
                  "type" : fileType
              }
      setTimeout(() => {
        this.existingFiles.push(fileToUpload);
        sessionStorage.setItem('uploadedFiles', JSON.stringify(this.existingFiles));
        
      }, 2000); 

      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        file.progress = progress;
        if (progress >= 100) {
          this.completed = true;
          clearInterval(progressInterval);
          this.toast.success("File uploaded successfully","Hurray!");
        }
      }, 200);
     
    };
    fileReader.readAsDataURL(file);
    this.files.push(file);

}

gotoWorkspace(){
  this.messageEvent.emit('1');
}

}
