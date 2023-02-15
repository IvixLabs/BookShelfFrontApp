import {Component} from '@angular/core'
import {AppComponent} from './app.component'
import {AppMainComponent} from './app.main.component'
import {AuthFacade} from './auth/facade/auth.facade'

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(
        public app: AppComponent,
        public appMain: AppMainComponent,
        private authService: AuthFacade
    ) {}

    logout() {
        this.authService.logout()
    }
}
