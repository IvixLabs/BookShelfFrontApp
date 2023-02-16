import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {environment} from '../../environments/environment'
@Injectable()
export class AuthApi {

    constructor(private http: HttpClient) {
    }

    getAuthToken(authDto) {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            accept: 'application/json',
        })

        return this.http
            .post<any>(
                environment.apiHost + '/auth',
                authDto,
                {headers}
            )
    }
}
