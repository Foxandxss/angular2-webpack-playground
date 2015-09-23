import {Component, View, NgClass, OnDestroy} from 'angular2/angular2';

import {iit} from 'angular2/test_lib';

console.log(iit);

@Component({
  selector: 'accordion',
  properties: ['onlyOneOpen: closeOthers'],
  host: {
    'class': 'panel-group'
  }
})
@View({
  template: `<ng-content></ng-content>`
})
export class Accordion {
  private onlyOneOpen:boolean;
  private groups:Array<AccordionGroup> = [];

  addGroup(group:AccordionGroup): void {
    this.groups.push(group);
  }

  closeOthers(openGroup): void {
    if (!this.onlyOneOpen) {
      return;
    }

    this.groups.forEach((group:AccordionGroup) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  removeGroup(group:AccordionGroup): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}

@Component({
  selector: 'accordion-group',
  properties: ['heading', 'isOpen', 'isDisabled']
})
@View({
  template: `
    <div class="panel panel-default" [ng-class]="{'panel-open': isOpen}">
      <div class="panel-heading" (click)="toggleOpen($event)">
        <h4 class="panel-title">
          <a href tabindex="0"><span [ng-class]="{'text-muted': isDisabled}">{{heading}}</span></a>
        </h4>
      </div>
      <div class="panel-collapse" [hidden]="!isOpen">
        <div class="panel-body">
    	    <ng-content></ng-content>
  	    </div>
      </div>
    </div>
  `,
  directives: [NgClass]
})
export class AccordionGroup implements OnDestroy {
  private isDisabled:boolean;
  private _isOpen:boolean = false;

  constructor(private accordion:Accordion) {
    this.accordion.addGroup(this);
  }

  toggleOpen(event) {
    event.preventDefault();
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }

  onDestroy(): void {
    this.accordion.removeGroup(this);
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value:boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOthers(this);
    }
  }
}