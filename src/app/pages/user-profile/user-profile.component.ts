import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

//* SERVICES
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    email: '',
    id: -1,
    img: '',
    name: '',
    password: '',
    username: ''
  }
  userId!: number;
  urlImg = environment.URL;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUser.id;
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    })
  }

}
