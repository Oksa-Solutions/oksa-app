interface LanguagePack extends Record<string, string> {
  SIGN_IN: string;
  EMAIL: string;
  SEND_CODE: string;
  WELCOME_BACK: string;
  ORGANISATION: string;
  OVERVIEW: string;
  TOPICS: string;
  TASKS: string;
  TEAM_MEMBERS: string;
  TEAMS: string;
  SEE_ALL_TEAMS: string;
  SIGN_OUT: string;
  DASHBOARD_INTRO: string;
  RECENT_TOPICS: string;
  REQUEST_TRIAL: string;
  IDEAS_GATHERED: string;
  DECISIONS_MADE: string;
  IDEAS_READY: string;
  ADD_TOPIC: string;
  MANAGE_TOPICS: string;
  NAME: string;
  ADMIN: string;
  ADD_ORG_MEMBER: string;
  INVITE_COLLAB: string;
  BY_EMAIL_OR_NAME: string;
  ACTIVE: string;
  ROWS_PER_PAGE: string;
  DISPLAYED_TOPICS: string;
  SELECTED_TOPICS: string;
  EVERY_APPROVED_IDEA: string;
  CANCEL: string;
  DONE: string;
  BACKLOG: string;
  STUCK: string;
  IN_PROGRESS: string;
  SHOW_MORE: string;
  IN_TOPIC: string;
  DATE: string;
  SET_DATE: string;
  VOTES: string;
  ADD_IDEA: string;
  SET_CATEGORY: string;
  IDEA_TITLE: string;
  WRITE_YOUR_IDEA: string;
  SEARCH_TOPIC: string;
  SHARE_TOPIC: string;
  BY_CODE: string;
  TOPIC_ID: string;
  PASSWORD: string;
  BY_LINK: string;
  JOIN_TOPIC_ALERT: string;
  STATUS: string;
  APPROVED: string;
  WAITING: string;
  ARCHIVED: string;
  CATEGORIES: string;
  EDIT: string;
  CREATE_CATEGORY: string;
  CREDITS: string;
  TOPIC_SETTINGS: string;
  TOPIC: string;
  TOPIC_PASSWORD: string;
  DARK_MODE_TOGGLE: string;
  CLOSE_TOPIC: string;
  DELETE_TOPIC: string;
  PROFILE: string;
  MY_TOPICS: string;
}

