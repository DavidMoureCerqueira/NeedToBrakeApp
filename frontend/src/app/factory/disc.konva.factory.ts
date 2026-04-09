import Konva from 'konva';

export class DiscKonvaFactory {
  static drawCenterBore(
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
      fill: color,
      stroke: '#1e293b',
      strokeWidth: 1,
    });
  }
  static createDiameter(centerX: number, centerY: number, diameter: number, scale: number) {
    const radius = (diameter / 2) * scale;
    return new Konva.Circle({
      x: centerX,
      y: centerY,
      radius: radius,

      fillRadialGradientStartPoint: { x: 0, y: 0 },
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: { x: 0, y: 0 },
      fillRadialGradientEndRadius: radius,
      fillRadialGradientColorStops: [0, '#cbd5e1', 0.8, '#94a3b8', 1, '#475569'],
      stroke: '#1e293b',
      strokeWidth: 1,
    });
  }

  static createInnerCenter(centerX: number, centerY: number, pcd: number, scale: number) {
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
  static createBolts(
    centerX: number,
    centerY: number,
    scale: number,
    pcd: number,
    holes: number,
    color: string,
  ) {
    const group = new Konva.Group();
    const pcdRadius = (pcd / 2) * scale;

    for (let i = 0; i < holes; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / holes;
      group.add(
        new Konva.Circle({
          x: centerX + pcdRadius * Math.cos(angle),
          y: centerY + pcdRadius * Math.sin(angle),
          radius: 7 * scale,
          fill: color,
          stroke: '#334155',
          strokeWidth: 1.5,
        }),
      );
    }
    return group;
  }

  static createDiscHat(
    xStart: number,
    centerY: number,
    hatDiameter: number,
    drawTotalHeight: number,
    drawThickness: number,
  ) {
    return new Konva.Rect({
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
  }
  static createSolidThickness(
    xBrakeZone: number,
    centerY: number,
    drawDiameter: number,
    drawThickness: number,
  ) {
    return new Konva.Rect({
      x: xBrakeZone,
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
  }

  static createVentilatedProfile(
    xBrakeZone: number,
    centerY: number,
    drawDiameter: number,
    drawThickness: number,
  ): Konva.Group {
    const group = new Konva.Group();

    const plateT = drawThickness * 0.25;
    const gapWidth = drawThickness - plateT * 2;
    const xGap = xBrakeZone + plateT;

    const backgroundCanal = new Konva.Rect({
      x: xGap,
      y: centerY - drawDiameter / 2,
      width: gapWidth,
      height: drawDiameter,
      fill: '#1e293b',
      opacity: 0.8,
    });

    const exteriorFace = new Konva.Rect({
      x: xBrakeZone,
      y: centerY - drawDiameter / 2,
      width: plateT,
      height: drawDiameter,
      fill: '#94a3b8',
      stroke: '#334155',
      strokeWidth: 1,
    });

    const interiorFace = new Konva.Rect({
      x: xBrakeZone + drawThickness - plateT,
      y: centerY - drawDiameter / 2,
      width: plateT,
      height: drawDiameter,
      fill: '#94a3b8',
      stroke: '#334155',
      strokeWidth: 1,
    });

    group.add(backgroundCanal, exteriorFace, interiorFace);

    const numVents = 35;
    for (let i = 0; i < numVents; i++) {
      const y = centerY - drawDiameter / 2 + (drawDiameter / (numVents + 1)) * (i + 1);
      group.add(
        new Konva.Line({
          points: [xGap, y, xGap + gapWidth, y],
          stroke: '#64748b',
          strokeWidth: 1,
          opacity: 0.5,
        }),
      );
    }

    return group;
  }
}
