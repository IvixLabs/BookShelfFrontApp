import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {AuthModel} from '../model/auth.model'

@Injectable()
export class AuthState {

    private authModel$ = new BehaviorSubject<AuthModel>(undefined)

    private token$ = new BehaviorSubject<string>(undefined)

    private lastUrl$ = new BehaviorSubject<string>(undefined)

    private lastError$ = new BehaviorSubject<string>(undefined)


    getLastError$() {
        return this.lastError$.asObservable()
    }

    setLastError(error: string) {
        this.lastError$.next(error)
    }

    getAuthModel$() {
        return this.authModel$.asObservable()
    }

    getAuthModel() {
        return this.authModel$.getValue()
    }

    setAuthModel(authModel: AuthModel) {
        this.authModel$.next(authModel)
    }

    getToken$() {
        return this.token$.asObservable()
    }

    getToken() {
        return this.token$.getValue()
    }

    setToken(token: string) {
        this.token$.next(token)
    }

    getLastUrl$() {
        return this.lastUrl$.asObservable()
    }

    getLastUrl() {
        return this.lastUrl$.getValue()
    }

    setLastUrl(token: string) {
        this.lastUrl$.next(token)
    }

}
