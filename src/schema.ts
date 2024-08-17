export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      devices: {
        Row: {
          fcm_token: string
          id: string
          updated_at: string
        }
        Insert: {
          fcm_token: string
          id?: string
          updated_at?: string
        }
        Update: {
          fcm_token?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      devices_earthquake_settings: {
        Row: {
          created_at: string
          id: string
          min_jma_intensity: Database["public"]["Enums"]["jma_intensity"]
          region_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          min_jma_intensity: Database["public"]["Enums"]["jma_intensity"]
          region_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          min_jma_intensity?: Database["public"]["Enums"]["jma_intensity"]
          region_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_earthquake_settings_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_earthquake_settings_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "devices_with_earthquake_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      devices_eew_settings: {
        Row: {
          created_at: string
          id: string
          min_jma_intensity: Database["public"]["Enums"]["jma_intensity"]
          region_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          min_jma_intensity: Database["public"]["Enums"]["jma_intensity"]
          region_id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          min_jma_intensity?: Database["public"]["Enums"]["jma_intensity"]
          region_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_eew_settings_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_eew_settings_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "devices_with_earthquake_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      devices_notification_settings: {
        Row: {
          created_at: string
          id: string
          notification_volume: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          notification_volume?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notification_volume?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_notification_settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_notification_settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "devices_with_earthquake_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      earthquake: {
        Row: {
          arrival_time: string | null
          depth: number | null
          epicenter_code: number | null
          epicenter_detail_code: number | null
          event_id: number
          headline: string | null
          intensity_cities: Json | null
          intensity_prefectures: Json | null
          intensity_regions: Json | null
          intensity_stations: Json | null
          latitude: number | null
          longitude: number | null
          lpgm_intensity_prefectures: Json | null
          lpgm_intensity_regions: Json | null
          lpgm_intenstiy_stations: Json | null
          magnitude: number | null
          magnitude_condition: string | null
          max_intensity: Database["public"]["Enums"]["jma_intensity"] | null
          max_intensity_region_ids: number[] | null
          max_lpgm_intensity:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
          origin_time: string | null
          status: string
          text: string | null
        }
        Insert: {
          arrival_time?: string | null
          depth?: number | null
          epicenter_code?: number | null
          epicenter_detail_code?: number | null
          event_id: number
          headline?: string | null
          intensity_cities?: Json | null
          intensity_prefectures?: Json | null
          intensity_regions?: Json | null
          intensity_stations?: Json | null
          latitude?: number | null
          longitude?: number | null
          lpgm_intensity_prefectures?: Json | null
          lpgm_intensity_regions?: Json | null
          lpgm_intenstiy_stations?: Json | null
          magnitude?: number | null
          magnitude_condition?: string | null
          max_intensity?: Database["public"]["Enums"]["jma_intensity"] | null
          max_intensity_region_ids?: number[] | null
          max_lpgm_intensity?:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
          origin_time?: string | null
          status: string
          text?: string | null
        }
        Update: {
          arrival_time?: string | null
          depth?: number | null
          epicenter_code?: number | null
          epicenter_detail_code?: number | null
          event_id?: number
          headline?: string | null
          intensity_cities?: Json | null
          intensity_prefectures?: Json | null
          intensity_regions?: Json | null
          intensity_stations?: Json | null
          latitude?: number | null
          longitude?: number | null
          lpgm_intensity_prefectures?: Json | null
          lpgm_intensity_regions?: Json | null
          lpgm_intenstiy_stations?: Json | null
          magnitude?: number | null
          magnitude_condition?: string | null
          max_intensity?: Database["public"]["Enums"]["jma_intensity"] | null
          max_intensity_region_ids?: number[] | null
          max_lpgm_intensity?:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
          origin_time?: string | null
          status?: string
          text?: string | null
        }
        Relationships: []
      }
      earthquake_early: {
        Row: {
          depth: number | null
          id: string
          latitude: number | null
          longitude: number | null
          magnitude: number | null
          max_intensity: Database["public"]["Enums"]["jma_intensity"] | null
          max_intensity_is_early: boolean
          name: string
          origin_time: string
          origin_time_precision: Database["public"]["Enums"]["origin_time_precision"]
        }
        Insert: {
          depth?: number | null
          id: string
          latitude?: number | null
          longitude?: number | null
          magnitude?: number | null
          max_intensity?: Database["public"]["Enums"]["jma_intensity"] | null
          max_intensity_is_early?: boolean
          name: string
          origin_time: string
          origin_time_precision: Database["public"]["Enums"]["origin_time_precision"]
        }
        Update: {
          depth?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          magnitude?: number | null
          max_intensity?: Database["public"]["Enums"]["jma_intensity"] | null
          max_intensity_is_early?: boolean
          name?: string
          origin_time?: string
          origin_time_precision?: Database["public"]["Enums"]["origin_time_precision"]
        }
        Relationships: []
      }
      earthquake_early_regions: {
        Row: {
          id: string
          max_intensity: Database["public"]["Enums"]["jma_intensity"]
          region_id: string
        }
        Insert: {
          id: string
          max_intensity: Database["public"]["Enums"]["jma_intensity"]
          region_id: string
        }
        Update: {
          id?: string
          max_intensity?: Database["public"]["Enums"]["jma_intensity"]
          region_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "earthquake_early_regions_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "earthquake_early"
            referencedColumns: ["id"]
          },
        ]
      }
      eew: {
        Row: {
          accuracy: Json | null
          arrival_time: string | null
          depth: number | null
          event_id: number
          forecast_max_intensity:
            | Database["public"]["Enums"]["jma_intensity"]
            | null
          forecast_max_intensity_is_over: boolean | null
          forecast_max_lpgm_intensity:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
          forecast_max_lpgm_intensity_is_over: boolean | null
          headline: string | null
          hypo_name: string | null
          id: number
          info_type: string
          is_canceled: boolean
          is_last_info: boolean
          is_plum: boolean
          is_warning: boolean | null
          latitude: number | null
          longitude: number | null
          magnitude: number | null
          origin_time: string | null
          regions: Json | null
          report_time: string
          schema_type: string
          serial_no: number | null
          status: string
          type: string
        }
        Insert: {
          accuracy?: Json | null
          arrival_time?: string | null
          depth?: number | null
          event_id: number
          forecast_max_intensity?:
            | Database["public"]["Enums"]["jma_intensity"]
            | null
          forecast_max_intensity_is_over?: boolean | null
          forecast_max_lpgm_intensity?:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
          forecast_max_lpgm_intensity_is_over?: boolean | null
          headline?: string | null
          hypo_name?: string | null
          id?: number
          info_type: string
          is_canceled: boolean
          is_last_info: boolean
          is_plum: boolean
          is_warning?: boolean | null
          latitude?: number | null
          longitude?: number | null
          magnitude?: number | null
          origin_time?: string | null
          regions?: Json | null
          report_time?: string
          schema_type: string
          serial_no?: number | null
          status: string
          type: string
        }
        Update: {
          accuracy?: Json | null
          arrival_time?: string | null
          depth?: number | null
          event_id?: number
          forecast_max_intensity?:
            | Database["public"]["Enums"]["jma_intensity"]
            | null
          forecast_max_intensity_is_over?: boolean | null
          forecast_max_lpgm_intensity?:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
          forecast_max_lpgm_intensity_is_over?: boolean | null
          headline?: string | null
          hypo_name?: string | null
          id?: number
          info_type?: string
          is_canceled?: boolean
          is_last_info?: boolean
          is_plum?: boolean
          is_warning?: boolean | null
          latitude?: number | null
          longitude?: number | null
          magnitude?: number | null
          origin_time?: string | null
          regions?: Json | null
          report_time?: string
          schema_type?: string
          serial_no?: number | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      information: {
        Row: {
          author: Database["public"]["Enums"]["information_author"]
          body: Json
          created_at: string
          event_id: number | null
          id: number
          level: Database["public"]["Enums"]["information_level"]
          title: string
          type: string
        }
        Insert: {
          author?: Database["public"]["Enums"]["information_author"]
          body: Json
          created_at?: string
          event_id?: number | null
          id?: number
          level: Database["public"]["Enums"]["information_level"]
          title: string
          type: string
        }
        Update: {
          author?: Database["public"]["Enums"]["information_author"]
          body?: Json
          created_at?: string
          event_id?: number | null
          id?: number
          level?: Database["public"]["Enums"]["information_level"]
          title?: string
          type?: string
        }
        Relationships: []
      }
      intensity_sub_division: {
        Row: {
          area_code: string
          event_id: number
          id: number
          max_intensity: Database["public"]["Enums"]["jma_intensity"]
          max_lpgm_intensity:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
        }
        Insert: {
          area_code: string
          event_id: number
          id?: number
          max_intensity: Database["public"]["Enums"]["jma_intensity"]
          max_lpgm_intensity?:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
        }
        Update: {
          area_code?: string
          event_id?: number
          id?: number
          max_intensity?: Database["public"]["Enums"]["jma_intensity"]
          max_lpgm_intensity?:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "public_intensity_sub_division_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "earthquake"
            referencedColumns: ["event_id"]
          },
        ]
      }
      telegram: {
        Row: {
          body: Json
          event_id: number
          headline: string | null
          id: number
          info_type: string
          press_time: string
          report_time: string
          schema_type: string
          serial_no: number | null
          status: string
          type: string
          valid_time: string | null
        }
        Insert: {
          body: Json
          event_id: number
          headline?: string | null
          id?: number
          info_type: string
          press_time: string
          report_time: string
          schema_type: string
          serial_no?: number | null
          status: string
          type: string
          valid_time?: string | null
        }
        Update: {
          body?: Json
          event_id?: number
          headline?: string | null
          id?: number
          info_type?: string
          press_time?: string
          report_time?: string
          schema_type?: string
          serial_no?: number | null
          status?: string
          type?: string
          valid_time?: string | null
        }
        Relationships: []
      }
      tsunami: {
        Row: {
          body: Json
          event_id: number
          headline: string | null
          id: number
          info_type: string
          press_at: string
          report_at: string
          serial_no: number | null
          status: string
          type: string
          valid_at: string | null
        }
        Insert: {
          body: Json
          event_id: number
          headline?: string | null
          id?: number
          info_type: string
          press_at: string
          report_at: string
          serial_no?: number | null
          status: string
          type: string
          valid_at?: string | null
        }
        Update: {
          body?: Json
          event_id?: number
          headline?: string | null
          id?: number
          info_type?: string
          press_at?: string
          report_at?: string
          serial_no?: number | null
          status?: string
          type?: string
          valid_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      devices_with_earthquake_settings: {
        Row: {
          fcm_token: string | null
          id: string | null
          min_jma_intensity: Database["public"]["Enums"]["jma_intensity"] | null
        }
        Relationships: []
      }
      eew_latest: {
        Row: {
          accuracy: Json | null
          arrival_time: string | null
          depth: number | null
          event_id: number | null
          forecast_max_intensity:
            | Database["public"]["Enums"]["jma_intensity"]
            | null
          forecast_max_intensity_is_over: boolean | null
          forecast_max_lpgm_intensity:
            | Database["public"]["Enums"]["jma_lg_intensity"]
            | null
          forecast_max_lpgm_intensity_is_over: boolean | null
          headline: string | null
          hypo_name: string | null
          id: number | null
          info_type: string | null
          is_canceled: boolean | null
          is_last_info: boolean | null
          is_plum: boolean | null
          is_warning: boolean | null
          latitude: number | null
          longitude: number | null
          magnitude: number | null
          origin_time: string | null
          regions: Json | null
          report_time: string | null
          schema_type: string | null
          serial_no: number | null
          status: string | null
          type: string | null
        }
        Relationships: []
      }
      tsunami_latest: {
        Row: {
          body: Json | null
          event_id: number | null
          headline: string | null
          id: number | null
          info_type: string | null
          press_at: string | null
          report_at: string | null
          serial_no: number | null
          status: string | null
          type: string | null
          valid_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      latest_tsunami: {
        Args: Record<PropertyKey, never>
        Returns: {
          body: Json
          event_id: number
          headline: string | null
          id: number
          info_type: string
          press_at: string
          report_at: string
          serial_no: number | null
          status: string
          type: string
          valid_at: string | null
        }[]
      }
      uuid_generate_v7: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      information_author: "jma" | "developer" | "unknown"
      information_level: "info" | "warning" | "critical"
      jma_intensity:
        | "0"
        | "1"
        | "2"
        | "3"
        | "4"
        | "!5-"
        | "5-"
        | "5+"
        | "6-"
        | "6+"
        | "7"
      jma_lg_intensity: "0" | "1" | "2" | "3" | "4"
      origin_time_precision:
        | "month"
        | "day"
        | "hour"
        | "minute"
        | "second"
        | "millisecond"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
