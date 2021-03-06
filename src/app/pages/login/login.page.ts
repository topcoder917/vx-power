import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavController, MenuController, ModalController, LoadingController } from '@ionic/angular';
import { strings } from '../../config/strings';
import { ForgotpassPage } from '../forgotpass/forgotpass.page';
import { Storage } from '@ionic/storage';
import { DataService } from '../../services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  validationsform: FormGroup;

  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private router: Router,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    private storage: Storage,
    private DataService: DataService,
    private toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  // tslint:disable-next-line: variable-name
  private _strings = strings;
  public get strings() {
    return this._strings;
  }

  ngOnInit() {
    this.validationsform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  async presentAlert(value) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 2000,
      message: value,
      mode: 'ios'
    });
    await loading.present();
  }

  tryLogin(value) {
    this.authService.doLogin(value)
    .then(res => {
      this.DataService.checkUserExist(value).subscribe( resp => {
        this.modalCtrl.dismiss();
        this.storage.set('userinfo', value);
  
        this.router.navigate(['/home']);
        // if(resp.length == 0){
        //   this.presentToast();
        // }
        // else{
        //   this.modalCtrl.dismiss();
        //   this.storage.set('userinfo', value);
    
        //   this.router.navigate(['/home']);
        // }
      });


    }, err => {
      if (err.code === 'auth/wrong-password') {
        this.presentAlert(strings.ST30);
      } else if (err.code === 'auth/user-not-found') {
        this.presentAlert(strings.ST31);
      } else {
        this.presentAlert(strings.ST32);
      }
    });
  }

  async goRestPassPage() {

    const modal = await this.modalCtrl.create({
       component: ForgotpassPage,
     });

    modal.present();

   }

  goClosePage() {
    this.modalCtrl.dismiss();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account was removed.',
      duration: 3500,
      position: 'top'
    });
    toast.present();
  }
}
