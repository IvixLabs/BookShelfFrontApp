import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core'
import {BehaviorSubject, catchError, take} from 'rxjs'
import {BookFormModel} from './model/book-form.model'
import {getHelperOperatorFunctions} from '../shared/server-side.directive'
import {BookService} from './service/book.service'
import {AuthorService} from '../author/service/author.service'

@Component({
    templateUrl: './book-form.component.html',
    selector: 'app-book-form',
})
export class BookFormComponent implements OnInit, OnDestroy {

    @Input()
    item: BookFormModel

    errors$: BehaviorSubject<Map<string, string>> = new BehaviorSubject(new Map<string, string>())

    @Output()
    saved = new EventEmitter<boolean>()

    @Output()
    saving = new EventEmitter<boolean>()

    authors = []

    constructor(private bookService: BookService, private authorService: AuthorService) {
    }

    ngOnInit(): void {
        this.authors = []
    }

    ngOnDestroy(): void {
        this.item = undefined
    }

    onLazyLoadAuthors(event) {
        const filters = new Map<string, string>()
        filters.set('search', event.query)
        this.authorService.getAuthorSuggestions(0, 10, filters)
            .subscribe(res => {
                this.authors = res
            })
    }
    onClearAuthor() {
        this.item.author = null
    }

    saveBook(): void {
        this.saving.emit(true)
        this.bookService.saveBook(this.item)
            .pipe(
                take(1),
                ...getHelperOperatorFunctions(this.errors$),
                catchError(err => {
                    this.saving.emit(false)
                    throw err
                })
            )
            .subscribe(res => {
                this.item = res
                this.saved.emit(true)
                this.saving.emit(false)
            })
    }
}
