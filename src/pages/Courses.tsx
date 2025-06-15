
import React from "react";
import ModernCard from "@/components/UI/ModernCard";
import { BookOpen, PlayCircle } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to AI",
    description: "Start your AI journey: fundamentals, history, destiny.",
    lessons: 12,
    hours: 9,
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Zambian History",
    description: "A modern, engaging look at Zambia’s rich past.",
    lessons: 8,
    hours: 6,
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Courses() {
  return (
    <div>
      <h1 className="text-3xl font-bold gradient-text mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <ModernCard key={c.id} variant="holographic" animate className="overflow-hidden">
            <div>
              <img
                src={c.image}
                alt={c.title}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <div className="font-bold text-2xl mb-1">{c.title}</div>
              <div className="text-sm text-gray-600 mb-2">{c.description}</div>
              <div className="flex gap-3 items-center text-sm">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>{c.lessons} Lessons</span>
                <PlayCircle className="w-4 h-4 text-purple-500" />
                <span>{c.hours} Hours</span>
              </div>
            </div>
          </ModernCard>
        ))}
      </div>
    </div>
  );
}
