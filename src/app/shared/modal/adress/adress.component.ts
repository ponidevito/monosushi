import { Component, OnInit } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss'],
})
export class AdressComponent implements OnInit {
  constructor(private fb: FormBuilder, private afs: Firestore) {}

  // adressForm
  public adressForm!: FormGroup;

  ngOnInit(): void {
    this.initAdressForm();
  }

  initAdressForm(): void {
    this.adressForm = this.fb.group({
      typeAdress: [null],
      adress: [null, [Validators.required]],
      entrance: [null, [Validators.required]],
      number: [null, [Validators.required]],
    });
  }

  // This code updates a user's profile in Firebase.
  adressUser(): void {
    if (this.adressForm.valid) {
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      const userDocRef = doc(this.afs, 'users', currentUser.uid);
      const userData = this.adressForm.value;
      updateDoc(userDocRef, userData)
        .then(() => {
          // update local storage with new user data
          const updatedUser = { ...currentUser, ...userData };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          console.log('User data successfully updated');
        })
        .catch((error) => {
          console.log('Error updating user document: ', error);
        });
    }
  }
}
