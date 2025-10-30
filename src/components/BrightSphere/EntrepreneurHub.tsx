import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, TrendingUp, DollarSign, Users, Rocket, Target, Briefcase, PieChart } from 'lucide-react';

export const EntrepreneurHub = () => {
  const businessTools = [
    {
      title: "AI Business Builder",
      description: "Generate complete business plans in minutes",
      icon: Lightbulb,
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Pitch Deck Creator",
      description: "Investor-ready presentations powered by AI",
      icon: Rocket,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Market Intelligence",
      description: "Real-time trends and competitor analysis",
      icon: TrendingUp,
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Funding Finder",
      description: "Discover grants and investors",
      icon: DollarSign,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const myVentures = [
    {
      name: "AgriTech Solution",
      stage: "MVP Development",
      progress: 65,
      funding: "ZMW 50,000",
      team: 4
    },
    {
      name: "EduApp Startup",
      stage: "Idea Validation",
      progress: 30,
      funding: "Bootstrapped",
      team: 2
    }
  ];

  const opportunities = [
    { title: "TechZed Innovation Grant", amount: "ZMW 100,000", deadline: "2 weeks" },
    { title: "Young Entrepreneur Award", amount: "ZMW 50,000", deadline: "1 month" },
    { title: "Green Business Fund", amount: "ZMW 200,000", deadline: "3 weeks" }
  ];

  return (
    <div className="space-y-6">
      {/* Business AI Tools */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            Entrepreneur AI Suite
          </CardTitle>
          <CardDescription>Build and scale your business with BrightSphere Intelligence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                  <Button size="sm" className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Ventures */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            My Ventures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {myVentures.map((venture, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold">{venture.name}</h3>
                    <Badge variant="outline" className="mt-1">{venture.stage}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{venture.funding}</p>
                    <p className="text-xs text-muted-foreground">{venture.team} team members</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Development Progress</span>
                    <span className="font-semibold">{venture.progress}%</span>
                  </div>
                  <Progress value={venture.progress} className="h-2" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">View Details</Button>
              </CardContent>
            </Card>
          ))}
          <Button className="w-full">
            <Lightbulb className="w-4 h-4 mr-2" />
            Start New Venture with AI
          </Button>
        </CardContent>
      </Card>

      {/* Funding Opportunities */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Active Funding Opportunities
          </CardTitle>
          <CardDescription>AI-matched grants and competitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {opportunities.map((opp, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-md transition-all">
                <div>
                  <h4 className="font-semibold text-sm">{opp.title}</h4>
                  <p className="text-xs text-muted-foreground">Closes in {opp.deadline}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{opp.amount}</p>
                  <Button size="sm" variant="ghost">Apply →</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Business Mentor */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6 text-center">
          <Users className="w-16 h-16 mx-auto mb-3 text-purple-600" />
          <h3 className="text-xl font-bold mb-2">AI Business Mentor</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get personalized coaching from BrightSphere's entrepreneurship AI
          </p>
          <Button className="w-full">
            Start Mentorship Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
