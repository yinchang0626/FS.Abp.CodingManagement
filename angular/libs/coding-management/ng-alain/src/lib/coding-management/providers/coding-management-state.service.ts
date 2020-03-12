import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class CodingManagementStateService{
  constructor(private store:Store) {}
}