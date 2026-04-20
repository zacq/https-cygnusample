export interface NCASession {
  id:        number;
  date:      string;      // display date range, e.g. "11 & 14 May 2026"
  startDate: string;      // ISO date for sorting, e.g. "2026-05-11"
  time:      string;
  topic:     string;
  program:   string;      // overarching program/course name shown as subtitle
  cpd:       number;
  day1:      { date: string; topic: string };
  day2:      { date: string; topic: string };
}

export const NCA_SESSIONS: NCASession[] = [
  {
    id: 4,
    date: '11 & 14 May 2026',
    startDate: '2026-05-11',
    time: '9:00 AM – 4:00 PM',
    topic: 'Safety as a Value in the Construction Industry',
    program: 'Operational Excellence for Sustainable Constructions',
    cpd: 10,
    day1: { date: '', topic: '' },
    day2: { date: '', topic: '' },
  },
  {
    id: 6,
    date: '15 & 18 June 2026',
    startDate: '2026-06-15',
    time: '9:00 AM – 4:00 PM',
    topic: 'Managing Construction Site Safety Using Risk Assessment',
    program: 'Operational Excellence for Sustainable Constructions',
    cpd: 10,
    day1: { date: '', topic: '' },
    day2: { date: '', topic: '' },
  },
];

/** Returns the next session whose start date is on or after today, or null if all past. */
export function getNextSession(): NCASession | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (const s of NCA_SESSIONS) {
    const d = new Date(s.startDate);
    if (d >= today) return s;
  }
  return null;
}
