import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { HeatingComponent } from './pages/services/heating/heating.component';
import { BathroomComponent } from './pages/services/bathroom/bathroom.component';
import { InstallationComponent } from './pages/services/installation/installation.component';
import { AboutComponent } from './pages/about/about.component';
import { CompanyComponent } from './pages/about/company/company.component';
import { TeamComponent } from './pages/about/team/team.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CareerComponent } from './pages/contact/career/career.component';
import { LegalComponent } from './pages/legal/legal.component';

// Badrechner Imports
import { BathroomConfiguratorComponent } from './components/shared/bathroom-configurator/bathroom-configurator.component';
import { PageOneComponent } from './pages/badrechner/page-one/page-one.component';
import { PageTwoComponent } from './pages/badrechner/page-two/page-two.component';
import { PageThreeComponent } from './pages/badrechner/page-three/page-three.component';
import { PageFourComponent } from './pages/badrechner/page-four/page-four.component';
import { PageFiveComponent } from './pages/badrechner/page-five/page-five.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  
  // Services Routes (flach, nicht verschachtelt)
  { path: 'services', component: ServicesComponent },
  { path: 'services/heating', component: HeatingComponent },
  { path: 'services/bathroom', component: BathroomComponent },
  { path: 'services/installation', component: InstallationComponent },
  
  // About Routes (flach, nicht verschachtelt)
  { path: 'about', component: AboutComponent },
  { path: 'about/company', component: CompanyComponent },
  { path: 'about/team', component: TeamComponent },
  
  // Contact Routes (flach, nicht verschachtelt)
  { path: 'contact', component: ContactComponent },
  { path: 'contact/career', component: CareerComponent },
  
  // Badrechner Routes - NEU
  {
    path: 'badrechner',
    component: BathroomConfiguratorComponent,
    children: [
      { path: '', redirectTo: 'page/1', pathMatch: 'full' },
      { path: 'page/1', component: PageOneComponent },
      { path: 'page/2', component: PageTwoComponent },
      { path: 'page/3', component: PageThreeComponent },
      { path: 'page/4', component: PageFourComponent },
      { path: 'page/5', component: PageFiveComponent },
    ]
  },
  
  { path: 'legal', component: LegalComponent },
  { path: 'impressum', redirectTo: 'legal', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];