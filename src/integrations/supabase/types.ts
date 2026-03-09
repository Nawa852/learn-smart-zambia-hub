export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      apprenticeships: {
        Row: {
          company_name: string | null
          created_at: string
          description: string | null
          duration_weeks: number | null
          id: string
          posted_by: string
          province: string | null
          skill_category: string
          status: string
          title: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          id?: string
          posted_by: string
          province?: string | null
          skill_category: string
          status?: string
          title: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          id?: string
          posted_by?: string
          province?: string | null
          skill_category?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      assessment_attempts: {
        Row: {
          answers: Json
          assessment_id: string
          attempt_number: number
          completed_at: string | null
          earned_points: number | null
          feedback_viewed: boolean
          id: string
          passed: boolean | null
          score: number | null
          started_at: string
          time_spent_minutes: number | null
          total_points: number | null
          user_id: string
        }
        Insert: {
          answers?: Json
          assessment_id: string
          attempt_number?: number
          completed_at?: string | null
          earned_points?: number | null
          feedback_viewed?: boolean
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string
          time_spent_minutes?: number | null
          total_points?: number | null
          user_id: string
        }
        Update: {
          answers?: Json
          assessment_id?: string
          attempt_number?: number
          completed_at?: string | null
          earned_points?: number | null
          feedback_viewed?: boolean
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string
          time_spent_minutes?: number | null
          total_points?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "course_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          assessment_id: string
          correct_answer: string
          created_at: string
          difficulty_level: string
          explanation: string | null
          id: string
          options: Json | null
          order_index: number
          points: number
          question_text: string
          question_type: string
        }
        Insert: {
          assessment_id: string
          correct_answer: string
          created_at?: string
          difficulty_level?: string
          explanation?: string | null
          id?: string
          options?: Json | null
          order_index?: number
          points?: number
          question_text: string
          question_type?: string
        }
        Update: {
          assessment_id?: string
          correct_answer?: string
          created_at?: string
          difficulty_level?: string
          explanation?: string | null
          id?: string
          options?: Json | null
          order_index?: number
          points?: number
          question_text?: string
          question_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "course_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          course_id: string
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          max_score: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          max_score?: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          max_score?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          course_id: string | null
          created_at: string
          date: string
          id: string
          recorded_by: string | null
          status: string
          student_id: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          date?: string
          id?: string
          recorded_by?: string | null
          status?: string
          student_id: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          date?: string
          id?: string
          recorded_by?: string | null
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          category: string
          condition_type: string
          condition_value: number
          created_at: string
          description: string | null
          icon: string
          id: string
          name: string
          xp_reward: number
        }
        Insert: {
          category?: string
          condition_type: string
          condition_value?: number
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          name: string
          xp_reward?: number
        }
        Update: {
          category?: string
          condition_type?: string
          condition_value?: number
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          name?: string
          xp_reward?: number
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      business_milestones: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          id: string
          order_index: number | null
          title: string
          user_id: string
          venture_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          order_index?: number | null
          title: string
          user_id: string
          venture_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          order_index?: number | null
          title?: string
          user_id?: string
          venture_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_milestones_venture_id_fkey"
            columns: ["venture_id"]
            isOneToOne: false
            referencedRelation: "ventures"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_number: string
          course_id: string | null
          id: string
          issued_at: string
          user_id: string
        }
        Insert: {
          certificate_number?: string
          course_id?: string | null
          id?: string
          issued_at?: string
          user_id: string
        }
        Update: {
          certificate_number?: string
          course_id?: string | null
          id?: string
          issued_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_members: {
        Row: {
          id: string
          joined_at: string
          room_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          room_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_group: boolean
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_group?: boolean
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_group?: boolean
          name?: string
        }
        Relationships: []
      }
      class_announcements: {
        Row: {
          content: string | null
          course_id: string
          created_at: string
          id: string
          priority: string | null
          teacher_id: string
          title: string
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string
          id?: string
          priority?: string | null
          teacher_id: string
          title: string
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string
          id?: string
          priority?: string | null
          teacher_id?: string
          title?: string
        }
        Relationships: []
      }
      clinical_cases: {
        Row: {
          accuracy_score: number | null
          body_system: string | null
          condition: string
          created_at: string
          diagnosis: string | null
          id: string
          notes: string | null
          outcome: string | null
          patient_summary: string | null
          presenting_complaint: string | null
          user_id: string
        }
        Insert: {
          accuracy_score?: number | null
          body_system?: string | null
          condition: string
          created_at?: string
          diagnosis?: string | null
          id?: string
          notes?: string | null
          outcome?: string | null
          patient_summary?: string | null
          presenting_complaint?: string | null
          user_id: string
        }
        Update: {
          accuracy_score?: number | null
          body_system?: string | null
          condition?: string
          created_at?: string
          diagnosis?: string | null
          id?: string
          notes?: string | null
          outcome?: string | null
          patient_summary?: string | null
          presenting_complaint?: string | null
          user_id?: string
        }
        Relationships: []
      }
      clinical_rotations: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          notes: string | null
          rotation_name: string
          start_date: string | null
          status: string | null
          supervisor_name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          rotation_name: string
          start_date?: string | null
          status?: string | null
          supervisor_name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          rotation_name?: string
          start_date?: string | null
          status?: string | null
          supervisor_name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      communication_logs: {
        Row: {
          communication_type: string | null
          created_at: string
          id: string
          notes: string | null
          parent_id: string
          student_id: string | null
          subject: string
          teacher_id: string
        }
        Insert: {
          communication_type?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          parent_id: string
          student_id?: string | null
          subject: string
          teacher_id: string
        }
        Update: {
          communication_type?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          parent_id?: string
          student_id?: string | null
          subject?: string
          teacher_id?: string
        }
        Relationships: []
      }
      course_assessments: {
        Row: {
          assessment_type: string
          course_id: string
          created_at: string
          id: string
          instructions: string | null
          is_active: boolean
          lesson_id: string | null
          pass_threshold: number
          question_count: number
          time_limit_minutes: number | null
          title: string
        }
        Insert: {
          assessment_type?: string
          course_id: string
          created_at?: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          lesson_id?: string | null
          pass_threshold?: number
          question_count?: number
          time_limit_minutes?: number | null
          title: string
        }
        Update: {
          assessment_type?: string
          course_id?: string
          created_at?: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          lesson_id?: string | null
          pass_threshold?: number
          question_count?: number
          time_limit_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_assessments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_assessments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      course_materials: {
        Row: {
          course_id: string
          created_at: string
          id: string
          paper: string | null
          title: string
          type: string
          url: string
          year: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          paper?: string | null
          title: string
          type?: string
          url: string
          year?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          paper?: string | null
          title?: string
          type?: string
          url?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_reviews: {
        Row: {
          course_id: string
          created_at: string
          id: string
          rating: number
          review_text: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          rating: number
          review_text?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          rating?: number
          review_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          grade_level: string | null
          id: string
          is_published: boolean
          subject: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          is_published?: boolean
          subject?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          grade_level?: string | null
          id?: string
          is_published?: boolean
          subject?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ctf_submissions: {
        Row: {
          category: string | null
          challenge_name: string
          created_at: string
          flag: string
          id: string
          is_correct: boolean
          points: number
          user_id: string
        }
        Insert: {
          category?: string | null
          challenge_name: string
          created_at?: string
          flag: string
          id?: string
          is_correct?: boolean
          points?: number
          user_id: string
        }
        Update: {
          category?: string | null
          challenge_name?: string
          created_at?: string
          flag?: string
          id?: string
          is_correct?: boolean
          points?: number
          user_id?: string
        }
        Relationships: []
      }
      cyber_challenges: {
        Row: {
          challenge_name: string
          completed_at: string
          created_at: string
          id: string
          points: number
          user_id: string
        }
        Insert: {
          challenge_name: string
          completed_at?: string
          created_at?: string
          id?: string
          points?: number
          user_id: string
        }
        Update: {
          challenge_name?: string
          completed_at?: string
          created_at?: string
          id?: string
          points?: number
          user_id?: string
        }
        Relationships: []
      }
      daily_checkins: {
        Row: {
          checkin_date: string
          created_at: string
          id: string
          mood: string
          note: string | null
          user_id: string
        }
        Insert: {
          checkin_date?: string
          created_at?: string
          id?: string
          mood: string
          note?: string | null
          user_id: string
        }
        Update: {
          checkin_date?: string
          created_at?: string
          id?: string
          mood?: string
          note?: string | null
          user_id?: string
        }
        Relationships: []
      }
      developer_projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          language: string | null
          name: string
          progress: number | null
          repo_url: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          language?: string | null
          name: string
          progress?: number | null
          repo_url?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          language?: string | null
          name?: string
          progress?: number | null
          repo_url?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      device_controls: {
        Row: {
          allowed_hours_end: string | null
          allowed_hours_start: string | null
          auto_lock_during_schedule: boolean
          content_filter_level: string
          created_at: string
          daily_screen_limit_minutes: number
          focus_required_before_free_time: boolean
          guardian_id: string
          id: string
          min_focus_minutes_per_day: number
          student_id: string
          updated_at: string
        }
        Insert: {
          allowed_hours_end?: string | null
          allowed_hours_start?: string | null
          auto_lock_during_schedule?: boolean
          content_filter_level?: string
          created_at?: string
          daily_screen_limit_minutes?: number
          focus_required_before_free_time?: boolean
          guardian_id: string
          id?: string
          min_focus_minutes_per_day?: number
          student_id: string
          updated_at?: string
        }
        Update: {
          allowed_hours_end?: string | null
          allowed_hours_start?: string | null
          auto_lock_during_schedule?: boolean
          content_filter_level?: string
          created_at?: string
          daily_screen_limit_minutes?: number
          focus_required_before_free_time?: boolean
          guardian_id?: string
          id?: string
          min_focus_minutes_per_day?: number
          student_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      education_policies: {
        Row: {
          actual_result: string | null
          budget: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          implemented_date: string | null
          province: string | null
          status: string
          target: string | null
          title: string
          updated_at: string
        }
        Insert: {
          actual_result?: string | null
          budget?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          implemented_date?: string | null
          province?: string | null
          status?: string
          target?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          actual_result?: string | null
          budget?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          implemented_date?: string | null
          province?: string | null
          status?: string
          target?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          enrolled_at: string
          id: string
          progress: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          id?: string
          progress?: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          id?: string
          progress?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_cards: {
        Row: {
          back: string
          created_at: string
          deck_id: string
          ease_factor: number
          front: string
          id: string
          interval_days: number
          next_review_date: string
          repetitions: number
        }
        Insert: {
          back: string
          created_at?: string
          deck_id: string
          ease_factor?: number
          front: string
          id?: string
          interval_days?: number
          next_review_date?: string
          repetitions?: number
        }
        Update: {
          back?: string
          created_at?: string
          deck_id?: string
          ease_factor?: number
          front?: string
          id?: string
          interval_days?: number
          next_review_date?: string
          repetitions?: number
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_cards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "flashcard_decks"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_decks: {
        Row: {
          created_at: string
          id: string
          subject: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          subject?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          subject?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      focus_sessions: {
        Row: {
          created_at: string
          distraction_count: number
          ended_at: string | null
          focus_minutes: number
          gave_up: boolean
          id: string
          sessions_completed: number
          started_at: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          distraction_count?: number
          ended_at?: string | null
          focus_minutes?: number
          gave_up?: boolean
          id?: string
          sessions_completed?: number
          started_at?: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string
          distraction_count?: number
          ended_at?: string | null
          focus_minutes?: number
          gave_up?: boolean
          id?: string
          sessions_completed?: number
          started_at?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      grades: {
        Row: {
          course_id: string
          created_at: string
          grade_letter: string | null
          id: string
          recorded_by: string | null
          remarks: string | null
          score: number | null
          student_id: string
          term: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          grade_letter?: string | null
          id?: string
          recorded_by?: string | null
          remarks?: string | null
          score?: number | null
          student_id: string
          term?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          grade_letter?: string | null
          id?: string
          recorded_by?: string | null
          remarks?: string | null
          score?: number | null
          student_id?: string
          term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grades_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      guardian_links: {
        Row: {
          created_at: string
          email: string | null
          guardian_id: string | null
          guardian_name: string
          id: string
          mode: string
          phone: string
          relationship: string
          status: string
          student_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          guardian_id?: string | null
          guardian_name: string
          id?: string
          mode?: string
          phone: string
          relationship: string
          status?: string
          student_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          guardian_id?: string | null
          guardian_name?: string
          id?: string
          mode?: string
          phone?: string
          relationship?: string
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      guardian_reports: {
        Row: {
          created_at: string
          guardian_link_id: string | null
          id: string
          report_data: Json
          student_id: string
        }
        Insert: {
          created_at?: string
          guardian_link_id?: string | null
          id?: string
          report_data?: Json
          student_id: string
        }
        Update: {
          created_at?: string
          guardian_link_id?: string | null
          id?: string
          report_data?: Json
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardian_reports_guardian_link_id_fkey"
            columns: ["guardian_link_id"]
            isOneToOne: false
            referencedRelation: "guardian_links"
            referencedColumns: ["id"]
          },
        ]
      }
      guardian_rewards: {
        Row: {
          claimed: boolean | null
          created_at: string
          current_progress: number | null
          guardian_id: string
          id: string
          student_id: string
          target_lessons: number | null
          title: string
        }
        Insert: {
          claimed?: boolean | null
          created_at?: string
          current_progress?: number | null
          guardian_id: string
          id?: string
          student_id: string
          target_lessons?: number | null
          title: string
        }
        Update: {
          claimed?: boolean | null
          created_at?: string
          current_progress?: number | null
          guardian_id?: string
          id?: string
          student_id?: string
          target_lessons?: number | null
          title?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applied_at: string
          company: string
          created_at: string
          id: string
          notes: string | null
          position: string
          status: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          company: string
          created_at?: string
          id?: string
          notes?: string | null
          position: string
          status?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          company?: string
          created_at?: string
          id?: string
          notes?: string | null
          position?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      lesson_completions: {
        Row: {
          completed_at: string
          course_id: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          course_id: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          course_id?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_completions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_completions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          course_id: string
          created_at: string
          duration_minutes: number | null
          id: string
          order_index: number
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          order_index?: number
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      login_events: {
        Row: {
          browser: string | null
          created_at: string
          device_fingerprint: string
          device_name: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          is_new_device: boolean
          location: string | null
          os: string | null
          user_id: string
        }
        Insert: {
          browser?: string | null
          created_at?: string
          device_fingerprint: string
          device_name?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_new_device?: boolean
          location?: string | null
          os?: string | null
          user_id: string
        }
        Update: {
          browser?: string | null
          created_at?: string
          device_fingerprint?: string
          device_name?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_new_device?: boolean
          location?: string | null
          os?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          file_url: string | null
          id: string
          room_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          file_url?: string | null
          id?: string
          room_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          file_url?: string | null
          id?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      ngo_partnerships: {
        Row: {
          contact_email: string | null
          created_at: string
          created_by: string | null
          end_date: string | null
          focus_area: string | null
          funding_amount: number | null
          id: string
          ngo_name: string
          notes: string | null
          program_name: string
          province: string | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          focus_area?: string | null
          funding_amount?: number | null
          id?: string
          ngo_name: string
          notes?: string | null
          program_name: string
          province?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          focus_area?: string | null
          funding_amount?: number | null
          id?: string
          ngo_name?: string
          notes?: string | null
          program_name?: string
          province?: string | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      past_papers: {
        Row: {
          created_at: string
          external_url: string | null
          file_url: string | null
          grade: string
          has_marking_scheme: boolean
          id: string
          paper: string
          source: string | null
          subject: string
          title: string
          uploaded_by: string | null
          year: string
        }
        Insert: {
          created_at?: string
          external_url?: string | null
          file_url?: string | null
          grade: string
          has_marking_scheme?: boolean
          id?: string
          paper?: string
          source?: string | null
          subject: string
          title: string
          uploaded_by?: string | null
          year: string
        }
        Update: {
          created_at?: string
          external_url?: string | null
          file_url?: string | null
          grade?: string
          has_marking_scheme?: boolean
          id?: string
          paper?: string
          source?: string | null
          subject?: string
          title?: string
          uploaded_by?: string | null
          year?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          device_setup_complete: boolean
          full_name: string | null
          grade: string | null
          id: string
          phone: string | null
          province: string | null
          role: Database["public"]["Enums"]["app_role"]
          school: string | null
          theme_preference: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          device_setup_complete?: boolean
          full_name?: string | null
          grade?: string | null
          id: string
          phone?: string | null
          province?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          school?: string | null
          theme_preference?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          device_setup_complete?: boolean
          full_name?: string | null
          grade?: string | null
          id?: string
          phone?: string | null
          province?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          school?: string | null
          theme_preference?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          created_at: string
          id: string
          subscription: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          subscription: Json
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          subscription?: Json
          user_id?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          correct_answers: number
          created_at: string
          grade_level: string
          id: string
          subject: string
          time_taken_seconds: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          correct_answers: number
          created_at?: string
          grade_level: string
          id?: string
          subject: string
          time_taken_seconds?: number | null
          total_questions: number
          user_id: string
        }
        Update: {
          correct_answers?: number
          created_at?: string
          grade_level?: string
          id?: string
          subject?: string
          time_taken_seconds?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      reading_list: {
        Row: {
          completed: boolean | null
          created_at: string
          id: string
          item_type: string | null
          title: string
          url: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: string
          item_type?: string | null
          title: string
          url?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: string
          item_type?: string | null
          title?: string
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      school_events: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_date: string | null
          event_date: string
          event_type: string
          id: string
          school_name: string
          title: string
          venue: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_date?: string | null
          event_date: string
          event_type?: string
          id?: string
          school_name: string
          title: string
          venue?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          event_date?: string
          event_type?: string
          id?: string
          school_name?: string
          title?: string
          venue?: string | null
        }
        Relationships: []
      }
      screen_time_logs: {
        Row: {
          app_name: string
          category: string
          created_at: string
          date: string
          id: string
          minutes_used: number
          user_id: string
        }
        Insert: {
          app_name?: string
          category?: string
          created_at?: string
          date?: string
          id?: string
          minutes_used?: number
          user_id: string
        }
        Update: {
          app_name?: string
          category?: string
          created_at?: string
          date?: string
          id?: string
          minutes_used?: number
          user_id?: string
        }
        Relationships: []
      }
      student_notes: {
        Row: {
          content: string
          course_id: string | null
          created_at: string
          id: string
          lesson_id: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: string
          course_id?: string | null
          created_at?: string
          id?: string
          lesson_id?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string
          id?: string
          lesson_id?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_notes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_notes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      study_goals: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          current: number
          due_date: string | null
          goal_type: string
          id: string
          target: number
          title: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          current?: number
          due_date?: string | null
          goal_type?: string
          id?: string
          target?: number
          title: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          current?: number
          due_date?: string | null
          goal_type?: string
          id?: string
          target?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      study_group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          grade_level: string | null
          id: string
          is_public: boolean | null
          max_members: number | null
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          grade_level?: string | null
          id?: string
          is_public?: boolean | null
          max_members?: number | null
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          grade_level?: string | null
          id?: string
          is_public?: boolean | null
          max_members?: number | null
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      study_schedules: {
        Row: {
          created_at: string
          days: string[]
          end_time: string
          id: string
          is_active: boolean
          start_time: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          days?: string[]
          end_time: string
          id?: string
          is_active?: boolean
          start_time: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string
          days?: string[]
          end_time?: string
          id?: string
          is_active?: boolean
          start_time?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          assignment_id: string
          content: string | null
          feedback: string | null
          file_url: string | null
          graded_at: string | null
          id: string
          score: number | null
          submitted_at: string
          user_id: string
        }
        Insert: {
          assignment_id: string
          content?: string | null
          feedback?: string | null
          file_url?: string | null
          graded_at?: string | null
          id?: string
          score?: number | null
          submitted_at?: string
          user_id: string
        }
        Update: {
          assignment_id?: string
          content?: string | null
          feedback?: string | null
          file_url?: string | null
          graded_at?: string | null
          id?: string
          score?: number | null
          submitted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          current_streak: number
          edu_coins: number
          last_activity_date: string | null
          level: number
          longest_streak: number
          total_focus_minutes: number
          total_lessons_completed: number
          total_quizzes_passed: number
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          current_streak?: number
          edu_coins?: number
          last_activity_date?: string | null
          level?: number
          longest_streak?: number
          total_focus_minutes?: number
          total_lessons_completed?: number
          total_quizzes_passed?: number
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          current_streak?: number
          edu_coins?: number
          last_activity_date?: string | null
          level?: number
          longest_streak?: number
          total_focus_minutes?: number
          total_lessons_completed?: number
          total_quizzes_passed?: number
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      venture_financials: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          description: string | null
          id: string
          transaction_date: string
          type: string
          user_id: string
          venture_id: string | null
        }
        Insert: {
          amount?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          transaction_date?: string
          type?: string
          user_id: string
          venture_id?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          transaction_date?: string
          type?: string
          user_id?: string
          venture_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venture_financials_venture_id_fkey"
            columns: ["venture_id"]
            isOneToOne: false
            referencedRelation: "ventures"
            referencedColumns: ["id"]
          },
        ]
      }
      ventures: {
        Row: {
          created_at: string
          description: string | null
          funding_amount: number | null
          funding_status: string | null
          id: string
          name: string
          notes: string | null
          progress: number | null
          sector: string | null
          stage: string | null
          team_size: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          funding_amount?: number | null
          funding_status?: string | null
          id?: string
          name: string
          notes?: string | null
          progress?: number | null
          sector?: string | null
          stage?: string | null
          team_size?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          funding_amount?: number | null
          funding_status?: string | null
          id?: string
          name?: string
          notes?: string | null
          progress?: number | null
          sector?: string | null
          stage?: string | null
          team_size?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_xp: {
        Args: { p_coins?: number; p_user_id: string; p_xp: number }
        Returns: undefined
      }
      calculate_user_streak: { Args: { p_user_id: string }; Returns: number }
      get_platform_stats: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "student"
        | "teacher"
        | "guardian"
        | "institution"
        | "ministry"
        | "doctor"
        | "entrepreneur"
        | "developer"
        | "skills"
        | "cybersecurity"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "student",
        "teacher",
        "guardian",
        "institution",
        "ministry",
        "doctor",
        "entrepreneur",
        "developer",
        "skills",
        "cybersecurity",
      ],
    },
  },
} as const
