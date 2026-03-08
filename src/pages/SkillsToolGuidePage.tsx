import React from 'react';
import { Wrench, DollarSign, Shield, Star, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tools = [
  { category: 'Electrical', items: [
    { name: 'Multimeter', price: 'K150-K800', essential: true, desc: 'Measures voltage, current, resistance' },
    { name: 'Wire Strippers', price: 'K50-K200', essential: true, desc: 'Strip insulation from wires' },
    { name: 'Soldering Iron', price: 'K80-K300', essential: false, desc: 'For circuit board work' },
  ]},
  { category: 'Carpentry', items: [
    { name: 'Circular Saw', price: 'K800-K3000', essential: true, desc: 'Power cutting for wood' },
    { name: 'Chisels Set', price: 'K100-K500', essential: true, desc: 'Wood shaping and detail work' },
    { name: 'Router', price: 'K600-K2000', essential: false, desc: 'Decorative edges and joints' },
  ]},
  { category: 'Automotive', items: [
    { name: 'Socket Set', price: 'K200-K1500', essential: true, desc: 'Essential for bolt work' },
    { name: 'OBD2 Scanner', price: 'K300-K2000', essential: true, desc: 'Vehicle diagnostics' },
    { name: 'Torque Wrench', price: 'K150-K800', essential: false, desc: 'Precise bolt tightening' },
  ]},
  { category: 'Culinary', items: [
    { name: 'Chef Knife Set', price: 'K200-K2000', essential: true, desc: 'Professional cutting tools' },
    { name: 'Thermometer', price: 'K50-K300', essential: true, desc: 'Food temperature monitoring' },
    { name: 'Stand Mixer', price: 'K1500-K5000', essential: false, desc: 'Baking and mixing' },
  ]},
];

const SkillsToolGuidePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Wrench className="h-8 w-8 text-primary" /> Tool & Equipment Guide
      </h1>
      <p className="text-muted-foreground mt-1">Essential tools for each skill category</p>
    </div>
    {tools.map(cat => (
      <div key={cat.category}>
        <h3 className="font-semibold text-lg mb-3">{cat.category}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {cat.items.map(t => (
            <Card key={t.name} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium">{t.name}</h4>
                  {t.essential && <Badge className="bg-green-500/10 text-green-600 text-xs">Essential</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{t.desc}</p>
                <p className="text-sm font-medium"><DollarSign className="h-3 w-3 inline" />{t.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SkillsToolGuidePage;
