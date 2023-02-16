import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {AuthModel} from './model/auth.model'
import {AuthFacade} from './facade/auth.facade'
import {Observable} from 'rxjs'

@Component({
    templateUrl: './auth-form.component.html',
    selector: 'app-auth-form'
})
export class AuthFormComponent implements OnInit {

    @Input()
    authModel: AuthModel

    @Output()
    saved = new EventEmitter()

    @Output()
    updated = new EventEmitter()

    lastError$: Observable<string>

    constructor(private authFacade: AuthFacade) {
        this.lastError$ = authFacade.getLastError$()
    }

    save() {
        this.saved.emit()
    }

    update() {
        this.updated.emit()
        this.authFacade.resetLastError()
    }

    ngOnInit(): void {
    }

}
