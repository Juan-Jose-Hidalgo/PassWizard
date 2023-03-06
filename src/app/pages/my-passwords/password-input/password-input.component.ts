import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  @Input() password: string = '';
  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
