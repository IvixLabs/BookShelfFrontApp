import {Component, OnInit, ViewChild} from '@angular/core'
import {BookListModel} from './model/book-list.model'
import {LazyLoadEvent} from 'primeng/api'
import {take} from 'rxjs'
import {BookFormComponent} from './book-form.component'
import {BookService} from './service/book.service'
import {BookFormModel} from './model/book-form.model'
import {AuthorFormDto} from "../author/dto/author-form.dto";

@Component({
    templateUrl: './book-page.component.html'
})
export class BookPageComponent implements OnInit {

    @ViewChild('bookForm')
    bookForm: BookFormComponent

    items: BookListModel[]

    totalItems = 0

    cols: any[]

    loading = false

    saving = false

    showDialog = false

    currentItem: BookFormModel

    showDeleteDialog = false

    deleteIdItem = undefined

    lastLazyLoadEvent: LazyLoadEvent

    constructor(private bookService: BookService) {
    }

    ngOnInit(): void {

        this.cols = [
//            {field: 'id', header: 'Id'},
            {field: (book: BookListModel) => book.name, header: 'Name'},
            {field: (book: BookListModel) => book.author.name, header: 'Author'}
        ]
        this.items = []
        this.loading = true
    }

    newItem() {
        this.currentItem = {} as BookFormModel
        this.showDialog = true
    }

    hideDialog() {
        this.showDialog = false
    }

    loadItems(event: LazyLoadEvent) {
        this.lastLazyLoadEvent = event
        this.fetchItems()
    }

    private fetchItems() {
        this.loading = true

        const filters = new Map<string, string>()

        Object.entries(this.lastLazyLoadEvent.filters).forEach((v) => {
            filters.set(v[0], v[1].value)
        })

        this.bookService.getBooks(this.lastLazyLoadEvent.first, this.lastLazyLoadEvent.rows).pipe(take(1)).subscribe(res => {
            this.loading = false
            this.items = res['hydra:member']
            this.totalItems = res['hydra:totalItems']
        })
    }


    editItem(item) {
        this.loading = true
        this.bookService
            .getBook(item.id)
            .pipe(take(1))
            .subscribe(freshItem => {
                this.currentItem = freshItem
                this.showDialog = true
                this.loading = false
            })
    }

    deleteItem(item) {
        this.deleteIdItem = item.id
        this.showDeleteDialog = true
    }

    hideDeleteDialog() {
        this.showDeleteDialog = false
        this.deleteIdItem = undefined
    }

    confirmDeleteItem() {
        this.showDeleteDialog = false
        if (this.deleteIdItem) {
            this.loading = true
            this.bookService
                .deleteBook(this.deleteIdItem)
                .pipe(take(1))
                .subscribe(_ => {
                    this.fetchItems()
                })
            this.deleteIdItem = undefined
        }
    }

    onItemSaved() {
        this.hideDialog()
        this.fetchItems()
    }

    onItemSaving(saving: boolean) {
        this.saving = saving
    }
}
