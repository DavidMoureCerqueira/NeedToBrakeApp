import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DiscClean } from '../../interfaces/disc/disc.clean';
import Konva from 'konva';
import { DiscKonvaFactory } from '../../factory/disc.konva.factory';

@Component({
  selector: 'konva-profile-disc-component',
  imports: [],
  templateUrl: './konva.profile.disc.component.html',
  styleUrl: './konva.profile.disc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KonvaProfileDiscComponent {
  disc = input.required<DiscClean | null>();
  private stage?: Konva.Stage;
  private layer?: Konva.Layer;
  private stageReady = signal<boolean>(false);
  container = viewChild.required<ElementRef<HTMLDivElement>>('konvaContainerProfile');
  bgColor = input<string>();

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
        this.drawDiscProfile();
      }
    });
  }

  private drawDiscProfile() {
    const cont = this.container().nativeElement;
    const stageWidth = cont.offsetWidth;
    const stageHeight = cont.offsetHeight;

    if (stageWidth === 0 || stageHeight === 0 || !this.layer || !this.stage || !this.disc()) return;

    this.stage.width(stageWidth);
    this.stage.height(stageHeight);

    const d = this.disc()!;
    const diameter = d.diameter || 280;
    const thickness = d.thickness || 25;
    const height = d.height || 45;
    const pcd = d.pcd || 112;
    const isVented = d.style?.toLowerCase() === 'vented';

    this.layer.destroyChildren();

    const padding = 20;
    const MAX_REAL_DIAMETER = 420;
    const availableSpace = stageHeight - padding;
    const scale = availableSpace / MAX_REAL_DIAMETER;

    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    const drawDiameter = diameter * scale;
    const drawThickness = thickness * scale;
    const drawTotalHeight = height * scale;
    const hatDiameter = (pcd + 35) * scale;

    const xStart = centerX - drawTotalHeight / 2;

    this.layer.add(
      DiscKonvaFactory.createDiscHat(xStart, centerY, hatDiameter, drawTotalHeight, drawThickness),
    );

    const xBrakeZone = xStart + (drawTotalHeight - drawThickness);

    if (!isVented) {
      this.layer.add(
        DiscKonvaFactory.createSolidThickness(xBrakeZone, centerY, drawDiameter, drawThickness),
      );
    } else {
      this.layer.add(
        DiscKonvaFactory.createVentilatedProfile(xBrakeZone, centerY, drawDiameter, drawThickness),
      );
    }
  }
}
