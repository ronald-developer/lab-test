import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent?: CoreModule) {
    if (parent) {
        throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    };
  }
}
