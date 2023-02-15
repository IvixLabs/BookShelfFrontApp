import {Injectable} from '@angular/core'
import {BookApi} from '../api/book.api'
import {AuthState} from '../../auth/state/auth.state'
import {Observable, switchMap, take} from 'rxjs'
import {BookFormModel} from '../model/book-form.model'

@Injectable()
export class BookService {

    constructor(private bookApi: BookApi, private authState: AuthState) {
    }

    getBook(id: string): Observable<BookFormModel> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => this.bookApi.getBook(token, id)))

    }

    getBooks(first: number, rows: number): Observable<any> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => this.bookApi.getBooks(token, first, rows)))

    }

    deleteBook(authorId: string): Observable<any> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => this.bookApi.deleteBook(token, authorId)))
    }

    saveBook(book: BookFormModel): Observable<any> {
        const newBook = {...book}

        if (typeof newBook.author !== 'object') {
            newBook.author = undefined
        }

        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => {
                if (book.id) {
                    return this.bookApi.updateBook(token, newBook)
                } else {
                    return this.bookApi.createBook(token, newBook)
                }
            }))
    }
}
