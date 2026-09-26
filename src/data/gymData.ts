/**
 * Static Demo Data for Gym Management Portal (Day 2 Version)
 * Contains plans, trainers, workout slots, and realistic metrics.
 */

import {
  MembershipPlan,
  Trainer,
  WorkoutSlot,
  GymAnnouncement,
  RecentRegistration,
  ScheduledSession,
} from '../types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic',
    tagline: 'Ideal for independent lifters and cardio enthusiasts',
    price: 29,
    period: 'per month',
    popular: false,
    colorTheme: 'black',
    features: [
      'Access to full gym floor & cardio machines',
      'Locker room & standard shower access',
      'Free gym mobile portal access',
      '1 complimentary fitness assessment',
      'Standard opening hours (6 AM - 10 PM)',
    ],
  },
  {
    id: 'plan-premium',
    name: 'Premium',
    tagline: 'Most chosen by members seeking guidance and results',
    price: 59,
    period: 'per month',
    popular: true,
    colorTheme: 'pink',
    features: [
      'All Basic Plan perks included',
      'Unlimited group fitness & HIIT classes',
      '2 Monthly Personal Trainer sessions',
      'Sauna, steam room & recovery zone',
      'Priority slot reservations via portal',
      'Nutrition & workout tracking guide',
    ],
  },
  {
    id: 'plan-elite',
    name: 'Elite',
    tagline: 'Comprehensive all-inclusive coaching & VIP access',
    price: 99,
    period: 'per month',
    popular: false,
    colorTheme: 'pink',
    features: [
      'All Premium perks included',
      'Dedicated weekly 1-on-1 certified coach',
      '24/7 keycard & portal access',
      'Customized metabolic nutrition plan',
      'Complimentary protein shake bar & towels',
      'Guest passes (2 friends per month)',
    ],
  },
];

export const TRAINERS: Trainer[] = [
  {
    id: 'trainer-marcus',
    name: 'Marcus Vance',
    role: 'Head Strength Coach',
    specialization: 'Hypertrophy & Powerlifting',
    experience: '8 Years Experience',
    availability: 'Mon - Fri (6 AM - 2 PM)',
    availableToday: true,
    badge: 'Available Today',
    avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
    bio: 'Former collegiate strength trainer passionate about progressive overload and safe lifting technique.',
  },
  {
    id: 'trainer-elena',
    name: 'Elena Rodriguez',
    role: 'Functional & HIIT Specialist',
    specialization: 'Conditioning & Fat Loss',
    experience: '6 Years Experience',
    availability: 'Mon - Sat (10 AM - 6 PM)',
    availableToday: true,
    badge: 'Personal Training',
    avatarUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
    bio: 'Certified athletic conditioner helping members build explosive stamina, core stability, and agility.',
  },
  {
    id: 'trainer-david',
    name: 'David Chen',
    role: 'Mobility & Rehab Specialist',
    specialization: 'Postural Health & Joint Longevity',
    experience: '7 Years Experience',
    availability: 'Tue - Sun (8 AM - 4 PM)',
    availableToday: false,
    badge: 'Senior Coach',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Focuses on functional movement patterns, injury prevention, and building sustainable mobility.',
  },
  {
    id: 'trainer-sarah',
    name: 'Sarah Jenkins',
    role: 'Cardio & Endurance Lead',
    specialization: 'Cardiovascular Health & Marathon Prep',
    experience: '5 Years Experience',
    availability: 'Mon - Fri (1 PM - 9 PM)',
    availableToday: true,
    badge: 'Available Today',
    avatarUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80',
    bio: 'High-energy coach bringing music-fueled endurance sessions designed to boost VO2 max safely.',
  },
];

