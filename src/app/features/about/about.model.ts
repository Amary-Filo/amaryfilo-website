export interface SkillsGroup {
  id: number;
  icon: string;
  title: string;
  description: string;
  skills: {
    id: number;
    icon: string;
    title: string;
  }[];
}

export interface WorkGroup {
  id: number;
  title: string;
  positions: string[];
  date_start: string;
  date_end: string;
  areas: string[];
}

export interface AreaGroup {
  id: number;
  title: string;
  icon: string;
  color?: string;
  skills: string[];
}
