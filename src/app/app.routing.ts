import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/authguard.service';


const appRoutes: Routes = [
	{
  		path: '',
  		component: LoginComponent
	},
	{
  		path: 'projects',
  		component: AllProjectsComponent,
			canActivate: [AuthGuard]
	},
	{
  		path: 'profile',
  		component: ProfileComponent,
			canActivate: [AuthGuard]
	},
	{
  		path: 'project-detail/:id',
  		component: ProjectDetailComponent,
			canActivate: [AuthGuard]
	}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
