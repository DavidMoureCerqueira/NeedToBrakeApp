import { Router, type ResolveFn } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Profile } from '../interfaces/users/profile';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const profileResolver: ResolveFn<Observable<Profile>> = (route, state) => {
  const profileService = inject(UserService);
  const router = inject(Router);
  const id = route.paramMap.get('id');
  if (!id || !Number(id)) {
    router.navigate(['/404']);
    return EMPTY;
  }
  profileService.currentProfileId.set(Number(id));
  return profileService.getProfileResourceAsObservable();
};
