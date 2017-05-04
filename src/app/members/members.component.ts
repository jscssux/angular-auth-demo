import { Component, OnInit, HostBinding} from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  name: any;
  state: string = '';

  constructor(public afAuth: AngularFireAuth, private router: Router) {

  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      // Sign-out successful.
      this.router.navigateByUrl('/login');
    }, error => {
      // An error happened.
    });
  }


  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.name = user.email;
      } else {
        this.router.navigate([ '/login' ]);
        // No user is signed in.
      }
    });
  }
}