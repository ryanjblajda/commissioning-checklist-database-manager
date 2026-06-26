import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { SuggestionPage } from './suggestion-page/suggestion-page';
import { AdministrationPage } from './administration-page/administration-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'suggestion', component: SuggestionPage },
    { path: 'administration', component: AdministrationPage },
];
