
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sparkles, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LLMModel {
  id: string;
  name: string;
  description: string;
  vendor: string;
  costPerToken: number;
  strengths: string[];
  isDefault?: boolean;
}

interface LLMSelectorProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

const models: LLMModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Most advanced model with strong reasoning capabilities',
    vendor: 'OpenAI',
    costPerToken: 0.00005,
    strengths: ['Knowledge', 'Reasoning', 'Instruction-following'],
    isDefault: true,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'High-performance model with excellent instruction following',
    vendor: 'Anthropic',
    costPerToken: 0.00004,
    strengths: ['Long-form text', 'Safety', 'Creativity'],
  },
  {
    id: 'llama-3-70b',
    name: 'Llama-3 70B',
    description: 'Strong open model with broad knowledge',
    vendor: 'Meta',
    costPerToken: 0.00002,
    strengths: ['Cost-effective', 'Open-source friendly'],
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Multimodal model with strong analysis capabilities',
    vendor: 'Google',
    costPerToken: 0.00003,
    strengths: ['Multimodal', 'Academic content', 'Real-time data'],
  },
];

const LLMSelector = ({ selectedModel, onSelectModel }: LLMSelectorProps) => {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5 text-amber-400" />
          Language Models
        </CardTitle>
        <CardDescription className="text-gray-400">
          Select the AI model that powers your voice agent
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <RadioGroup 
          value={selectedModel} 
          onValueChange={onSelectModel}
          className="space-y-3"
        >
          {models.map((model) => (
            <div 
              key={model.id}
              className={`flex items-center space-x-3 rounded-lg border p-4 ${
                selectedModel === model.id
                  ? 'border-amber-500/50 bg-amber-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <RadioGroupItem 
                value={model.id} 
                id={model.id} 
                className={selectedModel === model.id ? 'text-amber-400' : ''}
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <Label 
                    htmlFor={model.id} 
                    className={`font-medium ${selectedModel === model.id ? 'text-amber-400' : 'text-white'}`}
                  >
                    {model.name}
                  </Label>
                  {model.isDefault && (
                    <span className="ml-2 text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                  <span className="ml-auto text-xs text-gray-400">{model.vendor}</span>
                </div>
                
                <p className="mt-1 text-sm text-gray-400">{model.description}</p>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {model.strengths.map((strength, idx) => (
                    <span 
                      key={`${model.id}-strength-${idx}`} 
                      className="text-xs bg-white/5 text-gray-300 px-2 py-0.5 rounded-full"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-400">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cost: ${model.costPerToken.toFixed(6)} per token</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default LLMSelector;
