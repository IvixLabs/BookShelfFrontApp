import {Component, OnInit} from '@angular/core'
import {BookFacade} from './facade/book.facade'
import {BehaviorSubject, take} from 'rxjs'
import {BookFormModel} from './model/book-form.model'
import {getHelperOperatorFunctions} from '../shared/server-side.directive'

@Component({
    templateUrl: './book-form.component.html',
    selector: 'app-book-form',
})
export class BookFormComponent implements OnInit {

    item: BookFormModel

    errors$: BehaviorSubject<Map<string, string>> = new BehaviorSubject(new Map<string, string>())

    constructor(private bookFacade: BookFacade) {
    }

    ngOnInit(): void {
        this.item = {} as BookFormModel
    }

    saveBook(): void {
        this.bookFacade.saveBook(this.item)
            .pipe(
                take(1),
                ...getHelperOperatorFunctions(this.errors$)
            )
            .subscribe(res => {
                this.item = res
            })
    }
}
