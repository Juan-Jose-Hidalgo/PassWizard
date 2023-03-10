import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//* ANGULAR MATERIAL
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//* SERVICES
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-udate-user-img',
  templateUrl: './udate-user-img.component.html',
  styleUrls: ['./udate-user-img.component.scss']
})
export class UdateUserImgComponent {

  img!: File;
  selectedImg: string | ArrayBuffer | null = "assets/img/picture-image-svgrepo-com.svg";

  imgForm: FormGroup = this.fb.group({
    img: [, Validators.required]
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private fb: FormBuilder,
    private fv: FormValidatorService,
    private us: UserService
  ) { }

  getErrorMsg(controlName: string) {
    return this.fv.getErrorMsg(controlName, this.imgForm)
  }

  /**
   * Updates the selected image file and displays a preview of it.
   * 
   * @param event - The event containing the selected image file.
   * @returns void.
   */
  imgSelec(event: any): void {
    if (event.target?.files && event.target.files[0]) this.img = <File>event.target.files[0];

    //Preview image.
    const reader = new FileReader();
    reader.onload = e => this.selectedImg = reader.result;
    reader.readAsDataURL(this.img);
  }

  /**
   * Updates user profile image.
   * 
   * @returns void.
   */
  update() {
    if (this.imgForm.invalid) {
      this.imgForm.markAllAsTouched();
      return;
    }

    this.us.updateUserImg(this.data.id, this.img, this.data.olderImg).subscribe(res => {
      this.authService.setUser(res.user);
    });
  }
}
