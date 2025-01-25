import { booleanAttribute, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../store/auth/auth.feature';

@Directive({
  selector: '[appIfLogged]'
})
export class IfLoggedDirective {

  store = inject(Store);
  viewContainerRef = inject(ViewContainerRef);
  templateRef = inject(TemplateRef);

  hideIfLogged = input(false, { transform: booleanAttribute, alias: 'appIfLogged' });

  isLogged = this.store.selectSignal(selectIsLogged);

  constructor() {

    effect(() => {

      this.viewContainerRef.clear();

      // Show element when use is logged in
      if (this.isLogged() && !this.hideIfLogged()) this.viewContainerRef.createEmbeddedView(this.templateRef);

      // Show element when use is logged out
      if (!this.isLogged() && this.hideIfLogged()) this.viewContainerRef.createEmbeddedView(this.templateRef);
    });

  }

}
