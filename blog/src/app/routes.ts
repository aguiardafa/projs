import {Routes } from '@angular/router';
import {HomeComponent } from 'app/home/home.component';
import {ArtigoComponent } from 'app/artigo/artigo.component';

export const routes : Routes = [
    { path : '', component: HomeComponent},
    { path : 'artigo/:id', component: ArtigoComponent}
];