export const LANGUAGES: Record<string, LanguagePack> = {
  'GB-ENG': {
    SIGN_IN: 'Sign in',
    EMAIL: 'email',
    SEND_CODE: 'Send me the code',
    WELCOME_BACK: 'Welcome back',
    ORGANISATION: 'Organisation',
    OVERVIEW: 'Overview',
    TOPICS: 'Topics',
    TASKS: 'Tasks',
    TEAM_MEMBERS: 'Team members',
    TEAMS: 'Teams',
    SEE_ALL_TEAMS: 'See all teams',
    SIGN_OUT: 'Sign out',
    DASHBOARD_INTRO: 'This is your dashboard - control everything here',
    RECENT_TOPICS: 'Recent topics',
    REQUEST_TRIAL: 'Request trial',
    IDEAS_GATHERED: 'Ideas gathered',
    DECISIONS_MADE: 'Decision made',
    IDEAS_READY: 'Ideas ready',
    ADD_TOPIC: 'Add topic',
    MANAGE_TOPICS: 'Manage my topics',
    NAME: 'Name',
    ADMIN: 'Admin',
    ADD_ORG_MEMBER: 'Add organisation member',
    INVITE_COLLAB: 'Invite a collaborator',
    BY_EMAIL_OR_NAME: 'By email or name',
    ACTIVE: 'Active',
    ROWS_PER_PAGE: 'Rows per page',
    DISPLAYED_TOPICS: 'Displayed topics',
    SELECTED_TOPICS: 'Selected topics',
    EVERY_APPROVED_IDEA:
      'Every approved idea of selected topic will be added to this kanban',
    CANCEL: 'Cancel',
    DONE: 'Done',
    BACKLOG: 'Backlog',
    STUCK: 'Stuck',
    IN_PROGRESS: 'In progress',
    SHOW_MORE: 'Show more',
    IN_TOPIC: 'In topic',
    DATE: 'Date',
    SET_DATE: 'Set date',
    VOTES: 'Votes',
    ADD_IDEA: 'Add an idea',
    SET_CATEGORY: 'Set category',
    IDEA_TITLE: 'Idea title',
    WRITE_YOUR_IDEA: 'Write your idea',
    SEARCH_TOPIC: 'Search in this topic',
    SHARE_TOPIC: 'Share topic',
    BY_CODE: 'By code',
    TOPIC_ID: 'Topic ID',
    PASSWORD: 'Password',
    BY_LINK: 'By link',
    JOIN_TOPIC_ALERT: 'Anyone with this link can join the topic',
    STATUS: 'Status',
    APPROVED: 'Approved',
    WAITING: 'Waiting',
    ARCHIVED: 'Archived',
    CATEGORIES: 'Categories',
    EDIT: 'Edit',
    CREATE_CATEGORY: 'Create category',
    CREDITS: 'Credits',
    TOPIC_SETTINGS: 'Topic settings',
    TOPIC: 'Topic',
    TOPIC_PASSWORD: 'Topic password',
    DARK_MODE_TOGGLE: 'Dark mode on / off',
    CLOSE_TOPIC: 'Close topic',
    DELETE_TOPIC: 'Delete topic',
    PROFILE: 'Profile',
    MY_TOPICS: 'My topics',
  },
  FI: {
    SIGN_IN: 'Kirjaudu sisään',
    EMAIL: 'Sähköposti',
    SEND_CODE: 'Lähetä koodi',
    WELCOME_BACK: 'Tervetuloa takaisin',
    ORGANISATION: 'Organisaatio',
    OVERVIEW: 'Yhteenveto',
    TOPICS: 'Ideaseinät',
    TASKS: 'Tehtävät',
    TEAM_MEMBERS: 'Tiimin jäsenet',
    TEAMS: 'Tiimit',
    SEE_ALL_TEAMS: 'Katso kaikki tiimit',
    SIGN_OUT: 'Kirjaudu ulos',
    DASHBOARD_INTRO: 'Tämä on organisaatiosi',
    RECENT_TOPICS: 'Viimeisimmät ideaseinät',
    REQUEST_TRIAL: 'Pyydä premium ominaisuuksien kokeilujaksoa',
    IDEAS_GATHERED: 'Kerätyt ideat',
    DECISIONS_MADE: 'Hyväksytyt ideat',
    IDEAS_READY: 'Toteutetut ideat',
    ADD_TOPIC: 'Luo ideaseinä',
    MANAGE_TOPICS: 'Hallitse ideaseiniä',
    NAME: 'Nimi',
    ADMIN: 'Pääkäyttäjä',
    ADD_ORG_MEMBER: 'Lisää organisaatiokäyttäjä',
    INVITE_COLLAB: 'Lisää käyttäjä',
    BY_EMAIL_OR_NAME: 'Lisää sähköpostilla',
    ACTIVE: 'Aktiivinen ideaseinä',
    ROWS_PER_PAGE: 'Rivejä per sivu',
    DISPLAYED_TOPICS: 'Näkyvien seinien valinta',
    SELECTED_TOPICS: 'Valitse näkyvät ideaseinät',
    EVERY_APPROVED_IDEA:
      'Alta valitsemasi ideaseinien kortit näkyvät kanbanissa',
    CANCEL: 'Peruuta',
    DONE: 'Valmis',
    BACKLOG: 'Aloitteet',
    STUCK: 'Jumissa',
    IN_PROGRESS: 'Työn alla',
    SHOW_MORE: 'Näytä koko teksti',
    IN_TOPIC: 'Kortin ideaseinä',
    DATE: 'Päivämäärä',
    SET_DATE: 'Aseta päivämäärä',
    VOTES: 'Peukutukset',
    ADD_IDEA: 'Lisää idea',
    SET_CATEGORY: 'Luo kategoria',
    IDEA_TITLE: 'Idean otsikko',
    WRITE_YOUR_IDEA: 'Kuvaile ideaa',
    SEARCH_TOPIC: 'Hae kortti hakusanalla',
    SHARE_TOPIC: 'Jaa ideaseinä',
    BY_CODE: 'Ideaseinän koodilla',
    TOPIC_ID: 'Ideaseinän tunnus',
    PASSWORD: 'Salasana',
    BY_LINK: 'Linkillä',
    JOIN_TOPIC_ALERT: 'Kuka tahansa tällä linkillä voi käyttää ideaseinää',
    STATUS: 'Kortin tila',
    APPROVED: 'Hyväksytty',
    WAITING: 'Odottaa päätöstä',
    ARCHIVED: 'Arkistoitu',
    CATEGORIES: 'Kategoriat',
    EDIT: 'Muokkaa',
    CREATE_CATEGORY: 'Luo kategoria',
    CREDITS: 'Tekijät',
    TOPIC_SETTINGS: 'Seinän asetukset',
    TOPIC: 'Ideaseinän nimi',
    TOPIC_PASSWORD: 'Ideaseinän salasana',
    DARK_MODE_TOGGLE: 'Tumma tila',
    CLOSE_TOPIC: 'Sulje ideaseinä',
    DELETE_TOPIC: 'Poista ideaseinä',
    PROFILE: 'Yhteenveto',
    MY_TOPICS: 'Ideaseinät',
  },
};
