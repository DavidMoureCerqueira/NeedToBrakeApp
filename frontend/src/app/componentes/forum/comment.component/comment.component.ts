import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Comment } from '../../../interfaces/post/comment';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'comment-component',
  imports: [DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  isEditing = signal<boolean>(false);
  authService = inject(AuthService);
  comment = input.required<Comment>();
  editContent = new FormControl('', [Validators.required, Validators.minLength(1)]);
  isOwner = signal<boolean>(false);
  constructor() {
    effect(() => {
      this.isOwner.set(this.authService.currentUserId === this.comment().author.id);
    });
  }
  startEdit() {
    this.editContent.setValue(this.comment().content);
    this.isEditing.set(true);
  }
  // private fb = inject(FormBuilder);

  // profileForm = this.fb.group({
  //   content: [''],
  //   : [''],
  //   favPads: [''],
  //   favCircuit: [''],
  // });

  // toggleIsEditing() {
  //   if (!this.isEditing()) {
  //     const current = this.comment();
  //     if (current) {
  //       this.profileForm.patchValue({
  //         country: current.country,
  //         flag: current.flag,
  //         favCircuit: current.favCircuit,
  //         favPads: current.favPads,
  //       });
  //     }
  //   }
  //   this.isEditing.set(!this.isEditing());
  // }

  // onSaveChanges() {
  //   if (this.profileForm.invalid) return;
  //   this.userService.updateProfile(this.profileForm.value as ProfileEdit).subscribe({
  //     next: () => {
  //       this.userService.profileResource.reload();
  //     },
  //     error: (msg: string) => {
  //       console.log('ERROR:', msg);
  //     },
  //   });
  //   this.isEditing.set(false);
  // }
}
