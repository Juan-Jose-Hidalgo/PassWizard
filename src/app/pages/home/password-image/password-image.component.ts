import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-image',
  templateUrl: './password-image.component.html',
  styleUrls: ['./password-image.component.scss']
})
export class PasswordImageComponent {
  @Input() urlImage = '';
  @Input() png = '';
  @Input() webp = '';
  @Input() author = '';
}
