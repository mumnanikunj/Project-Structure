export interface ISwingsResult {
    error: boolean
    statusCode: number
    message: string
    stats: Stats
    swings: Swing[]
  }
  
  export interface Stats {
    title1: string
    value1: string
    title2: string
    value2: string
    title3: string
    value3: number
    title4: string
    value4: string
  }
  
  export interface ISwing {
    swing_number: number
    unity_attributes: any
    flight_attributes: FlightAttributes
    video_url: string
    preview_url: string
  }
  
  export interface FlightAttributes {
    shot_type: string
    club_speed: number
    apex_height: number
    launch_angle: number
    carry_distance: number
    total_distance: number
    carry_deviation: number
    total_deviation: number
    launch_direction: number
    total_distance_diff: number
    total_deviation_diff: number
  }
  