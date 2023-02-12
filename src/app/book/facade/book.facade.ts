import {Injectable} from '@angular/core'
import {BookApi} from '../api/book.api'
import {AuthState} from '../../auth/state/auth.state'
import {Observable, switchMap, take} from 'rxjs'
import {BookFormModel} from '../model/book-form.model'

@Injectable()
export class BookFacade {

    constructor(private bookApi: BookApi, private authState: AuthState) {
    }

    getBooks(first: number, rows: number): Observable<any> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => this.bookApi.getBooks(token, first, rows)))

    }

    saveBook(book: BookFormModel): Observable<any> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => {
                if (book.id) {
                    return this.bookApi.updateBook(token, book)
                } else {
                    return this.bookApi.createBook(token, book)
                }
            }))
    }
}
