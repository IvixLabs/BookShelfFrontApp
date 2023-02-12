import {Injectable} from '@angular/core'
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {catchError, Observable, of, throwError} from 'rxjs'
import {AuthFacade} from './facade/auth.facade'
import {Router} from '@angular/router'

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

    constructor(private authFacade: AuthFacade, private router: Router) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(catchError((error: HttpErrorResponse) => {
                if (error.error.code === 401) {
                    this.authFacade.resetToken()
                    this.authFacade.setLastUrl(this.router.url)
                    this.router.navigate(['/login'])
                    //return of(undefined)
                } else {
                    //return throwError(() => error)
                }

                return throwError(() => error)
            }))
    }
}
