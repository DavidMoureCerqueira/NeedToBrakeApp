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
import { DiscClean } from '../../interfaces/disc.clean';
import Konva from 'konva';

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

    // 1. Sincronizar Stage
    this.stage.width(stageWidth);
    this.stage.height(stageHeight);

    const d = this.disc()!;
    const diameter = d.diameter || 280;
    const thickness = d.thickness || 25;
    const height = d.height || 45;
    const pcd = d.pcd || 112;
    const isVented = d.style?.toLowerCase() === 'vented';

    this.layer.destroyChildren();

    // 2. ESCALA UNIFICADA (Tu fórmula)
    const padding = 20;
    const availableSpace = stageHeight - padding;
    const scale = availableSpace / diameter;

    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    // 3. Dimensiones escaladas
    const drawDiameter = diameter * scale;
    const drawThickness = thickness * scale;
    const drawTotalHeight = height * scale;
    const hatDiameter = (pcd + 35) * scale; // Diámetro de la campana basado en PCD

    // --- DIBUJO ---

    // Posición X inicial para centrar el bloque total (sombrero + pista)
    const xStart = centerX - drawTotalHeight / 2;

    // A. SOMBRERO
    const sombrero = new Konva.Rect({
      x: xStart,
      y: centerY - hatDiameter / 2,
      width: drawTotalHeight - drawThickness / 2,
      height: hatDiameter,
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: 0, y: hatDiameter },
      fillLinearGradientColorStops: [0, '#64748b', 0.5, '#f1f5f9', 1, '#64748b'],
      stroke: '#1e293b',
      strokeWidth: 1,
      cornerRadius: 4,
    });
    this.layer.add(sombrero);

    // B. PISTA DE FRENADO
    const xPista = xStart + (drawTotalHeight - drawThickness);

    if (!isVented) {
      // DISCO SÓLIDO
      const solidDisc = new Konva.Rect({
        x: xPista,
        y: centerY - drawDiameter / 2,
        width: drawThickness,
        height: drawDiameter,
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: drawThickness, y: 0 },
        fillLinearGradientColorStops: [0, '#475569', 0.5, '#cbd5e1', 1, '#475569'],
        stroke: '#1e293b',
        strokeWidth: 1,
        cornerRadius: 1,
      });
      this.layer.add(solidDisc);
    } else {
      // DISCO VENTILADO
      const plateT = drawThickness * 0.25;
      const gapWidth = drawThickness - plateT * 2;
      const xGap = xPista + plateT;

      // 1. Fondo del canal (para que se vea el interior coloreado)
      const fondoCanal = new Konva.Rect({
        x: xGap,
        y: centerY - drawDiameter / 2,
        width: gapWidth,
        height: drawDiameter,
        fill: '#1e293b', // Un azul/gris muy oscuro para simular profundidad
        opacity: 0.8,
      });
      this.layer.add(fondoCanal);

      // 2. Cara Exterior
      const p1 = new Konva.Rect({
        x: xPista,
        y: centerY - drawDiameter / 2,
        width: plateT,
        height: drawDiameter,
        fill: '#94a3b8',
        stroke: '#334155',
        strokeWidth: 1,
      });

      // 3. Cara Interior
      const p2 = new Konva.Rect({
        x: xPista + drawThickness - plateT,
        y: centerY - drawDiameter / 2,
        width: plateT,
        height: drawDiameter,
        fill: '#94a3b8',
        stroke: '#334155',
        strokeWidth: 1,
      });

      // 4. Canales internos (ahora sobre el fondo oscuro)
      const vents = new Konva.Group();
      const numVents = 35;
      for (let i = 0; i < numVents; i++) {
        const y = centerY - drawDiameter / 2 + (drawDiameter / (numVents + 1)) * (i + 1);
        vents.add(
          new Konva.Line({
            points: [xGap, y, xGap + gapWidth, y],
            stroke: '#64748b', // Color más claro para que contraste con el fondo oscuro
            strokeWidth: 1,
            opacity: 0.5,
          }),
        );
      }
      this.layer.add(p1, p2, vents);
    }
  }
}
