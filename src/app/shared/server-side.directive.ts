import {Directive, Input, OnDestroy, OnInit} from '@angular/core'
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms'
import {
    BehaviorSubject,
    catchError,
    Observable,
    OperatorFunction,
    takeUntil,
    tap
} from 'rxjs'
import {filter} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'


@Directive({
    selector: '[appServerSide]',
    providers: [{provide: NG_VALIDATORS, useExisting: ServerSideDirective, multi: true}]
})
export class ServerSideDirective implements Validator, OnInit, OnDestroy {

    @Input('appServerSide')
    errors$: Observable<Map<string, string>>

    private lastErrors: Map<string, string> = new Map()

    private lastValue = undefined

    @Input()
    name: string

    private destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined)

    validatorChangeFn: () => void

    validate(control: AbstractControl): ValidationErrors | null {

        if (!control.dirty) {
            this.lastValue = control.value
        }

        let res = null

        if (this.lastErrors.has(this.name)) {
            if (this.lastValue !== control.value) {
                this.lastErrors.delete(this.name)
            } else {
                control.markAsDirty()
                res = {serverSide: this.lastErrors.get(this.name)}
            }
        }

        this.lastValue = control.value

        return res
    }

    ngOnInit(): void {
        this.errors$
            .pipe(takeUntil(this.destroyed$.pipe(filter(v => v))))
            .subscribe(errors => {
                this.lastErrors = errors
                if (this.validatorChangeFn) {
                    this.validatorChangeFn()
                }
            })
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true)
    }

    registerOnValidatorChange(fn: () => void): void {
        this.validatorChangeFn = fn
    }
}


function getClearTap(errors$: BehaviorSubject<Map<string, string>>): OperatorFunction<any, any> {
    return tap(res => {
        const errors = errors$.getValue()
        errors.clear()
        errors$.next(errors)
    })
}

function getCatchErrors(errors$: BehaviorSubject<Map<string, string>>): OperatorFunction<any, any> {
    return catchError((res) => {

        if (res instanceof HttpErrorResponse) {

            if (res.status === 422 && res.error) {
                const errors = errors$.getValue()

                for (const violation of res.error.violations) {
                    errors.set(violation.propertyPath, violation.message)
                }

                errors$.next(errors)
            }

        }

        throw res
    })
}

export function getHelperOperatorFunctions(errors$: BehaviorSubject<Map<string, string>>):
    [OperatorFunction<any, any>, OperatorFunction<any, any>] {
    return [getClearTap(errors$), getCatchErrors(errors$)]
}
