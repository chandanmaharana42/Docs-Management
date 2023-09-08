import { User } from './../shared/user';
import { Subscription } from 'rxjs';

import { UserService } from '../shared/user.service';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileBackendService } from '../shared/file-backend';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser!: User;
  // currentUserSubscription: Subscription;
  users: User[] = [];
  expanded:boolean = true;
  currentSelected:number = 1;
  searchKey:string='';
  profileClicked:boolean = false;
  // currentUserName:string = "";
  constructor(

    private authService: AuthService,
    private userService: UserService,
    private fileService:FileBackendService,
    private router : Router
  ) { }

ngOnInit() {
  this.currentUser =  JSON.parse( localStorage.getItem('user')!)
}

receiveMessage(event:any){
  this.currentSelected = event;
}
// ngOnDestroy() {
//   this.currentUserSubscription.unsubscribe();
// }
logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}

// deleteUser(id: number) {
//   this.userService.delete(id).subscribe((res:any)=>{
//     console.log();
//     this.loadAllUsers();
//   });
// }

// private loadAllUsers() {
//   this.userService.getAll().pipe(first()).subscribe(users => {
//       this.users = users;
//   });
// }

  filterDocs(value:string){
    let allFiles:any[] = this.fileService.getUploadedFiles();
    let filteredFiles = allFiles.filter(ele=>{
      console.log(ele.name);
      ele.name.includes(value);
    });
    
  }
}
