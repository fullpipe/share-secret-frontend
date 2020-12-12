import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { SealComponent } from './seal/seal.component';
import { UnsealComponent } from './unseal/unseal.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
    },
    {
        path: 'seal',
        component: SealComponent,
    },
    {
        path: 'unseal/:id',
        component: UnsealComponent,
    },
    {
        path: 'unseal',
        component: UnsealComponent,
    },
    {
        path: 'how-it-works',
        component: HowItWorksComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
