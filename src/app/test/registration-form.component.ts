import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {RegistrationModel} from './model/registration.model'

@Component({
    templateUrl: './registration-form.component.html',
    selector: 'app-registration-form'
})
export class RegistrationFormComponent implements OnInit {

    @Input()
    registrationModel: RegistrationModel

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
