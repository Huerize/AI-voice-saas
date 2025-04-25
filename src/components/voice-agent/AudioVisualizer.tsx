
import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
}

const AudioVisualizer = ({ isActive }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !isActive) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let animationId: number;
    
    // Generate random data for visualization
    const generateRandomData = () => {
      const dataPoints = Math.floor(canvas.width / 5);
      return Array.from({ length: dataPoints }, () => Math.random() * 0.8 + 0.2);
    };
    
    const draw = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const data = generateRandomData();
      const barWidth = canvas.width / data.length;
      
      ctx.fillStyle = '#9b87f5';
      
      data.forEach((value, i) => {
        const x = i * barWidth;
        const height = value * canvas.height;
        const y = canvas.height - height;
        ctx.fillRect(x, y, barWidth - 1, height);
      });
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);
  
  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
          <span className="text-sm text-white font-medium">Audio Stream</span>
        </div>
        <span className="text-xs text-gray-400">Real-time visualization</span>
      </div>
      <canvas 
        ref={canvasRef} 
        className="w-full h-24 rounded-lg bg-black/30"
      />
    </div>
  );
};

export default AudioVisualizer;
