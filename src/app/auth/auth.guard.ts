import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import {AuthFacade} from './facade/auth.facade'
import {Observable} from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private authFacade: AuthFacade, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authFacade.getToken()) {
            return true
        }
        this.authFacade.setLastUrl(state.url)

        return this.router.parseUrl('/login')
    }
}
