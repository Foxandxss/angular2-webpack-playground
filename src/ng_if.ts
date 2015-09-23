import {Directive, ViewContainerRef, TemplateRef} from 'angular2/angular2';

// Not sure where isBlank is on angular2, so I copy it here.
function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

@Directive({selector: '[ng-if]', properties: ['ngIf']})
export class NgIf {
  private _prevCondition: boolean = null;

  constructor(private _viewContainer: ViewContainerRef, private _templateRef: TemplateRef) {}

  set ngIf(newCondition /* boolean */) {
    if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
      this._prevCondition = true;
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
      this._prevCondition = false;
      this._viewContainer.clear();
    }
  }
}