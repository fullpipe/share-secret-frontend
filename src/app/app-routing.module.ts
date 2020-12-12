import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SealComponent } from './seal/seal.component';
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
        path: '**',
        redirectTo: 'seal',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
