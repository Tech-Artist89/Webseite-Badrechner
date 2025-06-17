import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service, ServiceCategory } from '../models/service';
import { TeamMember } from '../models/team-member';
import { ContactInfo } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private services: Service[] = [
    {
      id: 'heating',
      title: 'Heizungsbau',
      description: 'Moderne Heizungsanlagen für optimale Energieeffizienz',
      icon: 'fas fa-fire',
      features: ['Wärmepumpen', 'Gasheizungen', 'Fußbodenheizungen']
    },
    {
      id: 'bathroom',
      title: 'Bäderbau',
      description: 'Komplette Badezimmerplanung und -umsetzung',
      icon: 'fas fa-bath',
      features: ['Badsanierung', 'Barrierefrei', 'Bodengleiche Duschen', '3D-Planung']
    },
    {
      id: 'installation',
      title: 'Installation',
      description: 'Professionelle Installation und Wartung',
      icon: 'fas fa-wrench',
      features: ['24/7 Notdienst', 'Wartungsverträge', 'Leckortung']
    }
  ];

  private teamMembers: TeamMember[] = [
    {
      id: '1',
      firstName: 'Patrick',
      lastName: 'van Dahlen',
      position: 'Geschäftsführer',
      department: 'Management',
      description: 'Planung, Organisation, Koordinisation.',
      image: 'assets/images/team/Pico.png',
      specialties: ['Heizungstechnik', 'Projektmanagement', 'Kundenberatung'],
//      experience: 30
    },
    {
      id: '2',
      firstName: 'Robin',
      lastName: 'Paul',
      position: 'Finanzen- und Management',
      department: 'Planung',
      description: 'Buchhaltung und Finanzen.',
      image: 'assets/images/team/Robin.png',
      specialties: ['Buchhaltung', 'Projektkoordination'],
//      experience: 8
    },
    {
      id: '3',
      firstName: 'Niko',
      lastName: 'Jovanovic',
      position: 'Digitalisierung und Design',
      department: 'Technik',
      description: 'Spezialist für Design und Webauftritt.',
      image: 'assets/images/team/Niko.png',
      specialties: ['Digitaltechnik', 'Innovation'],
//      experience: 12
    }
  ];

  private contactInfo: ContactInfo = {
    address: {
      street: 'Borussiastraße 62a',
      city: 'Berlin',
      zip: '12103',
      country: 'Deutschland'
    },
    phone: '030 76008921',
    email: 'hey@mitra-sanitaer.de',
    emergencyPhone: '030 76008921',
    openingHours: {
      monday: '8:00 - 15:30',
      tuesday: '8:00 - 15:30',
      wednesday: '8:00 - 15:30',
      thursday: '8:00 - 15:30',
      friday: '8:00 - 15:30',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen'
    }
  };

  getServices(): Observable<Service[]> {
    return of(this.services);
  }

  getServiceById(id: string): Observable<Service | undefined> {
    const service = this.services.find(s => s.id === id);
    return of(service);
  }

  getTeamMembers(): Observable<TeamMember[]> {
    return of(this.teamMembers);
  }

  getContactInfo(): Observable<ContactInfo> {
    return of(this.contactInfo);
  }
}