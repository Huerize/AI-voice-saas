
import React from 'react';
import { Calendar, Phone, MessageCircle, User } from 'lucide-react';

const mockTranscripts = [
  {
    id: 'tr-1234',
    date: 'Today at 2:30 PM',
    agent: 'Customer Service Bot',
    duration: '05:42',
    caller: 'John Smith',
    transcript: 'Hello, I need help with my recent order. It was supposed to arrive yesterday but I haven\'t received it yet...'
  },
  {
    id: 'tr-1235',
    date: 'Today at 1:15 PM',
    agent: 'Sales Agent Bot',
    duration: '03:18',
    caller: 'Emily Johnson',
    transcript: 'Hi there, I\'m interested in your premium subscription plan. Can you tell me more about the features included?'
  },
  {
    id: 'tr-1236',
    date: 'Today at 11:45 AM',
    agent: 'Technical Support Bot',
    duration: '08:27',
    caller: 'Robert Chen',
    transcript: 'I\'m having trouble accessing my account. I keep getting an error message when I try to log in...'
  }
];

const RecentTranscriptsPanel = () => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Transcripts</h2>
      <div className="space-y-4">
        {mockTranscripts.map((transcript) => (
          <div key={transcript.id} className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-violet-400" />
                <span className="text-white font-medium">{transcript.agent}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>{transcript.date}</span>
                <span>•</span>
                <span>{transcript.duration}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <User className="h-4 w-4 text-gray-400 mt-1" />
              <span className="text-sm text-gray-300">{transcript.caller}</span>
            </div>
            <div className="flex items-start gap-2">
              <MessageCircle className="h-4 w-4 text-gray-400 mt-1" />
              <p className="text-sm text-gray-300 line-clamp-2">{transcript.transcript}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTranscriptsPanel;
