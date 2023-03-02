import {Injectable} from '@angular/core'
import {catchError, take} from 'rxjs'
import {AuthState} from '../state/auth.state'
import {AuthModel} from '../model/auth.model'
import {Router} from '@angular/router'
import {LocalService} from '../../shared/local.service'
import {AuthApi} from '../auth.api'

@Injectable()
export class AuthFacade {

    constructor(
        private authApi: AuthApi,
        private authState: AuthState,
        private router: Router,
        private localService: LocalService) {
    }

    getLastError$() {
        return this.authState.getLastError$()
    }

    resetLastError() {
        this.authState.setLastError(undefined)
    }

    getAuthModel$() {
        return this.authState.getAuthModel$()
    }

    getToken$() {
        return this.authState.getToken$()
    }

    getToken(): string | undefined {
        let token = this.authState.getToken()
        if (token === undefined) {
            const savedAuthToken = this.localService.getData('authToken')
            if (savedAuthToken !== undefined) {
                token = savedAuthToken
                this.authState.setToken(savedAuthToken)
            }
        }

        return token
    }

    getTokenDate(): Date | undefined {
        let tokenDate = this.authState.getTokenDate()
        if (tokenDate === undefined) {
            const savedAuthTokenDate = this.localService.getData('authTokenDate')
            if (savedAuthTokenDate !== undefined) {
                tokenDate = new Date(Number.parseInt(savedAuthTokenDate, 10))
                this.authState.setTokenDate(tokenDate)
            }
        }

        return tokenDate
    }

    isTokenExpired(): boolean {
        const now = new Date()
        const tokenDate = this.getTokenDate()

        if (tokenDate === undefined) {
            return true
        }

        const diff = Math.round((now.getTime() - tokenDate.getTime()) / 1000)

        return diff > 3600
    }

    resetToken() {
        this.localService.removeData('authToken')
        this.authState.setToken(undefined)

        this.localService.removeData('authDate')
        this.authState.setTokenDate(undefined)
    }

    getLastUrl() {
        return this.authState.getLastUrl()
    }

    setLastUrl(lastUrl: string) {
        return this.authState.setLastUrl(lastUrl)
    }

    initAuthModel() {
        this.authState.setAuthModel({} as AuthModel)
    }

    update() {
        this.authState.getAuthModel$()
            .pipe(take(1))
            .subscribe(v => {
                this.authState.setAuthModel(v)
            })
    }

    login() {
        const auth = this.authState.getAuthModel()
        this.authApi
            .getAuthToken(auth)
            .pipe(catchError(err => {
                console.log('Catch error')
                console.log(err)
                this.authState.setLastError('Wrong credentials')
                throw err
            }))
            .subscribe(res => {
                if (res) {
                    this.authState.setTokenDate(new Date())
                    this.authState.setToken(res.token)

                    this.localService.saveData('authToken', this.authState.getToken())
                    this.localService.saveData('authTokenDate', this.authState.getTokenDate().getTime().toString())

                    const lastUrl = this.getLastUrl()
                    if (lastUrl) {
                        this.router.navigate([lastUrl])
                    } else {
                        this.router.navigate(['/'])
                    }
                }
            })
    }

    logout() {
        this.resetToken()
        this.router.navigate(['/login'])
    }

}
