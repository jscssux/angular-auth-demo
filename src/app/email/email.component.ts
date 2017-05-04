import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule, AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  state: string = '';
  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.router.navigateByUrl('/members');
      } else {
        // No user is signed in.
      }
    });
  }

  ngOnInit() {
  }
  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.signInWithEmailAndPassword(
            formData.value.email,
            formData.value.password
          ).then(
          (success) => {
            console.log(success);
            this.router.navigate(['/members']);
          }).catch(
          (err) => {
            console.log(err);
            this.error = err;
          });
    }
  }
}
