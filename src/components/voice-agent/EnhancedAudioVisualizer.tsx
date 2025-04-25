import React, { useEffect, useRef, useState } from 'react';

interface EnhancedAudioVisualizerProps {
  isActive: boolean;
  audioData?: number[] | null;
  speakingIntensity?: number; // 0-1 value representing speech intensity
  isSpeaking?: boolean;
  color?: string;
}

const EnhancedAudioVisualizer = ({ 
  isActive, 
  audioData = null, 
  speakingIntensity = 0,
  isSpeaking = false,
  color = '#9b87f5'
}: EnhancedAudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationId, setAnimationId] = useState<number | null>(null);
  
  // Use real audio data if provided, otherwise generate simulated data
  const getVisualizationData = (width: number): number[] => {
    if (audioData && audioData.length > 0) {
      // Use actual audio data if available
      return audioData;
    }
    
    // Otherwise generate simulated data based on speaking status
    const dataPoints = Math.floor(width / 5);
    const baseAmplitude = isSpeaking ? 0.5 : 0.2;
    const variationAmplitude = isSpeaking ? 0.5 : 0.2;
    const intensity = speakingIntensity > 0 ? speakingIntensity : (isSpeaking ? 0.8 : 0.3);
    
    return Array.from({ length: dataPoints }, () => {
      const randomVariation = Math.random() * variationAmplitude;
      return baseAmplitude + (randomVariation * intensity);
    });
  };
  
  useEffect(() => {
    if (!canvasRef.current || !isActive) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Drawing function for the visualizer
    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const data = getVisualizationData(canvas.width);
      const barWidth = canvas.width / data.length;
      
      // Draw visualization based on audio data
      ctx.fillStyle = color;
      
      data.forEach((value, i) => {
        // Create a smooth wave effect
        const x = i * barWidth;
        const height = value * canvas.height;
        const y = canvas.height - height;
        
        // Draw rounded bars
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth - 1, height, 2);
        ctx.fill();
      });
      
      const id = requestAnimationFrame(draw);
      setAnimationId(id);
    };
    
    draw();
    
    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', resize);
    };
  }, [isActive, audioData, isSpeaking, speakingIntensity, color]);
  
  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`w-2 h-2 ${isSpeaking ? 'bg-green-500' : 'bg-gray-400'} rounded-full ${isSpeaking ? 'animate-pulse' : ''} mr-2`} />
          <span className="text-sm text-white font-medium">
            {isSpeaking ? 'Speaking' : 'Audio Stream'}
          </span>
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

export default EnhancedAudioVisualizer;
