// High-Fidelity CSS Houdini Paint Worklet Blueprint
class CircuitBoardPaintWorklet {
  // Declare the custom properties we want the worklet to look at
  static get inputProperties() {
    return ['--scroll-progress', '--accent-color'];
  }

  paint(ctx, geom, properties) {
    // 1. Extract dynamic custom variables passed from our app
    const scrollProgress = parseFloat(properties.get('--scroll-progress').toString()) || 0;
    const accentColor = properties.get('--accent-color').toString().trim() || '#7B2FBE';

    const width = geom.width;
    const height = geom.height;

    // Clear background canvas container footprint implicitly
    ctx.clearRect(0, 0, width, height);

    // 2. Render Procedural Electronic Trace Configurations
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = accentColor;
    ctx.globalAlpha = 0.15; // Soft ambient engineering overlay glow

    // Generate fixed randomized seeds for drawing traces
    const traceCount = 8;
    for (let i = 0; i < traceCount; i++) {
      const startY = (height / traceCount) * i + 20;
      const startX = 0;

      ctx.beginPath();
      ctx.moveTo(startX, startY);

      // Procedural 45-degree electronic trace bending math paths
      const firstBendX = width * 0.3 + (i * 15);
      const secondBendX = width * 0.6 + (i * 15);
      const bendOffset = 40 * scrollProgress; // ✨ Geometry physically morphs live based on scroll value!

      ctx.lineTo(firstBendX, startY);
      ctx.lineTo(firstBendX + 30, startY + bendOffset);
      ctx.lineTo(secondBendX, startY + bendOffset);
      ctx.lineTo(secondBendX + 30, startY);
      ctx.lineTo(width, startY);
      ctx.stroke();

      // Draw microscopic logic gate node dots at the joints
      if (scrollProgress > 0.1) {
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(firstBendX + 30, startY + bendOffset, 2.5, 0, Math.PI * 2);
        ctx.arc(secondBendX, startY + bendOffset, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.15;
      }
    }
  }
}

// Register the class inside the global Houdini registry thread map context
registerPaint('circuit-board-traces', CircuitBoardPaintWorklet);