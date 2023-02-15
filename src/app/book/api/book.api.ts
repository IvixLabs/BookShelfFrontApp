import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {tap} from 'rxjs'
import {BookFormModel} from '../model/book-form.model'
import {AuthorFormDto} from '../../author/dto/author-form.dto'

@Injectable()
export class BookApi {

    constructor(private http: HttpClient) {
    }

    getBook(token: string, id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${token}`
        })

        return this.http
            .get<BookFormModel>(
                'http://api.dashskel.loc/api/books/' + id,
                {headers}
            )
    }

    getBooks(token: string, first: number, rows: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/ld+json',
            authorization: `Bearer ${token}`
        })

        const params = new HttpParams()
            .set('page', Math.floor(first / rows))
            .set('itemsPerPage', 2)

        return this.http
            .get<any>(
                'http://api.dashskel.loc/api/books',
                {headers, params}
            )
            .pipe(tap(res => console.log(res)))
    }

    createBook(token: string, book: BookFormModel) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${token}`
        })

        return this.http
            .post<BookFormModel>(
                'http://api.dashskel.loc/api/books',
                book,
                {headers}
            )
    }

    updateBook(token: string, book: BookFormModel) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${token}`
        })

        return this.http
            .put<BookFormModel>(
                'http://api.dashskel.loc/api/books/' + book.id,
                book,
                {headers}
            )
    }

    deleteBook(token: string, bookId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${token}`
        })

        return this.http
            .delete<AuthorFormDto>(
                'http://api.dashskel.loc/api/books/' + bookId,
                {headers}
            )

    }
}
