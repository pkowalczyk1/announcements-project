import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {SubjectDetailsComponent} from "./components/subject-details/subject-details.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
    {path: "home", component: HomePageComponent},
    {path: "subject/:id", component: SubjectDetailsComponent},
    {path: "login", component: LoginComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
