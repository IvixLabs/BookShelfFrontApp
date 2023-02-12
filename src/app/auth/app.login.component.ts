import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {AuthModel} from './model/auth.model'
import {AuthFacade} from './facade/auth.facade'

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit {


    authModel$: Observable<AuthModel>

    token$: Observable<string>

    constructor(private authFacade: AuthFacade) {
        this.authModel$ = authFacade.getAuthModel$()
        this.token$ = authFacade.getToken$()
    }

    onAuthSave() {
        this.authFacade.login()
    }

    onAuthUpdate() {
        this.authFacade.update()
    }

    ngOnInit(): void {
        this.authFacade.initAuthModel()
    }

}
