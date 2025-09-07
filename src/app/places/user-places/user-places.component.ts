import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  isFetching = signal(false);
  error = signal('');
  private destroyRef = inject(DestroyRef);
  placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;

  removeUserPlace(selectedPlace: Place) {
    const subscription = this.placesService
      .removeUserPlace(selectedPlace)
      .subscribe();

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
