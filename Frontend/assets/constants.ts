export const CONTENT_MAX_LENGTH: number = 1000;

export const STUCK: string = 'Stuck';
export const IN_PROGRESS: string = 'In progress';
export const DONE: string = 'Done';
export const APPROVED: string = 'Approved';
export const WAITING: string = 'Waiting';
export const ARCHIVED: string = 'Archived';

export const USERS: string = 'Users';
export const PROFILES: string = 'Profiles';
export const ORGANISATIONS: string = 'Organisations';

export const IDEAS_GATHERED: string = 'Ideas gathered';
export const DECISIONS_MADE: string = 'Decisions made';
export const IDEAS_READY: string = 'Ideas ready';
export const CONTRIBUTORS: string = 'Contributors';

export const SUPER_ADMIN = 'SuperAdmin';
export const NO_ORG = 'No Organization';

export const ONE_DAY = 24 * 60 * 60 * 1000;

export const FLAT_COLORS = [
  'var(--v-yellow-base)',
  'var(--v-carrot-base)',
  'var(--v-rose-base)',
  'var(--v-lavender-base)',
  'var(--v-cornflower-base)',
  'var(--v-skyblue-base)',
  'var(--v-turquoise-base)',
  'var(--v-lime-base)',
];

export const GRADIENT_COLORS = [
  {start: 'var(--v-yellow-base)', end: 'var(--v-carrot-base)'},
  {start: 'var(--v-carrot-base)', end: 'var(--v-rose-base)'},
  {start: 'var(--v-rose-base)', end: 'var(--v-lavender-base)'},
  {start: 'var(--v-lavender-base)', end: 'var(--v-cornflower-base)'},
  {start: 'var(--v-cornflower-base)', end: 'var(--v-skyblue-base)'},
  {start: 'var(--v-skyblue-base)', end: 'var(--v-turquoise-base)'},
  {start: 'var(--v-turquoise-base)', end: 'var(--v-lime-base)'},
  {start: 'var(--v-lime-base)', end: 'var(--v-yellow-base)'},
];

export const ALLOWED_DOMAINS = [
  'oksa.io',
  'idealouhos.fi',
  'vantaa.fi',
  'tampere.fi',
  'familyinmusic.com',
  'showell.com',
  'nuoriyrittajyys.fi',
  'differo.fi',
  'muova.fi',
  'jetico.com',
];

export const RULES = {
  name: (value: string) =>
    (!!value && value.length >= 2) || 'Name must be at least 2 characters long',
  email: (value: string) =>
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
      value,
    ) || 'E-mail is invalid',
  phoneNumber: (value: string) =>
    (!!value && /[0-9]/.test(value)) || 'Phone number must be valid',
  otp: (value: string) =>
    !!value && value.length === 6 && /[0-9]{6}/.test(value),
  categoryName: (value: string) => {
    return !!value || 'Category name is required';
  },
  required: (value: string) => !!value || 'Required.',
  id: (value: string) => !!value || 'Please add topic ID',
  password: (value: string) => !!value || 'Please add password',
  domain: (value: string) =>
    /^(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(value) ||
    'Domain is invalid',
};
