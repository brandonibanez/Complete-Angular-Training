import { CanActivateFn } from '@angular/router';
import { Test2Service } from '../../auth/service/test2.service';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(Test2Service);

  return toObservable(service.candidate).pipe(
    // Wait until the API response actually populates the signal
    filter(name => name !== null && name !== '' && name !== 'SUPER BOOGER!'),
    map(name => name === "John"),
    take(1)
  );

  // return service.candidate() === "John" ? true : false;
};