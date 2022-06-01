interface LanguagePack extends Record<string, string> {
  SIGN_IN: string;
  EMAIL: string;
  SEND_CODE: string;
  OTP_CONFIRM: string;
  OTP: string;
  WELCOME_BACK: string;
  ORGANISATION: string;
  OVERVIEW: string;
  TOPICS: string;
  TASKS: string;
  TEAM_MEMBERS: string;
  ADD_TEAM_MEMBER: string;
  TEAMS: string;
  TEAM: string;
  TEAM_TOPICS: string;
  SEE_ALL_TOPICS: string;
  SEE_ALL_TEAMS: string;
  SIGN_OUT: string;
  DASHBOARD_INTRO: string;
  DASHBOARD: string;
  CONTROL_EVERYTHING: string;
  RECENT_TOPICS: string;
  REQUEST_TRIAL: string;
  REQUEST: string;
  IDEAS_GATHERED: string;
  DECISIONS_MADE: string;
  IDEAS_READY: string;
  CONTRIBUTORS: string;
  ADD_TOPIC: string;
  MANAGE_TOPICS: string;
  NAME: string;
  ADMIN: string;
  ADD_ORG_MEMBER: string;
  ORG_MEMBERS: string;
  NO_ORG_MEMBERS_FOUND: string;
  NO_ORG_RESULTS: string;
  NO_TEAM_MEMBERS_FOUND: string;
  NO_TEAM_RESULTS: string;
  FAILED_TO_GET_ORG_MEMBERS: string;
  ADD: string;
  ADD_ORG: string;
  INVITE_COLLAB: string;
  BY_EMAIL_OR_NAME: string;
  ADD_AN_EMAIL: string;
  CONFIRMATION: string;
  UNDOABLE: string;
  ACTIVE: string;
  CLOSED: string;
  ROWS_PER_PAGE: string;
  MY_TASKS: string;
  DISPLAYED_TOPICS: string;
  SELECTED_TOPICS: string;
  EVERY_APPROVED_IDEA: string;
  YESTERDAY: string;
  TODAY: string;
  TOMORROW: string;
  RESET: string;
  CANCEL: string;
  DONE: string;
  SEND: string;
  SAVE: string;
  CLOSE: string;
  DELETE: string;
  DISCARD: string;
  BACKLOG: string;
  STUCK: string;
  IN_PROGRESS: string;
  SHOW_MORE: string;
  SHOW_LESS: string;
  IN_TOPIC: string;
  DATE: string;
  NO_DATE: string;
  SET_DATE: string;
  VOTES: string;
  ADD_IDEA: string;
  SET_CATEGORY: string;
  IDEA_TITLE: string;
  WRITE_YOUR_IDEA: string;
  SET_STATUS: string;
  ADD_DATE: string;
  SEARCH_TOPIC: string;
  SHARE_TOPIC: string;
  COPY_LINK: string;
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
  EDIT_CATEGORY: string;
  CREDITS: string;
  TOPIC_SETTINGS: string;
  TOPIC: string;
  NO_TOPICS: string;
  NO_TOPICS_FOUND: string;
  NO_TOPICS_RESULTS: string;
  CREATE_TOPIC: string;
  TOPIC_PASSWORD: string;
  TOPIC_UPDATE_SUCCESS: string;
  TOPIC_UPDATE_FAILED: string;
  DARK_MODE_TOGGLE: string;
  CLOSE_TOPIC: string;
  EDIT_TOPIC: string;
  DELETE_TOPIC: string;
  PROFILE: string;
  MY_TOPICS: string;
  TO_KANBAN: string;
  FILTER: string;
  DUE_DATE_UPDATED: string;
  DUE_DATE_UPDATE_FAILED: string;
  CARD_COPIED: string;
  CARD_COPY_FAILED: string;
  IDEA_DELETED: string;
  IDEA_DELETION_FAILED: string;
  STATUS_UPDATED: string;
  STATUS_UPDATE_FAILED: string;
  COLLABS_INVITED: string;
  COLLAB_INVITE_FAILED: string;
  MEMBERS_REMOVED: string;
  MEMBER_REMOVE_FAILED: string;
  SELECT_DEL_MEMBER: string;
  INVITATION_PENDING: string;
  ABOUT_TO_DELETE: string;
  FROM_TEAM: string;
  FROM_ORG: string;
  UPDATE_ADMINS: string;
  UPDATE_ADMINS_FAILED: string;
  APP_OFFLINE: string;
  WELCOME_TO: string;
  BRAND_NEW_TOPIC: string;
  LETS_START: string;
  NETWORK_ERROR: string;
  COPY_CARD: string;
  EDIT_CARD: string;
  DELETE_CARD: string;
  ABOUT_TO_DELETE_CATEGORY: string;
  BACK: string;
  CATEGORY_NAME: string;
  REQUIRED_CATEGORY_NAME: string;
}

