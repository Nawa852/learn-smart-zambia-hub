
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Star, Award, Crown, Sparkles, User, BookOpenCheck } from 'lucide-react';

const familyMembers = [
  {
    name: "Mr. and Mrs. Mulope",
    relation: "Beloved Parents",
    description: "Parents who made this a success with continuous love, wisdom, and sacrifice.",
    icon: <Heart className="w-6 h-6 text-pink-500" />
  },
  {
    name: "Mwalye Mulope",
    relation: "Sister",
    description: "Wonderful sister and big supporter, source of joy and ideas.",
    icon: <Star className="w-6 h-6 text-purple-500" />
  },
  {
    name: "Pezo Mulope",
    relation: "Little Sister",
    description: "Brings light and laughter to the family, an inspiration for a brighter future.",
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />
  },
  {
    name: "Makawa",
    relation: "Sister",
    description: "Thank you for your love and encouragement.",
    icon: <Star className="w-6 h-6 text-sky-500" />
  },
  {
    name: "Mulope Mulope",
    relation: "Brother",
    description: "A true friend and companion on every step of the journey.",
    icon: <Users className="w-6 h-6 text-green-500" />
  },
  {
    name: "Kalimbwe",
    relation: "Brother",
    description: "Thank you for your support, inspiration, and wisdom.",
    icon: <Users className="w-6 h-6 text-pink-400" />
  },
  {
    name: "Uncle Mushe",
    relation: "Uncle",
    description: "For your advice, encouragement, and the spirit you bring to the family.",
    icon: <Crown className="w-6 h-6 text-blue-300" />
  },
  {
    name: "All Family Members",
    relation: "Extended Family",
    description: "Grateful for the extended family, relatives, and those always ready to help.",
    icon: <Users className="w-6 h-6 text-lime-600" />
  }
];

const mentorsAndFriends = [
  {
    name: "Mr. Loza",
    role: "Teacher",
    impact: "Mentor, guide, and teacher who shaped academic and life values."
  },
  {
    name: "Fr. Ben",
    role: "Mentor & Spiritual Guide",
    impact: "Thank you for your prayers and moral support."
  },
  {
    name: "Katambo",
    role: "Friend",
    impact: "Always available to help, offer guidance, and inspire new ideas."
  },
  {
    name: "Theo",
    role: "Friend",
    impact: "True friend, motivator, and partner in learning and growth."
  },
  {
    name: "Mwanza",
    role: "Friend",
    impact: "A positive influence always offering wisdom and encouragement."
  }
];

export default function AcknowledgmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Acknowledgments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With deep gratitude and appreciation, we acknowledge those who have made this educational platform possible.
            This project is dedicated to the wonderful people who have shaped our journey.
          </p>
        </div>

        {/* Owner & Lead Developer */}
        <Card className="mb-12 border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Nawa Mulope Brighton</h2>
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Founder & Lead Developer
            </Badge>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              The visionary behind EDU ZAMBIA, dedicated to transforming education through 
              innovative AI-powered learning solutions and creating opportunities for learners across Zambia and beyond.
            </p>
          </CardContent>
        </Card>

        {/* Family Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Family - Our Foundation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">
                    {member.relation}
                  </Badge>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mentors & Friends Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Mentors, Friends & Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mentorsAndFriends.map((m, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{m.name}</h3>
                  <Badge variant="outline" className="mb-3 border-orange-300 text-orange-600">
                    {m.role}
                  </Badge>
                  <p className="text-gray-600 text-sm">
                    {m.impact}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Extended Family & Community */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Extended Family & Community
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We extend our heartfelt gratitude to all family, relatives, friends, and community members 
              who have contributed to our growth and success, including those not individually named here. 
              Your support, encouragement, and belief in our vision have been instrumental in making EDU ZAMBIA a reality.
            </p>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-lg">
          <p className="text-gray-600 italic">
            "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
          </p>
          <p className="text-sm text-gray-500 mt-4">
            This platform is built with love, dedication, and the hope of empowering learners everywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
