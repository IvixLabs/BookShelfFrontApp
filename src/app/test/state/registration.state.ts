import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {RegistrationModel} from '../model/registration.model';

@Injectable()
export class RegistrationState {

    private registrationModel$ = new BehaviorSubject<RegistrationModel>(undefined)

    getRegistrationModel$() {
        return this.registrationModel$.asObservable()
    }

    setRegistrationModel(registrationModel: RegistrationModel) {
        this.registrationModel$.next(registrationModel)
    }

}
