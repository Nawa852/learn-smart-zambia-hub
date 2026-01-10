import { motion } from 'framer-motion';
import { 
  Sparkles, Check, ArrowRight, Zap, Globe, Smartphone, 
  Wifi, WifiOff, MessageCircle, Mail, Bot, Headphones,
  Youtube, BookOpen, FileText, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const integrations = [
  {
    category: 'AI Models',
    items: [
      { name: 'GPT-5', desc: 'OpenAI', color: 'bg-emerald-500' },
      { name: 'Claude 3', desc: 'Anthropic', color: 'bg-orange-500' },
      { name: 'Gemini Pro', desc: 'Google', color: 'bg-blue-500' },
      { name: 'Grok', desc: 'xAI', color: 'bg-purple-500' },
      { name: 'DeepSeek', desc: 'DeepSeek', color: 'bg-cyan-500' },
      { name: 'Llama 4', desc: 'Meta', color: 'bg-indigo-500' },
    ]
  },
  {
    category: 'Content Sources',
    items: [
      { name: 'YouTube', desc: 'Video lessons', color: 'bg-red-500' },
      { name: 'Khan Academy', desc: 'Courses', color: 'bg-green-500' },
      { name: 'ECZ Resources', desc: 'Official', color: 'bg-blue-600' },
      { name: 'Wikipedia', desc: 'Knowledge', color: 'bg-gray-500' },
    ]
  }
];

const offlineFeatures = [
  { icon: Download, title: 'Downloadable Packs', desc: 'Download full courses for offline study' },
  { icon: MessageCircle, title: 'SMS Learning', desc: 'Learn via USSD and SMS in rural areas' },
  { icon: Smartphone, title: 'Lite Mode', desc: 'Works on basic smartphones with 2G' },
  { icon: WifiOff, title: 'Auto-Sync', desc: 'Progress syncs when back online' },
];

const platforms = [
  { name: 'QANDA', feature: 'Photo problem solving', adopted: true },
  { name: 'Duolingo', feature: 'Gamification & streaks', adopted: true },
  { name: 'Coursera', feature: 'Structured courses', adopted: true },
  { name: 'Khan Academy', feature: 'Free quality content', adopted: true },
  { name: 'Brainly', feature: 'Community answers', adopted: true },
  { name: 'ChatGPT', feature: 'Conversational AI', adopted: true },
  { name: 'Socratic', feature: 'Visual explanations', adopted: true },
  { name: 'uLesson', feature: 'African context', adopted: true },
];

const PlatformIntegrations = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" />
            Powered by BrightSphere
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">The Best of</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Every Learning Platform
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've studied 40+ learning platforms and combined their best features 
            into one powerful, Zambia-optimized experience
          </p>
        </motion.div>

        {/* Platforms adopted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-center font-semibold text-muted-foreground mb-6">
            Features inspired by world-class platforms
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((platform, idx) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="font-medium text-foreground text-sm">{platform.name}</span>
                <span className="text-xs text-muted-foreground">— {platform.feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - AI Models */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xl">16+ AI Models</h3>
                  <p className="text-sm text-muted-foreground">Intelligent fallback system</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                BrightSphere's Quantum Core automatically selects the best AI model 
                for each task. If one fails, it seamlessly switches to another.
              </p>

              {integrations.map((group, gIdx) => (
                <div key={group.category} className="mb-6 last:mb-0">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (gIdx * 0.1) + (idx * 0.05) }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.desc}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground text-sm">Smart Model Selection</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Math problems → specialized math models. Essays → creative AI. 
                  Code → coding-optimized models. All automatic!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Offline First */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xl">Offline-First Design</h3>
                  <p className="text-sm text-muted-foreground">Learning without barriers</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                Inspired by M-Shule and uLesson — designed for African connectivity 
                challenges. Learn anywhere, even without internet.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {offlineFeatures.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* SMS Demo */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-foreground text-sm">SMS Learning Demo</span>
                </div>
                <div className="font-mono text-xs space-y-2 text-muted-foreground">
                  <p>📱 <span className="text-foreground">You:</span> EDUZM MATH G12 ALGEBRA</p>
                  <p>💬 <span className="text-foreground">EduZM:</span> Lesson 1: Quadratic Equations...</p>
                  <p className="text-emerald-600">✓ Works on any phone!</p>
                </div>
              </div>
            </div>

            {/* Languages support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-card rounded-2xl border border-border p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Headphones className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground">7 Zambian Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Bemba', 'Nyanja', 'Tonga', 'Lozi', 'Lunda', 'Kaonde', 'Luvale'].map((lang) => (
                  <Badge key={lang} variant="outline" className="bg-primary/5">
                    {lang}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                AI explanations and voice support in your local language
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl px-8">
            Experience BrightSphere
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformIntegrations;
