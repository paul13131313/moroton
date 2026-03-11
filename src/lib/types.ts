export type QuestionKey =
  | "country"
  | "industry"
  | "role"
  | "experience"
  | "companyType"
  | "qualification"
  | "jobChanges"
  | "specialSkills"
  | "currentSalary";

export interface Question {
  key: QuestionKey;
  label: string;
  options?: string[];
  freeInput?: boolean;
  salaryInput?: boolean;
}

export interface Answers {
  country: string;
  industry: string;
  role: string;
  experience: string;
  companyType: string;
  qualification: string;
  jobChanges: string;
  specialSkills: string;
  currentSalary: number;
  currency: string;
}

export interface Ranking {
  percentile: number;
  rank: "S" | "A" | "B" | "C" | "D";
}

export interface EstimateResult {
  estimatedSalary: number;
  currency: string;
  deviationValue: number;
  rankings: {
    global: Ranking;
    domestic: Ranking;
    industry: Ranking;
  };
  comment: string;
  reaction: "underpaid" | "fair" | "overpaid";
}
