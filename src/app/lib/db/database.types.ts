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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_access_requests: {
        Row: {
          id: string
          org_id: string
          requested_at: string
          requester_email: string
          requester_id: string
          requester_name: string
          resolution_note: string
          resolved_at: string | null
          resolved_by: string | null
          status: string
        }
        Insert: {
          id?: string
          org_id: string
          requested_at?: string
          requester_email: string
          requester_id: string
          requester_name?: string
          resolution_note?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Update: {
          id?: string
          org_id?: string
          requested_at?: string
          requester_email?: string
          requester_id?: string
          requester_name?: string
          resolution_note?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_access_requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_access_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_access_requests_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_events: {
        Row: {
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          event_type: string
          id: string
          metadata: Json
          org_id: string | null
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          event_type: string
          id?: string
          metadata?: Json
          org_id?: string | null
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          event_type?: string
          id?: string
          metadata?: Json
          org_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_events_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      commercialization_reports: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          claims_approved_at: string | null
          claims_approved_by: string | null
          claims_evidence_fingerprint: string | null
          claims_scope: string | null
          concept_test_id: string
          cover_image_id: string | null
          created_at: string
          created_by: string
          decision_record_id: string
          evidence_bundle_id: string | null
          formulation_version_id: string | null
          id: string
          org_id: string | null
          packaging_image_id: string | null
          project_id: string | null
          report_snapshot: Json
          status: string
          title: string
          updated_at: string
          version: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          claims_approved_at?: string | null
          claims_approved_by?: string | null
          claims_evidence_fingerprint?: string | null
          claims_scope?: string | null
          concept_test_id: string
          cover_image_id?: string | null
          created_at?: string
          created_by: string
          decision_record_id: string
          evidence_bundle_id?: string | null
          formulation_version_id?: string | null
          id?: string
          org_id?: string | null
          packaging_image_id?: string | null
          project_id?: string | null
          report_snapshot: Json
          status?: string
          title: string
          updated_at?: string
          version?: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          claims_approved_at?: string | null
          claims_approved_by?: string | null
          claims_evidence_fingerprint?: string | null
          claims_scope?: string | null
          concept_test_id?: string
          cover_image_id?: string | null
          created_at?: string
          created_by?: string
          decision_record_id?: string
          evidence_bundle_id?: string | null
          formulation_version_id?: string | null
          id?: string
          org_id?: string | null
          packaging_image_id?: string | null
          project_id?: string | null
          report_snapshot?: Json
          status?: string
          title?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "commercialization_reports_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_claims_approved_by_fkey"
            columns: ["claims_approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_concept_test_id_fkey"
            columns: ["concept_test_id"]
            isOneToOne: false
            referencedRelation: "concept_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_cover_image_id_fkey"
            columns: ["cover_image_id"]
            isOneToOne: false
            referencedRelation: "concept_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_decision_record_id_fkey"
            columns: ["decision_record_id"]
            isOneToOne: false
            referencedRelation: "decision_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_evidence_bundle_id_fkey"
            columns: ["evidence_bundle_id"]
            isOneToOne: false
            referencedRelation: "evidence_bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_packaging_image_id_fkey"
            columns: ["packaging_image_id"]
            isOneToOne: false
            referencedRelation: "concept_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commercialization_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      composition_profiles: {
        Row: {
          calcium_mg: number
          created_at: string
          fat: number
          id: string
          moisture: number
          org_id: string | null
          ph: number
          protein: number
          salt_content: number
          sample_id: string
        }
        Insert: {
          calcium_mg?: number
          created_at?: string
          fat?: number
          id?: string
          moisture?: number
          org_id?: string | null
          ph?: number
          protein?: number
          salt_content?: number
          sample_id: string
        }
        Update: {
          calcium_mg?: number
          created_at?: string
          fat?: number
          id?: string
          moisture?: number
          org_id?: string | null
          ph?: number
          protein?: number
          salt_content?: number
          sample_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "composition_profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "composition_profiles_sample_id_fkey"
            columns: ["sample_id"]
            isOneToOne: true
            referencedRelation: "instrumental_samples"
            referencedColumns: ["id"]
          },
        ]
      }
      concept_generation_settings: {
        Row: {
          active: boolean
          created_at: string | null
          default_image_count: number
          default_model: string
          default_quality: string
          estimated_cost_per_image: number
          id: string
          max_images_per_concept: number
          monthly_budget: number
          org_id: string | null
          prompt_style: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          default_image_count?: number
          default_model?: string
          default_quality?: string
          estimated_cost_per_image?: number
          id?: string
          max_images_per_concept?: number
          monthly_budget?: number
          org_id?: string | null
          prompt_style?: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          default_image_count?: number
          default_model?: string
          default_quality?: string
          estimated_cost_per_image?: number
          id?: string
          max_images_per_concept?: number
          monthly_budget?: number
          org_id?: string | null
          prompt_style?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concept_generation_settings_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      concept_image_generations: {
        Row: {
          completed_at: string | null
          concept_folder_name: string | null
          concept_name: string | null
          concept_snapshot: Json
          concept_test_id: string | null
          created_at: string | null
          created_by: string | null
          error_message: string | null
          estimated_cost: number | null
          food_type_slug: string | null
          id: string
          mode: string
          model: string
          org_id: string | null
          prompt: string
          prompt_style: string
          quality: string
          requested_count: number
          status: string
        }
        Insert: {
          completed_at?: string | null
          concept_folder_name?: string | null
          concept_name?: string | null
          concept_snapshot?: Json
          concept_test_id?: string | null
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          estimated_cost?: number | null
          food_type_slug?: string | null
          id?: string
          mode?: string
          model?: string
          org_id?: string | null
          prompt?: string
          prompt_style?: string
          quality?: string
          requested_count?: number
          status?: string
        }
        Update: {
          completed_at?: string | null
          concept_folder_name?: string | null
          concept_name?: string | null
          concept_snapshot?: Json
          concept_test_id?: string | null
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          estimated_cost?: number | null
          food_type_slug?: string | null
          id?: string
          mode?: string
          model?: string
          org_id?: string | null
          prompt?: string
          prompt_style?: string
          quality?: string
          requested_count?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "concept_image_generations_concept_test_id_fkey"
            columns: ["concept_test_id"]
            isOneToOne: false
            referencedRelation: "concept_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_image_generations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_image_generations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      concept_images: {
        Row: {
          approved_for_external_use: boolean
          archived_at: string | null
          asset_role: string
          concept_test_id: string | null
          created_at: string | null
          external_approved_at: string | null
          external_approved_by: string | null
          focal_x: number
          focal_y: number
          generation_id: string | null
          id: string
          image_url: string
          mode: string | null
          model: string | null
          org_id: string | null
          parent_image_id: string | null
          performance_summary: Json
          prompt: string | null
          prompt_style: string
          quality: string | null
          quality_scores: Json
          review_status: string
          safe_area: Json
          selected_for_panelists: boolean
          sort_order: number
          source_kind: string
          storage_path: string | null
        }
        Insert: {
          approved_for_external_use?: boolean
          archived_at?: string | null
          asset_role?: string
          concept_test_id?: string | null
          created_at?: string | null
          external_approved_at?: string | null
          external_approved_by?: string | null
          focal_x?: number
          focal_y?: number
          generation_id?: string | null
          id?: string
          image_url: string
          mode?: string | null
          model?: string | null
          org_id?: string | null
          parent_image_id?: string | null
          performance_summary?: Json
          prompt?: string | null
          prompt_style?: string
          quality?: string | null
          quality_scores?: Json
          review_status?: string
          safe_area?: Json
          selected_for_panelists?: boolean
          sort_order?: number
          source_kind?: string
          storage_path?: string | null
        }
        Update: {
          approved_for_external_use?: boolean
          archived_at?: string | null
          asset_role?: string
          concept_test_id?: string | null
          created_at?: string | null
          external_approved_at?: string | null
          external_approved_by?: string | null
          focal_x?: number
          focal_y?: number
          generation_id?: string | null
          id?: string
          image_url?: string
          mode?: string | null
          model?: string | null
          org_id?: string | null
          parent_image_id?: string | null
          performance_summary?: Json
          prompt?: string | null
          prompt_style?: string
          quality?: string | null
          quality_scores?: Json
          review_status?: string
          safe_area?: Json
          selected_for_panelists?: boolean
          sort_order?: number
          source_kind?: string
          storage_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concept_images_concept_test_id_fkey"
            columns: ["concept_test_id"]
            isOneToOne: false
            referencedRelation: "concept_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_images_external_approved_by_fkey"
            columns: ["external_approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_images_generation_id_fkey"
            columns: ["generation_id"]
            isOneToOne: false
            referencedRelation: "concept_image_generations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_images_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_images_parent_image_id_fkey"
            columns: ["parent_image_id"]
            isOneToOne: false
            referencedRelation: "concept_images"
            referencedColumns: ["id"]
          },
        ]
      }
      concept_responses: {
        Row: {
          answers: Json
          concept_test_id: string | null
          created_at: string | null
          id: string
          org_id: string | null
          user_id: string | null
        }
        Insert: {
          answers?: Json
          concept_test_id?: string | null
          created_at?: string | null
          id?: string
          org_id?: string | null
          user_id?: string | null
        }
        Update: {
          answers?: Json
          concept_test_id?: string | null
          created_at?: string | null
          id?: string
          org_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concept_responses_concept_test_id_fkey"
            columns: ["concept_test_id"]
            isOneToOne: false
            referencedRelation: "concept_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_responses_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      concept_tests: {
        Row: {
          approval_notes: string | null
          archived_at: string | null
          assigned_panelist_ids: string[] | null
          brand_reference_image_id: string | null
          category: string
          concept_folder_name: string | null
          created_at: string | null
          decision_record_id: string | null
          description: string | null
          evidence_bundle_id: string | null
          food_type_slug: string | null
          formulation_version_id: string | null
          generated_image_ids: string[] | null
          id: string
          image_urls: string[] | null
          key_benefits: string | null
          launched_at: string | null
          name: string
          org_id: string | null
          panel_size: number
          price_point: string | null
          product_truth_image_id: string | null
          project_id: string | null
          questions: Json
          report_cover_image_id: string | null
          status: string
          target_market: string | null
          variant_dimensions: Json | null
        }
        Insert: {
          approval_notes?: string | null
          archived_at?: string | null
          assigned_panelist_ids?: string[] | null
          brand_reference_image_id?: string | null
          category?: string
          concept_folder_name?: string | null
          created_at?: string | null
          decision_record_id?: string | null
          description?: string | null
          evidence_bundle_id?: string | null
          food_type_slug?: string | null
          formulation_version_id?: string | null
          generated_image_ids?: string[] | null
          id?: string
          image_urls?: string[] | null
          key_benefits?: string | null
          launched_at?: string | null
          name: string
          org_id?: string | null
          panel_size?: number
          price_point?: string | null
          product_truth_image_id?: string | null
          project_id?: string | null
          questions?: Json
          report_cover_image_id?: string | null
          status?: string
          target_market?: string | null
          variant_dimensions?: Json | null
        }
        Update: {
          approval_notes?: string | null
          archived_at?: string | null
          assigned_panelist_ids?: string[] | null
          brand_reference_image_id?: string | null
          category?: string
          concept_folder_name?: string | null
          created_at?: string | null
          decision_record_id?: string | null
          description?: string | null
          evidence_bundle_id?: string | null
          food_type_slug?: string | null
          formulation_version_id?: string | null
          generated_image_ids?: string[] | null
          id?: string
          image_urls?: string[] | null
          key_benefits?: string | null
          launched_at?: string | null
          name?: string
          org_id?: string | null
          panel_size?: number
          price_point?: string | null
          product_truth_image_id?: string | null
          project_id?: string | null
          questions?: Json
          report_cover_image_id?: string | null
          status?: string
          target_market?: string | null
          variant_dimensions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "concept_tests_brand_reference_image_id_fkey"
            columns: ["brand_reference_image_id"]
            isOneToOne: false
            referencedRelation: "concept_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_tests_decision_record_id_fkey"
            columns: ["decision_record_id"]
            isOneToOne: false
            referencedRelation: "decision_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_tests_evidence_bundle_id_fkey"
            columns: ["evidence_bundle_id"]
            isOneToOne: false
            referencedRelation: "evidence_bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_tests_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_tests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_tests_product_truth_image_id_fkey"
            columns: ["product_truth_image_id"]
            isOneToOne: false
            referencedRelation: "concept_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_tests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_tests_report_cover_image_id_fkey"
            columns: ["report_cover_image_id"]
            isOneToOne: false
            referencedRelation: "concept_images"
            referencedColumns: ["id"]
          },
        ]
      }
      concept_workspace_drafts: {
        Row: {
          created_at: string
          created_by: string
          current_step: string
          decision_record_id: string
          draft_payload: Json
          evidence_bundle_id: string
          formulation_version_id: string | null
          id: string
          org_id: string
          project_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          current_step?: string
          decision_record_id: string
          draft_payload?: Json
          evidence_bundle_id: string
          formulation_version_id?: string | null
          id?: string
          org_id: string
          project_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          current_step?: string
          decision_record_id?: string
          draft_payload?: Json
          evidence_bundle_id?: string
          formulation_version_id?: string | null
          id?: string
          org_id?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "concept_workspace_drafts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_workspace_drafts_decision_record_id_fkey"
            columns: ["decision_record_id"]
            isOneToOne: false
            referencedRelation: "decision_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_workspace_drafts_evidence_bundle_id_fkey"
            columns: ["evidence_bundle_id"]
            isOneToOne: false
            referencedRelation: "evidence_bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_workspace_drafts_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_workspace_drafts_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concept_workspace_drafts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      decision_records: {
        Row: {
          confidence: number
          created_at: string
          created_by: string
          decision: string
          decision_fingerprint: string
          evidence_bundle_id: string | null
          formulation_version_id: string | null
          id: string
          instrumental_sample_id: string | null
          issf_score: number
          method_version: string
          note: string
          org_id: string | null
          parent_decision_id: string | null
          project_id: string | null
          research_fingerprint: string | null
          research_refreshed_at: string | null
          sample_id: string
          sample_name: string
        }
        Insert: {
          confidence: number
          created_at?: string
          created_by: string
          decision: string
          decision_fingerprint: string
          evidence_bundle_id?: string | null
          formulation_version_id?: string | null
          id?: string
          instrumental_sample_id?: string | null
          issf_score: number
          method_version: string
          note?: string
          org_id?: string | null
          parent_decision_id?: string | null
          project_id?: string | null
          research_fingerprint?: string | null
          research_refreshed_at?: string | null
          sample_id: string
          sample_name: string
        }
        Update: {
          confidence?: number
          created_at?: string
          created_by?: string
          decision?: string
          decision_fingerprint?: string
          evidence_bundle_id?: string | null
          formulation_version_id?: string | null
          id?: string
          instrumental_sample_id?: string | null
          issf_score?: number
          method_version?: string
          note?: string
          org_id?: string | null
          parent_decision_id?: string | null
          project_id?: string | null
          research_fingerprint?: string | null
          research_refreshed_at?: string | null
          sample_id?: string
          sample_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "decision_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_records_evidence_bundle_id_fkey"
            columns: ["evidence_bundle_id"]
            isOneToOne: false
            referencedRelation: "evidence_bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_records_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_records_instrumental_sample_id_fkey"
            columns: ["instrumental_sample_id"]
            isOneToOne: false
            referencedRelation: "instrumental_samples"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_records_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_records_parent_decision_id_fkey"
            columns: ["parent_decision_id"]
            isOneToOne: false
            referencedRelation: "decision_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_records_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      e_tongue_measurements: {
        Row: {
          bitterness: number
          created_at: string
          id: string
          org_id: string | null
          saltiness: number
          sample_id: string
          sourness: number
          sweetness: number
          umami: number
        }
        Insert: {
          bitterness?: number
          created_at?: string
          id?: string
          org_id?: string | null
          saltiness?: number
          sample_id: string
          sourness?: number
          sweetness?: number
          umami?: number
        }
        Update: {
          bitterness?: number
          created_at?: string
          id?: string
          org_id?: string | null
          saltiness?: number
          sample_id?: string
          sourness?: number
          sweetness?: number
          umami?: number
        }
        Relationships: [
          {
            foreignKeyName: "e_tongue_measurements_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "e_tongue_measurements_sample_id_fkey"
            columns: ["sample_id"]
            isOneToOne: false
            referencedRelation: "instrumental_samples"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_bundles: {
        Row: {
          created_at: string
          created_by: string
          decision_record_id: string | null
          formulation_version_id: string | null
          id: string
          instrumental_sample_id: string | null
          is_current_product: boolean
          literature_fingerprint: string | null
          literature_refreshed_at: string | null
          org_id: string | null
          payload: Json
          product_evidence_fingerprint: string
          project_id: string | null
          sample_id: string
          schema_version: string
          source_data_version: string
          supersedes_bundle_id: string | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by: string
          decision_record_id?: string | null
          formulation_version_id?: string | null
          id?: string
          instrumental_sample_id?: string | null
          is_current_product?: boolean
          literature_fingerprint?: string | null
          literature_refreshed_at?: string | null
          org_id?: string | null
          payload: Json
          product_evidence_fingerprint: string
          project_id?: string | null
          sample_id: string
          schema_version: string
          source_data_version: string
          supersedes_bundle_id?: string | null
          version: number
        }
        Update: {
          created_at?: string
          created_by?: string
          decision_record_id?: string | null
          formulation_version_id?: string | null
          id?: string
          instrumental_sample_id?: string | null
          is_current_product?: boolean
          literature_fingerprint?: string | null
          literature_refreshed_at?: string | null
          org_id?: string | null
          payload?: Json
          product_evidence_fingerprint?: string
          project_id?: string | null
          sample_id?: string
          schema_version?: string
          source_data_version?: string
          supersedes_bundle_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "evidence_bundles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_bundles_decision_record_id_fkey"
            columns: ["decision_record_id"]
            isOneToOne: false
            referencedRelation: "decision_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_bundles_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_bundles_instrumental_sample_id_fkey"
            columns: ["instrumental_sample_id"]
            isOneToOne: false
            referencedRelation: "instrumental_samples"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_bundles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_bundles_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_bundles_supersedes_bundle_id_fkey"
            columns: ["supersedes_bundle_id"]
            isOneToOne: false
            referencedRelation: "evidence_bundles"
            referencedColumns: ["id"]
          },
        ]
      }
      food_types: {
        Row: {
          aliases: string[]
          created_at: string
          created_by: string | null
          id: string
          label: string
          org_id: string | null
          slug: string
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          aliases?: string[]
          created_at?: string
          created_by?: string | null
          id?: string
          label: string
          org_id?: string | null
          slug: string
          source?: string
          status?: string
          updated_at?: string
        }
        Update: {
          aliases?: string[]
          created_at?: string
          created_by?: string | null
          id?: string
          label?: string
          org_id?: string | null
          slug?: string
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_types_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_types_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      formulation_experiment_arms: {
        Row: {
          arm_type: string
          change_description: string
          code: string
          created_at: string
          experiment_id: string
          formulation_version_id: string | null
          id: string
          label: string
          mechanism: string
          org_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          arm_type: string
          change_description?: string
          code: string
          created_at?: string
          experiment_id: string
          formulation_version_id?: string | null
          id?: string
          label: string
          mechanism?: string
          org_id?: string
          sort_order: number
          updated_at?: string
        }
        Update: {
          arm_type?: string
          change_description?: string
          code?: string
          created_at?: string
          experiment_id?: string
          formulation_version_id?: string | null
          id?: string
          label?: string
          mechanism?: string
          org_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "formulation_experiment_arms_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "approved_formulation_learnings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_arms_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "formulation_experiments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_arms_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_arms_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      formulation_experiment_evaluations: {
        Row: {
          arm_id: string
          category_fit_score: number | null
          created_at: string
          defect_flags: string[]
          experiment_id: string
          id: string
          org_id: string
          overall_liking: number | null
          primary_score: number
          secondary_scores: Json
          trial_id: string
          updated_at: string
        }
        Insert: {
          arm_id: string
          category_fit_score?: number | null
          created_at?: string
          defect_flags?: string[]
          experiment_id: string
          id?: string
          org_id?: string
          overall_liking?: number | null
          primary_score: number
          secondary_scores?: Json
          trial_id: string
          updated_at?: string
        }
        Update: {
          arm_id?: string
          category_fit_score?: number | null
          created_at?: string
          defect_flags?: string[]
          experiment_id?: string
          id?: string
          org_id?: string
          overall_liking?: number | null
          primary_score?: number
          secondary_scores?: Json
          trial_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "formulation_experiment_evaluations_arm_id_fkey"
            columns: ["arm_id"]
            isOneToOne: false
            referencedRelation: "formulation_experiment_arms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_evaluations_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "approved_formulation_learnings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_evaluations_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "formulation_experiments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_evaluations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_evaluations_trial_id_fkey"
            columns: ["trial_id"]
            isOneToOne: false
            referencedRelation: "formulation_experiment_trials"
            referencedColumns: ["id"]
          },
        ]
      }
      formulation_experiment_trials: {
        Row: {
          batch_code: string | null
          created_at: string
          evaluated_at: string
          experiment_id: string
          id: string
          notes: string | null
          org_id: string
          participant_key: string
          session_key: string
        }
        Insert: {
          batch_code?: string | null
          created_at?: string
          evaluated_at?: string
          experiment_id: string
          id?: string
          notes?: string | null
          org_id?: string
          participant_key: string
          session_key?: string
        }
        Update: {
          batch_code?: string | null
          created_at?: string
          evaluated_at?: string
          experiment_id?: string
          id?: string
          notes?: string | null
          org_id?: string
          participant_key?: string
          session_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "formulation_experiment_trials_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "approved_formulation_learnings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_trials_experiment_id_fkey"
            columns: ["experiment_id"]
            isOneToOne: false
            referencedRelation: "formulation_experiments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiment_trials_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      formulation_experiments: {
        Row: {
          advancement_gates: Json
          analysis_mode: string
          analysis_snapshot: Json | null
          analyzed_at: string | null
          bootstrap_iterations: number
          confidence_level: number
          confirmation_completed_at: string | null
          created_at: string
          created_by: string
          decision_record_id: string
          deterministic_seed: number
          evidence_bundle_id: string
          formulation_version_id: string | null
          hypothesis: string
          id: string
          learning_applies_to: string[]
          learning_approved_at: string | null
          learning_approved_by: string | null
          learning_limitations: string[]
          learning_status: string
          learning_summary: string | null
          learning_tags: string[]
          lifecycle: string
          locked_at: string | null
          locked_by: string | null
          measured_driver: string
          minimum_n: number
          name: string
          org_id: string
          primary_outcome: string
          primary_scale_max: number
          primary_scale_min: number
          project_id: string
          serving_protocol: string
          storage_checkpoints: Json
          uncertainty_margin: number
          updated_at: string
          winner_arm_id: string | null
        }
        Insert: {
          advancement_gates?: Json
          analysis_mode?: string
          analysis_snapshot?: Json | null
          analyzed_at?: string | null
          bootstrap_iterations?: number
          confidence_level?: number
          confirmation_completed_at?: string | null
          created_at?: string
          created_by: string
          decision_record_id: string
          deterministic_seed?: number
          evidence_bundle_id: string
          formulation_version_id?: string | null
          hypothesis: string
          id?: string
          learning_applies_to?: string[]
          learning_approved_at?: string | null
          learning_approved_by?: string | null
          learning_limitations?: string[]
          learning_status?: string
          learning_summary?: string | null
          learning_tags?: string[]
          lifecycle?: string
          locked_at?: string | null
          locked_by?: string | null
          measured_driver: string
          minimum_n?: number
          name: string
          org_id?: string
          primary_outcome: string
          primary_scale_max?: number
          primary_scale_min?: number
          project_id: string
          serving_protocol?: string
          storage_checkpoints?: Json
          uncertainty_margin?: number
          updated_at?: string
          winner_arm_id?: string | null
        }
        Update: {
          advancement_gates?: Json
          analysis_mode?: string
          analysis_snapshot?: Json | null
          analyzed_at?: string | null
          bootstrap_iterations?: number
          confidence_level?: number
          confirmation_completed_at?: string | null
          created_at?: string
          created_by?: string
          decision_record_id?: string
          deterministic_seed?: number
          evidence_bundle_id?: string
          formulation_version_id?: string | null
          hypothesis?: string
          id?: string
          learning_applies_to?: string[]
          learning_approved_at?: string | null
          learning_approved_by?: string | null
          learning_limitations?: string[]
          learning_status?: string
          learning_summary?: string | null
          learning_tags?: string[]
          lifecycle?: string
          locked_at?: string | null
          locked_by?: string | null
          measured_driver?: string
          minimum_n?: number
          name?: string
          org_id?: string
          primary_outcome?: string
          primary_scale_max?: number
          primary_scale_min?: number
          project_id?: string
          serving_protocol?: string
          storage_checkpoints?: Json
          uncertainty_margin?: number
          updated_at?: string
          winner_arm_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_experiments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_decision_record_id_fkey"
            columns: ["decision_record_id"]
            isOneToOne: false
            referencedRelation: "decision_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_evidence_bundle_id_fkey"
            columns: ["evidence_bundle_id"]
            isOneToOne: false
            referencedRelation: "evidence_bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_learning_approved_by_fkey"
            columns: ["learning_approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_locked_by_fkey"
            columns: ["locked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_winner_arm_fkey"
            columns: ["winner_arm_id"]
            isOneToOne: false
            referencedRelation: "formulation_experiment_arms"
            referencedColumns: ["id"]
          },
        ]
      }
      formulation_ingredients: {
        Row: {
          allergen_tags: string[]
          canonical_name: string | null
          confidence: number
          created_at: string
          dietary_tags: string[]
          formulation_version_id: string
          functional_role: string | null
          id: string
          notes: string | null
          org_id: string
          percentage: number | null
          position: number
          review_status: string
          specification: string | null
          supplied_name: string
          supplier: string | null
          updated_at: string
        }
        Insert: {
          allergen_tags?: string[]
          canonical_name?: string | null
          confidence?: number
          created_at?: string
          dietary_tags?: string[]
          formulation_version_id: string
          functional_role?: string | null
          id?: string
          notes?: string | null
          org_id: string
          percentage?: number | null
          position: number
          review_status?: string
          specification?: string | null
          supplied_name: string
          supplier?: string | null
          updated_at?: string
        }
        Update: {
          allergen_tags?: string[]
          canonical_name?: string | null
          confidence?: number
          created_at?: string
          dietary_tags?: string[]
          formulation_version_id?: string
          functional_role?: string | null
          id?: string
          notes?: string | null
          org_id?: string
          percentage?: number | null
          position?: number
          review_status?: string
          specification?: string | null
          supplied_name?: string
          supplier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "formulation_ingredients_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_ingredients_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      formulation_versions: {
        Row: {
          change_summary: string | null
          created_at: string
          created_by: string | null
          exact_statement: string
          fingerprint: string
          id: string
          instrumental_sample_id: string
          is_current: boolean
          org_id: string
          previous_version_id: string | null
          project_id: string | null
          review_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          statement_source: string
          updated_at: string
          version_number: number
        }
        Insert: {
          change_summary?: string | null
          created_at?: string
          created_by?: string | null
          exact_statement: string
          fingerprint: string
          id?: string
          instrumental_sample_id: string
          is_current?: boolean
          org_id: string
          previous_version_id?: string | null
          project_id?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          statement_source: string
          updated_at?: string
          version_number: number
        }
        Update: {
          change_summary?: string | null
          created_at?: string
          created_by?: string | null
          exact_statement?: string
          fingerprint?: string
          id?: string
          instrumental_sample_id?: string
          is_current?: boolean
          org_id?: string
          previous_version_id?: string | null
          project_id?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          statement_source?: string
          updated_at?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "formulation_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_versions_instrumental_sample_id_fkey"
            columns: ["instrumental_sample_id"]
            isOneToOne: false
            referencedRelation: "instrumental_samples"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_versions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_versions_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_versions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_versions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gcms_compounds: {
        Row: {
          aroma: string
          concentration: number
          created_at: string
          id: string
          name: string
          org_id: string | null
          sample_id: string
          threshold: number
        }
        Insert: {
          aroma?: string
          concentration?: number
          created_at?: string
          id?: string
          name: string
          org_id?: string | null
          sample_id: string
          threshold?: number
        }
        Update: {
          aroma?: string
          concentration?: number
          created_at?: string
          id?: string
          name?: string
          org_id?: string | null
          sample_id?: string
          threshold?: number
        }
        Relationships: [
          {
            foreignKeyName: "gcms_compounds_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gcms_compounds_sample_id_fkey"
            columns: ["sample_id"]
            isOneToOne: false
            referencedRelation: "instrumental_samples"
            referencedColumns: ["id"]
          },
        ]
      }
      import_batches: {
        Row: {
          archived_at: string | null
          deleted_at: string | null
          detection_confidence: number
          file_name: string
          food_type_id: string
          id: string
          idempotency_key: string | null
          ignored_columns: string[]
          imported_at: string
          imported_by: string | null
          org_id: string | null
          project_id: string | null
          recognized_columns: string[]
          reformulation_notes: string | null
          row_count: number
          status: string
          status_before_archive: string | null
        }
        Insert: {
          archived_at?: string | null
          deleted_at?: string | null
          detection_confidence?: number
          file_name: string
          food_type_id: string
          id?: string
          idempotency_key?: string | null
          ignored_columns?: string[]
          imported_at?: string
          imported_by?: string | null
          org_id?: string | null
          project_id?: string | null
          recognized_columns?: string[]
          reformulation_notes?: string | null
          row_count?: number
          status?: string
          status_before_archive?: string | null
        }
        Update: {
          archived_at?: string | null
          deleted_at?: string | null
          detection_confidence?: number
          file_name?: string
          food_type_id?: string
          id?: string
          idempotency_key?: string | null
          ignored_columns?: string[]
          imported_at?: string
          imported_by?: string | null
          org_id?: string | null
          project_id?: string | null
          recognized_columns?: string[]
          reformulation_notes?: string | null
          row_count?: number
          status?: string
          status_before_archive?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_batches_food_type_id_fkey"
            columns: ["food_type_id"]
            isOneToOne: false
            referencedRelation: "food_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_batches_imported_by_fkey"
            columns: ["imported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_batches_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_batches_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      import_mapping_presets: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          mappings: Json
          name: string
          org_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          mappings?: Json
          name: string
          org_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          mappings?: Json
          name?: string
          org_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_mapping_presets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_mapping_presets_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      instrumental_measurement_profiles: {
        Row: {
          created_at: string
          id: string
          metrics: Json
          org_id: string
          sample_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metrics?: Json
          org_id: string
          sample_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metrics?: Json
          org_id?: string
          sample_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "instrumental_measurement_profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instrumental_measurement_profiles_sample_id_fkey"
            columns: ["sample_id"]
            isOneToOne: true
            referencedRelation: "instrumental_samples"
            referencedColumns: ["id"]
          },
        ]
      }
      instrumental_samples: {
        Row: {
          category: string | null
          created_at: string
          food_type_id: string
          id: string
          import_batch_id: string
          ingredient_statement: string | null
          ingredient_statement_source: string
          ingredient_statement_updated_at: string | null
          org_id: string | null
          project_id: string | null
          sample_id: string
          sample_name: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          food_type_id: string
          id?: string
          import_batch_id: string
          ingredient_statement?: string | null
          ingredient_statement_source?: string
          ingredient_statement_updated_at?: string | null
          org_id?: string | null
          project_id?: string | null
          sample_id: string
          sample_name?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          food_type_id?: string
          id?: string
          import_batch_id?: string
          ingredient_statement?: string | null
          ingredient_statement_source?: string
          ingredient_statement_updated_at?: string | null
          org_id?: string | null
          project_id?: string | null
          sample_id?: string
          sample_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instrumental_samples_food_type_id_fkey"
            columns: ["food_type_id"]
            isOneToOne: false
            referencedRelation: "food_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instrumental_samples_import_batch_id_fkey"
            columns: ["import_batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instrumental_samples_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instrumental_samples_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      literature_document_reviews: {
        Row: {
          created_at: string
          document_id: string
          license_status: string
          notes: string
          peer_review_status: string
          review_basis: string
          review_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          document_id: string
          license_status?: string
          notes?: string
          peer_review_status?: string
          review_basis?: string
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          document_id?: string
          license_status?: string
          notes?: string
          peer_review_status?: string
          review_basis?: string
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "literature_document_reviews_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "literature_document_reviews_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["slug"]
          },
        ]
      }
      literature_imports: {
        Row: {
          authors: string | null
          created_at: string
          document_id: string | null
          doi: string | null
          duplicate_of: string | null
          error_message: string | null
          evidence_type: string | null
          file_name: string
          file_size: number
          id: string
          org_id: string
          page_count: number | null
          publication_year: string | null
          sha256: string
          source_quality_reasons: Json
          source_quality_score: number | null
          status: string
          storage_path: string
          tenant_id: string
          text_quality: string | null
          title: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          authors?: string | null
          created_at?: string
          document_id?: string | null
          doi?: string | null
          duplicate_of?: string | null
          error_message?: string | null
          evidence_type?: string | null
          file_name: string
          file_size: number
          id?: string
          org_id: string
          page_count?: number | null
          publication_year?: string | null
          sha256: string
          source_quality_reasons?: Json
          source_quality_score?: number | null
          status?: string
          storage_path: string
          tenant_id: string
          text_quality?: string | null
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          authors?: string | null
          created_at?: string
          document_id?: string | null
          doi?: string | null
          duplicate_of?: string | null
          error_message?: string | null
          evidence_type?: string | null
          file_name?: string
          file_size?: number
          id?: string
          org_id?: string
          page_count?: number | null
          publication_year?: string | null
          sha256?: string
          source_quality_reasons?: Json
          source_quality_score?: number | null
          status?: string
          storage_path?: string
          tenant_id?: string
          text_quality?: string | null
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "literature_imports_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "literature_imports_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["slug"]
          },
        ]
      }
      org_email_domains: {
        Row: {
          created_at: string
          domain: string
          org_id: string
        }
        Insert: {
          created_at?: string
          domain: string
          org_id: string
        }
        Update: {
          created_at?: string
          domain?: string
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_email_domains_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_admin_bootstrap_invites: {
        Row: {
          claimed_at: string | null
          claimed_by: string | null
          created_at: string
          email: string
          id: string
          invited_by: string
          org_id: string
        }
        Insert: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by: string
          org_id: string
        }
        Update: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_admin_bootstrap_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_admin_bootstrap_invites_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          status?: string
        }
        Relationships: []
      }
      panelist_eligibility_profiles: {
        Row: {
          adult_confirmed_at: string
          allergen_avoidances: string[]
          annual_income_range: string | null
          birth_month: number
          birth_year: number
          category_usage_frequency: string | null
          children_in_household: boolean | null
          created_at: string
          declaration_confirmed_at: string
          declaration_expires_at: string
          dietary_other: string | null
          dietary_pattern: string | null
          ethnicity: string | null
          gender: string | null
          gender_self_description: string | null
          grocery_role: string | null
          health_consent_at: string
          health_consent_version: string
          household_size: number | null
          household_size_prefer_not_to_say: boolean
          nationality_code: string | null
          occupation_group: string | null
          org_id: string
          other_avoidances: string[]
          panelist_id: string
          smoker_status: string | null
          updated_at: string
          weekly_food_spend: string | null
        }
        Insert: {
          adult_confirmed_at: string
          allergen_avoidances?: string[]
          annual_income_range?: string | null
          birth_month: number
          birth_year: number
          category_usage_frequency?: string | null
          children_in_household?: boolean | null
          created_at?: string
          declaration_confirmed_at: string
          declaration_expires_at: string
          dietary_other?: string | null
          dietary_pattern?: string | null
          ethnicity?: string | null
          gender?: string | null
          gender_self_description?: string | null
          grocery_role?: string | null
          health_consent_at: string
          health_consent_version: string
          household_size?: number | null
          household_size_prefer_not_to_say?: boolean
          nationality_code?: string | null
          occupation_group?: string | null
          org_id: string
          other_avoidances?: string[]
          panelist_id: string
          smoker_status?: string | null
          updated_at?: string
          weekly_food_spend?: string | null
        }
        Update: {
          adult_confirmed_at?: string
          allergen_avoidances?: string[]
          annual_income_range?: string | null
          birth_month?: number
          birth_year?: number
          category_usage_frequency?: string | null
          children_in_household?: boolean | null
          created_at?: string
          declaration_confirmed_at?: string
          declaration_expires_at?: string
          dietary_other?: string | null
          dietary_pattern?: string | null
          ethnicity?: string | null
          gender?: string | null
          gender_self_description?: string | null
          grocery_role?: string | null
          health_consent_at?: string
          health_consent_version?: string
          household_size?: number | null
          household_size_prefer_not_to_say?: boolean
          nationality_code?: string | null
          occupation_group?: string | null
          org_id?: string
          other_avoidances?: string[]
          panelist_id?: string
          smoker_status?: string | null
          updated_at?: string
          weekly_food_spend?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "panelist_eligibility_profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "panelist_eligibility_profiles_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      panelist_kit_events: {
        Row: {
          actor_id: string | null
          created_at: string
          event_type: string
          id: string
          kit_id: string
          metadata: Json
          org_id: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          kit_id: string
          metadata?: Json
          org_id: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          kit_id?: string
          metadata?: Json
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "panelist_kit_events_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "panelist_kit_events_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "panelist_kits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "panelist_kit_events_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      panelist_kits: {
        Row: {
          assigned_product_ids: string[]
          claimed_at: string | null
          claimed_by: string | null
          created_at: string
          created_by: string | null
          expires_at: string | null
          handling_instructions: string
          id: string
          issue_note: string | null
          issue_reported_at: string | null
          issue_status: string
          issue_type: string | null
          kit_code: string
          manual_code: string | null
          org_id: string
          packed_at: string | null
          printed_at: string | null
          product_id: string
          recipient_address: string | null
          recipient_email: string | null
          recipient_name: string | null
          replacement_for_kit_id: string | null
          response_deadline: string | null
          sample_code: string | null
          shipped_at: string | null
          started_at: string | null
          status: string
          submitted_at: string | null
          token_hash: string
          tracking_number: string | null
          updated_at: string
          void_reason: string | null
          voided_at: string | null
        }
        Insert: {
          assigned_product_ids?: string[]
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          handling_instructions?: string
          id?: string
          issue_note?: string | null
          issue_reported_at?: string | null
          issue_status?: string
          issue_type?: string | null
          kit_code: string
          manual_code?: string | null
          org_id: string
          packed_at?: string | null
          printed_at?: string | null
          product_id: string
          recipient_address?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
          replacement_for_kit_id?: string | null
          response_deadline?: string | null
          sample_code?: string | null
          shipped_at?: string | null
          started_at?: string | null
          status?: string
          submitted_at?: string | null
          token_hash: string
          tracking_number?: string | null
          updated_at?: string
          void_reason?: string | null
          voided_at?: string | null
        }
        Update: {
          assigned_product_ids?: string[]
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          handling_instructions?: string
          id?: string
          issue_note?: string | null
          issue_reported_at?: string | null
          issue_status?: string
          issue_type?: string | null
          kit_code?: string
          manual_code?: string | null
          org_id?: string
          packed_at?: string | null
          printed_at?: string | null
          product_id?: string
          recipient_address?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
          replacement_for_kit_id?: string | null
          response_deadline?: string | null
          sample_code?: string | null
          shipped_at?: string | null
          started_at?: string | null
          status?: string
          submitted_at?: string | null
          token_hash?: string
          tracking_number?: string | null
          updated_at?: string
          void_reason?: string | null
          voided_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "panelist_kits_claimed_by_fkey"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "panelist_kits_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "panelist_kits_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "panelist_kits_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "panelist_kits_replacement_for_kit_id_fkey"
            columns: ["replacement_for_kit_id"]
            isOneToOne: false
            referencedRelation: "panelist_kits"
            referencedColumns: ["id"]
          },
        ]
      }
      pending_imports: {
        Row: {
          created_at: string
          error_message: string | null
          file_name: string
          id: string
          matched_batch_id: string | null
          org_id: string
          parse_preview: Json | null
          source: string
          source_file_id: string | null
          status: string
          storage_path: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          file_name: string
          id?: string
          matched_batch_id?: string | null
          org_id: string
          parse_preview?: Json | null
          source?: string
          source_file_id?: string | null
          status?: string
          storage_path: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          file_name?: string
          id?: string
          matched_batch_id?: string | null
          org_id?: string
          parse_preview?: Json | null
          source?: string
          source_file_id?: string | null
          status?: string
          storage_path?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_imports_matched_batch_id_fkey"
            columns: ["matched_batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_imports_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_operators: {
        Row: {
          created_at: string
          created_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_operators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          assigned_panelist_ids: string[] | null
          blind_code: string | null
          blinded: boolean
          category: string
          created_at: string | null
          custom_attributes: Json | null
          id: string
          instrumental_sample_id: string | null
          is_calibration: boolean
          is_multi_sample: boolean | null
          name: string
          org_id: string | null
          project_id: string | null
          reference_scores: Json | null
          samples: Json | null
          source_import_batch_id: string | null
          source_sample_id: string | null
          status: string
          status_before_archive: string | null
          survey_sections: string[]
        }
        Insert: {
          assigned_panelist_ids?: string[] | null
          blind_code?: string | null
          blinded?: boolean
          category: string
          created_at?: string | null
          custom_attributes?: Json | null
          id?: string
          instrumental_sample_id?: string | null
          is_calibration?: boolean
          is_multi_sample?: boolean | null
          name: string
          org_id?: string | null
          project_id?: string | null
          reference_scores?: Json | null
          samples?: Json | null
          source_import_batch_id?: string | null
          source_sample_id?: string | null
          status?: string
          status_before_archive?: string | null
          survey_sections?: string[]
        }
        Update: {
          assigned_panelist_ids?: string[] | null
          blind_code?: string | null
          blinded?: boolean
          category?: string
          created_at?: string | null
          custom_attributes?: Json | null
          id?: string
          instrumental_sample_id?: string | null
          is_calibration?: boolean
          is_multi_sample?: boolean | null
          name?: string
          org_id?: string | null
          project_id?: string | null
          reference_scores?: Json | null
          samples?: Json | null
          source_import_batch_id?: string | null
          source_sample_id?: string | null
          status?: string
          status_before_archive?: string | null
          survey_sections?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "products_instrumental_sample_id_fkey"
            columns: ["instrumental_sample_id"]
            isOneToOne: false
            referencedRelation: "instrumental_samples"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_source_import_batch_id_fkey"
            columns: ["source_import_batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          consent_accepted_at: string | null
          consent_user_agent: string | null
          consent_version: string | null
          country: string | null
          created_at: string | null
          eligibility_completed_at: string | null
          email: string | null
          id: string
          name: string | null
          org_id: string | null
          panelist_id: string | null
          phone: string | null
          postal_code: string | null
          profile_completed_at: string | null
          region: string | null
          role: string
          status: string
          training_level: string
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          consent_accepted_at?: string | null
          consent_user_agent?: string | null
          consent_version?: string | null
          country?: string | null
          created_at?: string | null
          eligibility_completed_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          org_id?: string | null
          panelist_id?: string | null
          phone?: string | null
          postal_code?: string | null
          profile_completed_at?: string | null
          region?: string | null
          role?: string
          status?: string
          training_level?: string
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          consent_accepted_at?: string | null
          consent_user_agent?: string | null
          consent_version?: string | null
          country?: string | null
          created_at?: string | null
          eligibility_completed_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          org_id?: string | null
          panelist_id?: string | null
          phone?: string | null
          postal_code?: string | null
          profile_completed_at?: string | null
          region?: string | null
          role?: string
          status?: string
          training_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          created_by: string | null
          food_type_id: string
          id: string
          name: string
          org_id: string | null
          started_at: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          food_type_id: string
          id?: string
          name: string
          org_id?: string | null
          started_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          food_type_id?: string
          id?: string
          name?: string
          org_id?: string | null
          started_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_food_type_id_fkey"
            columns: ["food_type_id"]
            isOneToOne: false
            referencedRelation: "food_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      rag_audit_events: {
        Row: {
          action: string
          details_json: Json
          id: string
          occurred_at: string
          outcome: string
          request_id: string
          resource_id: string
          resource_type: string
          role: string
          subject: string
          tenant_id: string
        }
        Insert: {
          action: string
          details_json?: Json
          id: string
          occurred_at: string
          outcome: string
          request_id: string
          resource_id: string
          resource_type: string
          role: string
          subject: string
          tenant_id: string
        }
        Update: {
          action?: string
          details_json?: Json
          id?: string
          occurred_at?: string
          outcome?: string
          request_id?: string
          resource_id?: string
          resource_type?: string
          role?: string
          subject?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rag_audit_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["slug"]
          },
        ]
      }
      rag_auth_login_states: {
        Row: {
          expires_at: string
          payload_json: string
          state: string
        }
        Insert: {
          expires_at: string
          payload_json: string
          state: string
        }
        Update: {
          expires_at?: string
          payload_json?: string
          state?: string
        }
        Relationships: []
      }
      rag_auth_sessions: {
        Row: {
          created_at: string
          expires_at: string
          payload_json: string
          session_id: string
        }
        Insert: {
          created_at: string
          expires_at: string
          payload_json: string
          session_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          payload_json?: string
          session_id?: string
        }
        Relationships: []
      }
      rag_chunks: {
        Row: {
          chunk_id: string
          chunk_index: number
          document_id: string
          embedding: string
          evidence_type: string
          heading: string
          library_id: string
          method_tags: string
          page_end: number
          page_start: number
          parent_id: string
          parent_text: string
          search_vector: unknown
          section: string
          source_path: string
          tenant_id: string
          text: string
          title: string
          topic_tags: string
        }
        Insert: {
          chunk_id: string
          chunk_index: number
          document_id: string
          embedding: string
          evidence_type?: string
          heading?: string
          library_id: string
          method_tags?: string
          page_end: number
          page_start: number
          parent_id?: string
          parent_text?: string
          search_vector?: unknown
          section: string
          source_path: string
          tenant_id: string
          text: string
          title: string
          topic_tags?: string
        }
        Update: {
          chunk_id?: string
          chunk_index?: number
          document_id?: string
          embedding?: string
          evidence_type?: string
          heading?: string
          library_id?: string
          method_tags?: string
          page_end?: number
          page_start?: number
          parent_id?: string
          parent_text?: string
          search_vector?: unknown
          section?: string
          source_path?: string
          tenant_id?: string
          text?: string
          title?: string
          topic_tags?: string
        }
        Relationships: [
          {
            foreignKeyName: "rag_chunks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["slug"]
          },
        ]
      }
      rag_index_config: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
      }
      rag_jobs: {
        Row: {
          attempts: number
          cancel_requested: boolean
          created_at: string
          error: string | null
          finished_at: string | null
          heartbeat_at: string | null
          id: string
          kind: string
          max_attempts: number
          payload_json: string
          result_json: string | null
          started_at: string | null
          status: string
          tenant_id: string
          worker_id: string | null
        }
        Insert: {
          attempts?: number
          cancel_requested?: boolean
          created_at: string
          error?: string | null
          finished_at?: string | null
          heartbeat_at?: string | null
          id: string
          kind: string
          max_attempts?: number
          payload_json?: string
          result_json?: string | null
          started_at?: string | null
          status: string
          tenant_id: string
          worker_id?: string | null
        }
        Update: {
          attempts?: number
          cancel_requested?: boolean
          created_at?: string
          error?: string | null
          finished_at?: string | null
          heartbeat_at?: string | null
          id?: string
          kind?: string
          max_attempts?: number
          payload_json?: string
          result_json?: string | null
          started_at?: string | null
          status?: string
          tenant_id?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rag_jobs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["slug"]
          },
        ]
      }
      response_demographic_snapshots: {
        Row: {
          age_band: string
          age_years: number | null
          annual_income_range: string | null
          captured_at: string
          category_usage_frequency: string | null
          children_in_household: boolean | null
          concept_response_id: string | null
          dietary_other: string | null
          dietary_pattern: string | null
          ethnicity: string | null
          gender: string | null
          gender_self_description: string | null
          grocery_role: string | null
          household_size: number | null
          household_size_prefer_not_to_say: boolean
          id: string
          nationality_code: string | null
          occupation_group: string | null
          org_id: string
          panelist_id: string
          region: string | null
          response_id: string | null
          smoker_status: string | null
          weekly_food_spend: string | null
        }
        Insert: {
          age_band: string
          age_years?: number | null
          annual_income_range?: string | null
          captured_at?: string
          category_usage_frequency?: string | null
          children_in_household?: boolean | null
          concept_response_id?: string | null
          dietary_other?: string | null
          dietary_pattern?: string | null
          ethnicity?: string | null
          gender?: string | null
          gender_self_description?: string | null
          grocery_role?: string | null
          household_size?: number | null
          household_size_prefer_not_to_say?: boolean
          id?: string
          nationality_code?: string | null
          occupation_group?: string | null
          org_id: string
          panelist_id: string
          region?: string | null
          response_id?: string | null
          smoker_status?: string | null
          weekly_food_spend?: string | null
        }
        Update: {
          age_band?: string
          age_years?: number | null
          annual_income_range?: string | null
          captured_at?: string
          category_usage_frequency?: string | null
          children_in_household?: boolean | null
          concept_response_id?: string | null
          dietary_other?: string | null
          dietary_pattern?: string | null
          ethnicity?: string | null
          gender?: string | null
          gender_self_description?: string | null
          grocery_role?: string | null
          household_size?: number | null
          household_size_prefer_not_to_say?: boolean
          id?: string
          nationality_code?: string | null
          occupation_group?: string | null
          org_id?: string
          panelist_id?: string
          region?: string | null
          response_id?: string | null
          smoker_status?: string | null
          weekly_food_spend?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "response_demographic_snapshots_concept_response_id_fkey"
            columns: ["concept_response_id"]
            isOneToOne: true
            referencedRelation: "concept_responses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "response_demographic_snapshots_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "response_demographic_snapshots_panelist_id_fkey"
            columns: ["panelist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "response_demographic_snapshots_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: true
            referencedRelation: "responses"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          cata_attributes: Json | null
          comments: string | null
          created_at: string | null
          different_sample: string | null
          emotional_profile: Json | null
          hedonic_scores: Json | null
          id: string
          intensity_ratings: Json | null
          org_id: string | null
          presentation_order: string[] | null
          product_id: string
          ranking: string[] | null
          response_session_id: string
          run_number: number
          sample_code: string | null
          sample_ordinal: number
          session_type: string | null
          user_id: string
        }
        Insert: {
          cata_attributes?: Json | null
          comments?: string | null
          created_at?: string | null
          different_sample?: string | null
          emotional_profile?: Json | null
          hedonic_scores?: Json | null
          id?: string
          intensity_ratings?: Json | null
          org_id?: string | null
          presentation_order?: string[] | null
          product_id: string
          ranking?: string[] | null
          response_session_id?: string
          run_number?: number
          sample_code?: string | null
          sample_ordinal?: number
          session_type?: string | null
          user_id: string
        }
        Update: {
          cata_attributes?: Json | null
          comments?: string | null
          created_at?: string | null
          different_sample?: string | null
          emotional_profile?: Json | null
          hedonic_scores?: Json | null
          id?: string
          intensity_ratings?: Json | null
          org_id?: string | null
          presentation_order?: string[] | null
          product_id?: string
          ranking?: string[] | null
          response_session_id?: string
          run_number?: number
          sample_code?: string | null
          sample_ordinal?: number
          session_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "responses_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      sample_allergen_declarations: {
        Row: {
          contains_allergens: string[]
          created_at: string
          created_by: string | null
          formulation_version_id: string | null
          id: string
          ingredient_statement: string | null
          is_current: boolean
          may_contain_allergens: string[]
          org_id: string
          other_allergens: string[]
          product_id: string | null
          status: string
          updated_at: string
          verified_at: string | null
          verified_by: string | null
          version: number
        }
        Insert: {
          contains_allergens?: string[]
          created_at?: string
          created_by?: string | null
          formulation_version_id?: string | null
          id?: string
          ingredient_statement?: string | null
          is_current?: boolean
          may_contain_allergens?: string[]
          org_id: string
          other_allergens?: string[]
          product_id?: string | null
          status?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          version: number
        }
        Update: {
          contains_allergens?: string[]
          created_at?: string
          created_by?: string | null
          formulation_version_id?: string | null
          id?: string
          ingredient_statement?: string | null
          is_current?: boolean
          may_contain_allergens?: string[]
          org_id?: string
          other_allergens?: string[]
          product_id?: string | null
          status?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "sample_allergen_declarations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sample_allergen_declarations_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sample_allergen_declarations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sample_allergen_declarations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sample_allergen_declarations_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          attributes: Json
          created_at: string | null
          id: string
          name: string
          org_id: string | null
        }
        Insert: {
          attributes: Json
          created_at?: string | null
          id?: string
          name: string
          org_id?: string | null
        }
        Update: {
          attributes?: Json
          created_at?: string | null
          id?: string
          name?: string
          org_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "templates_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_settings: {
        Row: {
          accent_color: string | null
          admin_contact_email: string | null
          allow_panelist_comments: boolean
          allow_panelists_view_history: boolean
          allow_self_signup: boolean
          anonymize_panelists_in_reports: boolean
          auto_create_food_types: boolean
          auto_create_surveys_from_imports: boolean
          brand_kit: Json
          concept_image_generation_enabled: boolean
          concept_max_generations_per_concept: number
          concept_monthly_budget_cents: number
          concept_require_approval: boolean
          created_at: string
          data_retention_months: number
          decision_go_threshold: number
          decision_lock_confirmed: boolean
          decision_min_responses: number
          decision_stop_threshold: number
          default_panel_size: number
          default_report_title: string | null
          default_timezone: string
          demo_mode_enabled: boolean
          drive_folder_id: string | null
          drive_folder_name: string | null
          duplicate_sample_policy: string
          export_format: string
          inactive_panelist_days: number
          logo_url: string | null
          notify_on_completion_target: boolean
          notify_on_generation_failure: boolean
          notify_on_import: boolean
          org_id: string
          organization_name: string
          primary_color: string | null
          report_footer: string
          report_template: string | null
          report_tone: string | null
          require_all_samples_before_submit: boolean
          require_emotion_section: boolean
          require_hedonic_section: boolean
          require_import_review: boolean
          require_intensity_section: boolean
          require_panelist_consent: boolean
          require_panelist_id: boolean
          updated_at: string
          workspace_name: string
        }
        Insert: {
          accent_color?: string | null
          admin_contact_email?: string | null
          allow_panelist_comments?: boolean
          allow_panelists_view_history?: boolean
          allow_self_signup?: boolean
          anonymize_panelists_in_reports?: boolean
          auto_create_food_types?: boolean
          auto_create_surveys_from_imports?: boolean
          brand_kit?: Json
          concept_image_generation_enabled?: boolean
          concept_max_generations_per_concept?: number
          concept_monthly_budget_cents?: number
          concept_require_approval?: boolean
          created_at?: string
          data_retention_months?: number
          decision_go_threshold?: number
          decision_lock_confirmed?: boolean
          decision_min_responses?: number
          decision_stop_threshold?: number
          default_panel_size?: number
          default_report_title?: string | null
          default_timezone?: string
          demo_mode_enabled?: boolean
          drive_folder_id?: string | null
          drive_folder_name?: string | null
          duplicate_sample_policy?: string
          export_format?: string
          inactive_panelist_days?: number
          logo_url?: string | null
          notify_on_completion_target?: boolean
          notify_on_generation_failure?: boolean
          notify_on_import?: boolean
          org_id: string
          organization_name?: string
          primary_color?: string | null
          report_footer?: string
          report_template?: string | null
          report_tone?: string | null
          require_all_samples_before_submit?: boolean
          require_emotion_section?: boolean
          require_hedonic_section?: boolean
          require_import_review?: boolean
          require_intensity_section?: boolean
          require_panelist_consent?: boolean
          require_panelist_id?: boolean
          updated_at?: string
          workspace_name?: string
        }
        Update: {
          accent_color?: string | null
          admin_contact_email?: string | null
          allow_panelist_comments?: boolean
          allow_panelists_view_history?: boolean
          allow_self_signup?: boolean
          anonymize_panelists_in_reports?: boolean
          auto_create_food_types?: boolean
          auto_create_surveys_from_imports?: boolean
          brand_kit?: Json
          concept_image_generation_enabled?: boolean
          concept_max_generations_per_concept?: number
          concept_monthly_budget_cents?: number
          concept_require_approval?: boolean
          created_at?: string
          data_retention_months?: number
          decision_go_threshold?: number
          decision_lock_confirmed?: boolean
          decision_min_responses?: number
          decision_stop_threshold?: number
          default_panel_size?: number
          default_report_title?: string | null
          default_timezone?: string
          demo_mode_enabled?: boolean
          drive_folder_id?: string | null
          drive_folder_name?: string | null
          duplicate_sample_policy?: string
          export_format?: string
          inactive_panelist_days?: number
          logo_url?: string | null
          notify_on_completion_target?: boolean
          notify_on_generation_failure?: boolean
          notify_on_import?: boolean
          org_id?: string
          organization_name?: string
          primary_color?: string | null
          report_footer?: string
          report_template?: string | null
          report_tone?: string | null
          require_all_samples_before_submit?: boolean
          require_emotion_section?: boolean
          require_hedonic_section?: boolean
          require_import_review?: boolean
          require_intensity_section?: boolean
          require_panelist_consent?: boolean
          require_panelist_id?: boolean
          updated_at?: string
          workspace_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_settings_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      approved_formulation_learnings: {
        Row: {
          decision_record_id: string | null
          evidence_bundle_id: string | null
          experiment_name: string | null
          formulation_version_id: string | null
          hypothesis: string | null
          id: string | null
          learning_applies_to: string[] | null
          learning_approved_at: string | null
          learning_limitations: string[] | null
          learning_summary: string | null
          learning_tags: string[] | null
          measured_driver: string | null
          org_id: string | null
          primary_outcome: string | null
          project_id: string | null
          project_name: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "formulation_experiments_decision_record_id_fkey"
            columns: ["decision_record_id"]
            isOneToOne: false
            referencedRelation: "decision_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_evidence_bundle_id_fkey"
            columns: ["evidence_bundle_id"]
            isOneToOne: false
            referencedRelation: "evidence_bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_formulation_version_id_fkey"
            columns: ["formulation_version_id"]
            isOneToOne: false
            referencedRelation: "formulation_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formulation_experiments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      prototype_lineage_reconciliation: {
        Row: {
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          org_id: string | null
          project_id: string | null
          reason: string | null
          sample_key: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_formulation_experiment_arm: {
        Args: {
          target_change_description: string
          target_experiment_id: string
          target_label: string
          target_mechanism: string
        }
        Returns: {
          arm_type: string
          change_description: string
          code: string
          created_at: string
          experiment_id: string
          formulation_version_id: string | null
          id: string
          label: string
          mechanism: string
          org_id: string
          sort_order: number
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "formulation_experiment_arms"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      advance_formulation_experiment: {
        Args: {
          target_analysis_snapshot?: Json
          target_experiment_id: string
          target_lifecycle: string
          target_winner_arm_id?: string
        }
        Returns: undefined
      }
      approve_report_claims: {
        Args: {
          target_evidence_fingerprint: string
          target_report_id: string
          target_scope: string
        }
        Returns: {
          approved_at: string | null
          approved_by: string | null
          claims_approved_at: string | null
          claims_approved_by: string | null
          claims_evidence_fingerprint: string | null
          claims_scope: string | null
          concept_test_id: string
          cover_image_id: string | null
          created_at: string
          created_by: string
          decision_record_id: string
          evidence_bundle_id: string | null
          formulation_version_id: string | null
          id: string
          org_id: string | null
          packaging_image_id: string | null
          project_id: string | null
          report_snapshot: Json
          status: string
          title: string
          updated_at: string
          version: number
        }
        SetofOptions: {
          from: "*"
          to: "commercialization_reports"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      claim_panelist_kit: {
        Args: { p_manual_code?: string; p_token?: string }
        Returns: {
          assigned_product_count: number
          assigned_product_ids: string[]
          calculated_status: string
          claimed_by_current_user: boolean
          expires_at: string
          handling_instructions: string
          id: string
          is_multi_sample: boolean
          issue_status: string
          issue_type: string
          kit_code: string
          manual_code: string
          org_id: string
          product_category: string
          product_id: string
          product_name: string
          response_deadline: string
          sample_code: string
        }[]
      }
      complete_panelist_eligibility_profile: {
        Args: {
          p_address_line_1: string
          p_address_line_2: string
          p_allergen_avoidances: string[]
          p_annual_income_range?: string
          p_birth_month: number
          p_birth_year: number
          p_category_usage_frequency?: string
          p_children_in_household?: boolean
          p_city: string
          p_consent_user_agent: string
          p_consent_version: string
          p_country: string
          p_dietary_other?: string
          p_dietary_pattern?: string
          p_ethnicity?: string
          p_gender?: string
          p_gender_self_description?: string
          p_grocery_role?: string
          p_health_consent_version: string
          p_household_size?: number
          p_household_size_prefer_not_to_say?: boolean
          p_name: string
          p_nationality_code?: string
          p_occupation_group?: string
          p_other_avoidances: string[]
          p_phone: string
          p_postal_code: string
          p_region: string
          p_smoker_status?: string
          p_weekly_food_spend?: string
        }
        Returns: undefined
      }
      complete_panelist_eligibility_profile_v2: {
        Args: {
          p_address_line_1: string
          p_address_line_2: string
          p_allergen_avoidances: string[]
          p_annual_income_range?: string
          p_birth_month: number
          p_birth_year: number
          p_category_usage_frequency?: string
          p_children_in_household?: boolean
          p_city: string
          p_consent_user_agent: string
          p_consent_version: string
          p_country: string
          p_dietary_other?: string
          p_dietary_pattern?: string
          p_ethnicity?: string
          p_gender?: string
          p_gender_self_description?: string
          p_grocery_role?: string
          p_health_consent_version: string
          p_household_size?: number
          p_household_size_prefer_not_to_say?: boolean
          p_name: string
          p_nationality_code?: string
          p_occupation_group?: string
          p_other_avoidances: string[]
          p_phone: string
          p_postal_code: string
          p_region: string
          p_smoker_status?: string
          p_weekly_food_spend?: string
        }
        Returns: undefined
      }
      create_commercialization_report: {
        Args: {
          target_concept_test_id: string
          target_cover_image_id?: string
          target_decision_record_id: string
          target_evidence_bundle_id?: string
          target_formulation_version_id?: string
          target_packaging_image_id: string
          target_report_snapshot: Json
          target_title: string
        }
        Returns: {
          approved_at: string | null
          approved_by: string | null
          claims_approved_at: string | null
          claims_approved_by: string | null
          claims_evidence_fingerprint: string | null
          claims_scope: string | null
          concept_test_id: string
          cover_image_id: string | null
          created_at: string
          created_by: string
          decision_record_id: string
          evidence_bundle_id: string | null
          formulation_version_id: string | null
          id: string
          org_id: string | null
          packaging_image_id: string | null
          project_id: string | null
          report_snapshot: Json
          status: string
          title: string
          updated_at: string
          version: number
        }
        SetofOptions: {
          from: "*"
          to: "commercialization_reports"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_evidence_bundle: {
        Args: {
          target_decision_record_id?: string
          target_formulation_version_id?: string
          target_payload: Json
          target_project_id?: string
          target_sample_id: string
          target_schema_version: string
          target_source_data_version: string
        }
        Returns: {
          created_at: string
          created_by: string
          decision_record_id: string | null
          formulation_version_id: string | null
          id: string
          instrumental_sample_id: string | null
          is_current_product: boolean
          literature_fingerprint: string | null
          literature_refreshed_at: string | null
          org_id: string | null
          payload: Json
          product_evidence_fingerprint: string
          project_id: string | null
          sample_id: string
          schema_version: string
          source_data_version: string
          supersedes_bundle_id: string | null
          version: number
        }
        SetofOptions: {
          from: "*"
          to: "evidence_bundles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_formulation_experiment: {
        Args: {
          target_advancement_gates?: Json
          target_analysis_mode?: string
          target_decision_record_id: string
          target_hypothesis: string
          target_measured_driver: string
          target_minimum_n?: number
          target_name: string
          target_primary_outcome: string
          target_project_id: string
          target_uncertainty_margin?: number
        }
        Returns: {
          advancement_gates: Json
          analysis_mode: string
          analysis_snapshot: Json | null
          analyzed_at: string | null
          bootstrap_iterations: number
          confidence_level: number
          confirmation_completed_at: string | null
          created_at: string
          created_by: string
          decision_record_id: string
          deterministic_seed: number
          evidence_bundle_id: string
          formulation_version_id: string | null
          hypothesis: string
          id: string
          learning_applies_to: string[]
          learning_approved_at: string | null
          learning_approved_by: string | null
          learning_limitations: string[]
          learning_status: string
          learning_summary: string | null
          learning_tags: string[]
          lifecycle: string
          locked_at: string | null
          locked_by: string | null
          measured_driver: string
          minimum_n: number
          name: string
          org_id: string
          primary_outcome: string
          primary_scale_max: number
          primary_scale_min: number
          project_id: string
          serving_protocol: string
          storage_checkpoints: Json
          uncertainty_margin: number
          updated_at: string
          winner_arm_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "formulation_experiments"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_instrumental_import: { Args: { payload: Json }; Returns: string }
      create_literature_import: {
        Args: {
          target_file_name: string
          target_file_size: number
          target_sha256: string
        }
        Returns: {
          authors: string | null
          created_at: string
          document_id: string | null
          doi: string | null
          duplicate_of: string | null
          error_message: string | null
          evidence_type: string | null
          file_name: string
          file_size: number
          id: string
          org_id: string
          page_count: number | null
          publication_year: string | null
          sha256: string
          source_quality_reasons: Json
          source_quality_score: number | null
          status: string
          storage_path: string
          tenant_id: string
          text_quality: string | null
          title: string | null
          updated_at: string
          uploaded_by: string | null
        }
        SetofOptions: {
          from: "*"
          to: "literature_imports"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_replacement_panelist_kit: {
        Args: { p_reason?: string; target_kit_id: string }
        Returns: {
          assigned_product_ids: string[]
          created_at: string
          expires_at: string
          handling_instructions: string
          id: string
          kit_code: string
          manual_code: string
          product_id: string
          recipient_email: string
          recipient_name: string
          response_deadline: string
          sample_code: string
          status: string
          token: string
        }[]
      }
      current_org_id: { Args: never; Returns: string }
      current_org_slug: { Args: never; Returns: string }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      delete_import_batch: {
        Args: { target_batch_id: string }
        Returns: undefined
      }
      email_domain_has_workspace: {
        Args: { p_email: string }
        Returns: boolean
      }
      fetch_panelist_kit_events: {
        Args: { target_kit_id: string }
        Returns: {
          actor_id: string
          actor_name: string
          created_at: string
          event_type: string
          id: string
          kit_id: string
          metadata: Json
        }[]
      }
      generate_panelist_kit_manual_code: { Args: never; Returns: string }
      generate_panelist_kits: {
        Args: {
          kit_count: number
          p_assigned_product_ids?: string[]
          p_expires_at?: string
          p_handling_instructions?: string
          p_panelist_ids?: string[]
          p_recipients?: Json
          p_response_deadline?: string
          target_product_id: string
        }
        Returns: {
          assigned_product_ids: string[]
          claimed_by: string
          created_at: string
          expires_at: string
          handling_instructions: string
          id: string
          kit_code: string
          manual_code: string
          product_id: string
          recipient_address: string
          recipient_email: string
          recipient_name: string
          response_deadline: string
          sample_code: string
          status: string
          token: string
        }[]
      }
      get_concept_response_counts: {
        Args: never
        Returns: {
          concept_test_id: string
          response_count: number
        }[]
      }
      get_decision_freshness: {
        Args: { target_decision_record_id: string }
        Returns: {
          allowed: boolean
          current_evidence_bundle_id: string
          current_formulation_version_id: string
          formulation_current: boolean
          literature_refresh_required: boolean
          product_evidence_current: boolean
          reason: string
        }[]
      }
      get_own_panelist_profile_setup: {
        Args: never
        Returns: {
          address_line_1: string
          address_line_2: string
          allergen_avoidances: string[]
          annual_income_range: string
          birth_month: number
          birth_year: number
          category_usage_frequency: string
          children_in_household: boolean
          city: string
          country: string
          dietary_other: string
          dietary_pattern: string
          ethnicity: string
          gender: string
          gender_self_description: string
          grocery_role: string
          household_size: number
          household_size_prefer_not_to_say: boolean
          name: string
          nationality_code: string
          occupation_group: string
          other_avoidances: string[]
          phone: string
          postal_code: string
          region: string
          smoker_status: string
          weekly_food_spend: string
        }[]
      }
      get_panelist_kit_by_manual_code: {
        Args: { p_manual_code: string }
        Returns: {
          assigned_product_count: number
          calculated_status: string
          claimed_by_current_user: boolean
          expires_at: string
          handling_instructions: string
          is_multi_sample: boolean
          issue_status: string
          issue_type: string
          kit_code: string
          org_id: string
          product_category: string
          product_name: string
          response_deadline: string
          sample_code: string
        }[]
      }
      get_panelist_kit_by_token: {
        Args: { p_token: string }
        Returns: {
          assigned_product_count: number
          calculated_status: string
          claimed_by_current_user: boolean
          expires_at: string
          handling_instructions: string
          is_multi_sample: boolean
          issue_status: string
          issue_type: string
          kit_code: string
          org_id: string
          product_category: string
          product_name: string
          response_deadline: string
          sample_code: string
        }[]
      }
      get_panelist_safety_declaration: {
        Args: { target_panelist_id: string }
        Returns: {
          adult_confirmed_at: string
          age_band: string
          allergen_avoidances: string[]
          declaration_confirmed_at: string
          declaration_expires_at: string
          health_consent_at: string
          health_consent_version: string
          other_avoidances: string[]
          panelist_id: string
          updated_at: string
        }[]
      }
      get_public_workspace_config: {
        Args: { org_slug?: string }
        Returns: {
          accent_color: string
          allow_self_signup: boolean
          logo_url: string
          primary_color: string
          workspace_name: string
        }[]
      }
      get_response_counts_by_panelist: {
        Args: never
        Returns: {
          response_count: number
          user_id: string
        }[]
      }
      get_response_counts_by_product: {
        Args: never
        Returns: {
          product_id: string
          response_count: number
        }[]
      }
      is_active_user: { Args: never; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      is_platform_operator: { Args: never; Returns: boolean }
      is_public_email_domain: { Args: { p_domain: string }; Returns: boolean }
      list_concept_ready_panelists: {
        Args: never
        Returns: {
          age_band: string
          age_years: number
          annual_income_range: string
          category_usage_frequency: string
          children_in_household: boolean
          completed_count: number
          dietary_other: string
          dietary_pattern: string
          email: string
          ethnicity: string
          gender: string
          gender_self_description: string
          grocery_role: string
          household_size: number
          household_size_prefer_not_to_say: boolean
          id: string
          name: string
          nationality_code: string
          occupation_group: string
          panelist_id: string
          region: string
          smoker_status: string
          weekly_food_spend: string
        }[]
      }
      list_eligible_panelists: {
        Args: { p_formulation_version_id?: string; p_product_id?: string }
        Returns: {
          age_band: string
          age_years: number
          annual_income_range: string
          category_usage_frequency: string
          children_in_household: boolean
          completed_count: number
          dietary_other: string
          dietary_pattern: string
          email: string
          ethnicity: string
          gender: string
          gender_self_description: string
          grocery_role: string
          household_size: number
          household_size_prefer_not_to_say: boolean
          id: string
          name: string
          nationality_code: string
          occupation_group: string
          panelist_id: string
          region: string
          smoker_status: string
          weekly_food_spend: string
        }[]
      }
      list_eligible_panelists_for_products: {
        Args: { p_product_ids: string[] }
        Returns: {
          age_band: string
          age_years: number
          annual_income_range: string
          category_usage_frequency: string
          children_in_household: boolean
          completed_count: number
          dietary_other: string
          dietary_pattern: string
          email: string
          ethnicity: string
          gender: string
          gender_self_description: string
          grocery_role: string
          household_size: number
          household_size_prefer_not_to_say: boolean
          id: string
          name: string
          nationality_code: string
          occupation_group: string
          panelist_id: string
          region: string
          smoker_status: string
          weekly_food_spend: string
        }[]
      }
      list_panelist_directory: {
        Args: never
        Returns: {
          address_line_1: string
          address_line_2: string
          age_band: string
          age_years: number
          annual_income_range: string
          category_usage_frequency: string
          children_in_household: boolean
          city: string
          completed_count: number
          consent_accepted_at: string
          consent_version: string
          country: string
          declaration_confirmed_at: string
          declaration_expires_at: string
          dietary_other: string
          dietary_pattern: string
          eligibility_completed_at: string
          email: string
          ethnicity: string
          gender: string
          gender_self_description: string
          grocery_role: string
          household_size: number
          household_size_prefer_not_to_say: boolean
          id: string
          last_activity_at: string
          name: string
          nationality_code: string
          occupation_group: string
          panelist_id: string
          phone: string
          postal_code: string
          profile_completed_at: string
          region: string
          research_profile_updated_at: string
          smoker_status: string
          status: string
          training_level: string
          weekly_food_spend: string
        }[]
      }
      list_panelist_kits: {
        Args: { target_product_id: string }
        Returns: {
          assigned_product_count: number
          assigned_product_ids: string[]
          calculated_status: string
          claimed_at: string
          claimed_by: string
          claimed_panelist_name: string
          completed_product_count: number
          created_at: string
          expires_at: string
          handling_instructions: string
          id: string
          issue_note: string
          issue_reported_at: string
          issue_status: string
          issue_type: string
          kit_code: string
          manual_code: string
          packed_at: string
          printed_at: string
          product_id: string
          product_name: string
          recipient_address: string
          recipient_email: string
          recipient_name: string
          reminder_count: number
          replacement_for_kit_id: string
          response_deadline: string
          sample_code: string
          shipped_at: string
          started_at: string
          stored_status: string
          submitted_at: string
          tracking_number: string
          void_reason: string
          voided_at: string
        }[]
      }
      lock_formulation_experiment: {
        Args: { target_experiment_id: string }
        Returns: undefined
      }
      mark_decision_research_refreshed: {
        Args: {
          target_decision_record_id: string
          target_research_fingerprint?: string
        }
        Returns: undefined
      }
      mark_panelist_kit_started: {
        Args: { p_manual_code?: string; p_token?: string }
        Returns: undefined
      }
      mark_panelist_kit_submitted: {
        Args: { p_manual_code?: string; p_token?: string }
        Returns: undefined
      }
      org_id_for_email: { Args: { p_email: string }; Returns: string }
      panelist_ethnicity_group: {
        Args: { p_ethnicity: string }
        Returns: string
      }
      panelist_is_eligible_for_sample: {
        Args: {
          p_formulation_version_id?: string
          p_panelist_id: string
          p_product_id?: string
        }
        Returns: boolean
      }
      panelist_is_ready_for_concept: {
        Args: { p_panelist_id: string }
        Returns: boolean
      }
      panelist_kit_token_hash: { Args: { p_token: string }; Returns: string }
      platform_provision_organization: {
        Args: {
          p_accent_color?: string
          p_admin_email: string
          p_email_domains: string[]
          p_logo_url?: string
          p_org_name: string
          p_org_slug: string
          p_primary_color?: string
          p_workspace_name?: string
        }
        Returns: {
          administrator_email: string
          organization_id: string
          organization_slug: string
          sign_in_host: string
        }[]
      }
      provision_organization: {
        Args: { org_name: string; org_slug: string }
        Returns: string
      }
      record_panelist_kit_event: {
        Args: { p_event_type: string; p_metadata?: Json; target_kit_id: string }
        Returns: undefined
      }
      record_panelist_kit_reminder: {
        Args: { p_reason?: string; target_kit_id: string }
        Returns: undefined
      }
      replace_product_panelist_assignments: {
        Args: { p_panelist_ids: string[]; p_product_ids: string[] }
        Returns: {
          assigned_panelist_ids: string[] | null
          blind_code: string | null
          blinded: boolean
          category: string
          created_at: string | null
          custom_attributes: Json | null
          id: string
          instrumental_sample_id: string | null
          is_calibration: boolean
          is_multi_sample: boolean | null
          name: string
          org_id: string | null
          project_id: string | null
          reference_scores: Json | null
          samples: Json | null
          source_import_batch_id: string | null
          source_sample_id: string | null
          status: string
          status_before_archive: string | null
          survey_sections: string[]
        }[]
        SetofOptions: {
          from: "*"
          to: "products"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      report_panelist_kit_issue: {
        Args: {
          p_issue_note?: string
          p_issue_type?: string
          p_manual_code?: string
          p_token?: string
        }
        Returns: undefined
      }
      request_admin_access: {
        Args: never
        Returns: {
          org_id: string
          request_id: string
          request_status: string
        }[]
      }
      resolve_admin_access_request: {
        Args: { decision: string; note?: string; target_request_id: string }
        Returns: undefined
      }
      review_formulation_version: {
        Args: { target_status: string; target_version_id: string }
        Returns: undefined
      }
      revoke_report_claims: {
        Args: { target_report_id: string }
        Returns: {
          approved_at: string | null
          approved_by: string | null
          claims_approved_at: string | null
          claims_approved_by: string | null
          claims_evidence_fingerprint: string | null
          claims_scope: string | null
          concept_test_id: string
          cover_image_id: string | null
          created_at: string
          created_by: string
          decision_record_id: string
          evidence_bundle_id: string | null
          formulation_version_id: string | null
          id: string
          org_id: string | null
          packaging_image_id: string | null
          project_id: string | null
          report_snapshot: Json
          status: string
          title: string
          updated_at: string
          version: number
        }
        SetofOptions: {
          from: "*"
          to: "commercialization_reports"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_formulation_experiment_learning: {
        Args: {
          target_applies_to?: string[]
          target_experiment_id: string
          target_limitations?: string[]
          target_status?: string
          target_summary: string
          target_tags?: string[]
        }
        Returns: {
          advancement_gates: Json
          analysis_mode: string
          analysis_snapshot: Json | null
          analyzed_at: string | null
          bootstrap_iterations: number
          confidence_level: number
          confirmation_completed_at: string | null
          created_at: string
          created_by: string
          decision_record_id: string
          deterministic_seed: number
          evidence_bundle_id: string
          formulation_version_id: string | null
          hypothesis: string
          id: string
          learning_applies_to: string[]
          learning_approved_at: string | null
          learning_approved_by: string | null
          learning_limitations: string[]
          learning_status: string
          learning_summary: string | null
          learning_tags: string[]
          lifecycle: string
          locked_at: string | null
          locked_by: string | null
          measured_driver: string
          minimum_n: number
          name: string
          org_id: string
          primary_outcome: string
          primary_scale_max: number
          primary_scale_min: number
          project_id: string
          serving_protocol: string
          storage_checkpoints: Json
          uncertainty_margin: number
          updated_at: string
          winner_arm_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "formulation_experiments"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_sample_allergen_declaration: {
        Args: {
          p_contains_allergens?: string[]
          p_formulation_version_id?: string
          p_ingredient_statement?: string
          p_may_contain_allergens?: string[]
          p_other_allergens?: string[]
          p_product_id?: string
          p_verify?: boolean
        }
        Returns: string
      }
      set_food_type_status: {
        Args: { next_status: string; target_slug: string }
        Returns: undefined
      }
      set_formulation_profile: {
        Args: {
          target_change_summary?: string
          target_import_batch_id: string
          target_ingredients?: Json
          target_sample_id: string
          target_source?: string
          target_statement: string
        }
        Returns: string
      }
      set_import_batch_status: {
        Args: { next_status: string; target_batch_id: string }
        Returns: undefined
      }
      update_panelist_kit_fulfillment: {
        Args: {
          p_status: string
          p_tracking_number?: string
          target_kit_id: string
        }
        Returns: undefined
      }
      upsert_workspace_settings: {
        Args: { patch: Json }
        Returns: {
          accent_color: string | null
          admin_contact_email: string | null
          allow_panelist_comments: boolean
          allow_panelists_view_history: boolean
          allow_self_signup: boolean
          anonymize_panelists_in_reports: boolean
          auto_create_food_types: boolean
          auto_create_surveys_from_imports: boolean
          brand_kit: Json
          concept_image_generation_enabled: boolean
          concept_max_generations_per_concept: number
          concept_monthly_budget_cents: number
          concept_require_approval: boolean
          created_at: string
          data_retention_months: number
          decision_go_threshold: number
          decision_lock_confirmed: boolean
          decision_min_responses: number
          decision_stop_threshold: number
          default_panel_size: number
          default_report_title: string | null
          default_timezone: string
          demo_mode_enabled: boolean
          drive_folder_id: string | null
          drive_folder_name: string | null
          duplicate_sample_policy: string
          export_format: string
          inactive_panelist_days: number
          logo_url: string | null
          notify_on_completion_target: boolean
          notify_on_generation_failure: boolean
          notify_on_import: boolean
          org_id: string
          organization_name: string
          primary_color: string | null
          report_footer: string
          report_template: string | null
          report_tone: string | null
          require_all_samples_before_submit: boolean
          require_emotion_section: boolean
          require_hedonic_section: boolean
          require_import_review: boolean
          require_intensity_section: boolean
          require_panelist_consent: boolean
          require_panelist_id: boolean
          updated_at: string
          workspace_name: string
        }
        SetofOptions: {
          from: "*"
          to: "workspace_settings"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      void_panelist_kit: {
        Args: { p_reason?: string; target_kit_id: string }
        Returns: undefined
      }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
