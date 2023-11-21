import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
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

  fontSize : number = 110;
  baseColor : string = "black";
  activeColor : string = "#0f0";
  maxColor : string = "#ff2a00";

  tickWidth : number = 1;
  halfCircleHeight : number = 250;

  @ViewChild("Display") display! : ElementRef;
  @ViewChild("Circle") circle! : ElementRef;


  @Input() Data : MeterData = {Name: "Lokale xxx", Current : 0, Accumulated: 999999, Note: "Test Note"};


  
  constructor() 
  {
    for ( var i = 0; i < 61; i++)
    {
      this.Ticks.push({ rotation:4 * i - 120, value: i});
    }
  }

  ngAfterViewInit()
  {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
      this.fontSize = this.display.nativeElement.offsetWidth * 0.39;
      var circleHeight = this.circle.nativeElement.offsetHeight;
      this.tickWidth = circleHeight/100;
      this.halfCircleHeight = circleHeight/2;
  }
  
  getFontSize(i:number)
  {
    return {'font-size': this.fontSize/i + 'px'};
  }
    
  SetTick(tick: Tick, height: number) 
  {
    var baseStyles = {
      'position': 'absolute',
      'background-color': this.baseColor,
      'left': '50%',
      'top': '0',
      'width': `${this.tickWidth}px`,
      'height': `${tick.value % 10 === 0 ? 15 : 10}%`,
      'transform-origin': `0 ${this.halfCircleHeight}px`,
      'transform': `rotate(${tick.rotation}deg)`
    };

    if(this.Data.Current >= 60)
    {
      baseStyles['background-color'] = this.maxColor;
      (baseStyles as any)['box-shadow'] = `0 0 25px ${this.maxColor}, 0 0 50px ${this.maxColor}`;
    }

    else if(tick.value <= this.Data.Current)
    {
      baseStyles['background-color'] = this.activeColor;
      (baseStyles as any)['box-shadow'] = `0 0 25px ${this.activeColor}, 0 0 50px ${this.activeColor}`;
    }

    return baseStyles;
  }

  HasNote() : boolean
  {
    if(this.Data.Note != undefined && this.Data.Note != "")
      return true;

    return false;
  }
}
