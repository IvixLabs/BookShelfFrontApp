import {Injectable} from '@angular/core'
import {combineLatest, combineLatestWith, take} from 'rxjs'
import {AuthState} from '../state/auth.state'
import {AuthModel} from '../model/auth.model'
import {Router} from '@angular/router'
import {LocalService} from '../../shared/local.service'

@Injectable()
export class AuthFacade {

    constructor(
        private authState: AuthState,
        private router: Router,
        private localService: LocalService) {
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
        combineLatest([
            this.authState.getAuthModel$(),
        ])
            .pipe(take(1))
            .subscribe(v => {
                const [auth] = v

                fetch('http://api.dashskel.loc/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(auth)
                })
                    .then(response => response.json())
                    .then(json => {
                        this.authState.setToken(json.token)
                        this.localService.saveData('authToken', json.token)

                        const lastUrl = this.getLastUrl()
                        if (lastUrl) {
                            this.router.navigate([lastUrl])
                        } else {
                            this.router.navigate(['/'])
                        }
                    })
            })
    }

    logout() {
        this.resetToken()
        this.router.navigate(['/login'])
    }

}
