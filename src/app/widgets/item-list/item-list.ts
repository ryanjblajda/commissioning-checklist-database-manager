import { Component, input, output } from '@angular/core';
import { Member } from '../../models/member/member.model';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})

export class ItemList {
  items = input.required<Member[]>();
  title = input.required<string>();
  
  itemChecked = new Map<string, boolean>();

  onItemChecked(name:string, checked:boolean) {
    //console.log(`clicked ${name} ${checked}`);
    this.itemChecked.set(name, checked);
  }
}
