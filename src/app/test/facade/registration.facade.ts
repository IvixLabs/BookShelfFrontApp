import {Injectable} from '@angular/core'
import {RegistrationState} from '../state/registration.state'
import {combineLatest, take} from 'rxjs'
import {RegistrationModel} from '../model/registration.model'

@Injectable()
export class RegistrationFacade {


    constructor(private registrationState: RegistrationState) {
    }

    getRegistrationModel$() {
        return this.registrationState.getRegistrationModel$()
    }

    initRegistrationModel() {
        this.registrationState.setRegistrationModel({} as RegistrationModel)
    }

    update() {
        this.registrationState.getRegistrationModel$()
            .pipe(take(1))
            .subscribe(v => {
                this.registrationState.setRegistrationModel(v)
            })
    }

    save() {
        combineLatest([
            this.registrationState.getRegistrationModel$(),
        ])
            .pipe(take(1))
            .subscribe(v => {
                console.log(v)
            })
    }

}
