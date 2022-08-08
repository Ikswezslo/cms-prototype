import { Component, OnInit } from '@angular/core';
import { user } from '../user';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  user = user[0];
  imageSrc = 'assets/images/pp.png'  
  
  constructor() { }

  ngOnInit(): void {
  }

}
