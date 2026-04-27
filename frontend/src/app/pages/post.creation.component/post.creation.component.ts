import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { map, of, startWith, switchMap } from 'rxjs';
import { CascadeService } from '../../services/cascade.service';
import { FormatVersionPipe } from '../../pipes/format.version.pipe';
import { ForumService } from '../../services/forum.service';
import { postCreation } from '../../interfaces/post/post.creation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { successMessages } from '../../../utils/successMessages';

@Component({
  selector: 'app-post-creation-component',
  imports: [ReactiveFormsModule, RouterLink, FormatVersionPipe],
  templateUrl: './post.creation.component.html',
  styleUrl: './post.creation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreationComponent {
  private fb = inject(FormBuilder);
  private cascadeService = inject(CascadeService);
  private forumService = inject(ForumService);
  private router = inject(Router);
  brands = toSignal(this.cascadeService.getBrands(), { initialValue: [] });
  private snackbar = inject(MatSnackBar);
  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(10)]],
    content: ['', [Validators.required, Validators.maxLength(1000)]],
    brandId: ['', []],
    modelId: [{ value: '', disabled: true }, []],
    versionId: [{ value: '', disabled: true }, []],
  });

  brandIdChanges = toSignal(
    this.postForm.get('brandId')!.valueChanges.pipe(
      startWith(this.postForm.get('brandId')?.value || ''),
      map((value) => Number(value)),
    ),
  );
  private brandId = this.postForm.get('brandId')!.valueChanges.pipe(
    startWith(this.postForm.get('brandId')?.value || ''),
    map((value) => Number(value)),
  );
  models = toSignal(
    this.brandId.pipe(
      switchMap((id) => {
        if (!id) {
          this.postForm.get('modelId')?.disable();
          return of([]);
        }
        this.postForm.get('modelId')?.enable();

        return this.cascadeService.getModels(id);
      }),
    ),
  );
  private modelId = this.postForm.get('modelId')!.valueChanges.pipe(
    startWith(this.postForm.get('modelId')?.value || ''),
    map((value) => Number(value)),
  );
  versions = toSignal(
    this.modelId.pipe(
      switchMap((id) => {
        if (!id) {
          this.postForm.get('versionId')?.disable();
          return of([]);
        }
        this.postForm.get('versionId')?.enable();
        return this.cascadeService.getVersions(id);
      }),
    ),
  );
  onSubmit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    const title = this.postForm.value.title;
    const content = this.postForm.value.content;
    if (!title || !content) {
      // TODO mostrar un error
      console.error('Not valid post');
      return;
    }
    const versionId = Number(this.postForm.value.versionId) || undefined;
    console.log(this.postForm.value);
    const post: postCreation = {
      title: this.postForm.value.title!,
      content: this.postForm.value.content!,
      versionId: versionId,
    };
    this.forumService.createPost(post).subscribe({
      next: (response) => {
        if (response.success) {
          //TODO mostrar mensaje de que se ha creado correctamente (no se si aqui o en el servicio)
          // TODO hacer un is loading que si incorporaria aqui para evitar posts duplicados.
          this.snackbar.open(successMessages.POST_CREATED, 'close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['forum']);
        }
      },
    });
  }
}
