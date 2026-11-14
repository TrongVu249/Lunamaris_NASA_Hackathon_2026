/**
 * TypeScript Definitions for NASA's Discarded Equipment Storytelling Dataset
 * Challenge: NASA Space Apps Challenge 2026 — "Abandoned but not Forgotten:
 * Storytelling about NASA's Discarded Equipment on the Moon and Mars"
 *
 * Compatible with:
 * - data/processed/artifacts_master.json
 * - data/processed/experiments.json
 * - data/processed/timeline_events.json
 * - data/processed/geojson/*.geojson
 * - data/processed/artifacts_flat.csv
 * - data/assets/assets_index.json
 */

export type SupportedLanguage = "en" | "vi";

export type ArtifactCategory =
  | "Descent Stage"
  | "Rover"
  | "Lander"
  | "Helicopter"
  | "Science Package"
  | "Deep Space Probe"
  | "Impactor";

export type CelestialBody =
  | "Moon"
  | "Mars"
  | "433 Eros"
  | "Ceres"
  | "Heliocentric / Interstellar"
  | "Saturn"
  | "Jupiter";

export type AssetMediaType =
  | "image"
  | "model_3d"
  | "audio"
  | "document"
  | "html_archive";

export interface BilingualText {
  /** Original English text */
  en: string;
  /** Vietnamese translation & storytelling adaptation */
  vi: string;
}

export interface BilingualList {
  /** List of items in English */
  en: string[];
  /** List of items in Vietnamese */
  vi: string[];
}

export interface Coordinates {
  /** Planetocentric latitude in decimal degrees (-90 to 90) */
  lat: number | null;
  /** East longitude in decimal degrees (0 to 360 or -180 to 180) */
  lon: number | null;
  /** Normalized longitude in [-180, 180] for standard GIS/GeoJSON rendering */
  lon_180: number | null;
  /** Elevation in meters (optional) */
  elevation_m: number | null;
  /** Provenance/accuracy description */
  location_accuracy: string;
  /** Reference frame (e.g., IAU Planetocentric / Mean Earth Polar Axis) */
  coordinate_frame: string;
}

export interface LocalAssetFile {
  asset_id: string;
  title: string;
  description: string | null;
  date_created: string | null;
  media_type: AssetMediaType;
  /** File extension without dot: "jpg" | "png" | "glb" | "mp3" | "wav" | "pdf" | "html" */
  file_format: string;
  /** Direct official NASA source URL */
  remote_orig_url: string;
  /** Relative path from project root to the highest-resolution original file */
  local_orig_path: string;
  /** Relative path from project root to the web-optimized preview file (e.g. ~medium.jpg or .glb) */
  local_web_preview_path: string | null;
  /** Exact size in bytes on disk */
  file_size_bytes: number;
  /** SHA-256 integrity hash */
  sha256: string;
}

export interface ExperimentRecord {
  /** Official NSSDCA Experiment ID (e.g., "1969-059C-04" for Apollo 11 LRRR) */
  exp_nssdc_id: string;
  /** Instrument/Experiment name */
  name: string;
  /** Parent artifact ID in artifacts_master.json (e.g., "moon-apollo11-lm-eagle") */
  parent_artifact_id: string;
  /** Parent spacecraft NSSDCA ID (e.g., "1969-059C") */
  parent_nssdc_id: string;
  /** Scientific discipline */
  discipline: string | null;
  /** Principal Investigator / Team Lead */
  principal_investigator: string | null;
  /** Technical instrument description from NSSDCA */
  description: string;
  /** Scientific goals and key findings */
  scientific_objectives_and_results: string;
  /** Local path to the archived NSSDCA Experiment HTML page */
  raw_html_path: string | null;
  /** Official NSSDCA Experiment catalog URL */
  nssdc_url: string;
}

export interface StorytellingHooks {
  /** Short poetic headline (EN/VI) */
  tagline: BilingualText;
  /** First-person narrative told from the perspective of the hardware itself ("I am...") */
  first_person_monologue: BilingualText;
  /** Accessible summary tailored for children & middle-school students */
  kid_friendly_summary: BilingualText;
  /** How the engineering hardware directly enabled breakthrough planetary science */
  engineering_to_science_connection: BilingualText;
  /** Why this artifact is an irreplaceable historical monument, not "space trash" */
  legacy_and_monument_value: BilingualText;
}

export interface ArtifactRecord {
  /** Unique slug ID (e.g., "mars-opportunity-rover") */
  id: string;
  /** Official NSSDCA International Designator (e.g., "2003-032A") */
  nssdc_id: string;
  /** Canonical English name */
  name: string;
  /** Display title in English & Vietnamese */
  title_bilingual: BilingualText;
  /** Official NASA mission name */
  official_mission_name: string;
  /** Alternate designations / callsigns */
  alternate_names: string[];
  /** Hardware category */
  category: ArtifactCategory;
  /** Target celestial body */
  celestial_body: CelestialBody;

  // Spatial & Location
  site_name: string;
  site_name_bilingual: BilingualText;
  landing_coordinates: Coordinates | null;
  final_resting_coordinates: Coordinates | null;
  /** Total surface or heliocentric distance traveled in km */
  traverse_distance_km: number | null;
  /** Physical state of the equipment today */
  resting_state: BilingualText;

  // Timeline
  launch_date: string;
  arrival_or_landing_date: string | null;
  end_of_mission_date: string | null;
  planned_duration_days: number | null;
  actual_duration_days: number | null;
  operational_status: BilingualText;

