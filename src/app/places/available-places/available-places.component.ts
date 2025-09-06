import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  isFetching = signal(false);
  error = signal('');
  private destroyRef = inject(DestroyRef);
  placesService = inject(PlacesService);
  userPlaces = this.placesService.loadedUserPlaces;
  places = this.placesService.loadedAvailablePlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      error: (err: Error) => this.error.set(err.message),
      complete: () => this.isFetching.set(false),
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (response) => console.log(response),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
