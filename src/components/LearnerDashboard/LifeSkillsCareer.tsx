import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, GraduationCap, TrendingUp, Star, Clock, 
  BookOpen, Award, Users, Globe, Lightbulb, Target,
  ChevronRight, Sparkles, Building2, Stethoscope, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LifeSkillsCareer = () => {
  const lifeSkills = [
    { name: 'Study Skills', progress: 75, icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
    { name: 'Time Management', progress: 60, icon: Clock, color: 'from-purple-500 to-pink-600' },
    { name: 'Digital Literacy', progress: 85, icon: Globe, color: 'from-cyan-500 to-blue-600' },
    { name: 'Financial Basics', progress: 40, icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
  ];

  const careerPaths = [
    { 
      title: 'Medical & Healthcare', 
      icon: Stethoscope,
      match: 78,
      subjects: ['Biology', 'Chemistry'],
      color: 'from-red-500 to-rose-600'
    },
    { 
      title: 'Engineering & Technology', 
      icon: Code,
      match: 85,
      subjects: ['Mathematics', 'Physics'],
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      title: 'Business & Finance', 
      icon: Briefcase,
      match: 72,
      subjects: ['Mathematics', 'Commerce'],
      color: 'from-amber-500 to-orange-600'
    },
    { 
      title: 'Education & Teaching', 
      icon: GraduationCap,
      match: 80,
      subjects: ['English', 'Civic Education'],
      color: 'from-green-500 to-emerald-600'
    },
  ];

  const opportunities = [
    { 
      title: 'UNICEF Zambia Scholarship', 
      type: 'Scholarship',
      deadline: 'March 30, 2026',
      eligibility: 'Grade 12 students'
    },
    { 
      title: 'Zambia Youth Tech Bootcamp', 
      type: 'Training',
      deadline: 'February 15, 2026',
      eligibility: 'Ages 15-21'
    },
    { 
      title: 'STEM Girls Initiative', 
      type: 'NGO Program',
      deadline: 'Open enrollment',
      eligibility: 'Female students'
    },
  ];

  return (
    <div className="space-y-4">
      {/* Life Skills Section */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Life Skills Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lifeSkills.map((skill, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <skill.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-medium text-sm mb-2">{skill.name}</h4>
                <Progress value={skill.progress} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">{skill.progress}% mastered</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Pathways */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Career Pathways
            </span>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              AI Matched
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {careerPaths.map((career, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${career.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <career.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-primary/10 text-primary border-0">
                    {career.match}% match
                  </Badge>
                </div>
                <h4 className="font-semibold mb-2">{career.title}</h4>
                <div className="flex flex-wrap gap-1">
                  {career.subjects.map((subject, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link to="/skill-passport">
            <Button variant="outline" className="w-full mt-4 gap-2">
              Explore All Career Paths
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Opportunities */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Award className="w-5 h-5 text-primary" />
            Scholarships & Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {opportunities.map((opp, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{opp.title}</h4>
                    <Badge variant="secondary" className="text-xs">{opp.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{opp.eligibility}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="text-xs font-medium">{opp.deadline}</p>
                </div>
              </div>
            </div>
          ))}
          <Button className="w-full gap-2">
            <Star className="w-4 h-4" />
            View All Opportunities
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