  // Engineering Specs
  mass_kg: number | null;
  power_source: BilingualText | null;
  dimensions: string | null;
  launch_vehicle: string | null;
  funding_agency: string;

  // Science & Storytelling (Bilingual EN/VI)
  nssdc_official_description_en: string;
  mission_objective: BilingualText;
  key_scientific_discoveries: BilingualList;
  discarded_components_left_behind: BilingualList;
  why_discarded_or_mission_ended: BilingualText;
  last_known_signal_or_moment: BilingualText;
  storytelling: StorytellingHooks;

  // Linked Scientific Instruments (ALSEP / Payloads)
  experiments: ExperimentRecord[];

  // Downloaded Original Files
  images: LocalAssetFile[];
  models_3d: LocalAssetFile[];
  audio_clips: LocalAssetFile[];
  archival_documents: LocalAssetFile[];

  // Provenance & Official Links
  official_sources: {
    nssdc_master_catalog: string;
    nasa_images_api: string;
    nasa_3d_resources: string;
    space_apps_challenge_2026: string;
    [key: string]: string;
  };
  raw_html_path: string | null;
}

/** Root structure of data/processed/artifacts_master.json */
export interface ArtifactsMasterDataset {
  dataset_name: string;
  challenge: string;
  languages: SupportedLanguage[];
  total_artifacts: number;
  total_experiments: number;
  artifacts: ArtifactRecord[];
}

/** Item structure of data/processed/timeline_events.json */
export interface TimelineEvent {
  event_id: string;
  artifact_id: string;
  nssdc_id: string;
  /** Primary sorting date (arrival/landing date or launch date, YYYY-MM-DD) */
  date: string;
  year: number;
  launch_date: string;
  end_of_mission_date: string | null;
  celestial_body: CelestialBody;
  category: ArtifactCategory;
  title: BilingualText;
  site_name: BilingualText;
  tagline: BilingualText;
  first_person_monologue: BilingualText;
  kid_friendly_summary: BilingualText;
  why_discarded_or_mission_ended: BilingualText;
  last_known_signal_or_moment: BilingualText;
  hero_preview_image: string | null;
  model_3d_glb: string | null;
}

/** Properties for Resting Site Point features in data/processed/geojson/*.geojson */
export interface GeoJSONRestingSiteProperties {
  id: string;
  nssdc_id: string;
  name: string;
  title_en: string;
  title_vi: string;
  category: ArtifactCategory;
  celestial_body: CelestialBody;
  site_name_en: string;
  site_name_vi: string;
  lat: number;
  lon: number;
  lon_180: number;
  launch_date: string;
  arrival_or_landing_date: string | null;
  end_of_mission_date: string | null;
  mass_kg: number | null;
  traverse_distance_km: number | null;
  resting_state_en: string;
  resting_state_vi: string;
  tagline_en: string;
  tagline_vi: string;
  kid_summary_en: string;
  kid_summary_vi: string;
  hero_preview_image: string | null;
  hero_orig_image: string | null;
  model_3d_glb: string | null;
  experiments_count: number;
  feature_role: "resting_site";
}

/** Properties for Traverse LineString features in data/processed/geojson/*.geojson */
export interface GeoJSONTraversePathProperties {
  id: string;
  parent_artifact_id: string;
  name: string;
  celestial_body: CelestialBody;
  traverse_distance_km: number | null;
  feature_role: "traverse_path";
}

export type ArtifactGeoJSONFeature =
  | {
      type: "Feature";
      id: string;
      geometry: {
        type: "Point";
        /** [lon_180, lat] */
        coordinates: [number, number];
      };
      properties: GeoJSONRestingSiteProperties;
    }
  | {
      type: "Feature";
      id: string;
      geometry: {
        type: "LineString";
        /** [[landing_lon_180, landing_lat], [final_lon_180, final_lat]] */
        coordinates: [number, number][];
      };
      properties: GeoJSONTraversePathProperties;
    };

export interface ArtifactGeoJSONFeatureCollection {
  type: "FeatureCollection";
  name: string;
  features: ArtifactGeoJSONFeature[];
}

/** Row structure of data/processed/artifacts_flat.csv & .parquet */
export interface FlatArtifactRow {
  id: string;
  nssdc_id: string;
  name: string;
  title_en: string;
  title_vi: string;
  official_mission_name: string;
  category: ArtifactCategory;
  celestial_body: CelestialBody;
  site_name_en: string;
  site_name_vi: string;
  lat: number | null;
  lon: number | null;
  lon_180: number | null;
  traverse_distance_km: number | null;
  launch_date: string;
  arrival_or_landing_date: string | null;
  end_of_mission_date: string | null;
  planned_duration_days: number | null;
  actual_duration_days: number | null;
  /** actual_duration_days / planned_duration_days (e.g. 59.47 for Opportunity) */
  longevity_multiplier: number | null;
  mass_kg: number | null;
  launch_vehicle: string | null;
  experiments_count: number;
  images_count: number;
  models_3d_count: number;
  audio_clips_count: number;
  hero_orig_image_path: string | null;
  hero_preview_image_path: string | null;
  model_3d_glb_path: string | null;
  tagline_en: string;
  tagline_vi: string;
}

/** Root structure of data/assets/assets_index.json */
export interface AssetsIndexManifest {
  total_files: number;
  total_size_bytes: number;
  total_size_mb: number;
  files: Array<LocalAssetFile & { artifact_id: string }>;
}

