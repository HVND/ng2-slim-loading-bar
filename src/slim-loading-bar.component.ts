// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-slim-loading-bar

import { Component, Input, OnInit } from '@angular/core';

import { SlimLoadingBarService, SlimLoadingBarEvent, SlimLoadingBarEventType } from './slim-loading-bar.service';
import { isPresent } from './slim-loading-bar.utils';

/**
 * A Slim Loading Bar component shows message loading progress bar on the top of web page or parent component.
 */
@Component({
    selector: 'ng2-slim-loading-bar',
    template: `
<div class="slim-loading-bar">
    <div class="slim-loading-bar-progress" [style.width]="progress + '%'" [style.backgroundColor]="color" [style.color]="color"
        [style.height]="height" [style.opacity]="show ? '1' : '0'" [style.transition]="isTransition ? 'all 0.5s ease-in-out' : 'none'"></div>
</div>`
})
export class SlimLoadingBarComponent implements OnInit {

    @Input() set progress(progress: string) {
        this.isTransition = progress >= this._progress;
        this._progress = progress;
    }

    @Input() color: string = 'firebrick';
    @Input() height: string = '2px';
    @Input() show: boolean = true;

    isTransition: boolean = true;

    private _progress: string = '0';

    constructor(public service: SlimLoadingBarService) { }

    ngOnInit(): any {
        this.service.events.subscribe((event: SlimLoadingBarEvent) => {
            if (event.type === SlimLoadingBarEventType.PROGRESS && isPresent(event.value)) {
                this.progress = event.value;
            } else if (event.type === SlimLoadingBarEventType.COLOR) {
                this.color = event.value;
            } else if (event.type === SlimLoadingBarEventType.HEIGHT) {
                this.height = event.value;
            } else if (event.type === SlimLoadingBarEventType.VISIBLE) {
                this.show = event.value;
            }
        });
    }

    get progress() {
        return this._progress;
    }
}
