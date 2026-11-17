import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListsRoutingModule } from './shopping-lists-routing-module';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ShoppingListsRoutingModule, SharedModule],
})
export class ShoppingListsModule {}