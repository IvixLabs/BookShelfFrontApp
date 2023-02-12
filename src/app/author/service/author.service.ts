import {Injectable} from '@angular/core'
import {AuthState} from '../../auth/state/auth.state'
import {Observable, switchMap, take} from 'rxjs'
import {AuthorApi} from '../author.api'
import {AuthorFormDto} from '../dto/author-form.dto'

@Injectable()
export class AuthorService {

    constructor(private authorApi: AuthorApi, private authState: AuthState) {
    }

    getAuthor(id: string): Observable<AuthorFormDto> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => this.authorApi.getAuthor(token, id)))

    }


    getAuthors(first: number, rows: number, filters: Map<string, string>): Observable<any> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => this.authorApi.getAuthors(token, first, rows, filters)))

    }

    deleteAuthor(authorId: string): Observable<any> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => this.authorApi.deleteAuthor(token, authorId)))

    }

    saveAuthor(author: AuthorFormDto): Observable<any> {
        return this.authState.getToken$()
            .pipe(take(1))
            .pipe(switchMap(token => {
                if (author.id) {
                    return this.authorApi.updateAuthor(token, author)
                } else {
                    return this.authorApi.createAuthor(token, author)
                }
            }))
    }
}
