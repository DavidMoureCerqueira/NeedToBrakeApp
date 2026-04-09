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
@Component({
  selector: 'konva-disc-component',
  imports: [],
  templateUrl: './konva.disc.component.html',
  styleUrl: './konva.disc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KonvaDiscComponent {
  disc = input.required<DiscClean | null>();
  container = viewChild.required<ElementRef<HTMLDivElement>>('konvaContainer');

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
    const computedStyle = window.getComputedStyle(cont);
    const bgColor = computedStyle.backgroundColor;
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

    this.layer.add(this.drawDiameter(centerX, centerY, diameter, scale));
    this.layer.add(this.drawInnerCenter(centerX, centerY, pcd, scale));
    this.layer.add(this.drawCenterBore(centerX, centerY, centerBore, scale, bgColor));

    this.drawBolts(this.stage, this.layer, scale, pcd, holes, bgColor);
    this.layer.draw();
  }
  private drawCenterBore(
    centerX: number,
    centerY: number,
    centerBore: number,
    scale: number,
    color: string,
  ) {
    return new Konva.Circle({
      x: centerX,
      y: centerY,
      radius: (centerBore / 2) * scale,
      fill: color, // Color del fondo del componente
      stroke: '#1e293b', // Un borde fino y oscuro para definir el corte
      strokeWidth: 1,
    });
  }
  private drawDiameter(centerX: number, centerY: number, diameter: number, scale: number) {
    const radius = (diameter / 2) * scale;
    return new Konva.Circle({
      x: centerX,
      y: centerY,
      radius: radius,
      // Gradiente radial para simular metal pulido
      fillRadialGradientStartPoint: { x: 0, y: 0 },
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: { x: 0, y: 0 },
      fillRadialGradientEndRadius: radius,
      fillRadialGradientColorStops: [0, '#cbd5e1', 0.8, '#94a3b8', 1, '#475569'],
      stroke: '#1e293b',
      strokeWidth: 1,
    });
  }

  private drawInnerCenter(centerX: number, centerY: number, pcd: number, scale: number) {
    const innerRadius = (pcd / 2 + 20) * scale;
    return new Konva.Circle({
      x: centerX,
      y: centerY,
      radius: innerRadius,
      fillRadialGradientStartPoint: { x: 0, y: 0 },
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: { x: 0, y: 0 },
      fillRadialGradientEndRadius: innerRadius,
      fillRadialGradientColorStops: [0, '#f1f5f9', 0.9, '#cbd5e1', 1, '#64748b'],
      stroke: '#1e293b',
      strokeWidth: 1,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: { x: 2, y: 2 },
      shadowOpacity: 0.2,
    });
  }
  private drawBolts(
    stage: Konva.Stage,
    layer: Konva.Layer,
    scale: number,
    pcd: number,
    holes: number,
    color: string,
  ) {
    const pcdRadius = (pcd / 2) * scale;
    const centerX = stage.width() / 2;
    const centerY = stage.height() / 2;

    for (let i = 0; i < holes; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / holes;
      const x = centerX + pcdRadius * Math.cos(angle);
      const y = centerY + pcdRadius * Math.sin(angle);

      layer.add(
        new Konva.Circle({
          x: x,
          y: y,
          radius: 7 * scale,
          fill: color,
          stroke: '#334155',
          strokeWidth: 1.5,
        }),
      );
    }
  }
}
