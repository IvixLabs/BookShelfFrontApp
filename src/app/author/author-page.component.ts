import {Component, OnInit, ViewChild} from '@angular/core'
import {LazyLoadEvent} from 'primeng/api'
import {take} from 'rxjs'
import {AuthorService} from './service/author.service'
import {AuthorListDto} from './dto/author-list.dto'
import {AuthorFormComponent} from './author-form.component'
import {AuthorFormDto} from './dto/author-form.dto'
import {Table} from 'primeng/table'

@Component({
    templateUrl: './author-page.component.html'
})
export class AuthorPageComponent implements OnInit {

    @ViewChild('authorForm')
    authorForm: AuthorFormComponent

    @ViewChild('itemsTable')
    itemsTable: Table

    items: AuthorListDto[]

    totalItems = 0

    cols: any[]

    loading = false

    saving = false

    showDialog = false

    currentItem: AuthorFormDto

    lastLazyLoadEvent: LazyLoadEvent

    showDeleteDialog = false

    deleteIdItem = undefined

    constructor(private authorService: AuthorService) {
    }

    ngOnInit(): void {

        this.cols = [
            {field: 'firstName', header: 'First name'},
            {field: 'middleName', header: 'Middle name'},
            {field: 'lastName', header: 'Last name'},
        ]

        this.items = []

        this.loading = true
    }

    hideDialog() {
        this.showDialog = false
    }

    newItem() {
        this.currentItem = {} as AuthorFormDto
        this.showDialog = true
    }

    loadItems(event: LazyLoadEvent) {
        this.lastLazyLoadEvent = event
        this.fetchItems()
    }

    private fetchItems() {
        this.loading = true
        console.log(this.lastLazyLoadEvent)

        const filters = new Map<string, string>()

        Object.entries(this.lastLazyLoadEvent.filters).forEach((v) => {
            filters.set(v[0], v[1].value)
        })

        this.authorService.getAuthors(this.lastLazyLoadEvent.first, this.lastLazyLoadEvent.rows, filters)
            .pipe(take(1)).subscribe(res => {
            this.loading = false
            this.items = res['hydra:member']
            this.totalItems = res['hydra:totalItems']
        })
    }

    editItem(item) {
        this.loading = true
        this.authorService
            .getAuthor(item.id)
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

    confirmDeleteItem() {
        this.showDeleteDialog = false
        if (this.deleteIdItem) {
            this.loading = true
            this.authorService
                .deleteAuthor(this.deleteIdItem)
                .pipe(take(1))
                .subscribe(_ => {
                    this.fetchItems()
                })
            this.deleteIdItem = undefined
        }
    }

    hideDeleteDialog() {
        this.showDeleteDialog = false
        this.deleteIdItem = undefined
    }

    onItemSaved() {
        this.hideDialog()
        this.fetchItems()
    }

    onItemSaving(saving: boolean) {
        this.saving = saving
    }

}
