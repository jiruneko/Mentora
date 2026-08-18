export type MentoraMessage = {
  role: "user" | "assistant";
  content: string;
};

export type MentoraContext = {
  userName?: string;
  goal?: string;
  currentState?: string;
};

export type GenerateMentoraResponseInput = {
  message: string;
  history?: MentoraMessage[];
  context?: MentoraContext;
};

export type GenerateMentoraResponseResult = {
  message: string;
};