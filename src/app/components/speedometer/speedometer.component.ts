import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterData } from 'src/app/models/MeterData';


interface Tick
{
  rotation : number;
  value : number;
}

@Component({
  selector: 'app-speedometer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.css']
})
export class SpeedometerComponent
{
  Ticks : Tick[] = [];
  @Input() fontSize : number = 110;

  @Input() Data : MeterData = {Name: "Lokale xxx", Current : 0, Accumulated: 999999, Note: "Test Note"};

  constructor() 
  {
    // for ( var i = 0; i < 100; i++)
    // {
    //   this.Ticks.push({ rotation:3.6 *i, value: i});
    // }
    for ( var i = 0; i < 61; i++)
    {
      this.Ticks.push({ rotation:4 * i - 120, value: i});
    }
  }
  
  GetTickGlowColor() : string
  {
    var color = "#0f0";

    if(this.Data.Current >= 60)
    {
      color="#ff2a00"
    }

    return `
    background-color: ${color};
    box-shadow: 0 0 25px ${color}, 0 0 50px ${color};
    `;
  }

  SetTick(tick : Tick, height : number) : string
  {
    var test = `
    background-color: #0f0;
    box-shadow: 0 0 25px #0f0, 0 0 50px #0f0;
    `;
    var styleString = `
    position: absolute;
    ${tick.value <= this.Data.Current? this.GetTickGlowColor() : "background-color: black;"}
    left: 50%;
    width: ${height/100}px;
    height: ${tick.value % 10 === 0 ? 15 : 10}%;
    transform-origin: 50% ${height/2}px;
    transform: rotate(${tick.rotation}deg)
    `;
    
    return styleString;
  }

  HasNote() : boolean
  {
    if(this.Data.Note != undefined && this.Data.Note != "")
      return true;

    return false;
  }
}
