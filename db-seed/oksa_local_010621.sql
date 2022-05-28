--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Debian 12.7-1.pgdg100+1)
-- Dumped by pg_dump version 12.7 (Debian 12.7-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cards (
    uuid uuid NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" uuid NOT NULL,
    "lastModified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastModifiedBy" uuid NOT NULL,
    content text NOT NULL,
    dates jsonb,
    deleted boolean NOT NULL,
    status character varying(50) NOT NULL,
    title character varying(300) NOT NULL,
    votes jsonb,
    remover character varying(36),
    "deletedAt" timestamp with time zone,
    categories jsonb,
    "authorUuid" uuid,
    "meetingUuid" uuid,
    "taskStatus" character varying(50)
);


ALTER TABLE public.cards OWNER TO postgres;

--
-- Name: logins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logins (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "codeUsed" boolean NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "loginCode" text NOT NULL
);


ALTER TABLE public.logins OWNER TO postgres;

--
-- Name: meetings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meetings (
    uuid uuid NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" uuid NOT NULL,
    "lastModified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastModifiedBy" uuid NOT NULL,
    id character varying(11) NOT NULL,
    "creatorName" character varying(300) NOT NULL,
    "creatorPhoneNumber" character varying(20),
    "creatorEmail" character varying(300),
    password character varying(300) NOT NULL,
    status character varying(50) NOT NULL,
    name character varying(300) NOT NULL,
    categories jsonb
);


ALTER TABLE public.meetings OWNER TO postgres;

--
-- Name: meetings_authorized_users_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meetings_authorized_users_users (
    "meetingsUuid" uuid NOT NULL,
    "usersUuid" uuid NOT NULL
);


ALTER TABLE public.meetings_authorized_users_users OWNER TO postgres;

--
-- Name: migration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migration (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migration OWNER TO postgres;

--
-- Name: migration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migration_id_seq OWNER TO postgres;

--
-- Name: migration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migration_id_seq OWNED BY public.migration.id;


--
-- Name: organisations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisations (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" uuid NOT NULL,
    "lastModified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastModifiedBy" uuid NOT NULL,
    name character varying(300) NOT NULL
);


ALTER TABLE public.organisations OWNER TO postgres;

--
-- Name: organisations_admins_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisations_admins_profiles (
    "organisationsUuid" uuid NOT NULL,
    "profilesUuid" uuid NOT NULL
);


ALTER TABLE public.organisations_admins_profiles OWNER TO postgres;

--
-- Name: organisations_users_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisations_users_profiles (
    "organisationsUuid" uuid NOT NULL,
    "profilesUuid" uuid NOT NULL
);


ALTER TABLE public.organisations_users_profiles OWNER TO postgres;

--
-- Name: profile_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_settings (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    background jsonb NOT NULL
);


ALTER TABLE public.profile_settings OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" uuid NOT NULL,
    "lastModified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastModifiedBy" uuid NOT NULL,
    name character varying(300) NOT NULL,
    ip text,
    "userUuid" uuid,
    email text,
    "phoneNumber" text,
    "settingsUuid" uuid,
    "subscriptionUuid" uuid
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: secrets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.secrets (
    name character varying NOT NULL,
    value character varying(300) NOT NULL
);


ALTER TABLE public.secrets OWNER TO postgres;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    subscription character varying NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uuid uuid NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" uuid NOT NULL,
    "lastModified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastModifiedBy" uuid NOT NULL,
    "authToken" text DEFAULT ''::text NOT NULL,
    "refreshToken" text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: migration id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migration ALTER COLUMN id SET DEFAULT nextval('public.migration_id_seq'::regclass);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cards (uuid, created, "createdBy", "lastModified", "lastModifiedBy", content, dates, deleted, status, title, votes, remover, "deletedAt", categories, "authorUuid", "meetingUuid", "taskStatus") FROM stdin;
1530361a-eb47-4ebc-a1f7-7194b70164ce	2021-04-17 19:26:56.099596+00	d3f44e05-edfa-405b-8ff7-b9411c48f98f	2021-05-21 13:08:44.024254+00	1530361a-eb47-4ebc-a1f7-7194b70164ce	Updated stream content	{"endDate": null, "startDate": null}	t	Waiting	Updated	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 13:08:44.021+00	[{"name": "Sininen", "color": "#001122"}, {"name": "Uusi", "color": "#FFEEDD"}]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	Stuck
6b69f00f-877b-4f9d-ab93-41f35f466752	2021-04-20 16:45:11.661367+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.300421+00	6b69f00f-877b-4f9d-ab93-41f35f466752		{"endDate": null, "startDate": null}	t	Waiting	est	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:45:28.717+00	[]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
16bd1a71-8b2c-41b2-b6b8-7ff278d69ead	2021-04-20 16:53:49.331425+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.278311+00	16bd1a71-8b2c-41b2-b6b8-7ff278d69ead	idea	{"endDate": null, "startDate": null}	t	Waiting	uusi	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:54:02.369+00	[]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
8f503044-3650-4433-a22e-759089c75206	2021-05-15 06:41:48.632219+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.307094+00	8f503044-3650-4433-a22e-759089c75206	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 06:41:57.792+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
b18d28c0-6997-44b7-9c72-735f40e7a880	2021-04-20 16:53:56.968731+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.307512+00	b18d28c0-6997-44b7-9c72-735f40e7a880		{"endDate": null, "startDate": null}	t	Waiting	kategorioita	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:54:03.897+00	[{"name": "Päivitystesti", "color": "#F92222"}]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
fc3c0b60-0f0c-4d4e-aa60-ce0cdae420f7	2021-04-20 16:39:11.184297+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.300819+00	fc3c0b60-0f0c-4d4e-aa60-ce0cdae420f7		{"endDate": null, "startDate": null}	t	Waiting	wetasdf	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:39:43.006+00	[]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
d356bf64-12cb-4424-b91b-5cc427d89a37	2021-05-11 15:03:06.855642+00	0e2bd9cc-83c3-434c-ada6-7b99d6462cd4	2021-05-11 15:03:30.005575+00	d356bf64-12cb-4424-b91b-5cc427d89a37	idea	{"endDate": null, "startDate": null}	t	Approved	uusi	{"no": [], "yes": []}	0e2bd9cc-83c3-434c-ada6-7b99d6462cd4	2021-05-11 15:03:30.002+00	[{"name": "Testi", "color": "#F9BB22"}]	0e2bd9cc-83c3-434c-ada6-7b99d6462cd4	c362d12e-ce21-4f96-a567-99af5fafa94c	\N
525b2347-82f8-4d05-b042-0353ccce75b0	2021-05-20 16:41:25.032051+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:44:48.18626+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	1	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:44:48.18+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
eb8b3b1d-4fae-4202-8ad1-d6a0a045d8d8	2021-05-15 07:19:35.863009+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.338464+00	eb8b3b1d-4fae-4202-8ad1-d6a0a045d8d8	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:19:40.769+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
01950ec2-c744-4164-939a-68388b0df5c7	2021-01-24 17:19:12.865269+00	65aacfc0-8efd-4dea-97ec-703de5677205	2021-05-29 06:36:46.631272+00	01950ec2-c744-4164-939a-68388b0df5c7	221	{"endDate": null, "startDate": null}	f	Waiting	2	{"no": [], "yes": []}	\N	\N	[{"name": "Pitkä nimi testiin", "color": "var(--v-carrot-base)"}, {"name": "Sininen", "color": "var(--v-skyblue-base)"}]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
62a687c4-77db-4a11-b9c9-5792dfac7d2e	2021-04-20 16:53:44.699233+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.330001+00	62a687c4-77db-4a11-b9c9-5792dfac7d2e		{"endDate": null, "startDate": null}	t	Waiting	uusi	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:54:06.003+00	[]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
cdf752c6-95e5-42c8-938a-14e0aa172f9e	2021-05-20 16:41:28.055077+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:44:49.478354+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	2	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:44:49.471+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
939f8a9e-76d5-4af8-b901-d4a4dda301b0	2021-03-21 16:33:22.567082+00	0714bf90-c514-47fb-8efc-f5f9523e7210	2021-05-29 06:34:54.686211+00	939f8a9e-76d5-4af8-b901-d4a4dda301b0		{"endDate": null, "startDate": null}	f	Waiting	Kortteja	{"no": [], "yes": []}	\N	\N	[{"name": "Sininen", "color": "var(--v-skyblue-base)"}]	0714bf90-c514-47fb-8efc-f5f9523e7210	b5d6c500-88ae-41ad-ab39-94b431e17648	
03b67b9e-2482-49c6-97c4-ea7444db4784	2021-03-21 16:33:17.830227+00	0714bf90-c514-47fb-8efc-f5f9523e7210	2021-05-23 10:05:51.550613+00	03b67b9e-2482-49c6-97c4-ea7444db4784	idea	{"endDate": null, "startDate": null}	f	Waiting	Lisää	{"no": [], "yes": []}	\N	\N	[]	0714bf90-c514-47fb-8efc-f5f9523e7210	b5d6c500-88ae-41ad-ab39-94b431e17648	
2e254c99-7dec-4867-8d79-6724906697e5	2021-05-16 10:19:47.197111+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-29 06:38:23.221273+00	2e254c99-7dec-4867-8d79-6724906697e5	221	{"endDate": null, "startDate": null}	f	Waiting	22	{"no": [], "yes": []}	\N	\N	[{"name": "Pitkä nimi testiin", "color": "var(--v-carrot-base)"}, {"name": "Sininen", "color": "var(--v-skyblue-base)"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
6cbc1614-99a3-4ec6-87b5-545d4f160ab9	2021-04-29 13:42:43.994551+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-04-29 13:42:46.709186+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-04-29 13:42:46.701+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
c0c95cde-c1d5-4f7d-ab6c-815c027d304c	2021-05-21 17:15:24.237157+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 18:15:49.516282+00	c0c95cde-c1d5-4f7d-ab6c-815c027d304c		{"endDate": null, "startDate": null}	f	Waiting	Uusi kortti	{"no": [], "yes": []}	\N	\N	[{"name": "Testi", "color": "#AC22F9"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	
d46344e4-4c11-40eb-a5f7-8426dff81f85	2021-04-05 16:27:59.613822+00	d3f44e05-edfa-405b-8ff7-b9411c48f98f	2021-05-29 14:17:14.224803+00	d46344e4-4c11-40eb-a5f7-8426dff81f85	Updated categories	{"endDate": null, "startDate": null}	f	Approved	Updated	{"no": ["4ad7fc73-8fbf-4a01-b44a-0de43077e617"], "yes": []}	\N	\N	[{"name": "Sininen", "color": "var(--v-skyblue-base)"}, {"name": "Uusi", "color": "var(--v-yellow-base)"}]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	In progress
74c2ada4-e9e0-40fa-b0bb-3224ccc9d1bc	2021-05-15 07:17:02.884054+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:17:14.910171+00	74c2ada4-e9e0-40fa-b0bb-3224ccc9d1bc	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:17:14.906+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
638b7c44-1a1a-4484-aa4f-2863ce367e2e	2021-05-15 07:14:51.836132+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.283752+00	638b7c44-1a1a-4484-aa4f-2863ce367e2e	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:15:13.012+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
b3727987-895f-4834-a366-2e26ff2442fe	2021-04-20 16:37:09.490752+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.354767+00	b3727987-895f-4834-a366-2e26ff2442fe		{"endDate": null, "startDate": null}	t	Waiting	test	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:38:55.252+00	[]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
530dd187-d7c6-4dcb-9199-d55d4865ab78	2021-05-20 16:44:35.256152+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:44:50.486683+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	2	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:44:50.483+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
00cb61a6-7f36-4832-91da-4d402ad942b2	2021-05-20 16:44:37.871977+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:44:51.452927+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2	{"endDate": null, "startDate": null}	t	Waiting		{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:44:51.449+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
858372e6-0c39-4f1f-885b-6553ad2e89a6	2021-04-20 16:46:55.071585+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-29 14:17:21.488347+00	858372e6-0c39-4f1f-885b-6553ad2e89a6	asdf	{"endDate": null, "startDate": null}	f	Approved	test	{"no": [], "yes": []}	\N	\N	[]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	Stuck
1cdd14b5-710e-41f9-a50a-795de2ea5d49	2021-04-20 16:56:23.166567+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.378246+00	1cdd14b5-710e-41f9-a50a-795de2ea5d49		{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:56:25.911+00	[]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
9ab2aecd-863d-4d2e-a619-a84d53ee7716	2021-05-20 16:45:00.657154+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:12.946317+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	1	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:12.941+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
7833a3d3-7933-412b-9a93-4ee2d83de2ac	2021-04-13 14:00:29.115407+00	d3f44e05-edfa-405b-8ff7-b9411c48f98f	2021-05-16 12:00:11.388686+00	7833a3d3-7933-412b-9a93-4ee2d83de2ac		{"endDate": null, "startDate": null}	t	Waiting		{"no": [], "yes": []}	a3d5d0ae-472b-488e-9cb5-2bcebd54dafd	2021-04-13 17:53:32.973+00	[]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
da70b8ad-343b-4b28-84f9-749fe8d97788	2021-05-15 06:42:52.596905+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.407529+00	da70b8ad-343b-4b28-84f9-749fe8d97788	Updated categories	{"endDate": null, "startDate": null}	t	Waiting	Updated	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 06:42:58.748+00	[{"name": "Sininen", "color": "#2253F9"}, {"name": "Uusi", "color": "#F9F222"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
9404037e-b177-4442-a6d7-73c988b94287	2021-05-15 06:42:55.468744+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.408704+00	9404037e-b177-4442-a6d7-73c988b94287	Testi	{"endDate": null, "startDate": null}	t	Waiting	Uusi idea	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 06:43:00.102+00	[{"name": "Uusi", "color": "#F9F222"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
e99b451f-42b9-4667-8b0f-e92e69e950d1	2021-05-15 06:56:59.191215+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.419566+00	e99b451f-42b9-4667-8b0f-e92e69e950d1	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 06:57:11.249+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
6a5a2f7a-afe7-4734-a244-c2dc1a2f35e2	2021-05-15 06:59:47.55553+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.420482+00	6a5a2f7a-afe7-4734-a244-c2dc1a2f35e2	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:02:47.62+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
c28947f4-0986-4964-a452-f399505738d0	2021-05-15 07:17:42.534685+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.464561+00	c28947f4-0986-4964-a452-f399505738d0	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:17:49.373+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
96580c86-1f87-4fa3-9597-7dac03f8c39c	2021-03-21 16:49:02.611686+00	0714bf90-c514-47fb-8efc-f5f9523e7210	2021-05-29 06:38:18.489018+00	96580c86-1f87-4fa3-9597-7dac03f8c39c	Sisältö	{"endDate": null, "startDate": null}	f	Approved	asdf	{"no": [], "yes": []}	\N	\N	[]	0714bf90-c514-47fb-8efc-f5f9523e7210	b5d6c500-88ae-41ad-ab39-94b431e17648	Done
677d40f3-a323-4cbc-8300-e91bca7c266e	2021-04-29 16:21:31.402763+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-04-29 16:21:39.085157+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	asdf	{"endDate": null, "startDate": null}	t	Waiting		{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-04-29 16:21:39.073+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
ab382c78-92b1-4f3e-94b3-5be808180f1f	2021-05-16 09:44:58.872892+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.510609+00	ab382c78-92b1-4f3e-94b3-5be808180f1f	idea	{"endDate": null, "startDate": null}	t	Waiting	Lisää	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:45:10.705+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
cd433361-335d-425a-b1cc-53245459e519	2021-05-16 09:47:35.171338+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.511639+00	cd433361-335d-425a-b1cc-53245459e519	Sisältö	{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:47:51.678+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
fd420d90-197b-4bef-960b-a29bbf10e3d2	2021-05-20 16:44:40.916843+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:08.935664+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	2	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:08.93+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
46e7c7bd-5e00-4b9e-a4b6-737666be40ba	2021-05-20 16:44:43.955512+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:10.902006+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	3	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:10.898+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
ad2c1e45-a1ab-4d14-a052-3c2e22d40843	2021-05-20 16:44:53.348723+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:11.93599+00	ad2c1e45-a1ab-4d14-a052-3c2e22d40843		{"endDate": null, "startDate": null}	t	Waiting	3	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:11.931+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
e49d6976-90ed-4521-a0ea-7a1d29918475	2021-05-20 16:45:03.353619+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:14.025344+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	12	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:14.02+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
21e840cc-272d-4c56-8523-45549c15d814	2021-05-20 16:45:06.063005+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:15.098556+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	13	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-20 16:45:15.091+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	\N
41199d82-c782-4668-a7a1-3e5e653bdb19	2021-05-21 17:15:35.246302+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 17:15:38.298999+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	test	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 17:15:38.29+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	
6a5b031f-6578-4df2-bf8a-44393adcd57e	2021-01-17 18:15:19.13921+00	65aacfc0-8efd-4dea-97ec-703de5677205	2021-05-29 08:48:53.904373+00	6a5b031f-6578-4df2-bf8a-44393adcd57e	Testi	{"endDate": null, "startDate": null}	f	Approved	Uusi idea	{"no": [], "yes": ["b7b9c539-87ee-4be7-8bef-5f424bb25d9c"]}	\N	\N	[{"name": "Uusi", "color": "var(--v-yellow-base)"}]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	Done
607e130e-903f-46a1-a0a3-a430cfffe19a	2021-05-15 07:17:56.777184+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:18:19.779599+00	607e130e-903f-46a1-a0a3-a430cfffe19a	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:18:19.776+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
b8db9707-1fb4-4af8-b42b-2a2808929892	2021-05-15 07:21:53.441286+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.512873+00	b8db9707-1fb4-4af8-b42b-2a2808929892	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:22:06.36+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
2773ae36-7479-468d-b71d-6f41fee765c3	2021-05-21 17:16:25.282122+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 17:16:27.609584+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	test	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 17:16:27.604+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	
68d1bafb-018e-4bcc-a71c-de6069a76594	2021-05-21 17:16:30.636865+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 17:16:32.936043+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 17:16:32.931+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	
c8aeadd2-927f-4536-a2d4-8d77f4306116	2021-05-15 07:22:35.058314+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.513883+00	c8aeadd2-927f-4536-a2d4-8d77f4306116	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:22:44.156+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
e3d32ed1-1801-4c24-9424-325116ab030f	2021-05-15 07:22:46.932626+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.551784+00	e3d32ed1-1801-4c24-9424-325116ab030f	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:22:50.45+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
0cfd450c-ad59-466f-96e7-ace27088d92b	2021-05-21 18:16:05.556861+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-25 16:12:54.184692+00	0cfd450c-ad59-466f-96e7-ace27088d92b	asdf	{"endDate": null, "startDate": null}	f	Approved	testikortti	{"no": [], "yes": []}	\N	\N	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b7121194-3b38-4b63-ab97-0d86c37f89c4	
b3554c02-2018-4441-a7d8-434ecab099ef	2021-05-15 07:29:18.47088+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.604833+00	b3554c02-2018-4441-a7d8-434ecab099ef	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:30:08.552+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
b9edbfe0-667f-4704-8857-043c1bbc2b0b	2021-05-21 19:20:39.674696+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 19:24:02.701503+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	Testi idea	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 19:24:02.684+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
4e32ca00-ad15-43b1-94ef-79da70ec50a7	2021-05-15 07:30:16.455127+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.605231+00	4e32ca00-ad15-43b1-94ef-79da70ec50a7	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:30:20.02+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
345e6d63-3065-49bf-8873-f51235240bc1	2021-05-15 07:31:58.013016+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.605674+00	345e6d63-3065-49bf-8873-f51235240bc1	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:32:04.813+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
6df17e9f-c9bd-464d-b2cd-32f686da3789	2021-05-15 07:31:07.07087+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.606633+00	6df17e9f-c9bd-464d-b2cd-32f686da3789	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:32:06.337+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
64d90924-b9bf-4613-9e0a-010f76c33299	2021-05-15 07:33:26.017639+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.660252+00	64d90924-b9bf-4613-9e0a-010f76c33299	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:34:29.721+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
38f14750-2bd5-490a-9b69-fa1be2d3c852	2021-05-15 07:34:36.002308+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.66288+00	38f14750-2bd5-490a-9b69-fa1be2d3c852	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:34:51.151+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
b86c1f63-5594-441c-b143-32c71288350c	2021-05-15 07:34:40.183705+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.66373+00	b86c1f63-5594-441c-b143-32c71288350c	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:34:52.377+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
13f62b79-1e32-48e5-8c0f-9e7dbb821729	2021-05-15 07:34:48.303381+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.664449+00	13f62b79-1e32-48e5-8c0f-9e7dbb821729	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:34:53.491+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
38d84732-6661-4c08-a844-682e00e2cbee	2021-05-15 07:24:33.925053+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.552274+00	38d84732-6661-4c08-a844-682e00e2cbee	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:24:37.05+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
becab99a-f0f7-4558-99e5-294d0bcc256f	2021-05-16 09:48:28.444954+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:50:04.223173+00	becab99a-f0f7-4558-99e5-294d0bcc256f	Sisältö kopioitu	{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:50:04.217+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
0db4e37c-e31f-4b5e-8308-3b81412ee517	2021-05-15 07:32:14.366723+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.607097+00	0db4e37c-e31f-4b5e-8308-3b81412ee517	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:32:34.146+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
bedd2ca1-bb4f-4f2c-b182-ca34a9ed5303	2021-05-16 09:25:27.744972+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.721292+00	bedd2ca1-bb4f-4f2c-b182-ca34a9ed5303	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:25:31.356+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
9a7e4e0d-2d75-424d-b68d-e2245934b769	2021-05-21 19:22:51.230742+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 19:24:05.369493+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	Uusi idea yritys	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 19:24:05.366+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
ed691c91-bea6-411c-a7e7-3d33436edd23	2021-05-16 09:25:40.951782+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.722164+00	ed691c91-bea6-411c-a7e7-3d33436edd23	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:25:43.655+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
e6f8c91e-2562-48c5-b255-b18bd4d41e3f	2021-05-16 09:32:15.832508+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.737263+00	e6f8c91e-2562-48c5-b255-b18bd4d41e3f	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:32:18.76+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
f8c8cdd0-0c4d-478e-b9d3-8e98f2c1a8b2	2021-05-16 09:32:13.381792+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.739659+00	f8c8cdd0-0c4d-478e-b9d3-8e98f2c1a8b2	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:32:20.056+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
c0a037bb-476c-48d6-a32b-96a9cc96dd98	2021-05-16 09:32:28.684895+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.750211+00	c0a037bb-476c-48d6-a32b-96a9cc96dd98	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:32:31.164+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
a3613d37-e15a-4d49-860f-a39ed9ecff94	2021-05-16 09:46:49.148589+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.7878+00	a3613d37-e15a-4d49-860f-a39ed9ecff94	Sisältö	{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:46:56.079+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
908b0932-0e7a-48b6-bf55-486b5d3bcf48	2021-05-16 09:46:01.06444+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.779251+00	908b0932-0e7a-48b6-bf55-486b5d3bcf48	Sisältö	{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:46:31.355+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
23ff6495-120f-479c-b708-83836af6c995	2021-05-16 09:34:50.393706+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:34:58.031828+00	23ff6495-120f-479c-b708-83836af6c995	222\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:34:58.029+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
21b48d4f-d01b-4a19-ad6e-f4be09e25cbc	2021-05-16 09:44:40.419965+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:45:48.046169+00	21b48d4f-d01b-4a19-ad6e-f4be09e25cbc	22 kopioitu\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:45:48.04+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
b9d9ad82-4614-4585-9357-4ff5c3005426	2021-05-16 09:45:51.248016+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:46:33.313667+00	b9d9ad82-4614-4585-9357-4ff5c3005426	22 kopioitu\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:46:33.309+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
36f7e942-188d-40fd-bcb1-a4b6789fe9db	2021-05-16 09:46:41.966833+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:46:59.486355+00	36f7e942-188d-40fd-bcb1-a4b6789fe9db	22 kopio\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:46:59.481+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
71f211ed-3a75-4937-a4c7-6004874ecd1f	2021-05-15 07:35:17.625115+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.686039+00	71f211ed-3a75-4937-a4c7-6004874ecd1f	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:35:20.528+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
d627ea79-3a4a-4eb8-b06a-89147ebad8d0	2021-05-16 09:29:11.872948+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.722696+00	d627ea79-3a4a-4eb8-b06a-89147ebad8d0	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:30:08.935+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
8001ac5f-7b6f-4b19-ba08-bee8b8cfb800	2021-05-16 09:47:26.384471+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:47:53.819904+00	8001ac5f-7b6f-4b19-ba08-bee8b8cfb800	22 kopio\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:47:53.815+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
3336091f-966a-48f0-bbb0-16e45c533398	2021-05-16 09:48:01.999502+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.79171+00	3336091f-966a-48f0-bbb0-16e45c533398	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:48:21.318+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
dc7a4e3d-4c76-4d24-a366-36660eab2595	2021-05-21 19:30:43.339241+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 19:43:46.306337+00	dc7a4e3d-4c76-4d24-a366-36660eab2595		{"endDate": null, "startDate": null}	t	Waiting	Testi lisäys	{"no": [], "yes": ["4ad7fc73-8fbf-4a01-b44a-0de43077e617"]}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-21 19:43:46.302+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
38b1e925-949c-44d2-be56-8d2a12f7edc2	2021-05-16 09:48:37.330354+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:48:46.217866+00	38b1e925-949c-44d2-be56-8d2a12f7edc2	Sisältö 2	{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:48:46.214+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
aba60b22-e3e1-4c7b-b794-bda9ead79b41	2021-05-16 09:50:11.970121+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.823078+00	aba60b22-e3e1-4c7b-b794-bda9ead79b41	Sisältö	{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:50:18.759+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
3ed1d6b6-df92-4ec7-b4fa-c7ef64cd02f3	2021-01-17 18:22:17.21528+00	65aacfc0-8efd-4dea-97ec-703de5677205	2021-05-29 06:36:57.38345+00	3ed1d6b6-df92-4ec7-b4fa-c7ef64cd02f3	22\nToinen rivi	{"endDate": null, "startDate": null}	f	Waiting	Testi	{"no": [], "yes": ["65aacfc0-8efd-4dea-97ec-703de5677205", "4ad7fc73-8fbf-4a01-b44a-0de43077e617"]}	\N	\N	[{"name": "Sininen", "color": "var(--v-skyblue-base)"}, {"name": "Vihreä", "color": "var(--v-lime-base)"}]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
9feaac4a-b094-419b-81fb-3cee9eda3e48	2021-05-16 09:50:06.077896+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:50:20.992348+00	9feaac4a-b094-419b-81fb-3cee9eda3e48	22\nToinen rivi kopio	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:50:20.988+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
953fb0c4-d39d-4d89-8da2-94c79be0794d	2021-05-16 10:26:45.177192+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 10:26:55.769253+00	953fb0c4-d39d-4d89-8da2-94c79be0794d	221	{"endDate": null, "startDate": null}	t	Waiting	2	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 10:26:55.767+00	[{"name": "Pitkä nimi testiin", "color": "#F922A4"}, {"name": "Päivitystesti", "color": "#F92222"}, {"name": "Sininen", "color": "#223BF9"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
4103a6e9-b0d6-474e-8bd4-5767127d225f	2021-04-10 14:43:59.697137+00	e8373c97-33f3-44c4-9165-4c2abb1ba743	2021-05-16 12:00:11.284452+00	4103a6e9-b0d6-474e-8bd4-5767127d225f		{"endDate": null, "startDate": null}	t	Waiting		{"no": [], "yes": []}	e8373c97-33f3-44c4-9165-4c2abb1ba743	2021-04-10 14:45:11.182+00	[]	e8373c97-33f3-44c4-9165-4c2abb1ba743	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
d20af492-9e6d-4f3e-b1df-a1a37043f255	2021-05-16 09:52:42.938191+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:52:49.068805+00	d20af492-9e6d-4f3e-b1df-a1a37043f255	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:52:49.066+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
812a32ca-d35d-4684-95ca-259ce860f5c9	2021-03-21 18:38:55.23529+00	0714bf90-c514-47fb-8efc-f5f9523e7210	2021-05-16 12:00:11.285194+00	812a32ca-d35d-4684-95ca-259ce860f5c9		{"endDate": null, "startDate": null}	t	Waiting	asdffd	{"no": [], "yes": []}	0714bf90-c514-47fb-8efc-f5f9523e7210	2021-03-21 18:38:58.792+00	[{"name": "Päivitystesti", "color": "#FF0000"}]	0714bf90-c514-47fb-8efc-f5f9523e7210	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
26863ec7-b08b-410a-8310-be7ca0c8db08	2021-05-16 09:52:51.681186+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:53:08.629197+00	26863ec7-b08b-410a-8310-be7ca0c8db08	22 kopio\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:53:08.627+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
6d4a223c-88d7-441c-b2d5-b87239e2c1e3	2021-05-16 09:53:01.437568+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:53:09.86584+00	6d4a223c-88d7-441c-b2d5-b87239e2c1e3	Sisältö kopio	{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:53:09.864+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
0e64476f-a7b9-453e-9046-c583f2339d8d	2021-05-15 06:59:26.737566+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.28664+00	0e64476f-a7b9-453e-9046-c583f2339d8d	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 06:59:45.218+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
f6dace70-29e7-4ef6-9451-061b2127a9ce	2021-05-15 06:48:29.374091+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.332214+00	f6dace70-29e7-4ef6-9451-061b2127a9ce	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 06:48:39.739+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
e09e50fc-bb4f-47e7-8c92-a4571b48b41d	2021-05-16 09:54:46.270183+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:54:53.2886+00	e09e50fc-bb4f-47e7-8c92-a4571b48b41d	22 kopio\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:54:53.286+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
be496475-9fea-4d8e-8ff0-6cf5e565cb6d	2021-05-15 07:02:50.20356+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.33264+00	be496475-9fea-4d8e-8ff0-6cf5e565cb6d	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:10:22.15+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
88da7cf0-8804-445c-8c17-894aacd9c1e4	2021-03-14 12:15:09.892573+00	dd6143c0-b3ad-4f32-81ba-eea4750df5a0	2021-05-23 07:27:24.446257+00	88da7cf0-8804-445c-8c17-894aacd9c1e4	Testataan editointiaasdf	{"endDate": null, "startDate": null}	t	Waiting	Neljäs kortti	{"no": ["4ad7fc73-8fbf-4a01-b44a-0de43077e617"], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 07:27:24.442+00	[{"name": "Vihreä", "color": "#45F922"}]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
544ebf07-4603-4eae-bf21-2802fe39c641	2021-05-15 07:18:12.894999+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.335026+00	544ebf07-4603-4eae-bf21-2802fe39c641	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:18:18.151+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
2d86a8ed-84ef-4840-bf06-c1837fc08561	2021-05-16 10:13:08.833856+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 10:13:16.077481+00	2d86a8ed-84ef-4840-bf06-c1837fc08561	idea kopio	{"endDate": null, "startDate": null}	t	Waiting	Lisää	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 10:13:16.072+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
e49f4de9-25cb-4030-be23-8321b3710e67	2021-04-20 16:43:54.704959+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.355538+00	e49f4de9-25cb-4030-be23-8321b3710e67		{"endDate": null, "startDate": null}	t	Waiting	test	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:45:05.325+00	[]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
a32d40ce-5055-4b58-9819-7104a4886b11	2021-05-15 06:42:42.86897+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.36027+00	a32d40ce-5055-4b58-9819-7104a4886b11	idea	{"endDate": null, "startDate": null}	t	Waiting	Lisää	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 06:42:48.571+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
fadc752b-96e4-47b0-b247-c5371de0dea6	2021-05-16 10:11:45.535173+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.856421+00	fadc752b-96e4-47b0-b247-c5371de0dea6	idea	{"endDate": null, "startDate": null}	t	Waiting	Lisää	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 10:11:48.965+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
67c69655-2f48-4d21-bda4-3f10174531d7	2021-05-23 06:16:33.881277+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:16:41.437758+00	67c69655-2f48-4d21-bda4-3f10174531d7	Testataan editointia	{"endDate": "1970-01-01T00:00:00.000Z", "startDate": "1970-01-01T00:00:00.000Z"}	t	Waiting	Neljäs kortti copy	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:16:41.434+00	[{"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
a59ce443-cbdd-4970-8b00-f84ea4bd1246	2021-05-15 06:42:45.910257+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.360707+00	a59ce443-cbdd-4970-8b00-f84ea4bd1246	idea	{"endDate": null, "startDate": null}	t	Waiting	Lisää	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 06:42:49.952+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
e02db855-8d82-4360-9a57-af21b0de9b09	2021-04-13 14:05:10.323214+00	d3f44e05-edfa-405b-8ff7-b9411c48f98f	2021-05-16 12:00:11.370112+00	e02db855-8d82-4360-9a57-af21b0de9b09		{"endDate": null, "startDate": null}	t	Waiting		{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 14:50:42.742+00	[]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
e42ecb64-c406-40cd-8bc8-6a4f341dc61a	2021-05-15 07:11:32.699433+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.453052+00	e42ecb64-c406-40cd-8bc8-6a4f341dc61a	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:12:03.825+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
b4eb581f-c437-44ee-ad2f-791876ec5ac6	2021-05-15 07:27:24.56011+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.569095+00	b4eb581f-c437-44ee-ad2f-791876ec5ac6	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:27:35.644+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
2f6ea7e3-0683-4d75-92c6-7c6171425922	2021-05-15 07:32:38.442922+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.626395+00	2f6ea7e3-0683-4d75-92c6-7c6171425922	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:32:48.206+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
2e164b10-2449-4166-bd1e-4fb499658c73	2021-05-23 06:17:29.957712+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:17:47.890084+00	2e164b10-2449-4166-bd1e-4fb499658c73	Testataan editointia	{"endDate": "1970-01-01T00:00:00.000Z", "startDate": "1970-01-01T00:00:00.000Z"}	t	Waiting	Neljäs kor	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:17:47.886+00	[{"name": "Pitkä nimi testiin", "color": "#F922A4"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
134727d9-ba99-42bd-8dfb-ce38133cd16f	2021-04-13 14:04:20.132675+00	d3f44e05-edfa-405b-8ff7-b9411c48f98f	2021-05-16 12:00:11.371735+00	134727d9-ba99-42bd-8dfb-ce38133cd16f		{"endDate": null, "startDate": null}	t	Waiting		{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 14:50:45.535+00	[]	d3f44e05-edfa-405b-8ff7-b9411c48f98f	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
adda4167-8f59-4f83-a1d2-318e5d498496	2021-05-15 07:15:20.417369+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.45611+00	adda4167-8f59-4f83-a1d2-318e5d498496	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:15:29.887+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
9cc49341-02d1-4532-80b3-081ac3787d44	2021-05-15 07:27:42.940556+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.571247+00	9cc49341-02d1-4532-80b3-081ac3787d44	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:28:07.396+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
c6a0bc3a-0822-439e-be33-5cfd2408ad83	2021-05-15 07:32:40.62581+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.628415+00	c6a0bc3a-0822-439e-be33-5cfd2408ad83	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:32:49.399+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
46d4d080-d398-4523-8ffe-e1747b83ee42	2021-05-16 09:18:53.319752+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.688667+00	46d4d080-d398-4523-8ffe-e1747b83ee42	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:18:56.934+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
a8452449-1aaa-4221-b68a-3b3731d0b9bd	2021-05-23 06:38:48.426625+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:39:01.017963+00	a8452449-1aaa-4221-b68a-3b3731d0b9bd	Testi	{"endDate": null, "startDate": null}	t	Approved	Uusi idea copy	{"no": [], "yes": ["4ad7fc73-8fbf-4a01-b44a-0de43077e617"]}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:39:01.015+00	[{"name": "Uusi", "color": "#F9F222"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
2c375138-8c11-46d8-a553-900aa0c7455d	2021-05-23 06:39:05.877133+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:39:16.400058+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:39:16.39+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
ce5dd7d0-a03b-49bd-b5d7-354590787dfb	2021-05-23 06:39:08.95715+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:39:18.263602+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:39:18.258+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
dbab561b-ce16-4f4a-aae3-1698a219082b	2021-05-23 06:39:12.873655+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:39:19.590318+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	asdf	{"endDate": null, "startDate": null}	t	Waiting		{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 06:39:19.585+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
68c48bc8-4ad4-48c2-bfb2-04ea7fb9e4e0	2021-04-20 16:56:17.142282+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-16 12:00:11.372116+00	68c48bc8-4ad4-48c2-bfb2-04ea7fb9e4e0		{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 16:56:20.283+00	[{"name": "Päivitystesti", "color": "#F92222"}]	c7f89d65-d25c-4903-8fb9-a6adfed4549d	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
6fd12a0c-3602-4ba8-9d25-f0a0518334cf	2021-05-15 07:17:31.11775+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.456884+00	6fd12a0c-3602-4ba8-9d25-f0a0518334cf	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:17:39.55+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
8b0e0df6-9ebf-4967-902c-fd5649ac1984	2021-05-15 07:28:10.126164+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.571702+00	8b0e0df6-9ebf-4967-902c-fd5649ac1984	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:28:38.54+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
daad5925-0726-415e-aa98-8d247531b6f3	2021-05-15 07:32:42.889018+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.628811+00	daad5925-0726-415e-aa98-8d247531b6f3	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:32:50.614+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
ee1fb0bc-8149-4424-a41e-edbafb30a981	2021-05-16 09:18:59.613871+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.689194+00	ee1fb0bc-8149-4424-a41e-edbafb30a981	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:19:42.791+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
fadb6203-1e81-418b-9118-c6ee0abc0894	2021-05-16 09:32:22.02295+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.740759+00	fadb6203-1e81-418b-9118-c6ee0abc0894	Testi	{"endDate": null, "startDate": null}	t	Waiting	Uusi idea	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:32:26.449+00	[{"name": "Uusi", "color": "#F9F222"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
3724b41a-368b-4bad-8d47-3f46837b94f6	2021-05-23 07:25:13.134698+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 07:25:15.945697+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617		{"endDate": null, "startDate": null}	t	Waiting	asdf	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 07:25:15.942+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
0265708b-8252-4a18-b98e-e28de8e2ca5a	2021-05-15 07:28:41.216433+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.576685+00	0265708b-8252-4a18-b98e-e28de8e2ca5a	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:29:11.757+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
850d1df5-00cb-43c1-b604-8cc24ae250b2	2021-05-15 07:33:16.149762+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.633188+00	850d1df5-00cb-43c1-b604-8cc24ae250b2	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:33:19.251+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
4e7fd1db-da9a-456b-9558-bc259869d6a0	2021-05-16 09:25:11.22261+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.694993+00	4e7fd1db-da9a-456b-9558-bc259869d6a0	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:25:15.679+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
7c695df2-b29a-4140-9da2-0fb3c0f45117	2021-05-23 07:25:51.726719+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 07:25:59.622149+00	7c695df2-b29a-4140-9da2-0fb3c0f45117	Testataan editointia	{"endDate": null, "startDate": null}	t	Waiting	Neljäs kortti kopio	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 07:25:59.619+00	[{"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
371b89b1-839f-4575-bdcb-c449a319c39e	2021-05-15 07:32:36.196765+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.607653+00	371b89b1-839f-4575-bdcb-c449a319c39e	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-15 07:32:46.135+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
fc1725ee-a159-4e72-9b06-7dfb513d2655	2021-05-16 09:25:18.569939+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.700468+00	fc1725ee-a159-4e72-9b06-7dfb513d2655	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:25:24.997+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
8cce9ff6-161e-458a-9c4e-d7ebe6943c47	2021-05-23 07:27:15.247165+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-29 06:35:23.483825+00	8cce9ff6-161e-458a-9c4e-d7ebe6943c47	Testataan editointia	{"endDate": null, "startDate": null}	f	Waiting	Neljäs kortti	{"no": ["4ad7fc73-8fbf-4a01-b44a-0de43077e617"], "yes": []}	\N	\N	[{"name": "Vihreä", "color": "var(--v-lime-base)"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
525f6c26-9ce6-4a40-863e-6223e0f55a60	2021-05-16 09:19:45.619348+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.692064+00	525f6c26-9ce6-4a40-863e-6223e0f55a60	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:19:48.965+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
481d02c7-ce58-4071-ab2e-5212b44f8243	2021-05-16 09:30:11.739824+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 12:00:11.723239+00	481d02c7-ce58-4071-ab2e-5212b44f8243	22\nToinen rivi	{"endDate": null, "startDate": null}	t	Waiting	Testi	{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-16 09:30:37.29+00	[{"name": "Sininen", "color": "#223BF9"}, {"name": "Vihreä", "color": "#45F922"}]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	\N
9c7a9f69-dc2e-46c2-832b-d036ae60400b	2021-05-23 10:05:06.71022+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 10:05:08.901423+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	test	{"endDate": null, "startDate": null}	t	Waiting		{"no": [], "yes": []}	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-23 10:05:08.895+00	[]	4ad7fc73-8fbf-4a01-b44a-0de43077e617	b5d6c500-88ae-41ad-ab39-94b431e17648	
\.


--
-- Data for Name: logins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logins (uuid, "codeUsed", "createdAt", "loginCode") FROM stdin;
d74f16b8-46f6-49ed-a087-4111ce91a5ea	t	2021-05-02 11:37:10.967+00	$2b$12$B/9QWKayxHXuNL5v5zj5fOZkoYUwqd4bSzw5Fh77NlCeJVGZUiCYi
fb023bee-1109-45cc-906c-fae922727c91	t	2021-04-16 10:19:16.205+00	$2b$12$MQzfpjMbOUJvwTwReIxojuWoHLzbw59nEdn.rtJiMnu5UrcwhOR.6
32f5175d-87a2-463b-b7d4-228b7737e31d	f	2021-04-17 17:28:31.921+00	$2b$12$UeRzPcBa7PMCuU9oHcH16eCTxvBhlP5UcWR0asuSuujofMzwPmj3i
c03a40a7-46a0-4d1d-860c-4fb0cb565ac8	f	2021-04-26 17:27:15.152+00	$2b$12$joexgURzs62O22ff7pa45ONtk26DsvC6LaCJlcs4Lv67dXR1i/6XK
05fd4db1-4cd0-460d-b70d-ba2baf1f295c	f	2021-04-26 17:29:10.615+00	$2b$12$yRY9MV5PnnNclofl29R4Mu807J3ZbynWEnpLP9nA2FmThbQW6a.em
33084aa4-ec88-4445-bcf9-177a0b720493	f	2021-04-26 17:33:03.34+00	$2b$12$Rt/o4CTNNg8KxeRBqz4RGe7pEyjjkVc1Y1ZtLmnXsnFCLF2oj2Y4C
e8d33014-75e6-491b-8622-7f5f192b8658	t	2021-04-26 17:33:38.268+00	$2b$12$a01jghD8liAOvpaD2ixA3uyvJXKVW6RhWbD7GJKzPDSr2yO2peR6S
f4866096-7b28-4e44-ab1c-3ed14854dcf2	t	2021-04-26 17:37:18.341+00	$2b$12$luV621XfaHz9U5I3Y00/kOW7cLmWrGO1tW4wW5Z9fPg8McP0QGIVa
941d1fa7-885c-4bc4-b7a8-b02679967da0	t	2021-04-26 17:50:11.642+00	$2b$12$8luhirv.ZLeDXbpRpSfsE.sPfDSFIoO7KqnD5VA7MkXDU9DjuoCxO
09d900ed-0032-40fa-b928-918c30a8ea66	t	2021-04-26 17:51:40.686+00	$2b$12$y84DmS4dNcH5WSj23LQ0mOuAO1vX4FL3JmmhX9fLJZj8gTOGdqZmm
db987f8d-f3bf-4aca-ba76-9b010a791d22	t	2021-04-26 17:52:57.67+00	$2b$12$2c2E3PynLSDTj7HSMPZYc..dzgQ/wntNU4kVa6ZWkbfsqybsSXSaW
09136207-351f-40fd-a1db-4b8d111a0064	t	2021-04-26 18:21:55.828+00	$2b$12$98l1QcBVetoh9a2Rc6RjFen8TXPtA0C212OQ2L7BbObjzkIqSXCk2
b06266d9-7d26-444d-8576-fac7aeae6f66	t	2021-04-26 18:27:08.184+00	$2b$12$7pFJFnd4oyvPjkke5AgHZ.vpWM/HX1QVDN4gBiR9ItJdNI5y8M.Xq
2a285ef1-c2e3-4f1f-a888-caf3a1477cf3	t	2021-04-26 18:28:20.049+00	$2b$12$mlScTVnRUrc5/ZCCuPj55eoWA70YW6/uhhk8eyhd0vNz.ECCl6ABK
04702e18-f34b-4f0f-af70-5e1f49de8560	t	2021-04-29 12:00:56.992+00	$2b$12$JURoGcUH7pUg6.IdUWNFu.wKrrOp3.s1O.0pfTYZx/jgcWheay.6O
d8bb24c2-2fbe-4f28-b1d9-47402c33cea8	f	2021-04-16 08:57:04.975+00	$2b$12$vbFN4nEyBvoHRtkCy2be5.TMbd/eCxC9DK6MI9DkgnbJyB/SgcGD6
9043d0ea-dd1e-4e23-88bf-e20a43696acb	f	2021-04-16 09:37:37.12+00	$2b$12$81Ky.N66tD/vcRdFNC9j5urYc2xB5DZB.ab3bheyTZBY1D5r54N8S
1598279c-f5bb-44ef-bed1-fd524d722bf4	f	2021-04-16 09:38:48.712+00	$2b$12$D90IDN7AcSx9ZCbwRJBXV.tTgwmu6Ui92AA43Kj6MWjvZIauVDvE6
634f9743-29f9-4b1d-a42a-ceb90ed69ac8	f	2021-04-16 09:40:29+00	$2b$12$ca5aItESiCM0l.aqWdJdRegS8tEONeEQHP2cKqcNF.ryEETajRmjS
d9710f6a-edf6-4219-9be9-a13f972bcbb1	f	2021-04-16 09:40:52.556+00	$2b$12$DpO7skubTzUPazzAxKuE4ukJRuUK3bJe9uhGfdMtnPQGh2bkbqdOe
e9c210df-fc57-4e1b-a656-aff9b5a5e958	t	2021-04-29 12:01:55.871+00	$2b$12$A9l/31J5XKsxBfQDlUR.ReTnqJeSzf1/5ImGe4dcOIyJEUJ6GEI8.
6cb058a5-63c5-42b6-a075-61542033135b	t	2021-04-16 09:42:26.376+00	$2b$12$v1zrep7qqRL3RqlxfjQAPe76B35qxRz3fxdFGwRZ/5.3M8ypXzsBm
2010e463-e5d7-48ca-9964-8459562aba39	t	2021-04-29 16:23:58.338+00	$2b$12$O863TSMgtrl5yLukeSVPqeDSnGGBCWIZiF8iWOZMUXohPaG3PIU9O
9cf7a5bb-42f5-433f-9785-d2f1ad9175e2	t	2021-05-02 08:41:10.511+00	$2b$12$iE7zepm1JYSK7HxnPeezseYCQz1Bfn4UQ5R4bprZ1e5kPoNnQn8KO
9053fa79-1773-4354-adde-cb91ad0b588c	t	2021-05-02 08:49:34.81+00	$2b$12$Tv3J0b12aheWFB4CCnUw4OujZe6YWclPrQF2kc7DLJvpAyJPrZFUS
2b4d0d0e-e244-4ea6-9eaa-429eedea7404	t	2021-04-16 10:00:48.758+00	$2b$12$NfA8H65VVwf/6aCY3WXsAu2E12/mEDE5xu2dGUoW/ZcGuMl5mhHUO
31f92dd5-64fa-4475-ba2c-c0955162aea9	t	2021-05-02 08:55:55.196+00	$2b$12$jEiGF/BwbLyxoEimIWVFauI1ogbi5.C0Bcl20lC6OAI547ZVB/4rO
ca20d431-9a11-401b-ae88-9318e4b6e719	t	2021-04-16 10:07:29.845+00	$2b$12$b97amHcW5DDlpPVN9qUziuKmWRiAwK9cNePoQyH7aClSeEYD7T4iy
64918144-42fb-45d4-ad03-e0b5097635fe	t	2021-04-16 10:15:43.27+00	$2b$12$B/ZPSeUsM5leaSLR7RjJv.zugJO7ce2mZh41Jn3v9QrvH8Qcx5lNa
1dd940c9-02bd-428f-b7c5-1e2790338665	t	2021-05-02 09:00:59.17+00	$2b$12$VMz6Dp2Ai2Qp2pgD3Np7fuzx0ZHlY2rUlBtBAtkaNAeZIikY9Vu9O
2873c7a0-f246-4d98-87bc-0192f483ac48	t	2021-05-02 09:03:18.224+00	$2b$12$G3dbgaPWgK7DNG4GbxBjvujcoKXUsD8.1wPd863KDEXUOSlNdYgxC
18002469-0d9a-40f8-936f-8dff82c9bcc5	t	2021-05-02 09:15:32.471+00	$2b$12$M6SkXNDV5fq5HzMy9C.pL.ShasZZyKr1dHByLcDo/Fl2PffG2EEDu
c739dffd-7677-4c60-8991-cdb18639959a	t	2021-05-02 09:20:06.214+00	$2b$12$edV6r/2aN51XTgDdDBm3dumUcwLQdwnQ9xuu0tWHWoGacWnqyfZNi
b29d50b7-36ce-49f6-970d-0bfaa747dac2	t	2021-05-02 10:59:12.454+00	$2b$12$xpz8K.iz0lV5qPV2wOSz0u01PqOJj1k5YXNB9d5earQbn8BTDn2D.
3c525904-8ed9-4efe-9dd3-65d7de3f02e0	t	2021-05-02 11:35:08.256+00	$2b$12$SpQj3NFKyxwCDmC4Ot4PS.MvSqh9MUPRxTlEp1JpUbiVobDuXaEjK
f1efcacf-72ab-4d55-aabd-6db145fb7b2e	t	2021-05-02 11:36:44.919+00	$2b$12$REaMfheFEtkKK4g9JgfdLu1bWPksINp8gMMlsvYJ0SqKL9odoOzZy
cfe11d88-a717-4817-8090-2b0ac0cac2ef	t	2021-05-02 11:39:22.239+00	$2b$12$1ehVlCqPi3HjVKn.EQMEEOUPweCbeTckRrAlzr.r4ULWFn.9aJGQS
e946f92b-3f67-4c19-b933-389ed97bbd34	t	2021-05-02 11:39:59.585+00	$2b$12$UQ.be5jLw7HKbFG6iErdwuELA8hEvh5IHEdg2FNAS77Yl3Mz2uA6u
ee571b01-29ef-4463-84fd-594a036f521b	t	2021-05-02 11:49:52.376+00	$2b$12$GNp7.L3aWRPvZ4EBuLTKZeu7x2oukSHIJbDAN3QHKJri7bvois8vO
cc1d3ed3-d775-456d-9a48-6b7d16b8eecb	f	2021-05-02 17:12:10.701+00	$2b$12$PycwMGGteNB7iL8BpVt2wO20Rbhiif5bz3amYb6OLPtfQs1azJkQO
4262fb71-1795-45d7-9a4d-e06559a2a697	f	2021-05-02 17:13:35.735+00	$2b$12$ZIbGugghBKcE.wKDI0tceeaOnHW.ixkhAKkhQqlo3NTbP8jpRpZ/C
595f79f3-f397-4967-a6d0-31eec1ee2b2e	f	2021-05-02 17:14:34.013+00	$2b$12$tMl1AJsJbhwonXoEd/Dw/ee5nR2.pb6RVD8FyMUH6HsVhaO0p4NrC
62e91ae2-7088-43ef-b0f3-bb466c3dbc22	f	2021-05-02 17:16:49.196+00	$2b$12$V.nMuQumDb8i.nhwqCYbd.TDLfIjQv/do1mfO.Sayobd/oiUOi28q
11bac583-d35a-44bf-bbd3-4bcd06054a1f	t	2021-05-02 17:17:32.499+00	$2b$12$v7NdSiVERq2UhuBrIYmDfeKkfc09ljMkruo1V6rjq1GoOFTOWWrn6
37ef2be4-ff64-4102-86b6-4d106c0125ae	t	2021-05-02 17:18:10.734+00	$2b$12$h.j0nmYRBse/ZHC1SzHLxuB9De4MYPVawRaL8DYqYFdJwHxqkMg4W
11baefe6-ae68-47f2-83c2-3dfba1e74e8a	f	2021-05-02 17:23:50.873+00	$2b$12$.pO5jXHt887Zq.dAbMUvke.2k4h/ASqmNCST4uoqveqUSnjjjovna
336265e3-18e3-4f72-ab40-8224e1947263	f	2021-05-02 18:08:12.005+00	$2b$12$UXH6U29loGn4rzKh7b4nueLX5YGiLuu2r415eaanC.f39Qbx0XBei
4e259d40-e9f0-441b-95a7-cf785555705d	t	2021-05-03 15:53:45.817+00	$2b$12$Cu33yTQHm3emwNv5w1eS1OyTMTFhUWN247GDLkoUKvkBgYBX.VhWW
f46e50ab-56b0-48e7-bf5a-965bf84d5727	t	2021-05-03 18:01:00.352+00	$2b$12$5JI3Z4GDukT74ZoiIzmkA.42NfyMv3nTv4M9L28FyqTBLzrQGmtj6
779564df-6562-4734-a31a-4d02339658c6	f	2021-05-04 14:09:20.967+00	$2b$12$Waxduu7D7v2MiIp07VlU6.hPHXwp/eui0rujFR2YNOv5dTBZDGDS6
4e766ae7-46db-4dfb-9a2a-b04565cf2aaa	t	2021-05-04 14:10:34.047+00	$2b$12$OlDNLHYAZQNB1bNvXtoc/.I.jzte75LeRHwU.DgHk6RBfziw.yCAS
a2355bdb-ce26-4c10-89e7-541133e4a4fb	t	2021-05-04 14:17:33.283+00	$2b$12$zZlzy7FxsoqjxjZtGkSJnupDE4KxoBsrlB0Vmd3ACIdXmaFuCXwiO
329cbd22-8d18-471d-859c-d1ff9376e075	t	2021-05-06 13:41:38.245+00	$2b$12$dMzxn53ld6rGQVnJq96/7.rzo.dwlkCenCCOf6o5aeLASm17Z3TcS
daf31142-e17d-40db-b56c-ab1c1810d1e2	t	2021-05-07 06:07:43.473+00	$2b$12$QzYiRAegwCC3Sw01NsCLveH2OMgFtXI/T2r2BAw7EnzuQj2CFo2VO
cf9dd0bd-0062-46a7-8112-1e2c0bec4da6	t	2021-05-07 06:09:53.859+00	$2b$12$icj8Lx3ejcIzR44.auoU1..Nhdxq6TOSMJMXx2X.GAx7Z8GetIAx2
bf37dde2-3e4a-427a-b657-a6bad71260e1	t	2021-05-07 11:08:27.707+00	$2b$12$qR1/M9OPUw9TBvsERzXHDO9hvnaYfv1YMVC4QMoiBBcTHI7R/1gci
5923cf8a-d734-44b3-a2db-1d30bf348da2	t	2021-05-07 11:09:06.299+00	$2b$12$glFjT1HKBGz/xbLYs.8jCuDD22XL8SWejD8CMLDoK/q0zLkJSBrPi
8115129d-dd61-497a-88af-dd4c01723466	t	2021-05-07 18:33:58.806+00	$2b$12$.MnyaONvX2hxcor2oDkEO.S4fMzBB6o5Ku0I77rYr/Ho8azHy59p.
2c4e9ea1-9a19-450f-8a00-78fb57a70ea2	t	2021-05-07 18:35:06.128+00	$2b$12$/XSN3uaAg2.p5bVRfmOLMeEpmHJBewC5EvMHRFK78niCP8b9MYe6u
db3c054e-722c-4b36-ac59-ce2ff204e584	t	2021-05-07 19:22:58.613+00	$2b$12$Ka.ZWtmo66oCelC/I88Cge4X9W4R5gPFqOvb7brNA1KXbb4p6FI.e
ff97b755-7f68-4d7d-bd75-8f2bb1dbf00c	t	2021-05-08 13:49:36.057+00	$2b$12$QkELm0/kKfqmaTU/ZTfIr.x/1W8XVHnJU/Udxt24wSEd4kj3BLM4K
0f0ba043-fefb-4a46-a9a8-937b0b0447b4	t	2021-05-09 16:27:42.846+00	$2b$12$Td6ZnhDbh3PWToPp/kaGmu11dEmiQZUXj5qRGHmTYdasA2OsneNWK
80c04787-6798-4e89-b195-9b2e3800c78a	t	2021-05-09 16:39:09.637+00	$2b$12$zi3tH25gDdLy6FRvbh2Qj.03/rM6lx3udcCTZjsN/UVmOVET/IMdq
d198c1ab-9cd5-42a4-9f50-ad571f773b9f	t	2021-05-11 15:03:51.043+00	$2b$12$O6KlHYHuneAcJwrJ2tHNh.8aj8xjqlMBIwDCRkmxd9ITZ5AakQC6q
8056bd1f-47ac-4c47-81ea-bd431507fefa	t	2021-05-11 15:05:26.289+00	$2b$12$8APAVlOLW3ppWo9mtDE8ku3COh0IhC3ZBC3fUeML0gKlQG2ggPMje
339370ab-89d4-4ae3-aa42-1abbfca7d45c	t	2021-05-11 15:09:31.859+00	$2b$12$CHd9o2jrhscY9aj.yw1HLemjG.T37ulbp.e7rzZBRVelBdS.6HDRq
3eb47480-a9a0-4953-8f05-b2ccbee37ccd	t	2021-05-13 06:24:28.321+00	$2b$12$fpMXeBa9ghEpba5Jcgx8MOZakAhJYzXSShwqoEBuo9P6WsrHQBnii
c84f3287-48bc-4658-835c-ab8a0cdc696a	f	2021-05-13 06:36:06.513+00	$2b$12$r6pXGlrmHp0x.syJ3T0jIO1TT4tZE7exffFliy9Lsktc.CeJyQm4m
0b6cfeaf-227a-45f8-a11f-3047eeb50293	f	2021-05-13 06:52:13.516+00	$2b$12$btZeDEoDpfjv99cKeGRGg.8yMA2sTdIaIfZtJbHGKA70pdkx1hABO
ba0e2bd8-9be2-4acf-b335-f08f3ec3f32c	t	2021-05-13 06:53:07.533+00	$2b$12$Foh50699zG33QtjxX1eEOeQlPqiMHW9AUS.SGHjeYZAryxgdrp0sS
fcf4dabc-4a59-4ab2-8d65-5c44f7bffc09	f	2021-05-13 06:53:28.716+00	$2b$12$1BujHQBEpdK5IKlc4MQV8usMbhUjDITwEYN4JkWyZC9joXcJxuJzm
a785179b-6723-47e2-8cad-ac82b4bdc8bf	t	2021-05-13 10:22:38.554+00	$2b$12$V8MAaW0eqlDO9yxKCvk0TuczT6WnsbkQz5CNx86BJVATHw9bhQp/S
f77a04c9-09f1-41b6-b186-66cdf9dabdbf	f	2021-05-15 06:15:11.925+00	$2b$12$vugGH0e5sSzK1lsiG6gFweUoKwBPYvScIedtKLdNxkWurqq86IYja
417e138f-0063-4751-9344-c732537f8d1b	f	2021-05-15 06:17:21.719+00	$2b$12$jgYq5Y3IYVQ4VeqgATah2uEYzcG9d714jF5SDI5PCizA8LmZ8V0.a
8c717709-3335-4b08-b948-deae252b4886	t	2021-05-15 06:18:13.037+00	$2b$12$ESRR0wlDONip4fAuVZBQJuVEG4aNWIZS04JdyW2wuuzAXLmK2KSTa
83798c6a-e938-42d2-ba5a-f7c8f59b8d62	t	2021-05-15 06:19:46.417+00	$2b$12$7188ZDopHPDoLVShvvdeVuYL.Q5xjSLN7d4Iup7TBMLz8DhMihxH2
ab8af7fd-455f-49b2-a485-89ff5fe912b5	t	2021-05-21 10:48:16.203+00	$2b$12$Cm2hrGR0WSMxFcjA5UrUBuZWt2mN62cqU9qDzml30aiUw9F/fpAo.
707bd12f-8ec5-4250-8e66-e03fa6eb5db3	t	2021-05-25 17:27:06.746+00	$2b$12$u/n90OTKycFUXOl.P7aDKulabzGAGS.k2ns/TTf5OKdJl/wZAixAe
\.


--
-- Data for Name: meetings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meetings (uuid, created, "createdBy", "lastModified", "lastModifiedBy", id, "creatorName", "creatorPhoneNumber", "creatorEmail", password, status, name, categories) FROM stdin;
b5d6c500-88ae-41ad-ab39-94b431e17648	2021-01-10 09:11:04.338422+00	d1376f70-a8a6-4cb3-b818-0288ef5529c4	2021-05-29 06:38:18.47266+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	vkj-3ta-af2	Jore		j@g.co	$2b$12$5OSGoNUhOQySbL4RO72CgekljQdls880zyWkDE3s85l3Oo5sBpDlO	active	Muokkaustesti	[{"name": "Pitkä nimi testiin", "color": "var(--v-carrot-base)"}, {"name": "Päivitystesti", "color": "var(--v-rose-base)"}, {"name": "Sininen", "color": "var(--v-skyblue-base)"}, {"name": "Uusi", "color": "var(--v-yellow-base)"}, {"name": "Vihreä", "color": "var(--v-lime-base)"}]
087399ef-4f29-4323-a709-e5f7a9478764	2021-04-14 15:14:32.094452+00	7289786a-d6b2-4784-b28b-842ac28fbc0c	2021-04-14 15:14:32.094452+00	7289786a-d6b2-4784-b28b-842ac28fbc0c	t5f-93e-6yr	testiLuoja	\N	testi@luoja.fi	$2b$12$o0q9nhbYgSdEFwQ8ooSjL..KBqzKx0BvLZkjw6pu2c1ylLQ9oWGHW	active	testi	[]
6e7115ba-e35c-41cb-bfe8-8d9fb726b23b	2021-04-17 17:32:48.04536+00	7289786a-d6b2-4784-b28b-842ac28fbc0c	2021-04-17 17:32:48.04536+00	7289786a-d6b2-4784-b28b-842ac28fbc0c	ywe-943-71s	testiLuoja	\N	testi@luoja.fi	$2b$12$xPchkE9tF4MeUBnirqjECeUvA88TyHbUcgofXYtImIA8CMvT4cDy2	active	testi	[]
47e0ec27-9c31-47ff-be3f-fac0365bdfd4	2021-04-20 17:49:35.443915+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 17:49:35.443915+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	eh2-50y-ak2	TestiSelain		j@g.co	$2b$12$wjH8ktgbYBuRuEoVkgcS5us95rlV3SSQEaViq4VgbTmdjhogShYUS	active	Testing	[]
14b63168-1b79-466f-a08a-7b206e99606c	2021-04-20 18:04:54.307626+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 18:04:54.307626+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2a5-0yi-gz0	TestiSelain		j@g.co	$2b$12$kWYnjL/GTzgWqPTLpUNrveNuwnrwZ7UCT.Is/Ux6Fbuvwec1UWtH2	active	asdf	[]
3270a5ff-8a9a-425c-b83c-b8c20ff6a74e	2021-04-20 18:13:46.667839+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 18:13:46.667839+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	iag-e4z-l0z	TestiSelain		j@g.co	$2b$12$oM9x1mSYtdcvvkoq0XTJ5eV5Af6AykEioNevMHfudaAZ0pbRlZsEm	active	asdf	[]
5fc52afb-a188-4f7f-a8e2-5a214371e273	2021-04-20 18:25:49.707703+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 18:46:23.169435+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	3hq-vrn-8u2	TestiSelain		j@g.co	$2b$12$cvZDeZEVs8ksf3h8aDKenuNIQjtl.59QLk9D66dCDYrBEmL4cieMW	active	asdf	[]
b848249a-96de-48fb-8571-dfd7c4768298	2021-04-20 18:50:38.460752+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-20 18:50:38.460752+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	zxj-iak-vte	TestiSelain		j@g.co	$2b$12$omg5zIcCKydNY3don.yzYetbMTInTuL1D9rEKYYyds3zGqyWZKiJG	active	asdf	[]
a2118e4f-d315-4e6d-82c0-4c7a8985533d	2021-05-09 17:06:33.596971+00	2b172706-39b1-4091-a050-feb605951083	2021-05-09 17:06:33.596971+00	2b172706-39b1-4091-a050-feb605951083	qjw-p0j-3vs	Testi jore		j@g.co	$2b$12$5OSGoNUhOQySbL4RO72CgekljQdls880zyWkDE3s85l3Oo5sBpDlO	active	testi	[]
c362d12e-ce21-4f96-a567-99af5fafa94c	2021-05-11 15:02:59.316978+00	40ae5888-bbf2-4650-a6eb-9eb20e31f4fe	2021-05-11 15:03:14.482201+00	0e2bd9cc-83c3-434c-ada6-7b99d6462cd4	gq3-wej-4ju	Testi		testi@g.co	$2b$12$wdC80RZDrQj.9LH7m6oUUOTcOkVk5KIGWXiw0fpzH36ke6h6dNwwm	active	Testi	[{"name": "Testi", "color": "#F9BB22"}]
b7121194-3b38-4b63-ab97-0d86c37f89c4	2021-04-20 17:51:35.599476+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-05-21 17:15:21.196423+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	pej-066-ufk	TestiSelain		j@g.co	$2b$12$6nr8u4L8a8cnoB33Dmho8OOAaSynyQ89WdJEwa6bMO4q.MiCahd/C	active	Tyhjä testi	[{"name": "Testi", "color": "#AC22F9"}]
\.


--
-- Data for Name: meetings_authorized_users_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meetings_authorized_users_users ("meetingsUuid", "usersUuid") FROM stdin;
14b63168-1b79-466f-a08a-7b206e99606c	c7f89d65-d25c-4903-8fb9-a6adfed4549d
3270a5ff-8a9a-425c-b83c-b8c20ff6a74e	c7f89d65-d25c-4903-8fb9-a6adfed4549d
5fc52afb-a188-4f7f-a8e2-5a214371e273	c7f89d65-d25c-4903-8fb9-a6adfed4549d
b848249a-96de-48fb-8571-dfd7c4768298	c7f89d65-d25c-4903-8fb9-a6adfed4549d
b7121194-3b38-4b63-ab97-0d86c37f89c4	4ad7fc73-8fbf-4a01-b44a-0de43077e617
a2118e4f-d315-4e6d-82c0-4c7a8985533d	9a9b7c4b-a51d-4cac-bbc2-fa21d8fc4a01
c362d12e-ce21-4f96-a567-99af5fafa94c	0e2bd9cc-83c3-434c-ada6-7b99d6462cd4
b5d6c500-88ae-41ad-ab39-94b431e17648	4ad7fc73-8fbf-4a01-b44a-0de43077e617
b5d6c500-88ae-41ad-ab39-94b431e17648	d3f44e05-edfa-405b-8ff7-b9411c48f98f
b5d6c500-88ae-41ad-ab39-94b431e17648	c1902e57-8756-4373-bd0b-ff2ef1edf570
b5d6c500-88ae-41ad-ab39-94b431e17648	1dad61e0-f37d-4f21-b483-91eda9c1c052
087399ef-4f29-4323-a709-e5f7a9478764	d3f44e05-edfa-405b-8ff7-b9411c48f98f
087399ef-4f29-4323-a709-e5f7a9478764	fad86f84-3b90-42cb-9ae9-7b92e2155548
47e0ec27-9c31-47ff-be3f-fac0365bdfd4	c7f89d65-d25c-4903-8fb9-a6adfed4549d
\.


--
-- Data for Name: migration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migration (id, "timestamp", name) FROM stdin;
1	1610118775037	oksaMigration1610118775037
2	1610287803909	oksaMigration1610287803909
3	1610907287054	oksaMigration1610907287054
4	1612088139504	oksaMigration1612088139504
6	1618162877272	oksaMigration1618162877272
7	1618249883853	oksaMigration1618249883853
8	1618250041367	oksaMigration1618250041367
9	1618422852028	oksaMigration1618422852028
10	1618423061642	oksaMigration1618423061642
11	1618470699399	oksaMigration1618470699399
12	1618560428010	oksaMigration1618560428010
13	1618560571149	oksaMigration1618560571149
14	1618560748588	oksaMigration1618560748588
15	1618560892953	oksaMigration1618560892953
16	1618567144897	oksaMigration1618567144897
17	1618568939395	oksaMigration1618568939395
18	1618569053115	oksaMigration1618569053115
22	1620414007829	oksaMigration1620414007829
23	1621594699726	oksaMigration1621594699726
\.


--
-- Data for Name: organisations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organisations (uuid, created, "createdBy", "lastModified", "lastModifiedBy", name) FROM stdin;
\.


--
-- Data for Name: organisations_admins_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organisations_admins_profiles ("organisationsUuid", "profilesUuid") FROM stdin;
\.


--
-- Data for Name: organisations_users_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organisations_users_profiles ("organisationsUuid", "profilesUuid") FROM stdin;
\.


--
-- Data for Name: profile_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile_settings (uuid, background) FROM stdin;
f4460152-8faf-46a9-ab89-1d36697d8575	{"end": "var(--v-rose-base)", "start": "var(--v-carrot-base)"}
d8619d37-ca63-4b77-b306-d6f79439df22	{"end": "var(--v-lime-base)", "start": "var(--v-turquoise-base)"}
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (uuid, created, "createdBy", "lastModified", "lastModifiedBy", name, ip, "userUuid", email, "phoneNumber", "settingsUuid", "subscriptionUuid") FROM stdin;
e4052fd0-87a1-4ec8-af1d-7702022115a4	2021-04-16 10:04:13.035205+00	e4052fd0-87a1-4ec8-af1d-7702022115a4	2021-04-16 10:04:13.035205+00	e4052fd0-87a1-4ec8-af1d-7702022115a4	Jore	\N	c7f89d65-d25c-4903-8fb9-a6adfed4549d	\N	\N	\N	\N
4cc42f09-4742-4df5-90c7-dc4a09ca7f44	2021-04-16 10:15:53.007706+00	4cc42f09-4742-4df5-90c7-dc4a09ca7f44	2021-04-16 10:15:53.007706+00	4cc42f09-4742-4df5-90c7-dc4a09ca7f44	default	\N	c041608b-33de-4dbd-8fac-7ea4484ce684	\N	\N	\N	\N
4f8ced45-65fe-45da-ac44-0ea825b3a6f8	2021-04-26 17:34:50.978146+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-09 16:28:19.853088+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	Jore Rautava	\N	4ad7fc73-8fbf-4a01-b44a-0de43077e617	jore@oksa.io	+358 44 2041493	f4460152-8faf-46a9-ab89-1d36697d8575	\N
b6573e4b-33b4-4edb-bc54-b6105f3790fd	2021-05-13 06:24:41.072293+00	67ce563f-0777-46a8-a036-56ab2db7a26e	2021-05-13 06:24:47.970218+00	67ce563f-0777-46a8-a036-56ab2db7a26e	Jore Rautava	\N	67ce563f-0777-46a8-a036-56ab2db7a26e	jorerautava@gmail.com	\N	d8619d37-ca63-4b77-b306-d6f79439df22	\N
81baa8a7-ba64-4ed1-a91f-a6e63b59d69e	2021-05-04 14:10:43.218082+00	9c371f7c-8a18-488a-a21d-dac908f4b785	2021-05-04 14:11:14.688177+00	9c371f7c-8a18-488a-a21d-dac908f4b785	Asko Mikkola	\N	9c371f7c-8a18-488a-a21d-dac908f4b785	asko@oksa.io	\N	\N	\N
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.secrets (name, value) FROM stdin;
accessTokenSecret	dd}A*#2-j*+81{UuuYp!j50_j0<Puc(>
apiKey	3hJn0xzo?MKr7Oo{:AGItnVq#l822Dmo
refreshTokenSecret	bBSJLr064Qg9q59@nzEI>x-T&}*A80ch
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (uuid, subscription) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uuid, created, "createdBy", "lastModified", "lastModifiedBy", "authToken", "refreshToken") FROM stdin;
81f524e4-da16-4363-82b5-7764903394e9	2021-04-10 08:08:14.691423+00	81f524e4-da16-4363-82b5-7764903394e9	2021-04-11 05:39:25.760932+00	81f524e4-da16-4363-82b5-7764903394e9		
2c04aab8-e541-4ace-9aa6-61c51231182c	2021-04-10 14:27:00.891746+00	2c04aab8-e541-4ace-9aa6-61c51231182c	2021-04-10 14:27:06.86614+00	2c04aab8-e541-4ace-9aa6-61c51231182c		
0714bf90-c514-47fb-8efc-f5f9523e7210	2021-03-20 07:00:40.636537+00	0714bf90-c514-47fb-8efc-f5f9523e7210	2021-03-21 18:40:06.660593+00	0714bf90-c514-47fb-8efc-f5f9523e7210		
e8373c97-33f3-44c4-9165-4c2abb1ba743	2021-04-10 14:28:57.302541+00	e8373c97-33f3-44c4-9165-4c2abb1ba743	2021-04-10 18:50:03.714301+00	e8373c97-33f3-44c4-9165-4c2abb1ba743		
5476e6f4-6eb3-4b82-a062-6d2c9e5abd01	2021-03-20 10:52:06.888494+00	5476e6f4-6eb3-4b82-a062-6d2c9e5abd01	2021-04-10 16:20:11.998107+00	5476e6f4-6eb3-4b82-a062-6d2c9e5abd01		
fad86f84-3b90-42cb-9ae9-7b92e2155548	2021-04-15 07:18:57.942498+00	fad86f84-3b90-42cb-9ae9-7b92e2155548	2021-04-15 07:18:57.942498+00	fad86f84-3b90-42cb-9ae9-7b92e2155548	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyJiNWQ2YzUwMC04OGFlLTQxYWQtYWIzOS05NGI0MzFlMTc2NDgiLCIwODczOTllZi00ZjI5LTQzMjMtYTcwOS1lNWY3YTk0Nzg3NjQiXSwidXVpZCI6ImQzZjQ0ZTA1LWVkZmEtNDA1Yi04ZmY3LWI5NDExYzQ4Zjk4ZiIsIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MTg0NzA4MDIsImV4cCI6MTYxODQ3MTcwMn0.e3MV2p_ObSXQiNXqS6_JLbpZs7iGMvDI_6TMrIR5gqo	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyJiNWQ2YzUwMC04OGFlLTQxYWQtYWIzOS05NGI0MzFlMTc2NDgiLCIwODczOTllZi00ZjI5LTQzMjMtYTcwOS1lNWY3YTk0Nzg3NjQiXSwidXVpZCI6ImQzZjQ0ZTA1LWVkZmEtNDA1Yi04ZmY3LWI5NDExYzQ4Zjk4ZiIsIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MTg0NzA4MDIsImV4cCI6MTY1MDAwNjgwMn0.ehKiq4n-p2SwO-_nQyoc9D_tXKGlsRkQICmM9g1Fcb0
46c716ac-7dad-4017-b15e-9b59a64aee21	2021-04-17 07:48:54.552937+00	46c716ac-7dad-4017-b15e-9b59a64aee21	2021-04-17 07:48:54.552937+00	46c716ac-7dad-4017-b15e-9b59a64aee21	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiI2MmEwNGM4Ni01ODYxLTQzYTMtOWQ4OS03MzRiNjk2ODMzMGEiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjE4NjQ1NzM0LCJleHAiOjE2MTg2NDY2MzR9.0whC9jjv-qzDIZhqeQpIzzOasvMpikuHrPvq3NN5Duo	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiI2MmEwNGM4Ni01ODYxLTQzYTMtOWQ4OS03MzRiNjk2ODMzMGEiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjE4NjQ1NzM0LCJleHAiOjE2NTAxODE3MzR9.bf4Q-fxh6IbuuhguT8sFItxKzvzZY-DfXvwNcc6SIYE
26b86eda-a5c0-48c7-9042-f7d87c513628	2021-04-17 18:29:04.056791+00	26b86eda-a5c0-48c7-9042-f7d87c513628	2021-04-17 18:29:04.056791+00	26b86eda-a5c0-48c7-9042-f7d87c513628	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiIxODc4YWE1Mi1iOGY2LTQwMjItYTJlNC00YTU2ZDM3OTQ4NWYiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjE4Njg0MTQ0LCJleHAiOjE2MTg2ODUwNDR9.lShCI1tweCFTbg0RhqfMnzX8mhc7t8nq9qaszVUKusY	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiIxODc4YWE1Mi1iOGY2LTQwMjItYTJlNC00YTU2ZDM3OTQ4NWYiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjE4Njg0MTQ0LCJleHAiOjE2NTAyMjAxNDR9.mpC8yJhFXJJcIVD1PByGHFURvUnV3NQ4BKo-qPjrZJI
d8bb24c2-2fbe-4f28-b1d9-47402c33cea8	2021-04-14 14:03:23.096695+00	d8bb24c2-2fbe-4f28-b1d9-47402c33cea8	2021-04-14 14:03:23.096695+00	d8bb24c2-2fbe-4f28-b1d9-47402c33cea8		
c041608b-33de-4dbd-8fac-7ea4484ce684	2021-04-16 10:15:53.001543+00	c041608b-33de-4dbd-8fac-7ea4484ce684	2021-04-16 10:15:53.001543+00	c041608b-33de-4dbd-8fac-7ea4484ce684	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiJhMTlkMGVhOS1hMWFjLTRkM2QtYjcxNi1kMzM2NDRiMzY2OTUiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjE4NTY4MTUyLCJleHAiOjE2MTg1NjkwNTJ9.Wzi7gwBVTJ7VCb8ex9m3cwoVwjbA7vGXsSfjiSkjtzE	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiJhMTlkMGVhOS1hMWFjLTRkM2QtYjcxNi1kMzM2NDRiMzY2OTUiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjE4NTY4MTUyLCJleHAiOjE2NTAxMDQxNTJ9.FdFpA6kqSLzVR0GqyTO25iEJuHbPfiVCf1WL0PvXE6k
0fe256aa-1341-4caf-8c37-3e214124ce03	2021-04-10 07:32:59.368054+00	0fe256aa-1341-4caf-8c37-3e214124ce03	2021-04-14 14:08:28.459481+00	0fe256aa-1341-4caf-8c37-3e214124ce03		
d3f44e05-edfa-405b-8ff7-b9411c48f98f	2021-03-28 16:41:44.296078+00	d3f44e05-edfa-405b-8ff7-b9411c48f98f	2021-05-21 12:57:01.582745+00	d3f44e05-edfa-405b-8ff7-b9411c48f98f	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZDNmNDRlMDUtZWRmYS00MDViLThmZjctYjk0MTFjNDhmOThmIiwibWVldGluZ3MiOlsiMDg3Mzk5ZWYtNGYyOS00MzIzLWE3MDktZTVmN2E5NDc4NzY0IiwiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjE2MDE4MjEsImV4cCI6MTYyMTYwMjcyMX0.fjnP83zmIQSJtRDPxtx79qDWnf3GtGKjGfiknAu8pbY	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZDNmNDRlMDUtZWRmYS00MDViLThmZjctYjk0MTFjNDhmOThmIiwibWVldGluZ3MiOlsiMDg3Mzk5ZWYtNGYyOS00MzIzLWE3MDktZTVmN2E5NDc4NzY0IiwiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjE2MDE4MjEsImV4cCI6MTY1MzEzNzgyMX0.FqWLCM1xdnL8mv7l28gtA-HDQMgy-iasyByjd5ARA0E
53eb11f3-e497-4b3d-b54d-0e26be6fe384	2021-04-24 08:09:47.67742+00	53eb11f3-e497-4b3d-b54d-0e26be6fe384	2021-04-26 18:21:27.065837+00	53eb11f3-e497-4b3d-b54d-0e26be6fe384	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTNlYjExZjMtZTQ5Ny00YjNkLWI1NGQtMGUyNmJlNmZlMzg0IiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MTk0NjEyODcsImV4cCI6MTYxOTQ2MjE4N30.AN0Rk365ceUXVapDAXFiImlUPQAkeXMFc29rc91Fk1Y	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTNlYjExZjMtZTQ5Ny00YjNkLWI1NGQtMGUyNmJlNmZlMzg0IiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MTk0NjEyODcsImV4cCI6MTY1MDk5NzI4N30.K2xj-iT0BtvLLn20_j4OmxDR-e_BKRjtWZnLHVghGNo
5b378a93-53b4-4aab-8019-4803548e83a9	2021-04-26 18:32:00.699755+00	5b378a93-53b4-4aab-8019-4803548e83a9	2021-04-26 18:32:00.699755+00	5b378a93-53b4-4aab-8019-4803548e83a9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWRlMjUyMmItOGQ5ZC00MzJjLWJjNzUtOGM2OTc2OTJjZDEwIiwibWVldGluZ3MiOltdLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjE5NDYxOTIwLCJleHAiOjE2MTk0NjI4MjB9.OPeyg0vDjiopdOC_ry0g4f5ytJ0FdJls2C1GIIyAlGo	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWRlMjUyMmItOGQ5ZC00MzJjLWJjNzUtOGM2OTc2OTJjZDEwIiwibWVldGluZ3MiOltdLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjE5NDYxOTIwLCJleHAiOjE2NTA5OTc5MjB9.tlac0u6X8mwBFApN4VFL1tDnuuffUFj4Wfk5FGT0a58
4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-04-26 17:34:50.967675+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	2021-05-29 15:14:12.625012+00	4ad7fc73-8fbf-4a01-b44a-0de43077e617	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNGFkN2ZjNzMtOGZiZi00YTAxLWI0NGEtMGRlNDMwNzdlNjE3IiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4IiwiYjcxMjExOTQtM2IzOC00YjYzLWFiOTctMGQ4NmMzN2Y4OWM0Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjIzMDEyNTIsImV4cCI6MTYyMjMwMjE1Mn0.VAonIB6-i8pBmMndwM7szauOfoxIqE3NNq_IlhvKQlo	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNGFkN2ZjNzMtOGZiZi00YTAxLWI0NGEtMGRlNDMwNzdlNjE3IiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4IiwiYjcxMjExOTQtM2IzOC00YjYzLWFiOTctMGQ4NmMzN2Y4OWM0Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjIzMDEyNTIsImV4cCI6MTY1MzgzNzI1Mn0.lhepjFWxUX79Gz85dPlAQm-Dy4npeXFI17Dmq4G7eg4
9a9b7c4b-a51d-4cac-bbc2-fa21d8fc4a01	2021-05-09 17:06:33.292717+00	9a9b7c4b-a51d-4cac-bbc2-fa21d8fc4a01	2021-05-09 17:21:43.290995+00	9a9b7c4b-a51d-4cac-bbc2-fa21d8fc4a01	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOWE5YjdjNGItYTUxZC00Y2FjLWJiYzItZmEyMWQ4ZmM0YTAxIiwibWVldGluZ3MiOlsiYTIxMThlNGYtZDMxNS00ZTZkLTgyYzAtNGM3YTg5ODU1MzNkIl0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjA1ODA5MDMsImV4cCI6MTYyMDU4MTgwM30.s1SNV5o_iKYISoVl6UBUuuH3DaQK1Dy3m5o6QGkBnm4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOWE5YjdjNGItYTUxZC00Y2FjLWJiYzItZmEyMWQ4ZmM0YTAxIiwibWVldGluZ3MiOlsiYTIxMThlNGYtZDMxNS00ZTZkLTgyYzAtNGM3YTg5ODU1MzNkIl0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjA1ODA5MDMsImV4cCI6MTY1MjExNjkwM30.BaduIb5h94hC-GZsX2F1azXjb5P-gN2nT5TsGvgXNe0
c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-10 14:10:50.475853+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	2021-04-29 11:59:11.827204+00	c7f89d65-d25c-4903-8fb9-a6adfed4549d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYzdmODlkNjUtZDI1Yy00OTAzLThmYjktYTZhZGZlZDQ1NDlkIiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4IiwiNDdlMGVjMjctOWMzMS00N2ZmLWJlM2YtZmFjMDM2NWJkZmQ0IiwiYjcxMjExOTQtM2IzOC00YjYzLWFiOTctMGQ4NmMzN2Y4OWM0IiwiMTRiNjMxNjgtMWI3OS00NjZmLWEwOGEtN2IyMDZlOTk2MDZjIiwiMzI3MGE1ZmYtOGE5YS00MjVjLWI4M2MtYjhjMjBmZjZhNzRlIiwiNWZjNTJhZmItYTE4OC00ZjdmLWE4ZTItNWEyMTQzNzFlMjczIiwiYjg0ODI0OWEtOTZkZS00OGZiLTg1NzEtZGZkN2M0NzY4Mjk4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MTk2OTc1NTEsImV4cCI6MTYxOTY5ODQ1MX0.tg5kVTfCWi5Ap8OOp8ADZoNRk-zphpDv6oBoEQkd90I	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYzdmODlkNjUtZDI1Yy00OTAzLThmYjktYTZhZGZlZDQ1NDlkIiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4IiwiNDdlMGVjMjctOWMzMS00N2ZmLWJlM2YtZmFjMDM2NWJkZmQ0IiwiYjcxMjExOTQtM2IzOC00YjYzLWFiOTctMGQ4NmMzN2Y4OWM0IiwiMTRiNjMxNjgtMWI3OS00NjZmLWEwOGEtN2IyMDZlOTk2MDZjIiwiMzI3MGE1ZmYtOGE5YS00MjVjLWI4M2MtYjhjMjBmZjZhNzRlIiwiNWZjNTJhZmItYTE4OC00ZjdmLWE4ZTItNWEyMTQzNzFlMjczIiwiYjg0ODI0OWEtOTZkZS00OGZiLTg1NzEtZGZkN2M0NzY4Mjk4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MTk2OTc1NTEsImV4cCI6MTY1MTIzMzU1MX0.1NkQOkJ-77mTSfXh7na4U1135i5cCc0n9u3d7uKdpRQ
9c371f7c-8a18-488a-a21d-dac908f4b785	2021-05-04 14:10:43.21241+00	9c371f7c-8a18-488a-a21d-dac908f4b785	2021-05-04 14:10:43.242796+00	9c371f7c-8a18-488a-a21d-dac908f4b785	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOWMzNzFmN2MtOGExOC00ODhhLWEyMWQtZGFjOTA4ZjRiNzg1IiwibWVldGluZ3MiOltdLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjIwMTM3NDQzLCJleHAiOjE2MjAxMzgzNDN9.e4wMXaSWG19rWhc6fJca598Kuej9w9eHyZzULmTU65o	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOWMzNzFmN2MtOGExOC00ODhhLWEyMWQtZGFjOTA4ZjRiNzg1IiwibWVldGluZ3MiOltdLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjIwMTM3NDQzLCJleHAiOjE2NTE2NzM0NDN9.88WGSPvPt7XPfUZXvqCJEvP2Gq1v0cXCrPPiWz78-ow
0e2bd9cc-83c3-434c-ada6-7b99d6462cd4	2021-05-11 15:02:59.030077+00	0e2bd9cc-83c3-434c-ada6-7b99d6462cd4	2021-05-11 15:02:59.6236+00	0e2bd9cc-83c3-434c-ada6-7b99d6462cd4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMGUyYmQ5Y2MtODNjMy00MzRjLWFkYTYtN2I5OWQ2NDYyY2Q0IiwibWVldGluZ3MiOlsiYzM2MmQxMmUtY2UyMS00Zjk2LWE1NjctOTlhZjVmYWZhOTRjIl0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjA3NDUzNzksImV4cCI6MTYyMDc0NjI3OX0.ohF1J8NwOXoJkyqfEzxXwP33dv66xa9sWvNlfSd6XEI	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMGUyYmQ5Y2MtODNjMy00MzRjLWFkYTYtN2I5OWQ2NDYyY2Q0IiwibWVldGluZ3MiOlsiYzM2MmQxMmUtY2UyMS00Zjk2LWE1NjctOTlhZjVmYWZhOTRjIl0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjA3NDUzNzksImV4cCI6MTY1MjI4MTM3OX0.rg4WtMWG3GF8JijsPqZ18mHgXjl_g9VTwv2jSIQ-x5o
67ce563f-0777-46a8-a036-56ab2db7a26e	2021-05-13 06:24:41.066982+00	67ce563f-0777-46a8-a036-56ab2db7a26e	2021-05-13 06:51:07.668157+00	67ce563f-0777-46a8-a036-56ab2db7a26e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjdjZTU2M2YtMDc3Ny00NmE4LWEwMzYtNTZhYjJkYjdhMjZlIiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjA4ODg2NjcsImV4cCI6MTYyMDg4OTU2N30.3ijuLzdEilN8-vua4BLDfxaBQIYiHJunnK9OXynUIpo	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjdjZTU2M2YtMDc3Ny00NmE4LWEwMzYtNTZhYjJkYjdhMjZlIiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjA4ODg2NjcsImV4cCI6MTY1MjQyNDY2N30.iFlgUKfqphAl2-Mq4Tf-cf8skl90WC-27J9Z3qeCDDE
8b0b382d-4b1c-44b9-839c-64b0bf39a6c4	2021-05-11 15:08:53.845476+00	8b0b382d-4b1c-44b9-839c-64b0bf39a6c4	2021-05-11 15:08:54.169109+00	8b0b382d-4b1c-44b9-839c-64b0bf39a6c4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOGIwYjM4MmQtNGIxYy00NGI5LTgzOWMtNjRiMGJmMzlhNmM0IiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjA3NDU3MzQsImV4cCI6MTYyMDc0NjYzNH0.MEfcC7ZwxSjyszz8Z0R1ekrvhy8kl-YmyogWyib4Fxg	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOGIwYjM4MmQtNGIxYy00NGI5LTgzOWMtNjRiMGJmMzlhNmM0IiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjA3NDU3MzQsImV4cCI6MTY1MjI4MTczNH0.oV-6Jf8etGTOD7RxkZPbJEE6L4amU9WY0CfbioAN6LU
48fa71f6-92dd-42a9-b96b-eaaa0a871041	2021-05-25 17:27:00.844373+00	48fa71f6-92dd-42a9-b96b-eaaa0a871041	2021-05-25 17:27:00.844373+00	48fa71f6-92dd-42a9-b96b-eaaa0a871041	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiI5ODU5NjVkZi03YjM0LTQxOGItODU0ZC02Nzc0MzY4NTBmZDQiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjIxOTYzNjIwLCJleHAiOjE2MjE5NjQ1MjB9.-e60BfeqHGH6ifKnybkva-Wi4k8KWQLcXVX9FtYv63s	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiI5ODU5NjVkZi03YjM0LTQxOGItODU0ZC02Nzc0MzY4NTBmZDQiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjIxOTYzNjIwLCJleHAiOjE2NTM0OTk2MjB9.YjEaQ18o9m2ddk0eZH4IX6_dZ2SOMTFI5OzenILd4UQ
c1902e57-8756-4373-bd0b-ff2ef1edf570	2021-05-16 12:21:23.036463+00	c1902e57-8756-4373-bd0b-ff2ef1edf570	2021-05-16 12:21:23.394693+00	c1902e57-8756-4373-bd0b-ff2ef1edf570	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYzE5MDJlNTctODc1Ni00MzczLWJkMGItZmYyZWYxZWRmNTcwIiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjExNjc2ODMsImV4cCI6MTYyMTE2ODU4M30.qshPWNLNnfYBN0GGOT6RgKoTSC837fs8nD26ULd7dmI	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYzE5MDJlNTctODc1Ni00MzczLWJkMGItZmYyZWYxZWRmNTcwIiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjExNjc2ODMsImV4cCI6MTY1MjcwMzY4M30.ibmoi3Odjub5ADxcqYnVSA5leWLRmaDbLdqIJA0-VXs
1dad61e0-f37d-4f21-b483-91eda9c1c052	2021-05-16 13:48:52.42934+00	1dad61e0-f37d-4f21-b483-91eda9c1c052	2021-05-16 16:19:05.820416+00	1dad61e0-f37d-4f21-b483-91eda9c1c052	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMWRhZDYxZTAtZjM3ZC00ZjIxLWI0ODMtOTFlZGE5YzFjMDUyIiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjExODE5NDUsImV4cCI6MTYyMTE4Mjg0NX0.JusuAOTLvFR8WodLJsc7pvp66qw0-vT0XupHszaWWFA	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMWRhZDYxZTAtZjM3ZC00ZjIxLWI0ODMtOTFlZGE5YzFjMDUyIiwibWVldGluZ3MiOlsiYjVkNmM1MDAtODhhZS00MWFkLWFiMzktOTRiNDMxZTE3NjQ4Il0sIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MjExODE5NDUsImV4cCI6MTY1MjcxNzk0NX0.JDy4CsJ8gZhgL3cknBg-OlhxIEtRaX-KGJsGlII4eHQ
b463b88a-f5f8-48bf-804f-1bbcfe91d667	2021-05-21 17:19:15.16007+00	b463b88a-f5f8-48bf-804f-1bbcfe91d667	2021-05-21 17:19:15.16007+00	b463b88a-f5f8-48bf-804f-1bbcfe91d667	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiI1ZDcwYjVmNC1hZjA4LTRjOTUtYmQ0NC0xZmMxOTg4ZTk0MGQiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjIxNjE3NTU1LCJleHAiOjE2MjE2MTg0NTV9.uPA3f3WinTMfaqqvbWUFoyXlH6UFOl_aLh-5SroYOvs	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6W10sInV1aWQiOiI1ZDcwYjVmNC1hZjA4LTRjOTUtYmQ0NC0xZmMxOTg4ZTk0MGQiLCJvcmdhbmlzYXRpb25zIjpbXSwiaWF0IjoxNjIxNjE3NTU1LCJleHAiOjE2NTMxNTM1NTV9.c0LGxBLTiPBT6Q95UVbk-_gW3jKvHrmMGnH10ulE1V8
\.


--
-- Name: migration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migration_id_seq', 23, true);


--
-- Name: secrets PK_0a802e5451589b0a8a816669655; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.secrets
    ADD CONSTRAINT "PK_0a802e5451589b0a8a816669655" PRIMARY KEY (name);


--
-- Name: profiles PK_2c0c7196c89bdcc9b04f29f3fe6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "PK_2c0c7196c89bdcc9b04f29f3fe6" PRIMARY KEY (uuid);


--
-- Name: migration PK_3043fc6b8af7c99b8b98830094f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migration
    ADD CONSTRAINT "PK_3043fc6b8af7c99b8b98830094f" PRIMARY KEY (id);


--
-- Name: logins PK_3fa6dfd9c880cf06ab19816fd0d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logins
    ADD CONSTRAINT "PK_3fa6dfd9c880cf06ab19816fd0d" PRIMARY KEY (uuid);


--
-- Name: meetings PK_4cd89775d1ca34ae4110fc24fc9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings
    ADD CONSTRAINT "PK_4cd89775d1ca34ae4110fc24fc9" PRIMARY KEY (uuid);


--
-- Name: organisations_admins_profiles PK_8f37dbb178cd5cc4c3eeb802f31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_admins_profiles
    ADD CONSTRAINT "PK_8f37dbb178cd5cc4c3eeb802f31" PRIMARY KEY ("organisationsUuid", "profilesUuid");


--
-- Name: users PK_951b8f1dfc94ac1d0301a14b7e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY (uuid);


--
-- Name: cards PK_cb3789f0e79e124e5753da0010a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT "PK_cb3789f0e79e124e5753da0010a" PRIMARY KEY (uuid);


--
-- Name: organisations_users_profiles PK_d4e9d4fb9ef462bd933c5338dfb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_users_profiles
    ADD CONSTRAINT "PK_d4e9d4fb9ef462bd933c5338dfb" PRIMARY KEY ("organisationsUuid", "profilesUuid");


--
-- Name: organisations PK_e28710839e3183f52669df498a5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations
    ADD CONSTRAINT "PK_e28710839e3183f52669df498a5" PRIMARY KEY (uuid);


--
-- Name: subscriptions PK_eb660c4a66c2c5d344553401002; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT "PK_eb660c4a66c2c5d344553401002" PRIMARY KEY (uuid);


--
-- Name: meetings_authorized_users_users PK_f82e2910e1dfab35529abc12e15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings_authorized_users_users
    ADD CONSTRAINT "PK_f82e2910e1dfab35529abc12e15" PRIMARY KEY ("meetingsUuid", "usersUuid");


--
-- Name: profile_settings PK_fe78c6b520fb1a223178d02462a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_settings
    ADD CONSTRAINT "PK_fe78c6b520fb1a223178d02462a" PRIMARY KEY (uuid);


--
-- Name: profiles REL_ad26f60abdd1f712200831d35f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "REL_ad26f60abdd1f712200831d35f" UNIQUE ("userUuid");


--
-- Name: profiles UQ_2f268e08557333f263d53ea00cd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "UQ_2f268e08557333f263d53ea00cd" UNIQUE ("settingsUuid");


--
-- Name: profiles UQ_5b49bd22c967ce2829ca8f17720; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "UQ_5b49bd22c967ce2829ca8f17720" UNIQUE (email);


--
-- Name: profiles UQ_8197446e07563b8f4c34f69881f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "UQ_8197446e07563b8f4c34f69881f" UNIQUE ("phoneNumber");


--
-- Name: meetings UQ_aa73be861afa77eb4ed31f3ed57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings
    ADD CONSTRAINT "UQ_aa73be861afa77eb4ed31f3ed57" UNIQUE (id);


--
-- Name: IDX_27a9a054491732acc0cc3ed38a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_27a9a054491732acc0cc3ed38a" ON public.meetings_authorized_users_users USING btree ("usersUuid");


--
-- Name: IDX_2a0c030e77a63054608cef60ef; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_2a0c030e77a63054608cef60ef" ON public.organisations_users_profiles USING btree ("profilesUuid");


--
-- Name: IDX_486f56b0164bb7db47bca1015f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_486f56b0164bb7db47bca1015f" ON public.meetings_authorized_users_users USING btree ("meetingsUuid");


--
-- Name: IDX_806da3a699248dec86bd083167; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_806da3a699248dec86bd083167" ON public.cards USING btree ("meetingUuid");


--
-- Name: IDX_986334cc957a25de07392a219e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_986334cc957a25de07392a219e" ON public.organisations_admins_profiles USING btree ("profilesUuid");


--
-- Name: IDX_e935310791f2d1e4091209b7b3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e935310791f2d1e4091209b7b3" ON public.organisations_users_profiles USING btree ("organisationsUuid");


--
-- Name: IDX_f24366216dd88e7a05df85cf34; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_f24366216dd88e7a05df85cf34" ON public.organisations_admins_profiles USING btree ("organisationsUuid");


--
-- Name: meetings_authorized_users_users FK_27a9a054491732acc0cc3ed38a4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings_authorized_users_users
    ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES public.users(uuid) ON DELETE CASCADE;


--
-- Name: organisations_users_profiles FK_2a0c030e77a63054608cef60ef4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_users_profiles
    ADD CONSTRAINT "FK_2a0c030e77a63054608cef60ef4" FOREIGN KEY ("profilesUuid") REFERENCES public.profiles(uuid) ON DELETE CASCADE;


--
-- Name: profiles FK_2f268e08557333f263d53ea00cd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "FK_2f268e08557333f263d53ea00cd" FOREIGN KEY ("settingsUuid") REFERENCES public.profile_settings(uuid);


--
-- Name: meetings_authorized_users_users FK_486f56b0164bb7db47bca1015f8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings_authorized_users_users
    ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES public.meetings(uuid) ON DELETE CASCADE;


--
-- Name: cards FK_806da3a699248dec86bd083167c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES public.meetings(uuid);


--
-- Name: profiles FK_821473c2821d2f24a8e648d1277; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "FK_821473c2821d2f24a8e648d1277" FOREIGN KEY ("subscriptionUuid") REFERENCES public.subscriptions(uuid);


--
-- Name: organisations_admins_profiles FK_986334cc957a25de07392a219ea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_admins_profiles
    ADD CONSTRAINT "FK_986334cc957a25de07392a219ea" FOREIGN KEY ("profilesUuid") REFERENCES public.profiles(uuid) ON DELETE CASCADE;


--
-- Name: profiles FK_ad26f60abdd1f712200831d35f2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid);


--
-- Name: cards FK_cbb0c0798d4606401fe5ccb0746; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES public.users(uuid);


--
-- Name: organisations_users_profiles FK_e935310791f2d1e4091209b7b3b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_users_profiles
    ADD CONSTRAINT "FK_e935310791f2d1e4091209b7b3b" FOREIGN KEY ("organisationsUuid") REFERENCES public.organisations(uuid) ON DELETE CASCADE;


--
-- Name: organisations_admins_profiles FK_f24366216dd88e7a05df85cf346; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations_admins_profiles
    ADD CONSTRAINT "FK_f24366216dd88e7a05df85cf346" FOREIGN KEY ("organisationsUuid") REFERENCES public.organisations(uuid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

