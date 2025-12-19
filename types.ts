
export interface LogMessage {
  id: string;
  text: string;
  type: 'info' | 'error' | 'success' | 'warning';
  timestamp: string;
}

export interface HackerProfile {
  name: string;
  alias: string;
  level: string;
  specialty: string;
}
