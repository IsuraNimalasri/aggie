import {Component, OnDestroy} from '@angular/core';
import {TagifyService} from '@yaireo/tagify';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

    constructor(tagifyService) {}
    settings = { blacklist: ['fucking', 'shit']};

onAdd(tagify) {
    console.log('added a tag', tagify);
}

onRemove(tags) {
    console.log('removed a tag', tags);
}
clearTags() {
    this.tagifyService.removeAll();
}
addTags() {
    this.tagifyService.addTags(['this', 'is', 'cool']);
}
ngOnDestroy() {
    this.tagifyService.destroy();
}
}