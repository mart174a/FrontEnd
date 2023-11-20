import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeedometerComponent } from '../speedometer/speedometer.component';
import { MeterData } from 'src/app/models/MeterData';
import { MeterlistItemComponent } from '../meterlist-item/meterlist-item.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,SpeedometerComponent,MeterlistItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent 
{
  @Input() MainMeter! : MeterData;
  @Input() SubMeters! : MeterData[];

  ShowListView() : boolean
  {
    if(this.SubMeters.length > 4)
      return true;

    return false;
  }
}
