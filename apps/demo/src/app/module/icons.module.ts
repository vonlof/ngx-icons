import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsComponent } from './icons.component';
import { NgxIconModule } from '@vonlof/ngx-icons';
import * as DemoIcons from '../../icons/generated';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IconsComponent,
      },
    ]),
    NgxIconModule.forChild(Object.values(DemoIcons)),
  ],
})
export class IconsModule {}
