
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Database, Upload, Loader2, Check, File, Search, Trash2 } from 'lucide-react';
import { toast } from "sonner";

interface KnowledgeDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

interface KnowledgeBaseSettingsProps {
  onKnowledgeBaseChange?: (knowledgeBase: string | null) => void;
}

const KnowledgeBaseSettings = ({ onKnowledgeBaseChange }: KnowledgeBaseSettingsProps) => {
  const [activeKnowledgeBase, setActiveKnowledgeBase] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([
    {
      id: '1',
      name: 'Computer Science 101',
      type: 'PDF',
      size: 1240000,
      uploadedAt: new Date()
    },
    {
      id: '2',
      name: 'Introduction to Physics',
      type: 'PDF',
      size: 2350000,
      uploadedAt: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: '3',
      name: 'College Admission Guidelines',
      type: 'DOCX',
      size: 560000,
      uploadedAt: new Date(Date.now() - 172800000) // 2 days ago
    }
  ]);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newDocument: KnowledgeDocument = {
        id: (documents.length + 1).toString(),
        name: 'New Upload ' + new Date().toISOString().slice(0, 10),
        type: 'PDF',
        size: Math.random() * 1000000 + 500000,
        uploadedAt: new Date()
      };
      
      setDocuments([...documents, newDocument]);
      setIsUploading(false);
      toast.success('Document uploaded successfully');
    }, 2000);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast.info('Document deleted');
  };

  const handleActivateKnowledgeBase = (name: string) => {
    const newActiveBase = activeKnowledgeBase === name ? null : name;
    setActiveKnowledgeBase(newActiveBase);
    
    if (onKnowledgeBaseChange) {
      onKnowledgeBaseChange(newActiveBase);
    }
    
    toast.success(newActiveBase 
      ? `Knowledge base "${name}" activated` 
      : 'Knowledge base deactivated');
  };

  const filteredDocuments = searchTerm.trim() === '' 
    ? documents 
    : documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Database className="h-5 w-5 text-violet-400" />
          Knowledge Base
        </CardTitle>
        <CardDescription className="text-gray-400">
          Upload documents to enhance the AI's knowledge
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              className="pl-10 bg-white/5 border-white/10 text-white"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleFileUpload}
            disabled={isUploading}
            variant="secondary"
            className="gap-2"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload
          </Button>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            <p>No documents found</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {filteredDocuments.map((doc) => (
              <div 
                key={doc.id} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  activeKnowledgeBase === doc.name
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <File className="h-10 w-10 text-violet-300 p-2 bg-violet-500/10 rounded" />
                  <div>
                    <p className="font-medium text-white">{doc.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{formatSize(doc.size)}</span>
                      <span>•</span>
                      <span>{formatDate(doc.uploadedAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleActivateKnowledgeBase(doc.name)}
                    className={activeKnowledgeBase === doc.name ? 'text-emerald-400' : 'text-gray-400'}
                  >
                    {activeKnowledgeBase === doc.name ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Database className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-400 hover:text-red-400"
                    onClick={() => handleDeleteDocument(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
        <div className="text-xs text-gray-400">
          {documents.length} document{documents.length !== 1 ? 's' : ''} in total
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-violet-400"
          onClick={() => {
            if (activeKnowledgeBase) {
              setActiveKnowledgeBase(null);
              if (onKnowledgeBaseChange) {
                onKnowledgeBaseChange(null);
              }
              toast.info('Knowledge base deactivated');
            }
          }}
          disabled={!activeKnowledgeBase}
        >
          Reset Knowledge Base
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KnowledgeBaseSettings;
