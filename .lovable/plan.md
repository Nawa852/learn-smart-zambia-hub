
# Plan: Build Interactive Course Assessment System

## Current State Analysis
The course system is well-established with:
- 10 comprehensive ECZ courses with 65+ YouTube lessons
- 300+ integrated study materials (past papers and notes)
- Enrollment, progress tracking, and note-taking features
- Basic lesson completion tracking

**Gap Identified**: Students can access materials and lessons but lack integrated assessments to test their knowledge within the course context.

## What We're Building
A comprehensive assessment system that transforms courses from passive consumption into active learning experiences with:

### 1. **Course-Specific Assessments**
- **Lesson Quizzes**: 5-10 questions after each lesson to test comprehension
- **Module Tests**: Comprehensive assessments covering multiple lessons
- **Final Course Exams**: ECZ-style mock exams for course completion
- **Practice Modes**: Non-graded practice sessions with immediate feedback

### 2. **Smart Question Generation**
- **AI-Powered**: Use Lovable AI to generate questions from lesson content and study materials
- **ECZ-Aligned**: Questions following ECZ format and difficulty levels
- **Multiple Types**: Multiple choice, short answer, essay, calculation problems
- **Difficulty Adaptation**: Questions adjust based on student performance

### 3. **Assessment Analytics & Feedback**
- **Detailed Results**: Score breakdowns by topic, question type, difficulty
- **Learning Gaps**: Identify weak areas with recommended study materials
- **Progress Tracking**: Assessment history and improvement trends
- **Instant Feedback**: Explanations for wrong answers with links to relevant lessons

### 4. **Course Completion & Certification**
- **Completion Requirements**: Pass assessments + complete lessons + engage with materials
- **Digital Certificates**: Auto-generated ECZ-style certificates with QR verification
- **Achievement Badges**: Milestone rewards for consistent performance
- **Leaderboards**: Course-specific rankings to encourage engagement

## Technical Implementation

### Database Schema Updates
```sql
-- Course assessments table
CREATE TABLE course_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id),
  title text NOT NULL,
  assessment_type text NOT NULL DEFAULT 'lesson_quiz', -- 'lesson_quiz', 'module_test', 'final_exam', 'practice'
  lesson_id uuid REFERENCES lessons(id), -- null for module/final assessments
  question_count integer NOT NULL DEFAULT 10,
  time_limit_minutes integer, -- null for untimed
  pass_threshold numeric DEFAULT 70,
  instructions text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Assessment questions
CREATE TABLE assessment_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES course_assessments(id),
  question_text text NOT NULL,
  question_type text NOT NULL DEFAULT 'multiple_choice', -- 'multiple_choice', 'short_answer', 'essay', 'calculation'
  options jsonb, -- for multiple choice: {"A": "...", "B": "...", ...}
  correct_answer text NOT NULL,
  explanation text, -- explanation for the answer
  difficulty_level text DEFAULT 'medium', -- 'easy', 'medium', 'hard'
  points numeric DEFAULT 1,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Student assessment attempts
CREATE TABLE assessment_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid NOT NULL REFERENCES course_assessments(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  score numeric, -- percentage score
  total_points numeric,
  earned_points numeric,
  time_spent_minutes integer,
  answers jsonb NOT NULL DEFAULT '{}', -- question_id -> answer mapping
  passed boolean,
  attempt_number integer DEFAULT 1,
  feedback_viewed boolean DEFAULT false
);
```

### Edge Functions
1. **`generate-assessment-questions`**: AI-powered question generation from lesson content
2. **`evaluate-assessment`**: Grade assessments and provide detailed feedback
3. **`generate-certificate`**: Create completion certificates with verification

### UI Components
1. **Assessment Taking Interface**: Clean, distraction-free quiz interface with timer
2. **Results Dashboard**: Detailed analytics with visual charts and recommendations
3. **Question Bank Management**: (For course creators) Manage and review AI-generated questions
4. **Assessment Settings**: Configure difficulty, time limits, retake policies

## User Experience Flow

### For Students:
1. **In-Lesson Prompts**: "Test your understanding" buttons after lessons
2. **Assessment Portal**: Dedicated tab in course sidebar alongside Lessons/Materials
3. **Practice Mode**: Study without pressure, unlimited attempts
4. **Exam Mode**: Timed, formal assessments with limited retakes
5. **Results Analysis**: Immediate feedback with study recommendations
6. **Achievement Tracking**: Progress toward course completion certificate

### For Teachers:
1. **Assessment Builder**: Create custom assessments or use AI-generated ones
2. **Student Analytics**: View class performance, identify struggling students
3. **Question Review**: Approve/edit AI-generated questions before publication
4. **Flexible Grading**: Set custom pass thresholds and retake policies

## Files to Modify/Create

### Database
- New migration for assessment tables + RLS policies

### Backend (Edge Functions)
- `supabase/functions/generate-assessment-questions/index.ts`
- `supabase/functions/evaluate-assessment/index.ts` 
- `supabase/functions/generate-certificate/index.ts`

### Frontend
- `src/pages/CourseDetailPage.tsx` - Add Assessments tab
- `src/pages/AssessmentTakingPage.tsx` - Quiz interface
- `src/pages/AssessmentResultsPage.tsx` - Results with analytics
- `src/components/Assessment/` - Reusable assessment components
- `src/pages/CertificatesPage.tsx` - View earned certificates

### Integration Points
- Update course progress calculation to include assessment performance
- Integrate with existing gamification system (XP, badges)
- Link assessment results to study material recommendations
- Add assessment data to teacher analytics dashboard

## Success Metrics
- **Student Engagement**: Increase in time spent per course by 40%
- **Learning Outcomes**: Higher lesson completion rates and material downloads
- **Assessment Adoption**: 70%+ of enrolled students attempt at least one assessment
- **Course Completion**: 3x increase in courses completed with certificates
- **Knowledge Retention**: Improved performance on subsequent assessments

This transforms the course system from passive content delivery into an active learning platform with measurable outcomes, directly addressing the gap between accessing materials and proving mastery.
