import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, Briefcase, TrendingUp, Award, DollarSign, CheckCircle2, Clock, Users, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: 'gig' | 'internship' | 'job';
  match: number;
  pay: string;
  skills: string[];
}

export const LearnToEarnEngine = () => {
  const [earnings, setEarnings] = useState(245);
  const [matchedOpportunities, setMatchedOpportunities] = useState<Opportunity[]>([
    {
      id: '1',
      title: 'Data Entry Task',
      company: 'TechCorp Zambia',
      type: 'gig',
      match: 95,
      pay: 'K250',
      skills: ['Excel', 'Data Analysis'],
    },
    {
      id: '2',
      title: 'Junior Developer Intern',
      company: 'InnovateTech',
      type: 'internship',
      match: 82,
      pay: 'K2,500/mo',
      skills: ['JavaScript', 'React', 'Problem Solving'],
    },
    {
      id: '3',
      title: 'Content Writer',
      company: 'EduMedia',
      type: 'gig',
      match: 78,
      pay: 'K150/article',
      skills: ['Writing', 'Research', 'English'],
    },
  ]);

  const verifiedSkills = [
    { name: 'JavaScript', level: 85, verified: true },
    { name: 'Data Analysis', level: 72, verified: true },
    { name: 'Writing', level: 68, verified: true },
    { name: 'Problem Solving', level: 90, verified: true },
  ];

  const typeColors = {
    gig: 'from-emerald-500 to-teal-500',
    internship: 'from-blue-500 to-indigo-500',
    job: 'from-purple-500 to-pink-500',
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
            <Coins className="w-6 h-6 text-white" />
          </div>
          Learn-to-Earn Engine
          <Badge className="ml-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <DollarSign className="w-3 h-3 mr-1" />
            Real Income
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Earnings Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center">
            <Coins className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
            <p className="text-2xl font-bold">K{earnings}</p>
            <p className="text-xs text-muted-foreground">Total Earned</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-center">
            <Briefcase className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{matchedOpportunities.length}</p>
            <p className="text-xs text-muted-foreground">Matched Opportunities</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center">
            <Award className="w-8 h-8 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{verifiedSkills.length}</p>
            <p className="text-xs text-muted-foreground">Verified Skills</p>
          </div>
        </div>

        {/* Verified Skills */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Verified Skills (Employer Visible)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {verifiedSkills.map((skill) => (
              <div key={skill.name} className="p-3 rounded-xl border border-border/50 bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  {skill.verified && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <Progress value={skill.level} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{skill.level}% Mastery</p>
              </div>
            ))}
          </div>
        </div>

        {/* Matched Opportunities */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            AI-Matched Opportunities
          </h4>
          {matchedOpportunities.map((opp, index) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold">{opp.title}</h5>
                    <Badge className={`bg-gradient-to-r ${typeColors[opp.type]} text-white text-xs`}>
                      {opp.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{opp.company}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {opp.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-emerald-500 font-bold">
                    <DollarSign className="w-4 h-4" />
                    {opp.pay}
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-muted-foreground">Match: </span>
                    <span className={`font-bold ${opp.match >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {opp.match}%
                    </span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-3 gap-2" size="sm">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* How it Works */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
          <h4 className="font-semibold mb-3">How Learn-to-Earn Works</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">1</div>
              <span>Learn skills and get AI-verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">2</div>
              <span>AI matches you to real opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">3</div>
              <span>Complete gigs, earn real money</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
