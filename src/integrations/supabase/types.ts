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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_url: string | null
          description: string | null
          earned_at: string | null
          id: string
          title: string
          user_id: string | null
        }
        Insert: {
          badge_url?: string | null
          description?: string | null
          earned_at?: string | null
          id?: string
          title: string
          user_id?: string | null
        }
        Update: {
          badge_url?: string | null
          description?: string | null
          earned_at?: string | null
          id?: string
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_history: {
        Row: {
          chat_type: string | null
          created_at: string | null
          id: string
          message: string
          response: string
          user_id: string | null
        }
        Insert: {
          chat_type?: string | null
          created_at?: string | null
          id?: string
          message: string
          response: string
          user_id?: string | null
        }
        Update: {
          chat_type?: string | null
          created_at?: string | null
          id?: string
          message?: string
          response?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          back_content: string
          created_at: string | null
          difficulty_level: string | null
          front_content: string
          id: string
          subject: string | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          back_content: string
          created_at?: string | null
          difficulty_level?: string | null
          front_content: string
          id?: string
          subject?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          back_content?: string
          created_at?: string | null
          difficulty_level?: string | null
          front_content?: string
          id?: string
          subject?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string | null
          forum_id: number | null
          id: number
          language: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          forum_id?: number | null
          id?: number
          language?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          forum_id?: number | null
          id?: number
          language?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_forum_id_fkey"
            columns: ["forum_id"]
            isOneToOne: false
            referencedRelation: "forums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forums: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "forums_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_analytics: {
        Row: {
          activity_type: string
          completed_at: string | null
          content_id: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          metadata: Json | null
          performance_score: number | null
          score: number | null
          subject: string
          time_spent: number | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          completed_at?: string | null
          content_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          metadata?: Json | null
          performance_score?: number | null
          score?: number | null
          subject: string
          time_spent?: number | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          completed_at?: string | null
          content_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          metadata?: Json | null
          performance_score?: number | null
          score?: number | null
          subject?: string
          time_spent?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          created_at: string | null
          id: string
          nutritional_info: Json | null
          plan_name: string
          recipes: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nutritional_info?: Json | null
          plan_name: string
          recipes?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nutritional_info?: Json | null
          plan_name?: string
          recipes?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          subject: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          subject?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          subject?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          grade_level: string | null
          id: string
          onboarding_completed: boolean | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          grade_level?: string | null
          id: string
          onboarding_completed?: boolean | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          grade_level?: string | null
          id?: string
          onboarding_completed?: boolean | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          completion_percentage: number | null
          id: string
          last_accessed: string | null
          subject: string
          topic: string
          user_id: string | null
        }
        Insert: {
          completion_percentage?: number | null
          id?: string
          last_accessed?: string | null
          subject: string
          topic: string
          user_id?: string | null
        }
        Update: {
          completion_percentage?: number | null
          id?: string
          last_accessed?: string | null
          subject?: string
          topic?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_assistant_logs: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          query: string
          response: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          query: string
          response: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          query?: string
          response?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_assistant_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_goals: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          target_date: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          target_date?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          target_date?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_materials: {
        Row: {
          curriculum: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          grade: string | null
          id: string
          metadata: Json | null
          subject: string | null
          upload_date: string | null
          user_id: string | null
        }
        Insert: {
          curriculum?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          grade?: string | null
          id?: string
          metadata?: Json | null
          subject?: string | null
          upload_date?: string | null
          user_id?: string | null
        }
        Update: {
          curriculum?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          grade?: string | null
          id?: string
          metadata?: Json | null
          subject?: string | null
          upload_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_materials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          created_at: string | null
          duration: number
          id: string
          notes: string | null
          subject: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration: number
          id?: string
          notes?: string | null
          subject: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: number
          id?: string
          notes?: string | null
          subject?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          notifications_enabled: boolean | null
          theme: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          theme?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          theme?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
