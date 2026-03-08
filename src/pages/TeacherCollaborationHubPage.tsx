import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Calendar, Globe, Share, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  { icon: Users, title: "Collaboration Matcher", desc: "AI matches you with teachers by ECZ subjects, grade levels, and specializations for effective peer learning.", badge: "AI" },
  { icon: MessageSquare, title: "Discussion Threads", desc: "Real-time discussions on teaching strategies, lesson plans, and best practices with fellow educators.", badge: "LIVE" },
  { icon: Calendar, title: "Peer Observations", desc: "Schedule and manage peer observation sessions with structured feedback forms and follow-ups.", badge: "NEW" },
  { icon: Globe, title: "Multilingual Support", desc: "Collaborate in 7 Zambian languages with real-time translation for inclusive professional development." },
  { icon: Share, title: "Resource Sharing", desc: "Share and discover ECZ-aligned teaching materials, worksheets, and assessment tools with peers." },
  { icon: Sparkles, title: "Professional Growth", desc: "Track your collaboration hours and professional development milestones toward CPD credits." },
];

const TeacherCollaborationHubPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        Collaboration Hub
      </h1>
      <p className="text-sm text-muted-foreground mt-1">Connect, share, and grow with fellow ECZ educators</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <Card key={index} className="group hover:shadow-md transition-all duration-200 hover:border-primary/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              {feature.badge && (
                <Badge variant={feature.badge === 'LIVE' ? 'destructive' : feature.badge === 'AI' ? 'default' : 'secondary'} className="text-[10px]">
                  {feature.badge}
                </Badge>
              )}
            </div>
            <CardTitle className="text-sm mt-3">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{feature.desc}</p>
            <Button variant="outline" size="sm" className="w-full gap-2 text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Access <ArrowRight className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default TeacherCollaborationHubPage;