export const LANGUAGES: Record<string, LanguagePack> = {
  'GB-UKM': {
    SIGN_IN: 'Sign in',
    EMAIL: 'Email',
    SEND_CODE: 'Send me the code',
    OTP_CONFIRM: 'We have sent your OTP to you',
    OTP: 'One-Time Password',
    WELCOME_BACK: 'Welcome back',
    ORGANISATION: 'Organisation',
    OVERVIEW: 'Overview',
    TOPICS: 'Topics',
    TASKS: 'Tasks',
    TEAM_MEMBERS: 'Team members',
    ADD_TEAM_MEMBER: 'Add team member',
    TEAMS: 'Teams',
    TEAM: 'Team',
    TEAM_TOPICS: 'Team topics',
    SEE_ALL_TOPICS: 'See all topics',
    SEE_ALL_TEAMS: 'See all teams',
    SIGN_OUT: 'Sign out',
    DASHBOARD_INTRO: 'This is your',
    DASHBOARD: 'Dashboard',
    CONTROL_EVERYTHING: 'control everything here',
    RECENT_TOPICS: 'Recent topics',
    REQUEST_TRIAL: 'Request Premium trial',
    REQUEST: 'Request',
    IDEAS_GATHERED: 'Ideas gathered',
    DECISIONS_MADE: 'Decision made',
    IDEAS_READY: 'Ideas ready',
    CONTRIBUTORS: 'Contributors',
    ADD_TOPIC: 'Add topic',
    MANAGE_TOPICS: 'Manage my topics',
    NAME: 'Name',
    ADMIN: 'Admin',
    ADD_ORG_MEMBER: 'Add organisation member',
    ORG_MEMBERS: 'Organisation members',
    NO_ORG_MEMBERS_FOUND: 'No organisation members found',
    NO_ORG_RESULTS: 'No organisation members found with your search query',
    NO_TEAM_MEMBERS_FOUND: 'No team members found',
    NO_TEAM_RESULTS: 'No team members found with your search query',
    FAILED_TO_GET_ORG_MEMBERS: 'Failed to get organisation members, check your Internet connection and try again.',
    ADD: 'Add',
    ADD_ORG: 'Add new organisation',
    INVITE_COLLAB: 'Invite a collaborator',
    BY_EMAIL_OR_NAME: 'By email or name',
    ADD_AN_EMAIL: 'Add an email or search by name or email',
    CONFIRMATION: 'Are you sure?',
    UNDOABLE: 'This cannot be undone',
    ACTIVE: 'Active',
    CLOSED: 'Closed',
    ROWS_PER_PAGE: 'Rows per page',
    MY_TASKS: 'My tasks',
    DISPLAYED_TOPICS: 'Displayed topics',
    SELECTED_TOPICS: 'Selected topics',
    EVERY_APPROVED_IDEA:
      'Every approved idea of selected topic will be added to this kanban',
    YESTERDAY: 'Yesterday',
    TODAY: 'Today',
    TOMORROW: 'Tomorrow',
    RESET: 'Reset',
    CANCEL: 'Cancel',
    DONE: 'Done',
    SEND: 'Send',
    SAVE: 'Save',
    CLOSE: 'Close',
    DELETE: 'Delete',
    DISCARD: 'Discard',
    BACKLOG: 'Backlog',
    STUCK: 'Stuck',
    IN_PROGRESS: 'In progress',
    SHOW_MORE: 'Show more',
    SHOW_LESS: 'Show less',
    IN_TOPIC: 'In topic',
    DATE: 'Date',
    NO_DATE: 'No date',
    SET_DATE: 'Set date',
    VOTES: 'Votes',
    ADD_IDEA: 'Add an idea',
    SET_CATEGORY: 'Set category',
    IDEA_TITLE: 'Idea title',
    WRITE_YOUR_IDEA: 'Write your idea',
    SET_STATUS: 'Set status',
    ADD_DATE: 'Add dates',
    SEARCH_TOPIC: 'Search in this topic',
    SHARE_TOPIC: 'Share topic',
    COPY_LINK: 'Copy link',
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
    CREATE_CATEGORY: 'Create a category',
    EDIT_CATEGORY: 'Edit the category',
    CREDITS: 'Credits',
    TOPIC_SETTINGS: 'Topic settings',
    TOPIC: 'Topic',
    NO_TOPICS: 'You have no topics yet',
    NO_TOPICS_FOUND: 'No topics found',
    NO_TOPICS_RESULTS: 'No topics found with your search query',
    CREATE_TOPIC: 'Create a new topic',
    TOPIC_PASSWORD: 'Topic password',
    TOPIC_UPDATE_SUCCESS: 'Updating topic succeeded',
    TOPIC_UPDATE_FAILED: 'Updating topic failed. Try again',
    DARK_MODE_TOGGLE: 'Dark mode on / off',
    CLOSE_TOPIC: 'Close topic',
    EDIT_TOPIC: 'Edit topic',
    DELETE_TOPIC: 'Delete topic',
    PROFILE: 'Profile',
    MY_TOPICS: 'My topics',
    TO_KANBAN: 'Move to kanban',
    FILTER: 'Filter',
    DUE_DATE_UPDATED: 'Due date updated',
    DUE_DATE_UPDATE_FAILED: 'Due date update failed. Try again',
    CARD_COPIED: 'Card copied',
    CARD_COPY_FAILED: 'Copying card failed. Try again.',
    IDEA_DELETED: 'Idea deleted',
    IDEA_DELETION_FAILED: 'Deleting idea failed. Try again',
    STATUS_UPDATED: 'Status updated',
    STATUS_UPDATE_FAILED: 'Status update failed. Try again',
    COLLABS_INVITED: 'Collaborators invited',
    COLLAB_INVITE_FAILED: 'Inviting collaborators failed. Try again',
    MEMBERS_REMOVED: 'Members removed',
    MEMBER_REMOVE_FAILED: 'Removing members failed. Try again',
    SELECT_DEL_MEMBER: 'Select members to be deleted',
    INVITATION_PENDING: 'Invitation pending',
    ABOUT_TO_DELETE: 'You are about to delete',
    FROM_TEAM: 'member(s) from team',
    FROM_ORG: 'member(s) from organisation',
    UPDATE_ADMINS: 'Updating admins succeeded',
    UPDATE_ADMINS_FAILED: 'Updating admins failed. Try again',
    APP_OFFLINE: 'Application offline, refresh the page if you wish to continue editing',
    WELCOME_TO: 'Welcome to your',
    BRAND_NEW_TOPIC: 'Brand new topic!',
    LETS_START: 'Let\'s get started!',
    NETWORK_ERROR: 'There was a network error. Try again.',
    COPY_CARD: 'Copy card',
    EDIT_CARD: 'Edit card',
    DELETE_CARD: 'Delete card',
    ABOUT_TO_DELETE_CATEGORY: 'You are about to delete category',
    BACK: 'BACK',
    CATEGORY_NAME: 'Category name',
    REQUIRED_CATEGORY_NAME: 'Category name is required',
  },
  'FI': {
    SIGN_IN: 'Kirjaudu sisään',
    EMAIL: 'Sähköposti',
    SEND_CODE: 'Lähetä koodi',
    OTP_CONFIRM: 'Olemme lähettäneet sinulle kertakäyttöisen salasanan',
    OTP: 'Kertakäyttöinen salasana',
    WELCOME_BACK: 'Tervetuloa takaisin',
    ORGANISATION: 'Organisaatio',
    OVERVIEW: 'Yhteenveto',
    TOPICS: 'Ideaseinät',
    TASKS: 'Tehtävät',
    TEAM_MEMBERS: 'Tiimin jäsenet',
    ADD_TEAM_MEMBER: 'Lisää tiimiin jäsen',
    TEAMS: 'Tiimit',
    TEAM: 'Tiimi',
    TEAM_TOPICS: 'Tiimin ideaseinät',
    SEE_ALL_TOPICS: 'Näytä kaikki ideaseinät',
    SEE_ALL_TEAMS: 'Katso kaikki tiimit',
    SIGN_OUT: 'Kirjaudu ulos',
    DASHBOARD_INTRO: 'Tervetuloa tiimisi',
    DASHBOARD: 'Yhteenvetosivulle',
    CONTROL_EVERYTHING: 'täältä näet kaiken oragnisaatioosi liittyen',
    RECENT_TOPICS: 'Viimeisimmät ideaseinät',
    REQUEST_TRIAL: 'Pyydä Premium kokeilujaksoa',
    REQUEST: 'Lähetä pyyntö',
    IDEAS_GATHERED: 'Kerätyt ideat',
    DECISIONS_MADE: 'Hyväksytty',
    IDEAS_READY: 'Toteutetut ideat',
    CONTRIBUTORS: 'Osallistujat',
    ADD_TOPIC: 'Luo ideaseinä',
    MANAGE_TOPICS: 'Hallitse ideaseiniä',
    NAME: 'Nimi',
    ADMIN: 'Pääkäyttäjä',
    ADD_ORG_MEMBER: 'Lisää organisaatiokäyttäjä',
    ORG_MEMBERS: 'Organisaation käyttäjät',
    NO_ORG_MEMBERS_FOUND: 'Organisaatiokäyttäjiä ei löytynyt',
    NO_ORG_RESULTS: 'Haullasi ei löytynyt organisaatiokäyttäjiä',
    NO_TEAM_MEMBERS_FOUND: 'Tiimin jäseniä ei löytynyt',
    NO_TEAM_RESULTS: 'Haullasi ei löytynyt tiimin jäseniä',
    FAILED_TO_GET_ORG_MEMBERS: 'Organisaatiokäyttäjien haku epäonnistui, tarkista Internet-yhteytesi ja yritä uudestaan.',
    ADD: 'Lisää',
    ADD_ORG: 'Luo organisaatio',
    INVITE_COLLAB: 'Lisää käyttäjä',
    BY_EMAIL_OR_NAME: 'Lisää sähköpostilla',
    ADD_AN_EMAIL: 'Lisää sähköpostilla tai etsi nimellä tai sähköpostilla',
    CONFIRMATION: 'Oletko varma?',
    UNDOABLE: 'Tätä ei voi perua',
    ACTIVE: 'Aktiivinen ideaseinä',
    CLOSED: 'Suljettu',
    ROWS_PER_PAGE: 'Rivejä per sivu',
    MY_TASKS: 'Tehtäväni',
    DISPLAYED_TOPICS: 'Ideaseinää näkyvissä',
    SELECTED_TOPICS: 'Valitse näkyvät ideaseinät',
    EVERY_APPROVED_IDEA:
      'Alta valitsemiesi ideaseinien kortit näkyvät kanbanissa',
    YESTERDAY: 'Eilen',
    TODAY: 'Tänään',
    TOMORROW: 'Huomenna',
    RESET: 'Nollaa',
    CANCEL: 'Peruuta',
    DONE: 'Valmis',
    SEND: 'Lähetä',
    SAVE: 'Tallenna',
    CLOSE: 'Sulje',
    DELETE: 'Poista',
    DISCARD: 'Hylkää',
    BACKLOG: 'Aloitteet',
    STUCK: 'Jumissa',
    IN_PROGRESS: 'Työn alla',
    SHOW_MORE: 'Näytä koko teksti',
    SHOW_LESS: 'Näytä vähemmän',
    IN_TOPIC: 'Kortin ideaseinä',
    DATE: 'Päivämäärä',
    NO_DATE: 'Ei päivämäärää',
    SET_DATE: 'Aseta päivämäärä',
    VOTES: 'Peukutukset',
    ADD_IDEA: 'Lisää idea',
    SET_CATEGORY: 'Luo kategoria',
    IDEA_TITLE: 'Idean otsikko',
    WRITE_YOUR_IDEA: 'Kuvaile ideaa',
    SET_STATUS: 'Lisää tila',
    ADD_DATE: 'Lisää määräpäivä',
    SEARCH_TOPIC: 'Hae kortti hakusanalla',
    SHARE_TOPIC: 'Jaa ideaseinä',
    COPY_LINK: 'Kopioi linkki',
    BY_CODE: 'Ideaseinän koodilla',
    TOPIC_ID: 'Ideaseinän tunnus',
    PASSWORD: 'Salasana',
    BY_LINK: 'Linkillä',
    JOIN_TOPIC_ALERT: 'Kuka tahansa tällä linkillä voi käyttää ideaseinää',
    STATUS: 'Kortin tila',
    APPROVED: 'Hyväksytty',
    WAITING: 'Odottaa',
    ARCHIVED: 'Arkistoitu',
    CATEGORIES: 'Kategoriat',
    EDIT: 'Muokkaa',
    CREATE_CATEGORY: 'Luo kategoria',
    EDIT_CATEGORY: 'Muokkaa kategoriaa',
    CREDITS: 'Tekijät',
    TOPIC_SETTINGS: 'Seinän asetukset',
    TOPIC: 'Ideaseinän nimi',
    NO_TOPICS: 'Sinulla ei ole vielä yhtään ideaseinää',
    NO_TOPICS_FOUND: 'Ideaseiniä ei löytynyt',
    NO_TOPICS_RESULTS: 'Haullasi ei löytynyt ideaseiniä',
    CREATE_TOPIC: 'Luo uusi ideaseinä',
    TOPIC_PASSWORD: 'Ideaseinän salasana',
    TOPIC_UPDATE_SUCCESS: 'Ideaseinän päivitys onnistui',
    TOPIC_UPDATE_FAILED: 'Ideaseinän päivitys epäonnistui. Yritä uudeestaan',
    DARK_MODE_TOGGLE: 'Tumma tila',
    CLOSE_TOPIC: 'Sulje ideaseinä',
    EDIT_TOPIC: 'Muokkaa ideaseinää',
    DELETE_TOPIC: 'Poista ideaseinä',
    PROFILE: 'Yhteenveto',
    MY_TOPICS: 'Ideaseinät',
    TO_KANBAN: 'Kanbaniin',
    FILTER: 'Suodatus',
    DUE_DATE_UPDATED: 'Määräpäivä päivitetty',
    DUE_DATE_UPDATE_FAILED: 'Määräpäivän päivitys epäonnistui. Yritä uudestaan.',
    CARD_COPIED: 'Kortti kopioitu',
    CARD_COPY_FAILED: 'Kortin kopioiminen epäonnistui. Yritä uudestaan',
    IDEA_DELETED: 'Ideakortti poistettu',
    IDEA_DELETION_FAILED: 'Ideakortin poistaminen epäonnistui. Yritä uudestaan',
    STATUS_UPDATED: 'Kortin tila päivitetty',
    STATUS_UPDATE_FAILED: 'Kortin tilan päivittäminen epäonnistui. Yritä uudestaan',
    COLLABS_INVITED: 'Käyttäjä lisätty',
    COLLAB_INVITE_FAILED: 'Käyttäjän lisääminen epäonnistui. Yritä uudestaan',
    MEMBERS_REMOVED: 'Käyttäjät poistettu',
    MEMBER_REMOVE_FAILED: 'Käyttäjien poistaminen epäonnistui. Yritä uudestaan',
    SELECT_DEL_MEMBER: 'Valitse poistettavat käyttäjät',
    INVITATION_PENDING: 'Odottava kutsu',
    ABOUT_TO_DELETE: 'Olet poistamassa',
    FROM_TEAM: 'käyttäjää tiimistä',
    FROM_ORG: 'käyttäjää organisaatiosta',
    UPDATE_ADMINS: 'Pääkäyttäjien päivittäminen onnistui',
    UPDATE_ADMINS_FAILED: 'Pääkäyttäjien päivittäminen epäonnistui. Yritä uudestaan',
    APP_OFFLINE: 'Sovellus on offline, päivitä sivu jos haluat jatkaa muokkaamista',
    WELCOME_TO: 'Tervetuloa tuliterälle',
    BRAND_NEW_TOPIC: 'Ideaseinällesi!',
    LETS_START: 'Aloitetaan ideoimaan!',
    NETWORK_ERROR: 'Tapahtui verkkovirhe. Yritä uudestaan',
    COPY_CARD: 'Kopioi kortti',
    EDIT_CARD: 'Muokkaa korttia',
    DELETE_CARD: 'Poista kortti',
    ABOUT_TO_DELETE_CATEGORY: 'Olet poistamassa kateogrian',
    BACK: 'TAKAISIN',
    CATEGORY_NAME: 'Kategorian nimi',
    REQUIRED_CATEGORY_NAME: 'Kategorian nimi on pakollinen',
  },
};
