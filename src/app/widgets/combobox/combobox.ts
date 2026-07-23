import { afterRenderEffect, Component, signal, ViewChild, input, computed, output} from '@angular/core';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { DescriptiveMember, Member } from '../../models/member/member.model';


@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.html',
  styleUrl: './combobox.scss',
  imports: [Combobox, Option, Listbox, ComboboxPopup, ComboboxWidget, OverlayModule],
})

export class SearchableComboBox {
  options = input.required<DescriptiveMember[]>();
  name = input.required<string>();

  selected = output<string>();

  popupExpanded = signal<boolean>(false);

  listbox = ViewChild(Listbox);

  selectedOption = computed(() => this.selectedOptions()[0] || 'SELECT OPTION');

  selectedOptions = signal<string[]>([]);

  constructor() { 
    /*
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
    */
  }

  clear() {}

  onCommit() {
    //console.log(`selected: ${this.selectedOption()}`)
    this.popupExpanded.set(false);
    this.selected.emit(this.selectedOption());
  }
}