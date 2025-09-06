import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { map, catchError, throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchAvailablePlaces(
      'http://localhost:3000/places',
      'Failed to fetch places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchAvailablePlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places. Please try again later.'
    );
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpClient.put('http://localhost:3000/user-places/', {
      placeId,
    });
  }

  removeUserPlace(place: Place) {}

  private fetchAvailablePlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((err) => {
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
