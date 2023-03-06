import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Output() inputEmit = new EventEmitter<number>();
  @Output() lengthEmit = new EventEmitter<number>();
  @Input() inputLength?:number;

  changeLength(num: number) {
    this.lengthEmit.emit(num);
  }

  changeInputLength() {
    this.inputEmit.emit(this.inputLength);
  }
  
}
