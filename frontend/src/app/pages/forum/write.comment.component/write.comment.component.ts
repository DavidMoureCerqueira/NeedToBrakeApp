import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'write-comment-component',
  imports: [ReactiveFormsModule],
  templateUrl: './write.comment.component.html',
  styleUrl: './write.comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WriteCommentComponent {
  private fb = inject(NonNullableFormBuilder);
  onSubmit = output<string>();
  onCancel = output();
  commentForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)]],
  });
  sendComment() {
    if (this.commentForm.invalid) return;
    const value = this.commentForm.controls.text.value;
    this.onSubmit.emit(value);
    this.commentForm.reset();
  }
}
