import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-back-button-tabs',
  template: `<ion-back-button
    [defaultHref]="defaultHref"
    [tabsPrefix]="tabsPrefix"
    [tabsPageSelector]="tabsPageSelector"
    ionBackButtonTabs></ion-back-button>`
})
export class BackButtonTabsComponent {
  @Input() defaultHref: string | undefined | null;
  @Input() tabsPrefix: string | undefined | null;
  @Input() tabsPageSelector: string | undefined | null;
}
