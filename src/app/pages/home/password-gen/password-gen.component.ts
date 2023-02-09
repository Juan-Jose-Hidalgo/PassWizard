import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-gen',
  templateUrl: './password-gen.component.html',
  styleUrls: ['./password-gen.component.scss']
})
export class PassworGenComponent{
  @Input() password = '';
  @Input() passwordStrength = '';
  @Input() badge = '';
}
