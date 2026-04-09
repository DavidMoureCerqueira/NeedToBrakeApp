import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import Konva from 'konva';
import { DiscClean } from '../../interfaces/disc.clean';
import { DiscKonvaFactory } from '../../factory/disc.konva.factory';

@Component({
  selector: 'konva-disc-component',
  templateUrl: './konva.disc.component.html',
  styleUrl: './konva.disc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KonvaDiscComponent {
  disc = input.required<DiscClean | null>();
  container = viewChild.required<ElementRef<HTMLDivElement>>('konvaContainer');
  bgColor = input<string>('#2b4f47');
  private stage?: Konva.Stage;
  private layer?: Konva.Layer;
  isDrawable = signal<boolean>(false);
  isWarning = model<boolean>(false);
  private stageReady = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      const cont = this.container().nativeElement;

      this.stage = new Konva.Stage({
        container: cont,
        width: cont.offsetWidth,
        height: cont.offsetHeight,
      });
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);
      this.stageReady.set(true);
    });

    effect(() => {
      if (this.stageReady() && this.disc()) {
        this.drawDisc();
      }
    });
  }

  private drawDisc() {
    if (!this.layer || !this.stage || !this.disc()) {
      console.error('It was imposible to draw');
      this.isDrawable.set(false);
      return;
    }

    const cont = this.container().nativeElement;
    const width = cont.offsetWidth;
    const height = cont.offsetHeight;

    if (width === 0 || height === 0) {
      this.isDrawable.set(false);
      return;
    }
    this.stage.width(width);
    this.stage.height(height);
    const missingData =
      !this.disc()!.diameter ||
      !this.disc()!.centerBore ||
      !this.disc()!.pcd ||
      !this.disc()!.holes;
    this.isWarning.set(missingData);
    this.isDrawable.set(true);
    const diameter = this.disc()!.diameter || 280;
    const centerBore = this.disc()!.centerBore || 60;
    const pcd = this.disc()!.pcd || 112;
    const holes = this.disc()!.holes || 5;

    this.layer.destroyChildren();

    const centerX = this.stage.width() / 2;
    const centerY = this.stage.height() / 2;
    const padding = 20;
    const availableSpace = Math.min(this.stage.width(), this.stage.height()) - padding;
    const scale = availableSpace / diameter;

    this.layer.add(DiscKonvaFactory.createDiameter(centerX, centerY, diameter, scale));
    this.layer.add(DiscKonvaFactory.createInnerCenter(centerX, centerY, pcd, scale));
    this.layer.add(
      DiscKonvaFactory.drawCenterBore(centerX, centerY, centerBore, scale, this.bgColor()!),
    );

    this.layer.add(
      DiscKonvaFactory.createBolts(centerX, centerY, scale, pcd, holes, this.bgColor()),
    );
    this.layer.draw();
  }
}
