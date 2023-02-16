import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'

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
                'http://api.dashskel.loc/auth',
                authDto,
                {headers}
            )
    }
}
