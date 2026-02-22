export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1';
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          email: string;
          id: string;
          name: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          email: string;
          id: string;
          name: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          email?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      submissions: {
        Row: {
          answer: string;
          covered: Json | null;
          feedback: string | null;
          id: string;
          judge_level: number | null;
          missed: Json | null;
          score: number | null;
          submitted_at: string | null;
          task_id: string | null;
          user_id: string | null;
        };
        Insert: {
          answer: string;
          covered?: Json | null;
          feedback?: string | null;
          id?: string;
          judge_level?: number | null;
          missed?: Json | null;
          score?: number | null;
          submitted_at?: string | null;
          task_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          answer?: string;
          covered?: Json | null;
          feedback?: string | null;
          id?: string;
          judge_level?: number | null;
          missed?: Json | null;
          score?: number | null;
          submitted_at?: string | null;
          task_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'submissions_task_id_fkey';
            columns: ['task_id'];
            isOneToOne: false;
            referencedRelation: 'public_tasks';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'submissions_task_id_fkey';
            columns: ['task_id'];
            isOneToOne: false;
            referencedRelation: 'tasks';
            referencedColumns: ['id'];
          },
        ];
      };
      tasks: {
        Row: {
          code_template: string | null;
          created_at: string | null;
          difficulty: number | null;
          golden_answer: string;
          hints: Json | null;
          id: string;
          max_score: number | null;
          question_text: string;
          rubric_items: Json;
          rubric_weights: Json | null;
          test_code: string | null;
          title: string;
          topic_id: string | null;
          type: string;
        };
        Insert: {
          code_template?: string | null;
          created_at?: string | null;
          difficulty?: number | null;
          golden_answer: string;
          hints?: Json | null;
          id: string;
          max_score?: number | null;
          question_text: string;
          rubric_items: Json;
          rubric_weights?: Json | null;
          test_code?: string | null;
          title: string;
          topic_id?: string | null;
          type: string;
        };
        Update: {
          code_template?: string | null;
          created_at?: string | null;
          difficulty?: number | null;
          golden_answer?: string;
          hints?: Json | null;
          id?: string;
          max_score?: number | null;
          question_text?: string;
          rubric_items?: Json;
          rubric_weights?: Json | null;
          test_code?: string | null;
          title?: string;
          topic_id?: string | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_topic_id_fkey';
            columns: ['topic_id'];
            isOneToOne: false;
            referencedRelation: 'topics';
            referencedColumns: ['id'];
          },
        ];
      };
      topics: {
        Row: {
          description: string | null;
          icon: string | null;
          id: string;
          sort_order: number | null;
          title: string;
        };
        Insert: {
          description?: string | null;
          icon?: string | null;
          id: string;
          sort_order?: number | null;
          title: string;
        };
        Update: {
          description?: string | null;
          icon?: string | null;
          id?: string;
          sort_order?: number | null;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      public_tasks: {
        Row: {
          code_template: string | null;
          created_at: string | null;
          difficulty: number | null;
          id: string | null;
          max_score: number | null;
          question_text: string | null;
          rubric_items: Json | null;
          title: string | null;
          topic_id: string | null;
          type: string | null;
        };
        Insert: {
          code_template?: string | null;
          created_at?: string | null;
          difficulty?: number | null;
          id?: string | null;
          max_score?: number | null;
          question_text?: string | null;
          rubric_items?: Json | null;
          title?: string | null;
          topic_id?: string | null;
          type?: string | null;
        };
        Update: {
          code_template?: string | null;
          created_at?: string | null;
          difficulty?: number | null;
          id?: string | null;
          max_score?: number | null;
          question_text?: string | null;
          rubric_items?: Json | null;
          title?: string | null;
          topic_id?: string | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_topic_id_fkey';
            columns: ['topic_id'];
            isOneToOne: false;
            referencedRelation: 'topics';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      get_topic_progress: { Args: never; Returns: Json };
      get_user_stats: { Args: never; Returns: Json };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
