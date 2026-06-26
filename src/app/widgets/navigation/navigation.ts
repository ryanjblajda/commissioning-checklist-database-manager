import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdministrationPage } from "../../administration-page/administration-page";

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
  standalone: true
})
export class Navigation {}
