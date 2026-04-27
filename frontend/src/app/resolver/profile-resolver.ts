import type { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/users/profile';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const profileResolver: ResolveFn<Observable<Profile>> = (route, state) => {
  const profileService = inject(UserService);
  const id = route.paramMap.get('id');
  return profileService.getProfile(id!);
};
