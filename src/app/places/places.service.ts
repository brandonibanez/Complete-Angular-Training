import { computed, inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { map, catchError, throwError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private availablePlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();
  loadedAvailablePlaces = this.availablePlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchAvailablePlaces(
      'http://localhost:3000/places',
      'Failed to fetch places. Please try again later.'
    ).pipe(
      map((places) => {
        this.availablePlaces.set(places);
        return places;
      }));
  }

  loadUserPlaces() {
    return this.fetchAvailablePlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places. Please try again later.'
    ).pipe(tap((userPlaces) => this.userPlaces.set(userPlaces)));
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (prevPlaces.some((p) => p.id === place.id)) {
      return throwError(() => new Error('You already added this place to your places.'));
    } else {
      // Optimistic update
      this.userPlaces.set([...prevPlaces, place]);
    }
    

    return this.httpClient.put('http://localhost:3000/user-places/', {
      placeId: place.id,
    }).pipe(catchError((err) => {
      this.userPlaces.set(prevPlaces);
      return throwError(() => new Error('Failed to add place. Please try again later.'));
    }));
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
