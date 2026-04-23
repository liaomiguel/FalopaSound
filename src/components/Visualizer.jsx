import React, { useEffect, useRef } from 'react';

const Visualizer = ({ analyser }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(3, 7, 18, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barCount = 64;
      const barWidth = (canvas.width / barCount);
      let x = 0;

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i] * 1.5;
        const barHeight = (value / 255) * canvas.height;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#00e5ff33');
        gradient.addColorStop(1, '#00e5ff');

        ctx.fillStyle = gradient;
        const roundedHeight = Math.max(2, barHeight);
        ctx.fillRect(x, canvas.height - roundedHeight, barWidth - 2, roundedHeight);
        x += barWidth;
      }
    };

    draw();
  }, [analyser]);

  return (
    <div className="visualizer-container">
      <div className="visualizer-label">FREQUENCY_ANALYSIS</div>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={100}
        className="visualizer-canvas"
      />
    </div>
  );
};

export default React.memo(Visualizer);
