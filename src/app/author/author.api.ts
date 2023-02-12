import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {tap} from 'rxjs'
import {AuthorFormDto} from './dto/author-form.dto'

@Injectable()
export class AuthorApi {

    constructor(private http: HttpClient) {
    }


    getAuthor(token: string, id: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/ld+json',
            authorization: `Bearer ${token}`
        })

        return this.http
            .get<AuthorFormDto>(
                'http://api.dashskel.loc/api/authors/' + id,
                {headers}
            )
    }

    getAuthors(token: string, first: number, rows: number, filters: Map<string, string>) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/ld+json',
            authorization: `Bearer ${token}`
        })

        let params = new HttpParams()
            .set('page', 1 + Math.floor(first / rows))
            .set('itemsPerPage', rows)


        filters.forEach((v, k) => {
            params = params.set(k, v)
        })

        console.log(params.toString())

        return this.http
            .get<any>(
                'http://api.dashskel.loc/api/authors',
                {headers, params}
            )
    }

    createAuthor(token: string, author: AuthorFormDto) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${token}`
        })

        return this.http
            .post<AuthorFormDto>(
                'http://api.dashskel.loc/api/authors',
                author,
                {headers}
            )
    }

    updateAuthor(token: string, author: AuthorFormDto) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${token}`
        })

        return this.http
            .put<AuthorFormDto>(
                'http://api.dashskel.loc/api/authors/' + author.id,
                author,
                {headers}
            )

    }

    deleteAuthor(token: string, authorId: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${token}`
        })

        return this.http
            .delete<AuthorFormDto>(
                'http://api.dashskel.loc/api/authors/' + authorId,
                {headers}
            )

    }
}
