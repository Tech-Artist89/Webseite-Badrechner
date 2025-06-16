import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from '../../../components/ui/team-card/team-card.component';
import { DataService } from '../../../services/data.service';
import { TeamMember } from '../../../models/team-member';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TeamCardComponent, RouterModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  
  departments = [
    {
      name: 'Management',
      members: [] as TeamMember[]
    },
    {
      name: 'Planung',
      members: [] as TeamMember[]
    },
    {
      name: 'Technik',
      members: [] as TeamMember[]
    }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTeamMembers().subscribe(members => {
      this.teamMembers = members;
      this.organizeMembersByDepartment();
    });
  }

  private organizeMembersByDepartment(): void {
    this.departments.forEach(dept => {
      dept.members = this.teamMembers.filter(member => member.department === dept.name);
    });
  }
}