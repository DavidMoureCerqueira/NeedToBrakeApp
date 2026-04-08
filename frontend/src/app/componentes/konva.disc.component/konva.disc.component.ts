import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
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

  constructor() {
    afterNextRender(() => {
      const cont = this.container().nativeElement;
      const width = cont.offsetWidth;
      const height = cont.offsetHeight;

      this.stage = new Konva.Stage({
        container: cont,
        width: width,
        height: height,
      });
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);
      if (this.disc()) {
        this.drawDisc();
      }
    });

    effect(() => {
      if (!this.disc() || !this.layer) {
        console.log('Esperando datos del disco o inicialización de Konva...');
        return;
      }

      console.log('Dibujando disco:', this.disc());
      this.drawDisc();
    });
  }

  private drawDisc() {
    if (!this.layer || !this.stage || !this.disc) {
      console.error('It was imposible to draw');
      return;
    }
    const discData = this.disc()!;
    this.layer.destroyChildren();
    const s = this.stage;
    const centerX = s.width() / 2;
    const centerY = s.height() / 2;
    const padding = 20;
    const availableSpace = Math.min(s.width(), s.height()) - padding;
    const scale = availableSpace / discData.diameter;

    const outerCircle = new Konva.Circle({
      x: centerX,
      y: centerY,
      radius: (discData.diameter / 2) * scale,
      fill: '#EEEA',
      stroke: 'black',
      strokeWidth: 1,
    });
    const centerBore = new Konva.Circle({
      x: centerX,
      y: centerY,
      radius: (discData.centerBore / 2) * scale,
      fill: '#EEEA',
      stroke: 'black',
      strokeWidth: 1,
    });

    const innerCenter = new Konva.Circle({
      x: centerX,
      y: centerY,
      radius: (discData.pcd / 2 + 20) * scale,
      fill: '#EEEA',
      stroke: 'black',
      strokeWidth: 1,
    });
    this.layer.add(outerCircle);
    this.layer.add(centerBore);
    this.layer.add(innerCenter);

    this.drawBolts(s, this.layer, scale);
    this.layer.draw();
  }
  private drawBolts(stage: Konva.Stage, layer: Konva.Layer, scale: number) {
    const discData = this.disc();
    const numHoles = this.disc()!.holes || 5;
    const pcdRadius = (discData!.pcd / 2) * scale;
    const centerX = stage.width() / 2;
    const centerY = stage.height() / 2;
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < numHoles; i++) {
      const angle = startAngle + (i * 2 * Math.PI) / numHoles;

      const x = centerX + pcdRadius * Math.cos(angle);
      const y = centerY + pcdRadius * Math.sin(angle);

      const boltHole = new Konva.Circle({
        x: x,
        y: y,
        radius: 6 * scale,
        fill: '#EEEA',
        stroke: 'black',
        strokeWidth: 1,
      });

      layer.add(boltHole);
    }
  }
}
