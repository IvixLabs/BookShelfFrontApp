import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {environment} from '../../environments/environment'
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
                environment.apiHost + '/api/authors/' + id,
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

        return this.http
            .get<any>(
                environment.apiHost + '/api/authors',
                {headers, params}
            )
    }

    getAuthorSuggestions(token: string, first: number, rows: number, filters: Map<string, string>) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${token}`
        })

        let params = new HttpParams()

        filters.forEach((v, k) => {
            params = params.set(k, v)
        })

        return this.http
            .get<any>(
                environment.apiHost + '/api/authors/suggestions',
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
                environment.apiHost + '/api/authors',
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
                environment.apiHost + '/api/authors/' + author.id,
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
                environment.apiHost + '/api/authors/' + authorId,
                {headers}
            )

    }
}
