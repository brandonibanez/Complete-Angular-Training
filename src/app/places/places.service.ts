import { computed, inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { map, catchError, throwError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private availablePlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();
  loadedAvailablePlaces = this.availablePlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchAvailablePlaces(
      'http://localhost:3000/places',
      'Failed to fetch places. Please try again later.'
    ).pipe(
      map((places) => {
        const filtered = places.filter(
          (place) =>
            !this.userPlaces().some((userPlace) => userPlace.id === place.id)
        );
        this.availablePlaces.set(filtered);
        return filtered;
      })
    );
  }

  loadUserPlaces() {
    return this.fetchAvailablePlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places. Please try again later.'
    ).pipe(tap((userPlaces) => this.userPlaces.set(userPlaces)));
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    this.availablePlaces.set(this.availablePlaces().filter((p) => p.id !== place.id));
    this.userPlaces.set([...this.userPlaces(), place]);
    // if (prevPlaces.some((p) => p.id === place.id)) {
    //   this.errorService.showError('Place is already present.');
    // } else {
    //   this.availablePlaces.set(
    //     this.availablePlaces().filter((p) => p.id !== place.id)
    //   );
    //   this.userPlaces.set([...prevPlaces, place]);
    // }

    return this.httpClient
      .put('http://localhost:3000/user-places/', {
        placeId: place.id,
      })
      .pipe(
        catchError((err) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Place is already present.');
          return throwError(
            () => new Error('Failed to add place. Please try again later.')
          );
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    this.userPlaces.set(this.userPlaces().filter((p) => p.id !== place.id));
    this.availablePlaces.set([...this.availablePlaces(), place]);

    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((err) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Error removing place.');
          return throwError(
            () => new Error('Failed to remove place. Please try again later.')
          );
        })
      );
  }

  private fetchAvailablePlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((err) => {
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
