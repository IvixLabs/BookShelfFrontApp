import {Component, OnInit, ViewChild} from '@angular/core'
import {BookListModel} from './model/book-list.model'
import {LazyLoadEvent} from 'primeng/api'
import {BookFacade} from './facade/book.facade'
import {take} from 'rxjs'
import {BookFormComponent} from './book-form.component'

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

    showBookDialog = false


    constructor(private bookFacade: BookFacade) {
    }

    ngOnInit(): void {

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'id', header: 'Id'},
        ]

        this.items = [
            {id: 'a1', name: 'Book1'}
        ]

        this.loading = true
    }

    openNew() {
        this.showBookDialog = true
    }

    loadItems(event: LazyLoadEvent) {
        this.loading = true
        console.log(event)
        this.bookFacade.getBooks(event.first, event.rows).pipe(take(1)).subscribe(res => {
            this.loading = false
            this.items = res['hydra:member']
            this.totalItems = res['hydra:totalItems']
        })
    }
}
