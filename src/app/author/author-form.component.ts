import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core'
import {BehaviorSubject, catchError, take} from 'rxjs'
import {getHelperOperatorFunctions} from '../shared/server-side.directive'
import {AuthorFormDto} from './dto/author-form.dto'
import {AuthorService} from './service/author.service'

@Component({
    templateUrl: './author-form.component.html',
    selector: 'app-author-form',
})
export class AuthorFormComponent implements OnInit, OnDestroy {

    @Input()
    item: AuthorFormDto

    errors$: BehaviorSubject<Map<string, string>> = new BehaviorSubject(new Map<string, string>())

    @Output()
    saved = new EventEmitter<boolean>()

    @Output()
    saving = new EventEmitter<boolean>()

    constructor(private authorService: AuthorService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.item = undefined
    }


    save(): void {
        this.saving.emit(true)
        this.authorService.saveAuthor(this.item)
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
