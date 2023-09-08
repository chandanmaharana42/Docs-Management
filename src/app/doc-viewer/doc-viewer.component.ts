
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Docxtemplater from 'docxtemplater';
import { ToastrService } from 'ngx-toastr';
// import { Pptx2html } from 'pptx2html';
// import * as mammoth from 'mammoth';
import * as PDFObject from 'pdfobject';
import { AuthService } from '../shared/auth.service';
// import Pptx2html from 'pptx2html';
@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit {
  isLoading = false;
  pdfData :any;
  docid :any;
  currentUser:any;
  unsupported: boolean = false;
  profileClicked:boolean = false;
  // pptData:string='';
  // @ViewChild('pptViewer', { static: true }) pptViewer!: ElementRef ;
  // docData :any;
  // docxData:any;
  // htmlContent:any;
  constructor(private actRoute : ActivatedRoute,
    private toast:ToastrService,
    private authService:AuthService,
    private router : Router
   ) {
    this.actRoute.paramMap.subscribe((params) => {
      this.docid = params.get('id');
     
    });
    this.actRoute.data.subscribe(data => {
      this.pdfData = data;
      console.log(this.pdfData);
   });
  }
  ngOnInit(): void {
    this.currentUser =  JSON.parse( localStorage.getItem('user')!)
      if (this.pdfData) {
        this.handleRender(this.pdfData.routeResolver[this.docid].data);
      }
    
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  gotoDashboard(){
    this.router.navigate(['/dashboard']);
  }
  // ngAfterViewInit() {
  //   console.log(this.pptViewer);
  //   // Access 'nativeElement' in 'ngAfterViewInit' to ensure it's defined
  //   const pptBase64Data = this.pptData; // Load your PPT base64 data here

  //   const pptx = new Pptx2html({
  //     pptx: pptBase64Data,
  //     parent: this.pptViewer.nativeElement,
  //   });

  //   pptx.render();
  // }
  handleRender(data:any) {
    console.log("ppt",this.pdfData.routeResolver[this.docid].type,data);
    if(this.pdfData.routeResolver[this.docid].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      this.toast.info("Docs view not supporting as of now , you can download it to your local","Info");
      this.unsupported = true;
    }
    else if(this.pdfData.routeResolver[this.docid].type == "application/vnd.openxmlformats-officedocument.presentationml.presentation"){
      this.toast.info("PPT file view not supporting as of now ","Info");
      this.unsupported = true;
      // this.pptData = data
    }else if(this.pdfData.routeResolver[this.docid].type == "application/pdf"){
      const pdfObject = PDFObject.embed(data, '#pdfContainer');
    }
   
  }
 

}
