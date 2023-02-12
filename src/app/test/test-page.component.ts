import {Component, OnInit} from '@angular/core'
import {RegistrationFacade} from './facade/registration.facade'
import {Observable, take} from 'rxjs'
import {RegistrationModel} from './model/registration.model'
import {AuthFacade} from '../auth/facade/auth.facade'
import {AuthModel} from '../auth/model/auth.model'

@Component({
    templateUrl: './test-page.component.html'
})
export class TestPageComponent implements OnInit {

    registrationModel$: Observable<RegistrationModel>

    authModel$: Observable<AuthModel>

    token$: Observable<string>

    constructor(private registrationFacade: RegistrationFacade,
                private authFacade: AuthFacade
    ) {
        this.registrationModel$ = registrationFacade.getRegistrationModel$()
        this.authModel$ = authFacade.getAuthModel$()
        this.token$ = authFacade.getToken$()
    }

    onSave() {
        this.registrationFacade.save()
    }

    onUpdate() {
        this.registrationFacade.update()
    }

    onAuthSave() {
        this.authFacade.login()
    }

    onAuthUpdate() {
        this.authFacade.update()
    }

    ngOnInit(): void {
        this.registrationFacade.initRegistrationModel()
        this.authFacade.initAuthModel()
    }

    fetchData() {
        this.token$.pipe(take(1))
            .subscribe(token => {
                console.log(token)

                fetch('http://api.dashskel.loc/api/books/1', {
                    method: 'GET',
                    headers: {

                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(json => console.log(json))
            })
    }

}
