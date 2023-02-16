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

    getToken() {
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

    resetToken() {
        this.localService.removeData('authToken')
        this.authState.setToken(undefined)
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
        console.log('Begin auth')
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
                    this.authState.setToken(res.token)
                    this.localService.saveData('authToken', res.token)

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
