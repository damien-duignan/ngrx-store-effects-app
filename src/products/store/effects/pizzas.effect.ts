import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromService from '../../services';

@Injectable()
export class PizzaEffects {
  constructor(
    private actions$: Actions, 
    private pizzaService: fromService.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$
    .ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaService.getPizzas().pipe(
          map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
        )
      })
    )
}