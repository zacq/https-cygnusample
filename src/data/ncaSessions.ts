export interface NCASession {
  id:        number;
  date:      string;      // display date range, e.g. "25–26 March 2026"
  startDate: string;      // ISO date for sorting, e.g. "2026-03-25"
  time:      string;
  topic:     string;
  cpd:       number;
  day1:      { date: string; topic: string };
  day2:      { date: string; topic: string };
}

export const NCA_SESSIONS: NCASession[] = [
  {
    id: 1,
    date: '25–26 March 2026',
    startDate: '2026-03-25',
    time: '9:00 AM – 4:00 PM',
    topic: 'Safety As a Value in the Construction Industry',
    cpd: 20,
    day1: { date: '25th March', topic: 'Safety Mindset and Culture in Construction' },
    day2: { date: '26th March', topic: 'Practical Safety Implementation on Construction Sites' },
  },
  {
    id: 2,
    date: '13 & 16 April 2026',
    startDate: '2026-04-13',
    time: '9:00 AM – 4:00 PM',
    topic: 'Managing Construction Site Safety Using Risk Assessment',
    cpd: 20,
    day1: { date: '13th April', topic: 'Fundamentals of Risk Assessment in Construction' },
    day2: { date: '16th April', topic: 'Implementing Risk Assessment to Manage Safety' },
  },
  {
    id: 3,
    date: '27 & 30 April 2026',
    startDate: '2026-04-27',
    time: '9:00 AM – 4:00 PM',
    topic: 'Operational Excellence for Sustainable Construction',
    cpd: 20,
    day1: { date: '27th April', topic: 'Principles of Operational Excellence in Construction' },
    day2: { date: '30th April', topic: 'Practical Implementation of Operational Excellence for Sustainability' },
  },
  {
    id: 4,
    date: '11 & 14 May 2026',
    startDate: '2026-05-11',
    time: '9:00 AM – 4:00 PM',
    topic: 'Safety As a Value in the Construction Industry',
    cpd: 20,
    day1: { date: '11th May', topic: 'Safety Mindset and Culture in Construction' },
    day2: { date: '14th May', topic: 'Practical Safety Implementation on Construction Sites' },
  },
  {
    id: 5,
    date: '25 & 29 May 2026',
    startDate: '2026-05-25',
    time: '9:00 AM – 4:00 PM',
    topic: 'Managing Construction Site Safety Using Risk Assessment',
    cpd: 20,
    day1: { date: '25th May', topic: 'Fundamentals of Risk Assessment in Construction' },
    day2: { date: '29th May', topic: 'Implementing Risk Assessment to Manage Safety' },
  },
  {
    id: 6,
    date: '15 & 18 June 2026',
    startDate: '2026-06-15',
    time: '9:00 AM – 4:00 PM',
    topic: 'Operational Excellence for Sustainable Construction',
    cpd: 20,
    day1: { date: '15th June', topic: 'Principles of Operational Excellence in Construction' },
    day2: { date: '18th June', topic: 'Practical Implementation of Operational Excellence for Sustainability' },
  },
  {
    id: 7,
    date: '29–30 June 2026',
    startDate: '2026-06-29',
    time: '9:00 AM – 4:00 PM',
    topic: 'Safety As a Value in the Construction Industry',
    cpd: 20,
    day1: { date: '29th June', topic: 'Safety Mindset and Culture in Construction' },
    day2: { date: '30th June', topic: 'Practical Safety Implementation on Construction Sites' },
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