export const WORKOUT_SLOTS: WorkoutSlot[] = [
  {
    id: 'slot-morning-early',
    label: 'Dawn Kickoff',
    time: '6:00 AM – 7:30 AM',
    category: 'Morning',
    capacityStatus: 'Filling Fast',
  },
  {
    id: 'slot-morning-mid',
    label: 'Morning Peak',
    time: '8:30 AM – 10:00 AM',
    category: 'Morning',
    capacityStatus: 'Available',
  },
  {
    id: 'slot-afternoon',
    label: 'Midday Power Hour',
    time: '12:00 PM – 1:30 PM',
    category: 'Afternoon',
    capacityStatus: 'Available',
  },
  {
    id: 'slot-evening-prime',
    label: 'Sunset Conditioning',
    time: '5:30 PM – 7:00 PM',
    category: 'Evening',
    capacityStatus: 'Limited',
  },
  {
    id: 'slot-night',
    label: 'Late Night Iron',
    time: '7:30 PM – 9:00 PM',
    category: 'Night',
    capacityStatus: 'Available',
  },
];

export const RECENT_REGISTRATIONS: RecentRegistration[] = [
  {
    id: 'REG-1042',
    memberName: 'Alex Rivera',
    plan: 'Premium',
    date: 'Today, 09:15 AM',
    status: 'Approved',
    assignedTrainer: 'Marcus Vance',
  },
  {
    id: 'REG-1041',
    memberName: 'Jessica Miller',
    plan: 'Elite',
    date: 'Today, 08:30 AM',
    status: 'Approved',
    assignedTrainer: 'Elena Rodriguez',
  },
  {
    id: 'REG-1040',
    memberName: 'Kenji Takahashi',
    plan: 'Basic',
    date: 'Yesterday, 06:45 PM',
    status: 'Approved',
    assignedTrainer: 'David Chen',
  },
  {
    id: 'REG-1039',
    memberName: 'Sophia Martinez',
    plan: 'Premium',
    date: 'Yesterday, 04:20 PM',
    status: 'Reviewing',
    assignedTrainer: 'Sarah Jenkins',
  },
];

export const UPCOMING_SESSIONS: ScheduledSession[] = [
  {
    id: 'SES-01',
    title: 'Upper Body Hypertrophy',
    time: 'Today, 6:00 PM',
    trainerOrMember: 'Marcus Vance (Coach)',
    room: 'Weight Zone A',
    status: 'Confirmed',
  },
  {
    id: 'SES-02',
    title: 'Functional Core & Agility',
    time: 'Tomorrow, 8:30 AM',
    trainerOrMember: 'Elena Rodriguez (Coach)',
    room: 'Studio 2',
    status: 'Upcoming',
  },
  {
    id: 'SES-03',
    title: 'Mobility & Recovery Flow',
    time: 'Thursday, 12:00 PM',
    trainerOrMember: 'David Chen (Coach)',
    room: 'Recovery Lounge',
    status: 'Upcoming',
  },
];

export const GYM_ANNOUNCEMENTS: GymAnnouncement[] = [
  {
    id: 'ANN-01',
    title: 'New Olympic Lifting Platforms Installed',
    date: 'Sep 10, 2026',
    tag: 'Facility Update',
    message: 'We have added three brand-new Eleiko competition barbells and calibrated bumper plates in Zone B.',
  },
  {
    id: 'ANN-02',
    title: 'Weekend HIIT Community Workshop',
    date: 'Sep 14, 2026',
    tag: 'Event',
    message: 'Join Coach Elena this Saturday at 9:00 AM for a complimentary 45-minute metabolic burn session.',
  },
  {
    id: 'ANN-03',
    title: 'Extended Evening Access Hours',
    date: 'Sep 01, 2026',
    tag: 'Schedule',
    message: 'Starting this week, locker rooms and recovery saunas will stay open until 10:30 PM on weekdays.',
  },
];

export const GYM_FACILITIES = [
  {
    title: 'Free Weights & Power Racks',
    description: '12 multi-use squat cages, calibrated steel plates, and dumbbells ranging up to 130 lbs.',
    iconName: 'Dumbbell',
  },
  {
    title: 'Cardio & Conditioning Arena',
    description: 'Concept2 rowers, SkiErgs, assault bikes, and curved self-powered treadmills.',
    iconName: 'Activity',
  },
  {
    title: 'Dedicated Group Class Studio',
    description: 'High-fidelity surround acoustics, sprung hardwood flooring, and ambient lighting.',
    iconName: 'Users',
  },
  {
    title: 'Hydro & Infrared Recovery Zone',
    description: 'Dry cedar saunas, cold plunge tubs, and private lockers with rainfall showers.',
    iconName: 'ShieldCheck',
  },
];
