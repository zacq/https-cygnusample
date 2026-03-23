export interface NCASession {
  id:    number;
  date:  string;
  time:  string;
  topic: string;
  cpd:   number;
}

export const NCA_SESSIONS: NCASession[] = [
  { id: 1, date: '11 March 2026',  time: '9:00 AM – 4:00 PM', topic: 'Operational Excellence for Sustainable Constructions',    cpd: 5 },
  { id: 2, date: '25 March 2026',  time: '9:00 AM – 4:00 PM', topic: 'Safety as a Value in the Construction Industry',          cpd: 5 },
  { id: 3, date: '8 April 2026',   time: '9:00 AM – 4:00 PM', topic: 'Managing Construction Site Safety Using Risk Assessment',  cpd: 5 },
  { id: 4, date: '29 April 2026',  time: '9:00 AM – 4:00 PM', topic: 'Operational Excellence for Sustainable Constructions',    cpd: 5 },
  { id: 5, date: '13 May 2026',    time: '9:00 AM – 4:00 PM', topic: 'Safety as a Value in the Construction Industry',          cpd: 5 },
  { id: 6, date: '29 May 2026',    time: '9:00 AM – 4:00 PM', topic: 'Managing Construction Site Safety Using Risk Assessment',  cpd: 5 },
  { id: 7, date: '17 June 2026',   time: '9:00 AM – 4:00 PM', topic: 'Operational Excellence for Sustainable Constructions',    cpd: 5 },
  { id: 8, date: '30 June 2026',   time: '9:00 AM – 4:00 PM', topic: 'Safety as a Value in the Construction Industry',          cpd: 5 },
];

/** Returns the next session whose date is on or after today, or null if all past. */
export function getNextSession(): NCASession | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (const s of NCA_SESSIONS) {
    const d = new Date(s.date);
    if (d >= today) return s;
  }
  return null;
}
