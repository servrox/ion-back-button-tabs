import { Directive, HostListener, Optional, Input } from '@angular/core';
import { IonRouterOutlet, NavController } from '@ionic/angular';

@Directive({
    selector: '[ionBackButtonTabs]'
})
export class BackButtonTabsDirective {

    @Input() defaultHref: string | undefined | null;
    @Input() tabsPrefix: string | undefined | null;
    @Input() tabsPageSelector: string | undefined | null;

    constructor(@Optional() private routerOutlet: IonRouterOutlet, private navCtrl: NavController) {
        this.fixSwipe();
    }

    private fixSwipe() {
        const swipe = this.routerOutlet._swipeGesture;
        this.routerOutlet.nativeEl.swipeHandler = swipe ? {
            canStart: () => this.routerOutlet.canGoBack(1),
            onStart: () => { this.routerOutlet.stackCtrl.startBackTransition(); },
            onEnd: shouldContinue => { if (shouldContinue) { this.goBack(false); } }
        } : undefined;
    }

    @HostListener('click', ['$event'])
    onClick(ev?: Event) {
        this.goBack();
        ev.preventDefault();
    }

    private goBack(animated = true) {
        let lastTabUrl: string;

        if (this.routerOutlet) {
            const nonCrclrRtrOtlt = JSON.parse(JSON.stringify(this.routerOutlet, this.getCircularReplacer()));
            if (this.backToTabs(nonCrclrRtrOtlt)) { lastTabUrl = this.getActiveTabViewUrl(); }
        }

        if (this.routerOutlet && this.routerOutlet.canGoBack()
            && lastTabUrl) { this.navCtrl.navigateBack(lastTabUrl, { animated: animated }); } else
            if (this.routerOutlet && this.routerOutlet.canGoBack()) { this.navCtrl.back({ animated: animated }); } else
                if (this.defaultHref != null) { this.navCtrl.navigateBack(this.defaultHref, { animated: animated }); }
    }

    private backToTabs(nonCrclrRtrOtlt): boolean {
        const views = nonCrclrRtrOtlt.stackCtrl.views;
        const topUrls = [];
        for (let i = 0; i < views.length; i++) {
            if (views[i]) {
                topUrls.push(views[i].url);
            }
        }
        return (topUrls[topUrls.length - 1] === `/${this.tabsPrefix}`);
    }

    private getActiveTabViewUrl(): string {
        const views = this.routerOutlet.location._embeddedViews;
        for (let i = 0; i < views.length; i++) {
            for (let j = 0; j < views[i].nodes.length; j++) {
                if (views[i].nodes[j].renderElement && views[i].nodes[j].renderElement.localName === this.tabsPageSelector) {
                    for (let k = 0; k < views[i].nodes[j].componentView.nodes.length; k++) {
                        if (views[i].nodes[j].componentView.nodes[k].renderElement
                            && views[i].nodes[j].componentView.nodes[k].renderElement.localName === 'ion-tabs') {
                            const activeTab = views[i].nodes[j].componentView.nodes[k]
                                .componentView.context.outlet.stackCtrl.getActiveStackId();
                            return views[i].nodes[j].componentView.nodes[k]
                                .componentView.context.outlet.stackCtrl.getLastUrl(activeTab).url;
                        }
                    }
                }
            }
        }
        return;
    }

    private getCircularReplacer(): any {
        const seen = new WeakSet;
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) { return; }
                seen.add(value);
            }
            return value;
        };
    }
}
