
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Search, Download, BookOpen, Star, Clock, 
  Eye, ThumbsUp, FileText, Trophy, Coins, GraduationCap, Atom, Globe2, Calculator, Code, Beaker
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useUserStats } from '@/hooks/useUserStats';
import { motion } from 'framer-motion';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  channelTitle: string;
  publishedAt: string;
  tags: string[];
}

interface LearningPath {
  id: string;
  title: string;
  videos: YouTubeVideo[];
  difficulty: string;
  subject: string;
  estimatedHours: number;
}

// Curated ECZ-aligned educational YouTube videos
const CURATED_VIDEOS: Record<string, YouTubeVideo[]> = {
  mathematics: [
    { id: 'WUvTyaaNkzM', title: 'The Map of Mathematics', description: 'A comprehensive overview of all areas of mathematics and how they relate to each other.', thumbnail: 'https://img.youtube.com/vi/WUvTyaaNkzM/mqdefault.jpg', duration: '11:06', viewCount: '18000000', likeCount: '520000', channelTitle: 'Domain of Science', publishedAt: '2017-02-01', tags: ['mathematics', 'overview'] },
    { id: 'OmJ-4B-mS-Y', title: 'The Beauty of Algebra', description: 'Understanding algebra fundamentals — equations, expressions, and problem solving techniques.', thumbnail: 'https://img.youtube.com/vi/OmJ-4B-mS-Y/mqdefault.jpg', duration: '14:32', viewCount: '5200000', likeCount: '120000', channelTitle: 'TED-Ed', publishedAt: '2020-03-15', tags: ['algebra', 'fundamentals'] },
    { id: 'X49VEnFfk1c', title: 'Calculus in 20 Minutes', description: 'A crash course in calculus covering limits, derivatives, and integrals.', thumbnail: 'https://img.youtube.com/vi/X49VEnFfk1c/mqdefault.jpg', duration: '20:46', viewCount: '2800000', likeCount: '85000', channelTitle: 'Organic Chemistry Tutor', publishedAt: '2021-06-10', tags: ['calculus'] },
    { id: 'pTnEPKA_gF0', title: 'Trigonometry Full Course', description: 'Complete trigonometry tutorial covering all concepts from basics to advanced.', thumbnail: 'https://img.youtube.com/vi/pTnEPKA_gF0/mqdefault.jpg', duration: '58:12', viewCount: '3100000', likeCount: '78000', channelTitle: 'freeCodeCamp', publishedAt: '2022-01-20', tags: ['trigonometry'] },
    { id: 'HfACrKJ_Y2w', title: 'Statistics & Probability Made Easy', description: 'Learn statistics and probability from scratch with practical examples.', thumbnail: 'https://img.youtube.com/vi/HfACrKJ_Y2w/mqdefault.jpg', duration: '30:15', viewCount: '4500000', likeCount: '95000', channelTitle: 'StatQuest', publishedAt: '2021-09-05', tags: ['statistics', 'probability'] },
    { id: 'kYB8IZa5AuE', title: 'Linear Algebra Full Course', description: 'Complete linear algebra course covering vectors, matrices, transformations, and eigenvalues.', thumbnail: 'https://img.youtube.com/vi/kYB8IZa5AuE/mqdefault.jpg', duration: '45:33', viewCount: '6200000', likeCount: '150000', channelTitle: '3Blue1Brown', publishedAt: '2020-08-12', tags: ['linear algebra'] },
  ],
  science: [
    { id: 'NM-zDv63VYo', title: 'Biology: Cell Structure & Function', description: 'Detailed explanation of cell biology — organelles, membranes, and cellular processes.', thumbnail: 'https://img.youtube.com/vi/NM-zDv63VYo/mqdefault.jpg', duration: '25:18', viewCount: '7200000', likeCount: '180000', channelTitle: 'Amoeba Sisters', publishedAt: '2022-03-08', tags: ['biology', 'cells'] },
    { id: 'FSyAehMdpyI', title: 'Chemistry: The Periodic Table Explained', description: 'Understanding the periodic table, elements, and their properties.', thumbnail: 'https://img.youtube.com/vi/FSyAehMdpyI/mqdefault.jpg', duration: '18:45', viewCount: '9800000', likeCount: '250000', channelTitle: 'CrashCourse', publishedAt: '2021-05-20', tags: ['chemistry', 'periodic table'] },
    { id: 'ZM8ECpBuQYE', title: 'Physics: Newton\'s Laws of Motion', description: 'Comprehensive guide to Newton\'s three laws of motion with real-world examples.', thumbnail: 'https://img.youtube.com/vi/ZM8ECpBuQYE/mqdefault.jpg', duration: '22:10', viewCount: '6500000', likeCount: '160000', channelTitle: 'Khan Academy', publishedAt: '2020-11-15', tags: ['physics', 'newton'] },
    { id: 'QnQe0xW_JY4', title: 'Photosynthesis Explained', description: 'How plants convert light energy into chemical energy — the full process.', thumbnail: 'https://img.youtube.com/vi/QnQe0xW_JY4/mqdefault.jpg', duration: '12:30', viewCount: '4300000', likeCount: '110000', channelTitle: 'Amoeba Sisters', publishedAt: '2021-02-14', tags: ['biology', 'photosynthesis'] },
    { id: 'lNbGWKp2xtY', title: 'The Atom — Crash Course Chemistry', description: 'Understanding atomic structure, electron configurations, and bonding.', thumbnail: 'https://img.youtube.com/vi/lNbGWKp2xtY/mqdefault.jpg', duration: '15:22', viewCount: '5800000', likeCount: '140000', channelTitle: 'CrashCourse', publishedAt: '2020-07-22', tags: ['chemistry', 'atoms'] },
    { id: 'p_o4aY7xkXg', title: 'Electricity & Circuits Explained', description: 'Learn about voltage, current, resistance, and how electrical circuits work.', thumbnail: 'https://img.youtube.com/vi/p_o4aY7xkXg/mqdefault.jpg', duration: '20:45', viewCount: '3900000', likeCount: '98000', channelTitle: 'The Engineering Mindset', publishedAt: '2022-04-10', tags: ['physics', 'electricity'] },
  ],
  english: [
    { id: 'SgaSoeMmpTE', title: 'English Grammar: Tenses Explained', description: 'Master all 12 tenses in English with clear explanations and examples.', thumbnail: 'https://img.youtube.com/vi/SgaSoeMmpTE/mqdefault.jpg', duration: '28:15', viewCount: '8200000', likeCount: '200000', channelTitle: 'English with Lucy', publishedAt: '2021-08-12', tags: ['grammar', 'tenses'] },
    { id: 'kEFVtSBhEm4', title: 'How to Write an Essay — Academic Writing', description: 'Step-by-step guide to writing effective academic essays with structure and style.', thumbnail: 'https://img.youtube.com/vi/kEFVtSBhEm4/mqdefault.jpg', duration: '18:30', viewCount: '3200000', likeCount: '75000', channelTitle: 'Scribbr', publishedAt: '2022-01-05', tags: ['writing', 'essays'] },
    { id: 'G4Z1Kj5ikeg', title: 'Reading Comprehension Strategies', description: 'Effective strategies for understanding and analyzing texts — perfect for exam prep.', thumbnail: 'https://img.youtube.com/vi/G4Z1Kj5ikeg/mqdefault.jpg', duration: '15:20', viewCount: '2100000', likeCount: '52000', channelTitle: 'GCFGlobal', publishedAt: '2021-11-28', tags: ['reading', 'comprehension'] },
    { id: 'mSuIJSjK-bQ', title: 'Vocabulary Building Techniques', description: 'Learn how to expand your English vocabulary quickly and effectively.', thumbnail: 'https://img.youtube.com/vi/mSuIJSjK-bQ/mqdefault.jpg', duration: '12:45', viewCount: '1800000', likeCount: '45000', channelTitle: 'English Addict', publishedAt: '2022-06-15', tags: ['vocabulary'] },
    { id: 'RPoBE-E8VOc', title: 'Public Speaking — How to Present Confidently', description: 'Techniques for improving your public speaking and presentation skills.', thumbnail: 'https://img.youtube.com/vi/RPoBE-E8VOc/mqdefault.jpg', duration: '16:50', viewCount: '4500000', likeCount: '115000', channelTitle: 'TED', publishedAt: '2020-09-20', tags: ['speaking', 'presentation'] },
  ],
  geography: [
    { id: 'hL_rIG8S36s', title: 'Africa\'s Geography Explained', description: 'Comprehensive look at Africa\'s physical and human geography.', thumbnail: 'https://img.youtube.com/vi/hL_rIG8S36s/mqdefault.jpg', duration: '22:30', viewCount: '3800000', likeCount: '92000', channelTitle: 'RealLifeLore', publishedAt: '2021-10-05', tags: ['africa', 'geography'] },
    { id: 'CcmCBetoR18', title: 'Climate Change Explained Simply', description: 'Understanding climate change, greenhouse gases, and global warming.', thumbnail: 'https://img.youtube.com/vi/CcmCBetoR18/mqdefault.jpg', duration: '14:20', viewCount: '5600000', likeCount: '135000', channelTitle: 'Kurzgesagt', publishedAt: '2022-02-18', tags: ['climate', 'environment'] },
    { id: 'x7kGmQHv6MI', title: 'Map Skills & Navigation', description: 'Learn essential map reading skills — scales, contours, coordinates, and orientation.', thumbnail: 'https://img.youtube.com/vi/x7kGmQHv6MI/mqdefault.jpg', duration: '18:15', viewCount: '1500000', likeCount: '38000', channelTitle: 'Geography Now', publishedAt: '2021-07-12', tags: ['maps', 'navigation'] },
    { id: 'MEo93PAXNp4', title: 'Plate Tectonics — How the Earth Moves', description: 'Understanding continental drift, plate boundaries, earthquakes, and volcanoes.', thumbnail: 'https://img.youtube.com/vi/MEo93PAXNp4/mqdefault.jpg', duration: '16:40', viewCount: '4200000', likeCount: '105000', channelTitle: 'CrashCourse', publishedAt: '2020-12-08', tags: ['tectonics', 'geology'] },
  ],
  history: [
    { id: 'yoHGEPjPOdQ', title: 'History of Africa — Pre-Colonial Empires', description: 'Exploring the great African empires before European colonization.', thumbnail: 'https://img.youtube.com/vi/yoHGEPjPOdQ/mqdefault.jpg', duration: '32:15', viewCount: '4100000', likeCount: '100000', channelTitle: 'HomeTeam History', publishedAt: '2021-04-22', tags: ['africa', 'empires'] },
    { id: 'UY9P0QSxlnI', title: 'The Scramble for Africa', description: 'How European powers divided and colonized the African continent.', thumbnail: 'https://img.youtube.com/vi/UY9P0QSxlnI/mqdefault.jpg', duration: '20:45', viewCount: '6300000', likeCount: '155000', channelTitle: 'Oversimplified', publishedAt: '2022-05-10', tags: ['colonization', 'africa'] },
    { id: 'Mh5LY4Mz15o', title: 'World War I — Crash Course', description: 'Understanding the causes, events, and consequences of WWI.', thumbnail: 'https://img.youtube.com/vi/Mh5LY4Mz15o/mqdefault.jpg', duration: '14:18', viewCount: '15000000', likeCount: '320000', channelTitle: 'CrashCourse', publishedAt: '2020-06-15', tags: ['wwi', 'world history'] },
    { id: 'Q78COTwT7nE', title: 'Zambia\'s Independence Story', description: 'The journey to independence — Kenneth Kaunda, UNIP, and the birth of Zambia.', thumbnail: 'https://img.youtube.com/vi/Q78COTwT7nE/mqdefault.jpg', duration: '24:30', viewCount: '520000', likeCount: '18000', channelTitle: 'African History', publishedAt: '2021-10-24', tags: ['zambia', 'independence'] },
  ],
  coding: [
    { id: 'zOjov-2OZ0E', title: 'Learn Python — Full Beginner Course', description: 'Complete Python programming course for beginners. Learn coding from scratch.', thumbnail: 'https://img.youtube.com/vi/zOjov-2OZ0E/mqdefault.jpg', duration: '58:20', viewCount: '12000000', likeCount: '350000', channelTitle: 'Programming with Mosh', publishedAt: '2022-01-15', tags: ['python', 'programming'] },
    { id: 'PkZNo7MFNFg', title: 'JavaScript Full Course for Beginners', description: 'Learn JavaScript from scratch — variables, functions, DOM, and more.', thumbnail: 'https://img.youtube.com/vi/PkZNo7MFNFg/mqdefault.jpg', duration: '45:30', viewCount: '18000000', likeCount: '450000', channelTitle: 'freeCodeCamp', publishedAt: '2021-09-20', tags: ['javascript', 'web'] },
    { id: 'kqtD5dpn9C8', title: 'HTML & CSS Full Course — Build a Website', description: 'Learn HTML and CSS by building a complete website from scratch.', thumbnail: 'https://img.youtube.com/vi/kqtD5dpn9C8/mqdefault.jpg', duration: '42:15', viewCount: '9500000', likeCount: '280000', channelTitle: 'Programming with Mosh', publishedAt: '2022-03-05', tags: ['html', 'css', 'web'] },
    { id: 'SWYqp7iY_Tc', title: 'Git & GitHub Crash Course', description: 'Learn version control with Git and GitHub in one video.', thumbnail: 'https://img.youtube.com/vi/SWYqp7iY_Tc/mqdefault.jpg', duration: '32:40', viewCount: '5200000', likeCount: '130000', channelTitle: 'Traversy Media', publishedAt: '2021-11-10', tags: ['git', 'github'] },
    { id: 'rfscVS0vtbw', title: 'Learn C Programming — Full Tutorial', description: 'Complete C programming tutorial for beginners — memory, pointers, and data structures.', thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/mqdefault.jpg', duration: '55:10', viewCount: '7800000', likeCount: '200000', channelTitle: 'freeCodeCamp', publishedAt: '2020-10-08', tags: ['c', 'programming'] },
  ],
  civic_education: [
    { id: 'BXpnlhk1XCY', title: 'Understanding Government — Democracy Explained', description: 'How democratic governments work — elections, parliament, and civic rights.', thumbnail: 'https://img.youtube.com/vi/BXpnlhk1XCY/mqdefault.jpg', duration: '12:15', viewCount: '2200000', likeCount: '55000', channelTitle: 'TED-Ed', publishedAt: '2021-06-08', tags: ['democracy', 'government'] },
    { id: 'H6L1Cmy-MQE', title: 'Human Rights — What You Need to Know', description: 'The Universal Declaration of Human Rights and why it matters.', thumbnail: 'https://img.youtube.com/vi/H6L1Cmy-MQE/mqdefault.jpg', duration: '10:30', viewCount: '3100000', likeCount: '78000', channelTitle: 'TED-Ed', publishedAt: '2022-12-10', tags: ['human rights'] },
    { id: 'fpTmwZgEB-c', title: 'The Constitution Explained', description: 'Understanding constitutional law, citizen rights, and how constitutions protect freedoms.', thumbnail: 'https://img.youtube.com/vi/fpTmwZgEB-c/mqdefault.jpg', duration: '16:45', viewCount: '1800000', likeCount: '42000', channelTitle: 'Heimler\'s History', publishedAt: '2021-09-14', tags: ['constitution', 'law'] },
  ],
  agriculture: [
    { id: 'oS5pzVi9fq4', title: 'Modern Agriculture Techniques', description: 'Exploring sustainable farming, crop rotation, and modern agricultural practices.', thumbnail: 'https://img.youtube.com/vi/oS5pzVi9fq4/mqdefault.jpg', duration: '22:30', viewCount: '2800000', likeCount: '68000', channelTitle: 'DW Documentary', publishedAt: '2022-04-15', tags: ['farming', 'agriculture'] },
    { id: 'dKA3YvFB4cs', title: 'Soil Science Basics', description: 'Understanding soil types, pH levels, nutrients, and soil management for farming.', thumbnail: 'https://img.youtube.com/vi/dKA3YvFB4cs/mqdefault.jpg', duration: '15:20', viewCount: '1500000', likeCount: '38000', channelTitle: 'Jimi Sol', publishedAt: '2021-08-20', tags: ['soil', 'science'] },
    { id: 'GH2R6_7rqUk', title: 'Plant Biology — Growth and Development', description: 'How plants grow, reproduce, and respond to their environment.', thumbnail: 'https://img.youtube.com/vi/GH2R6_7rqUk/mqdefault.jpg', duration: '18:10', viewCount: '2100000', likeCount: '52000', channelTitle: 'Amoeba Sisters', publishedAt: '2022-02-28', tags: ['plants', 'biology'] },
  ],
  biology: [
    { id: 'URUJD5NEXC8', title: 'DNA, Chromosomes, Genes & Traits', description: 'Introduction to heredity and genetics — DNA structure, chromosomes, and how traits are inherited.', thumbnail: 'https://img.youtube.com/vi/URUJD5NEXC8/mqdefault.jpg', duration: '8:42', viewCount: '5400000', likeCount: '130000', channelTitle: 'Amoeba Sisters', publishedAt: '2021-03-15', tags: ['genetics', 'dna'] },
    { id: '0pk3MJnAXmc', title: 'The Human Digestive System', description: 'Complete journey through the digestive system — from mouth to large intestine.', thumbnail: 'https://img.youtube.com/vi/0pk3MJnAXmc/mqdefault.jpg', duration: '14:20', viewCount: '3800000', likeCount: '92000', channelTitle: 'Nucleus Medical Media', publishedAt: '2020-08-10', tags: ['digestion', 'anatomy'] },
    { id: 'dQCsA2cCdvA', title: 'Mitosis vs Meiosis — Cell Division', description: 'Comparing mitosis and meiosis with clear diagrams and explanations.', thumbnail: 'https://img.youtube.com/vi/dQCsA2cCdvA/mqdefault.jpg', duration: '10:15', viewCount: '6100000', likeCount: '145000', channelTitle: 'Amoeba Sisters', publishedAt: '2022-01-20', tags: ['cells', 'division'] },
    { id: 'GVU_UHidVPs', title: 'The Respiratory System Explained', description: 'How breathing works — lungs, gas exchange, and respiratory health.', thumbnail: 'https://img.youtube.com/vi/GVU_UHidVPs/mqdefault.jpg', duration: '12:30', viewCount: '2900000', likeCount: '72000', channelTitle: 'Nucleus Medical Media', publishedAt: '2021-06-05', tags: ['respiratory', 'anatomy'] },
    { id: 'x-IADFnFONk', title: 'Ecology — Ecosystems and Biomes', description: 'Understanding ecosystems, food chains, food webs, and major world biomes.', thumbnail: 'https://img.youtube.com/vi/x-IADFnFONk/mqdefault.jpg', duration: '18:45', viewCount: '3200000', likeCount: '85000', channelTitle: 'CrashCourse', publishedAt: '2022-04-12', tags: ['ecology', 'ecosystems'] },
  ],
  chemistry: [
    { id: 'bka20Q9TN6M', title: 'Chemical Bonding — Ionic, Covalent & Metallic', description: 'Understanding the three main types of chemical bonds with examples.', thumbnail: 'https://img.youtube.com/vi/bka20Q9TN6M/mqdefault.jpg', duration: '16:30', viewCount: '4500000', likeCount: '110000', channelTitle: 'The Organic Chemistry Tutor', publishedAt: '2021-05-18', tags: ['bonding', 'chemistry'] },
    { id: 'MEL_5bFo7B4', title: 'Balancing Chemical Equations — Practice', description: 'Step-by-step guide to balancing chemical equations with practice problems.', thumbnail: 'https://img.youtube.com/vi/MEL_5bFo7B4/mqdefault.jpg', duration: '22:15', viewCount: '3800000', likeCount: '95000', channelTitle: 'Tyler DeWitt', publishedAt: '2020-09-22', tags: ['equations', 'balancing'] },
    { id: 'TZMLKJdHj3s', title: 'Acids, Bases and pH Scale', description: 'Complete guide to acids, bases, pH, and neutralisation reactions.', thumbnail: 'https://img.youtube.com/vi/TZMLKJdHj3s/mqdefault.jpg', duration: '14:50', viewCount: '2700000', likeCount: '68000', channelTitle: 'FuseSchool', publishedAt: '2022-02-14', tags: ['acids', 'bases', 'ph'] },
    { id: 'RKbuTM1JNtQ', title: 'Organic Chemistry Introduction', description: 'Introduction to organic chemistry — hydrocarbons, functional groups, and naming.', thumbnail: 'https://img.youtube.com/vi/RKbuTM1JNtQ/mqdefault.jpg', duration: '28:40', viewCount: '5100000', likeCount: '125000', channelTitle: 'The Organic Chemistry Tutor', publishedAt: '2021-11-08', tags: ['organic', 'chemistry'] },
  ],
  physics: [
    { id: 'kKKM8Y-u7ds', title: 'Work, Energy and Power Explained', description: 'Understanding work, kinetic energy, potential energy, and power with calculations.', thumbnail: 'https://img.youtube.com/vi/kKKM8Y-u7ds/mqdefault.jpg', duration: '20:15', viewCount: '3600000', likeCount: '88000', channelTitle: 'The Organic Chemistry Tutor', publishedAt: '2021-07-20', tags: ['energy', 'work', 'power'] },
    { id: 'KDp1tiUsZw8', title: 'Waves — Sound and Light', description: 'Properties of waves, sound waves, light waves, and the electromagnetic spectrum.', thumbnail: 'https://img.youtube.com/vi/KDp1tiUsZw8/mqdefault.jpg', duration: '18:30', viewCount: '2800000', likeCount: '72000', channelTitle: 'CrashCourse', publishedAt: '2022-03-15', tags: ['waves', 'sound', 'light'] },
    { id: 'AEIn3T6nDAo', title: 'Thermal Physics — Heat Transfer', description: 'Conduction, convection, radiation, and specific heat capacity explained.', thumbnail: 'https://img.youtube.com/vi/AEIn3T6nDAo/mqdefault.jpg', duration: '15:45', viewCount: '2100000', likeCount: '55000', channelTitle: 'Khan Academy', publishedAt: '2021-10-12', tags: ['thermal', 'heat'] },
    { id: 'w4QFJb9a8vo', title: 'Magnetism and Electromagnetism', description: 'Understanding magnets, magnetic fields, electromagnets, and electromagnetic induction.', thumbnail: 'https://img.youtube.com/vi/w4QFJb9a8vo/mqdefault.jpg', duration: '22:10', viewCount: '3400000', likeCount: '82000', channelTitle: 'The Engineering Mindset', publishedAt: '2022-05-08', tags: ['magnetism', 'electromagnetism'] },
  ],
  business: [
    { id: 'MHYrvFW2cL0', title: 'Introduction to Business Studies', description: 'Core concepts of business — entrepreneurship, marketing, finance, and management.', thumbnail: 'https://img.youtube.com/vi/MHYrvFW2cL0/mqdefault.jpg', duration: '16:20', viewCount: '2400000', likeCount: '58000', channelTitle: 'Two Teachers', publishedAt: '2021-09-15', tags: ['business', 'introduction'] },
    { id: 'ukJHBORdaP8', title: 'Supply and Demand — Economics Basics', description: 'Understanding supply and demand curves, market equilibrium, and price determination.', thumbnail: 'https://img.youtube.com/vi/ukJHBORdaP8/mqdefault.jpg', duration: '12:45', viewCount: '3900000', likeCount: '95000', channelTitle: 'CrashCourse', publishedAt: '2020-11-20', tags: ['economics', 'supply', 'demand'] },
    { id: 'cmJT6TG7SUQ', title: 'Marketing Fundamentals', description: 'The 4 Ps of marketing — product, price, place, and promotion explained.', thumbnail: 'https://img.youtube.com/vi/cmJT6TG7SUQ/mqdefault.jpg', duration: '14:30', viewCount: '1800000', likeCount: '45000', channelTitle: 'The Business Channel', publishedAt: '2022-02-28', tags: ['marketing', '4ps'] },
    { id: 'WEDIj9JBTC8', title: 'Financial Literacy for Students', description: 'Budgeting, saving, investing, and financial planning basics for young people.', thumbnail: 'https://img.youtube.com/vi/WEDIj9JBTC8/mqdefault.jpg', duration: '18:15', viewCount: '2600000', likeCount: '65000', channelTitle: 'Practical Wisdom', publishedAt: '2021-04-10', tags: ['finance', 'literacy'] },
  ],
};

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  mathematics: <Calculator className="w-4 h-4" />,
  science: <Atom className="w-4 h-4" />,
  english: <BookOpen className="w-4 h-4" />,
  geography: <Globe2 className="w-4 h-4" />,
  history: <GraduationCap className="w-4 h-4" />,
  coding: <Code className="w-4 h-4" />,
  civic_education: <Star className="w-4 h-4" />,
  agriculture: <Beaker className="w-4 h-4" />,
  biology: <Atom className="w-4 h-4" />,
  chemistry: <Beaker className="w-4 h-4" />,
  physics: <Atom className="w-4 h-4" />,
  business: <GraduationCap className="w-4 h-4" />,
};

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const YouTubeLearningHub = () => {
  const { user } = useAuth();
  const { stats } = useUserStats();
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [gradeLevel, setGradeLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('mathematics');

  const searchVideos = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query: searchQuery, gradeLevel, subject, maxResults: 20 }
      });
      if (error) throw error;
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Error searching videos:', error);
      // Fallback: filter curated videos by search query
      const allVideos = Object.values(CURATED_VIDEOS).flat();
      const filtered = allVideos.filter(v =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setVideos(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  const generateLearningPath = async (topic: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-learning-path', {
        body: { topic, gradeLevel, subject, userId: user?.id }
      });
      if (error) throw error;
      const newPath: LearningPath = {
        id: Date.now().toString(),
        title: `Learning Path: ${topic}`,
        videos: data.videos || [],
        difficulty: gradeLevel || 'intermediate',
        subject: subject || 'general',
        estimatedHours: Math.ceil(data.videos?.length * 0.5) || 5
      };
      setLearningPaths([newPath, ...learningPaths]);
    } catch (error) {
      console.error('Error generating learning path:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: string) => {
    const n = parseInt(num);
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  const curatedVideos = CURATED_VIDEOS[activeTab] || [];

  const VideoCard = ({ video }: { video: YouTubeVideo }) => (
    <motion.div variants={item}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow border-border/50 bg-card/80">
        <CardContent className="p-0">
          <div className="aspect-video bg-muted relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover rounded-t-lg"
              loading="lazy"
            />
            <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2 text-foreground">{video.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(video.viewCount)}</span>
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{formatNumber(video.likeCount)}</span>
              </div>
              <span className="truncate max-w-[100px]">{video.channelTitle}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => setSelectedVideo(video)}
              >
                <Play className="w-3 h-3 mr-1" /> Watch
              </Button>
              <Button
                size="sm"
                variant="outline"
                asChild
              >
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-3 h-3 mr-1" /> YouTube
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Selected Video Player */}
      {selectedVideo && (
        <Card className="border-border/50 bg-card/80 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedVideo.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedVideo.channelTitle}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedVideo(null)}>✕</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{selectedVideo.description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Interface */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Play className="w-6 h-6 text-red-500" />
            YouTube Learning Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Search educational videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchVideos()}
              className="md:col-span-2"
            />
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Grade Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade1-3">Grade 1-3</SelectItem>
                <SelectItem value="grade4-6">Grade 4-6</SelectItem>
                <SelectItem value="grade7-9">Grade 7-9</SelectItem>
                <SelectItem value="grade10-12">Grade 10-12</SelectItem>
                <SelectItem value="university">University</SelectItem>
              </SelectContent>
            </Select>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
                <SelectItem value="coding">Programming</SelectItem>
                <SelectItem value="civic_education">Civic Education</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={searchVideos} disabled={isLoading} className="flex-1">
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? 'Searching...' : 'Search Videos'}
            </Button>
            <Button
              onClick={() => generateLearningPath(searchQuery)}
              variant="outline"
              disabled={isLoading || !searchQuery.trim()}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Create Learning Path
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {videos.length > 0 && (
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-foreground">Search Results ({videos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {videos.map((video) => <VideoCard key={video.id} video={video} />)}
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Learning Paths */}
      {learningPaths.length > 0 && (
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-foreground">Your Learning Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {learningPaths.map((path) => (
                <Card key={path.id} className="border-2 border-dashed border-primary/30">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 text-foreground">{path.title}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground mb-3">
                      <span>{path.videos.length} videos</span>
                      <span>{path.estimatedHours}h</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline">{path.difficulty}</Badge>
                      <Badge variant="outline">{path.subject}</Badge>
                    </div>
                    <Button size="sm" className="w-full">Start Learning</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Curated Content by Subject */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Curated ECZ-Aligned Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
              {Object.keys(CURATED_VIDEOS).map((key) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-1 text-xs capitalize">
                  {SUBJECT_ICONS[key]}
                  {key.replace('_', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(CURATED_VIDEOS).map((key) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                >
                  {CURATED_VIDEOS[key].map((video) => <VideoCard key={video.id} video={video} />)}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeLearningHub;
