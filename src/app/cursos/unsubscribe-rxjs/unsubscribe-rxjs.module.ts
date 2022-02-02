import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { PocComponent } from './componentes/poc.component';
import { PocAsyncComponent } from './componentes/poc-async.component';
import { PocTakeUntilComponent } from './componentes/poc-take-until.component';
import { PocTakeComponent } from './componentes/poc-take.component';
import { PocUnsubComponent } from './componentes/poc-unsub.component';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';


@NgModule({
  declarations: [
    PocBaseComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent,
    UnsubscribePocComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule,

  ]
})
export class UnsubscribeRxjsModule {}
