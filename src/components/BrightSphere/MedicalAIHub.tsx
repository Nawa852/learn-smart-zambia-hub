import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Brain, Book, Users, Activity, FileText, AlertCircle } from 'lucide-react';

export const MedicalAIHub = () => {
  const medicalTools = [
    {
      title: "AI Case Simulator",
      description: "Practice diagnosis with AI-generated patient cases",
      icon: Stethoscope,
      gradient: "from-blue-500 to-cyan-500",
      difficulty: "Advanced"
    },
    {
      title: "3D Anatomy Explorer",
      description: "Interactive body systems with AI explanations",
      icon: Activity,
      gradient: "from-green-500 to-teal-500",
      difficulty: "All Levels"
    },
    {
      title: "Drug Interaction Database",
      description: "Voice-search medicines and check interactions",
      icon: Book,
      gradient: "from-purple-500 to-pink-500",
      difficulty: "Intermediate"
    },
    {
      title: "Clinical Note Generator",
      description: "AI-assisted medical documentation",
      icon: FileText,
      gradient: "from-orange-500 to-red-500",
      difficulty: "Professional"
    }
  ];

  const recentCases = [
    {
      caseId: "CASE-2024-001",
      patient: "35-year-old female",
      presenting: "Chest pain, shortness of breath",
      status: "In Progress",
      accuracy: 85
    },
    {
      caseId: "CASE-2024-002",
      patient: "12-year-old male",
      presenting: "Fever, rash",
      status: "Completed",
      accuracy: 92
    }
  ];

  return (
    <div className="space-y-6">
      {/* Medical AI Tools */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Medical AI Learning Suite
          </CardTitle>
          <CardDescription>Advanced clinical training powered by BrightSphere</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicalTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{tool.difficulty}</Badge>
                        <Button size="sm" variant="ghost">Launch →</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Case Practice History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Recent Case Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCases.map((caseItem, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start gap-3 flex-1">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{caseItem.caseId}</h4>
                      <Badge variant={caseItem.status === 'Completed' ? 'secondary' : 'default'} className="text-xs">
                        {caseItem.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{caseItem.patient}</p>
                    <p className="text-xs text-muted-foreground">Chief complaint: {caseItem.presenting}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{caseItem.accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Reference */}
      <Card className="border-0 shadow-lg border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Emergency Assistant
          </CardTitle>
          <CardDescription>Quick AI guidance for emergency situations</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" size="lg" variant="destructive">
            <Brain className="w-4 h-4 mr-2" />
            Activate Emergency AI Protocol
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            ⚠️ For training purposes only. Always consult qualified professionals for actual patient care.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
