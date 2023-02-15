import {RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import {AppMainComponent} from './app.main.component'
import {AppNotfoundComponent} from './pages/app.notfound.component'
import {AppErrorComponent} from './pages/app.error.component'
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component'
import {AppLoginComponent} from './auth/app.login.component'
import {AuthGuard} from './auth/auth.guard'
import {BookPageComponent} from './book/book-page.component'
import {AuthorPageComponent} from './author/author-page.component'
import {HomePageComponent} from './home/home-page.component'

@NgModule({
    imports: [
        RouterModule.forRoot([
                {
                    path: '', component: AppMainComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {path: '', component: HomePageComponent},
                        {path: 'books', component: BookPageComponent},
                        {path: 'authors', component: AuthorPageComponent},
                        // {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                        // {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                        // {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                        // {path: 'uikit/input', component: InputDemoComponent},
                        // {path: 'uikit/button', component: ButtonDemoComponent},
                        // {path: 'uikit/table', component: TableDemoComponent},
                        // {path: 'uikit/list', component: ListDemoComponent},
                        // {path: 'uikit/tree', component: TreeDemoComponent},
                        // {path: 'uikit/panel', component: PanelsDemoComponent},
                        // {path: 'uikit/overlay', component: OverlaysDemoComponent},
                        // {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                        // {path: 'uikit/media', component: MediaDemoComponent},
                        // {path: 'uikit/message', component: MessagesDemoComponent},
                        // {path: 'uikit/misc', component: MiscDemoComponent},
                        // {path: 'uikit/charts', component: ChartsDemoComponent},
                        // {path: 'uikit/file', component: FileDemoComponent},
                        // {path: 'utilities/icons', component: IconsComponent},
                        // {path: 'pages/crud', component: AppCrudComponent},
                        // {path: 'pages/calendar', component: AppCalendarComponent},
                        // {path: 'pages/timeline', component: AppTimelineDemoComponent},
                        // {path: 'pages/invoice', component: AppInvoiceComponent},
                        // {path: 'pages/help', component: AppHelpComponent},
                        // {path: 'pages/empty', component: EmptyDemoComponent},
                        // {path: 'documentation', component: DocumentationComponent},
                        // {path: 'blocks', component: BlocksComponent},
                        // {path: 'test', component: TestPageComponent},
                    ]
                },
                {path: 'error', component: AppErrorComponent},
                {path: 'access', component: AppAccessdeniedComponent},
                {path: 'notfound', component: AppNotfoundComponent},
                {path: 'login', component: AppLoginComponent},
                {path: '**', redirectTo: '/notfound'},
            ],
            {
                scrollPositionRestoration: 'enabled'
            }
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
