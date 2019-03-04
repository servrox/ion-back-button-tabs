# Advanced `ion-back-button` component 

Use the `ion-back-button-tabs` component instead of [`ion-back-button`](https://ionicframework.com/docs/api/back-button)<br /> when you got trouble navigating from a *tabbed-page* to a *global-page* and back.<br />
<br />
![Live Demo](http://g.recordit.co/8Lre03MyU6.gif)
<br />
<br />
For a complete [*demo project*](https://github.com/servrox/demo-ionic-tabs-back-button#getting-started), an [*alternative workaround*](https://github.com/servrox/demo-ionic-tabs-back-button#1-passing-previous-page-s-global-page-one) and a [*problem description*](https://github.com/servrox/demo-ionic-tabs-back-button#problem-explained) look [here](https://github.com/servrox/demo-ionic-tabs-back-button).

## Getting Started

### 1. Install 
```
npm i ion-back-button-tabs --save
```
### 2. Import `BackButtonTabsModule` to your page module (*shortened here*)
```
import { BackButtonTabsModule } from 'ion-back-button-tabs';

@NgModule({
  imports: [BackButtonTabsModule]
})
```
### 3. Get attributes for `ion-back-button-tabs`<br />
* #### `tabsPrefix` is the url path set for the TabsPage component *(e.g. 'tabs')*
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
...
```
* #### `tabsPageSelector` is the selector of the TabsPage component *(e.g. 'app-tabs')*
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {}

```
### 4. Use `ion-back-button-tabs` in template
```
<ion-back-button-tabs 
  defaultHref="/tabs/tab1" 
  tabsPrefix="tabs" 
  tabsPageSelector="app-tabs">
</ion-back-button-tabs>
```
<br />

## How it works

`ion-back-button-tabs` uses the [`ion-back-button`](https://ionicframework.com/docs/api/back-button) internally.<br />
There are two attributes added (*tabsPrefix* + *tabsPageSelector*)<br />
which are used in the also added directive (*ionBackButtonTabs*).
```
<ion-back-button
    [defaultHref]="defaultHref"
    [tabsPrefix]="tabsPrefix"
    [tabsPageSelector]="tabsPageSelector"
    ionBackButtonTabs>
</ion-back-button>
```
The *ionBackButtonTabs* directive looks pretty much the same as the [`ion-back-button` directive](https://github.com/ionic-team/ionic/blob/4646f53ec7ab39a2e89f0c59a427b6b61ea7788e/angular/src/directives/navigation/ion-back-button.ts), 
except that it takes the correct route when navigating from a *global-page* to a *tabbed-page*.<br />
<br />
This means that it's first checked with the help of the [*tabsPrefix*](#tabsprefix-is-the-url-path-set-for-the-tabsPage-component-eg-tabs) if  to navigate back to a *tabbed-page*. 
If this is the case, the last active *tab-route* is determined with the help of the [*tabsPageSelector*](#tabspageselector-is-the-selector-of-the-tabspage-component-eg-app-tabs).<br />
<br />
For the determination, the [*StackController*](https://github.com/ionic-team/ionic/blob/v4.0.2/angular/src/directives/navigation/stack-controller.ts) of the [`ion-tabs`](https://ionicframework.com/docs/api/tabs) component view, which is located in the component view of the specified [*tabsPageSelector*](#tabspageselector-is-the-selector-of-the-tabspage-component-eg-app-tabs), is taken.<br />
<br />
💩 Nevertheless, this is not a complete clean solution because currently  the [*location*](https://github.com/ionic-team/ionic/blob/v4.0.2/angular/src/directives/navigation/ion-router-outlet.ts#L48) attribute of the current *IonRouterOutlet* is used to get the current *ViewContainerRef*, which is needed to find the component views.<br />
<br />


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Authors

* **Marcel Mayer** - 
[servrox.solutions](http://servrox.solutions)