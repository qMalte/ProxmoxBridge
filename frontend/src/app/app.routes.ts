import { Routes } from '@angular/router';
import {AuthQuarantaineComponent} from "./auth-quarantaine/auth-quarantaine.component";
import {QuarantaineComponent} from "./quarantaine/quarantaine.component";

export const routes: Routes = [
  { path: 'quarantaine/auth', component: AuthQuarantaineComponent },
  { path: 'u/:identifier/:secret', component: QuarantaineComponent },
  { path: '**', redirectTo: 'quarantaine/auth'}
];
