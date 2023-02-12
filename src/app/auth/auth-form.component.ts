import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {AuthModel} from './model/auth.model'

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

    save() {
        this.saved.emit()
    }

    update() {
        this.updated.emit()
    }

    ngOnInit(): void {
    }

}
