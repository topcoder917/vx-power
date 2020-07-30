import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Facebook} from '@ionic-native/facebook/ngx'
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    public fb : Facebook,
    public platform: Platform,
    private DataService: DataService,
    private storage: Storage

  ) {}

  doRegister(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err));
   });
  }

  doLogin(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err));
   });
  }

  doRestPass(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(value.email)
      .then(
        res => resolve(res),
        err => reject(err));
    });
   }

  doLogout() {
    return new Promise((resolve, reject) => {
      this.afAuth.signOut()
      //this.afAuth.auth.signOut()
      .then(() => {
        // this.firebaseService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        console.log(error);
        reject();
      });
    });
  }

    doFacebookLogin() {
      return new Promise((resolve, reject) => {
        // if (this.platform.is('cordova')) {
          // ["public_profile"] is the array of permissions, you can add more if you need
          this.fb.login(['email'])
          .then((response) => {
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
            
            firebase.auth().signInWithCredential(facebookCredential)
              .then(user => {
                var value = {
                  email : JSON.stringify(user.user.email),
                  name : JSON.stringify(user.user.displayName),
                  password : '123456'
                }
                this.DataService.registerNewUser(value).subscribe( resp => {
                  this.storage.set('userinfo', value);
                  console.log("storage set successfull.");
                });    

                resolve()
              }).catch(function(error) {
                
              });
          }, err => reject(err)
          );
        // } else {
        //   this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        //   .then(result => {
        //     // Default facebook img is too small and we need a bigger image
        //     const bigImgUrl = 'https://graph.facebook.com/' + result.additionalUserInfo.profile + '/picture?height=500';
        //     // update profile to save the big fb profile img.
        //     firebase.auth().currentUser.updateProfile({
        //       displayName: result.user.displayName,
        //       photoURL: bigImgUrl
        //     }).then(res => resolve()
        //     , (err) => {
        //       reject(err);
        //     });
        //   }, (err) => {
        //     reject(err);
        //   });
        // }
      });
    }

}
