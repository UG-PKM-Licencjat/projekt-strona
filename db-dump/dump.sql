--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg110+1)

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
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: default
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO "default";

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: default
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "default";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: default
--

COMMENT ON SCHEMA public IS '';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: default
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO "default";

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: default
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO "default";

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: default
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: account; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.account (
    "userId" text NOT NULL,
    type character varying(255) NOT NULL,
    provider character varying(255) NOT NULL,
    "providerAccountId" character varying(255) NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type character varying(255),
    scope character varying(255),
    id_token text,
    session_state character varying(255),
    admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.account OWNER TO "default";

--
-- Name: offer; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.offer (
    id character varying(255) NOT NULL,
    ratings integer,
    votes integer,
    "userId" character varying(255) NOT NULL,
    name character varying(255) NOT NULL COLLATE pg_catalog."pl-PL-x-icu",
    price double precision NOT NULL,
    "shortDescription" character varying(255) NOT NULL COLLATE pg_catalog."pl-PL-x-icu",
    "longDescription" text NOT NULL,
    "locationName" character varying(255) NOT NULL,
    location jsonb NOT NULL,
    distance integer DEFAULT 0 NOT NULL,
    files jsonb,
    "createdAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.offer OWNER TO "default";

--
-- Name: offerTag; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."offerTag" (
    "offerId" character varying(255) NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE public."offerTag" OWNER TO "default";

--
-- Name: review; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.review (
    id integer NOT NULL,
    "userId" character varying(255) NOT NULL,
    "offerId" character varying(255) NOT NULL,
    rating integer NOT NULL,
    comment text
);


ALTER TABLE public.review OWNER TO "default";

--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

ALTER TABLE public.review ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.session (
    "sessionToken" character varying(255) NOT NULL,
    "userId" character varying(255) NOT NULL,
    expires timestamp without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO "default";

--
-- Name: tag; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.tag OWNER TO "default";

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

ALTER TABLE public.tag ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."user" (
    id character varying(255) NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL COLLATE pg_catalog."pl-PL-x-icu",
    "firstName" character varying(255) DEFAULT ''::character varying NOT NULL,
    "lastName" character varying(255) DEFAULT ''::character varying NOT NULL,
    email character varying(255) NOT NULL,
    "emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    image character varying(255),
    "isPremium" boolean DEFAULT false NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    registered boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO "default";

--
-- Name: verificationToken; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."verificationToken" (
    identifier character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    expires timestamp without time zone NOT NULL
);


ALTER TABLE public."verificationToken" OWNER TO "default";

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: default
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: default
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	1d21ede501a9e7914b9becbd3edd5d79ea0bd9af4612c47b1c47fc794fe4dc02	1719411822792
2	23bc73a227a85ee6254366d151c992e3fa5efc75527c0295b9211c9e9ea93ca1	1720348150071
3	213b8c9a382d68e1e9714e93608aeccfbfe1f6bb002eaa1c5f8525517cfb5bf5	1720957594180
4	06129341294e702d3324a4b1719bdfd0e1f016b155e3d7f93110e2bfb1c5a1bc	1720970835448
5	06129341294e702d3324a4b1719bdfd0e1f016b155e3d7f93110e2bfb1c5a1bc	1720972132059
6	3a022eb0f6bf65d94770ccca28b2bc94f6848ad5854dc4a7f3d1335292b98ec2	1720972139715
7	7b03f29a6fb317f70bf4228185a70c0b5d350b94a68e07d01b7f16d40881a124	1720986657668
8	bcbecfc0d91b672c5172451172fe46679dbddbe171e468358d1796ca135521f4	1720986855382
9	cfa4a85488605b8e23d8a45513ee34d69479016c521938e2366fef199f69bb7a	1720986868325
10	753be3e3e3bc510e7852070486b5c9f4abbe8c533ecd7b0cb4703f6fdd2370ed	1720986922161
11	7f9e53c1fb78c2ffc41eec42e2b7af7b0b20ca1150706ac521376e4edf82b311	1720986931923
12	c7f61bf367c2bdc8f02d590c09caf4c985589c9967c2a2fe8733192d5090514e	1726087157521
13	3764145391158c08353a0af568f73ba5486ab682b8cb77ae6e40858f209b1ffb	1726228205481
14	2cf90197c8e87f8dd08fea07268a4474c33f2dab57b649fb4e9e519044038658	1726241913131
15	408981e9d78e42f2c528ed279bfeb282eee3f19c6ce0310c69267da7fef7c8ff	1726242018957
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.account ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, admin) FROM stdin;
0f1f1e28-aa43-44ae-a664-b8064599e4dd	oauth	google	109648856368709248108	1//09cK0FGvnjX9RCgYIARAAGAkSNwF-L9IrmGQxAkaicEGQZp7mQsk8f2pyVibZ4b4PWiQ81szMXWBxmW_ou70-VhPYhr_0Vk25Un0	ya29.a0AcM612yq5UQkegVfcPOiBURqibA3oIdmbdmv0JZP4f8Cgl-xyP9SnJAirvjcLv7oVqe3ThzTKfSbFCAkV2uEW7K24VLakV05I-T9lFXNd1eS5yk0CGwQXRwIV9GhEGvD0tC0tSBE2tmcH1wwq6OAApNymVqPAQacM6VL98IgaCgYKAeUSARASFQHGX2MiDHJ2LlkpfwaVSQNaY_8fJA0175	1727089336	Bearer	openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile	eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyNjIwZDVlN2YxMzJiNTJhZmU4ODc1Y2RmMzc3NmMwNjQyNDlkMDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk2NDg4NTYzNjg3MDkyNDgxMDgiLCJlbWFpbCI6InN0dWRuaWFyZWtrYXJvbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlhYLXQyYWZFekh5alhOZ3pydnhCSGciLCJuYW1lIjoiS2Fyb2wgU3R1ZG5pYXJlayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJR0tzWnhjMjRfYmpvUHdUa0pYUWUtRzYxTlAzeXdsRXN1NnNIT1ZaekZLMVo5QWc9czk2LWMiLCJnaXZlbl9uYW1lIjoiS2Fyb2wiLCJmYW1pbHlfbmFtZSI6IlN0dWRuaWFyZWsiLCJpYXQiOjE3MjcwODU3MzcsImV4cCI6MTcyNzA4OTMzN30.GeMipN4INjc_ImAdUxwZTrAJHTdiyp2frmOd5YNDa8rd9gTfCAKRpHymitLXnIT8dxd7vs50ETZx7LEoUe1c_ThQKupYTGRcgoagLNGAXK7RTalR8YZQvmOaX7FuUR65X1tKUD2smb65WtxVSWP-1-kd_Wp6FJ7MTD7Oiju_QwfdZU7bUiSdG6GoBK8IKPLnNKSUn5V3EaL-uMKHI3jeT6OVaO1HEd2ZLd5wQv9UeKYIkmLT4R925up-ZMHCwWc3UW9VoEuVzwGGMvJTE_X0zPUPZ3ZsB8WTceL_eTXRS_71iqXqrki58PECtd2adC_V62eeWdMbHbtAkyGOS_2B6A	\N	f
108f5663-ddc9-4721-92bb-1348d64227f5	oauth	google	106647656240896340736	1//09-hPF23Jb5u0CgYIARAAGAkSNwF-L9IrtmGrYgpaENGJ7qih0Y4ZLWeYXB5cuDzAAjNgfs4KVQimg7m3y6GEWjtd8JlqCrGMY2A	ya29.a0AcM612w0qAPtn9rfOD19OCIPzvzRhrjyu_IK0WiUX00c-FA9HaB6wZEN_vXc4Ff8ukTduZSuTdWL0S1ByVatgqdKBTCYp-TZNxQ6Y5Jxnr3CPxsrOh_91L_fUBL_nltbOGwxp3bm6a4iHcGwy_2WgJGZq3mSKecHWJWvxOzUTQaCgYKAQMSARMSFQHGX2MiPvcihBYJIXpvhrckIA5t2Q0177	1727111077	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyNjIwZDVlN2YxMzJiNTJhZmU4ODc1Y2RmMzc3NmMwNjQyNDlkMDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY2NDc2NTYyNDA4OTYzNDA3MzYiLCJlbWFpbCI6Im1hZ2RhYWExMjNhMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiQWg4WjkwTlhzMzBteGRiLS1OQThrZyIsImlhdCI6MTcyNzEwNzQ3OCwiZXhwIjoxNzI3MTExMDc4fQ.MHXZZsMd1gJFc6X0in7ZALYbEDWgRk__F1iCpaD80bAT70isQMlSTI8Ye23MnPmev8TdAEX25nSYqXIDUrm26iUjwSvy6dR5jX9dR-JKkjREu3cDKG15NFyfOHDbmi5vQRHQSO1Q0iSbaimkmtD5JXix2UOMA7ZQrrIinXjAkQuE3mq5l0OujKIB5n9tDMmMdQld5cvdPPYDEPOb6-IDdneizh2zTY5e1fgzPyl5CmrP_c4nZUxJ6yychntczoQpHnPmTBmW2xLq3mEgDGx6l7OazOhxVspbGzm_G08jRstoEgfOG09s6p2ilGmdBwuOIUB6Y8lgoQOG0NmB9CzwRg	\N	f
e5e52e40-e7f6-4ffb-9921-f3f2bf1c4714	oauth	google	104779807956431865126	1//09HQ85e3gffoNCgYIARAAGAkSNwF-L9Ir7qumupbzt13dtm0aTbLXYVbe_y5URx8tx-hHSAGpJoz7fq8EhqsdwdV-GUKLfWzHAG0	ya29.a0AcM612zmMlgW8Xxvh0Lq552U3LPMzUMjNKYtTtR8kFU5FodWb8pScRm_G5-KRgwqNm5jyozn5ibdc67RUMh4_GfrT4bJA1Xoo0-FhTtwHUU20JqsdzRmmFzpZq6zG1Bk77tKPHO4G1IUsluiOuLLx-_DQHTAhZlANItiNCkkjAaCgYKAVcSARASFQHGX2Mi9UOk_FTgF2vtBOp3PlGrPQ0177	1727097724	Bearer	openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile	eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyNjIwZDVlN2YxMzJiNTJhZmU4ODc1Y2RmMzc3NmMwNjQyNDlkMDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ3Nzk4MDc5NTY0MzE4NjUxMjYiLCJlbWFpbCI6InBpb3RyLnNlbGFrLml0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSkRxRWF1LTN1Zy1JbDlkdXN2M09mZyIsIm5hbWUiOiJQaW90ciBTZWxhayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLQTJ0REZYWjhvQjYzbG5uTHBKMDdBdEh1QjVaRzBHVDZ2c3ZmRjlweWFuakl2eUE9czk2LWMiLCJnaXZlbl9uYW1lIjoiUGlvdHIiLCJmYW1pbHlfbmFtZSI6IlNlbGFrIiwiaWF0IjoxNzI3MDk0MTI1LCJleHAiOjE3MjcwOTc3MjV9.NJt-7Z2sjBCAelJn7A7OsNzfDvVRPj4Z0mtwOqQFQkKd_6gvhD6OQZveCbWMUoSbwq46fgkEqL0aKR8BJzy36KNBtuglxQYIkx28gcyfUBemHBL543QK5j0How_5CuinMGbQQkT6eDHvuUSNtI8Z3dY7XDSLYo2IxkG78dTIp0or2e468y7N2PDrqlW6PEAQKT_bM6Mib3dWKLr5t9-UFqyHwj4cyjy_6aK7oXvsf7XrGfrBB5gkany3rgXNn9AZD4QFB9Jjzsv_rcGnitVDJolVPDUTX4oH2caQthhLABYDIhNzI5VJRKrxNx0dBpxGoNGEOnhDCuyeVDzpJ32Asg	\N	f
ca21955f-95c4-4297-8220-99f4db43240b	oauth	google	116727268085609205038	1//09LQPHWkzNqx1CgYIARAAGAkSNwF-L9IrY7ul_Wg9gNMkWlZFMRBTeMVuMIzQ9j5v9xGbf7IQ1IW7jPUQmEv9p3sKVk4Zfv2iLjc	ya29.a0AcM612xiRhYw2KpJN0ui9Qeqp9uTiy4ySzwjTC-dTaouem-FTo_SNDIlZ55sTUSPz_PeLA3_p-QyFJL3c8HtNmveffoj5TksMZPwDzQqSnyTomhG4Do4e4Y8ZdIrjkH52R8niUbbPnGJqgkX1G9BOyXkkPriVRQEvtVadQyOPgaCgYKATMSARISFQHGX2MibDkqV67mpZG_9VV_9nhYJQ0177	1727282102	Bearer	openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY3MjcyNjgwODU2MDkyMDUwMzgiLCJlbWFpbCI6Imx1a2Fzei5rdXN6bmVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidm1MUFdDamJDSFpDd051cjBQMC1YQSIsImlhdCI6MTcyNzI3ODUwMywiZXhwIjoxNzI3MjgyMTAzfQ.WrC4j4iHTpWZajUZcYl7x-ze8WmA_W9eh9x4v5WCUw75Br3y7hmIeAywoksOfK4D95R1-wWsBJTwV6d-Y4d73tVnw0wPVKP8EthT8_oqq10jLfG_AsJbTowWHowR_RWXxzvKBuK0oNJ2U0cx7K9tx-3a9_UjGmJSJwZms-GGDP2cSKd1KK3-kYdyMfyr2q4nmfCdwdffcHc--ta7Mya_LgZQEwYSlMOfsQCP4qgcNtdwye-j-TBsEcOAsgzT7UxxDsVUPAtyI4xte-Q55SWzN4RnD_ZKnlQjSUzFO9cF1-5G5HIZGRKyzl72w7zaPCBizUD9nb9bWSHKxXrtxWaEaw	\N	f
be697184-e4de-4695-b774-9f0f16ec56f6	oauth	google	111703403394763741838	1//09gKjLIUfmdkQCgYIARAAGAkSNwF-L9IrnQxLZQmNfgjhxtJgTRqrhuC_si0LLAcEaW6h-tFdp-naiFMFOe2ajJOa7lxfQ-gfB7Q	ya29.a0AcM612y72zk_b3hljjdSxsurtlktYnqPGT6AnmQBakdJ8wkVvg_1xU1K-BuQs7YeV3OL_7sJSd3JEL4xppz9GkeAMsLF80BAspZi5PnejB641p6vInm-11IxbwfcP2LJS2PYVeNCoumcD2mCOKo9Ek1UoiMeZ9rRgYCovwSkaCgYKAWISARASFQHGX2Mim5b9lBaEiLcwHmllC2yDvg0175	1727098156	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyNjIwZDVlN2YxMzJiNTJhZmU4ODc1Y2RmMzc3NmMwNjQyNDlkMDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE3MDM0MDMzOTQ3NjM3NDE4MzgiLCJlbWFpbCI6InBpb3RyLnNlbGFrMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWWd2YXRmMW43NW0zSFJrSkJTWFJhdyIsIm5hbWUiOiJQaW90ciBTZWxhayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLTlNWZmw0X3NRbkFiSUNGeW5UVEsxclBZRmF1UjJQOWFLOWNieHltVXVDS0dQcEE9czk2LWMiLCJnaXZlbl9uYW1lIjoiUGlvdHIiLCJmYW1pbHlfbmFtZSI6IlNlbGFrIiwiaWF0IjoxNzI3MDk0NTU3LCJleHAiOjE3MjcwOTgxNTd9.lL16l61KoDHz75NgNc7ZJTIsiBm_1_Kd70a4twB4HFwJEIbISvyUJQZriC97n5pDkvzx01HeXid6ANDwv3xSN_W-lOFidQlFiHCchrbycA7-lGF-ydkDd6X6-hpGpU07QrSfrb7xiU-TUz7rlz69hz4MaRQBDMFQ3bbp5zB75pBcCZgm4Wfmvsg_N4eX_aJh8nVEyAViU2N1BG7xvBB7Fh4yugmJWLsR3lcWbrhlZS21TkSg8DTik-MSRPELpwp2Y4KWPn7T6apmWLrjviySNl0Mwy4e52-CJlwJ7SQwZ4DVscL1W4MJ9i7bnmJ2fL7MuJj8dSwJ-9hJCV0_T2X0sA	\N	f
e7064f15-be63-4935-8a18-16dcbdf57e9f	oauth	google	100974901845991576635	1//09HGCrNJjCP9_CgYIARAAGAkSNwF-L9Ir4noGWCe-s-zT3007DoKZsiddcgBwmmE7mbu-nGP7o_9tt7wSEOI3nRXkIaM3FrIFGvc	ya29.a0AcM612ww-0XfTRxgtoTEf8wHH1ZwPB-LPtuGBhDw-mWvYFzpn58U1GS9mp5ME_rxkuXBE4GBDf4OaAs_M3PjqXBSofGHG2Qxh_jp9wLzTibIf1PF78k0n-hW90Otvu3OajL90tbWZpQYanGBwdAKfFyA_Yuri0Lli0qIQ54g-waCgYKAT4SARASFQHGX2Mi8M6XYBkRNDwKDr8LZWB7Zg0177	1727111090	Bearer	openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile	eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyNjIwZDVlN2YxMzJiNTJhZmU4ODc1Y2RmMzc3NmMwNjQyNDlkMDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5NzQ5MDE4NDU5OTE1NzY2MzUiLCJlbWFpbCI6Im5pdGthNTUwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiM01fZTN6Y2huTDZCd3JQRGtzQTFlQSIsIm5hbWUiOiJNYWdkYSBNIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pQUGpwa0JsMWhwUGNkcVlQZFRNR3BwbVp3RFcxQk1XZWNYeGR5S3Y2OGZ6alFOaGJoPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1hZ2RhIiwiZmFtaWx5X25hbWUiOiJNIiwiaWF0IjoxNzI3MTA3NDkxLCJleHAiOjE3MjcxMTEwOTF9.ESUvJji4_RkA0E7_d9kFV-ERIkJikUQqUWrSHyriVebSihzZDcrxZ1XA-EdSRQ46ssnMwHt61Ptsqy-tCKvmE8z1cdzv5BcDpDkrpPG3qJ_Rn5Sp0nS7S3nFBqMAP7R_hWyeNrmCJzbKdsr2qpwCtllUPDK03FkaRQJw73wfGJys-MN0fXk_8TcxleAyu_rtkrZ2HHDuZgi9F7GbPoKyZFVp8Vx6gve_cwmLeUxvdVZ9RNIIE03oZieJpxbeg5Rk9vmaT9FYvthlYaREsRX0Mhp2XCsVcbgo9F0xytZcZ8shWAKZ4zxPWGyo4ntvyaaTZLbwJkZ7RNKVEkb9xDcFtg	\N	f
87928946-e2f7-40a5-a6c4-f772aa3aa363	oauth	google	101622068850115462999	1//09aG9TD8jzCUjCgYIARAAGAkSNwF-L9IrrjjD01_F2SqajgIs-9CKBKJaubgYcvtVrbuaxq0mrxizdb1sS7nm4v4wJ5Z6-xtT6Ak	ya29.a0AcM612zy1Wp2LGjpIhsQymRVYRYPX2fb1MC3GBUj5REZ4pcF7B_QziBK7oQM1Sp3LaZQ78jWqJNqALG8AYBcopdceDKRdQS9-gAVpQTGMYZSBdnvHhylrxPVOVzNo9FhsN9vggBxESFmLT7S4yKsUkSGTl1ahACZXqEKNVddpQaCgYKAcYSARISFQHGX2Mif_VDbFiuIJ400Cfw4hhqTw0177	1727212514	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE2MjIwNjg4NTAxMTU0NjI5OTkiLCJlbWFpbCI6ImRvbWluanVuaW9yMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWmZGMmM2ei1WQVhWQ2luSVU3aGVOQSIsIm5hbWUiOiJEb21pcyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJLWl3ZkxEWGlKZGNqdVZHVlJrZlBXbWk3bnJ0ZnROX0UybU9INDdWcXBlT1ViMF82Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJEb21pcyIsImlhdCI6MTcyNzIwODkxNSwiZXhwIjoxNzI3MjEyNTE1fQ.KAasWO_Lgm243npuL6MRKCdy4Lk7PLx-fpVGN6u9DqanZD_E5ZAGA1gK8B3sd2BzUjOd3KhYFwo9zedsNiE-sOdI752MTnIGIUX34hfTjxk1HdCx-gyEet8vGzcNioqFR0Dvvck6vcCwK4f5e6PjvJzFQMbkxClR1AQgeLRzKvHNEXYjv9VoCukFjEDc9VX5i7YnKRgJu1FCAjCSF9H2iXsn7P7gNxO3gMr0cA9_G40IL2yUHtYjnKgTti7uDaUI77_SZpcWOhd5Vkqje81bC-utuZWJEsxRdMyybJ_1OVNngtBOGj7KH2WLgOKjEiU_e76PGvVOD7B4hYC674Wlmw	\N	f
adf1b7d8-3aba-470b-a8e7-7e276e635a00	oauth	google	112806327008037590710	1//09ON8mVIj-crxCgYIARAAGAkSNwF-L9IrYnktHMjhJPa0h8AaVAWakTfjX02syxGgIkWPxGFoxTtwF6-OAnBDd85lJOrwXmayotk	ya29.a0AcM612xnsqY_pBTvXQv5v3N91jfiEnC0K_oNVZlpTwdVfgTcMewU5bbQZ9R9vPYMiPMsry_Vy46VQwRfCDlENKb9wkNe8GqjlEE-oV-5MlytkjPEeLMMRcfDGu9aorfwNocHVIcNcXu30QNxaP9Y28Xrid-3w0H_AU3Tdu5SaCgYKAUsSARMSFQHGX2MiR0JNnb22t1mQLHJhiXXr5g0175	1727193449	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI4MDYzMjcwMDgwMzc1OTA3MTAiLCJlbWFpbCI6Im1hY2llai5zbGFka2lld2ljei5pdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlBPN3lpWS1nVFFYVS05RUw2bHJrYmciLCJuYW1lIjoiTWFjaWVqIFPFgmFka2lld2ljeiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJLXR6cUtNSzdjVlBOLTBkaXc2MlVGRmNnMUx2b2oyNnd3b21EOGJFNzRnRHVxeVE9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFjaWVqIiwiZmFtaWx5X25hbWUiOiJTxYJhZGtpZXdpY3oiLCJpYXQiOjE3MjcxODk4NTAsImV4cCI6MTcyNzE5MzQ1MH0.e3dyK5qEHCFw8hRYuqPsyHV64HaJTyCs10lyIeWEJ1dQ3H_JTEbZRy_CCpSpC9tzcItLzx6-drkDVztXu6oB668siraujFKltFAhjs1EfGrhW89d61Cisb1CAyKa84ntt8_TS1QJtylEDGYL0o6aWOC4SyjwrwSPZ4Ypz8YqItjDh7A0iIS3eKAGss2aXEjsSIcTxSbj3S8RNhjYFCtnyv_NkYmuKORhyRSywvyGJ7cIc8JQIRMl7Ufn5XZalD6GxFSq0vcPyjIo-cx2t5TMPgp3xS-NzNIIBwtIzSjROiQeWEP3OeOZao-AQWW--nnUbel_sBHBNXBKrCf3XXNNnQ	\N	f
83558133-ed81-4f7d-b36e-bb22c9003449	oauth	google	112508577776048213007	1//09jdAUgvTudiBCgYIARAAGAkSNwF-L9Irk9PUd76TdfK9z_zbtgPrQvwH6tIxdAwfSYQjaeZgeKNKHS9KWYKn5ZCmIIrGQtPLaVk	ya29.a0AcM612xdQsBnTBfWIrThxr3g81gIIE8d3GJKB9_gVfZ_EcsFsUfSC6vDKIwxxDx6cLGkG0K-bn_CuHsYTdi4ifypmD1jaSy7f2WYipAVkuHpawcY_QFWy9fAEICgfz3-jW3QNq732Dd4rtccxN-9hba8ZtXvRL9Hwi0_qgfnaCgYKAVISARMSFQHGX2MidT5B_zYGV-HrJNtZQmsvAg0175	1727212533	Bearer	openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI1MDg1Nzc3NzYwNDgyMTMwMDciLCJlbWFpbCI6ImRvbWluaWsuc3R1ZG5pYXJla0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlFhaVpyZ19fa0t6MzlXTVBTU3V2RWciLCJuYW1lIjoiRG9taW5payBTdHVkbmlhcmVrIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lrLUwyQlp0Wk5QdDI5MWVsQzdsWmFEQWkxOEtYWGtqcERuR09EQVhUTXNwUnV3eXM9czk2LWMiLCJnaXZlbl9uYW1lIjoiRG9taW5payIsImZhbWlseV9uYW1lIjoiU3R1ZG5pYXJlayIsImlhdCI6MTcyNzIwODkzNCwiZXhwIjoxNzI3MjEyNTM0fQ.YUhi7Ss9DlPgRAf1nyz15wWO6_lDmwQmWXSUZSRPjSIa95wk17nJmvOKlF0kmCYKuM0CVZQIIULBX7cQdMzq1w3k7WWp_mRCMLIPPgKaictT1RzxJ8ayuDj8A_5aZO9dpJd_gGznSh5bBSLgHy7MSK2YdGlHMtGX6DmhC1PDuamf0DBNrMRneDenoNgMOqqqkpAcpj4LnwWZDwNkULH77HWjlIh37ZENCaacRe5QMoM0jW37D9kwqfJwQSEeDFmXXnOqhoCEcm6BHAfXaCu9CPdMxSQ-xZy-Xyhc_Xhci7wT_CzNSxr9jPEeNsBATDZ1xng-MXk2GyBR9okJS-e7oA	\N	f
e8f47442-5c3e-4b51-91d0-880c729f77f7	oauth	google	117119245791300731018	1//09QzRsIxMmoKDCgYIARAAGAkSNwF-L9IrmU8j-Wq6nC6lDnV06ODOLMk8xqyPD6jzLTKOaVOvvN3rIvCoIVxqafsfOhR6ELqpO4c	ya29.a0AcM612w5cjOzmM_iZ9xLw1W93uiLlSRnkuyhzmU-jGQbvIEzUscwQpCHTxwzKzxB_GzpHCCph0SL2kDMcRYb2wJTP4nUNsQnb6g4kA1s43Ng7xgsCdvOPZc47Z0XQjrJA14e57kI6hrUAkEGtVTWEo3SssGBIFkBxKtik74paCgYKAWYSARISFQHGX2MizPtBvtZqEVgYdA0kD706CA0175	1727212824	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcxMTkyNDU3OTEzMDA3MzEwMTgiLCJlbWFpbCI6ImZyZWVrb2R6aWtpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiajdvNnhHZDFuSFRELU5sQ3N1ZENLUSIsIm5hbWUiOiJEb21pbmlrIFN0dWRuaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGFIT1RYVDJiazcxNkR3cHV1MzJ3U0NSTUYtQjRjMXc2dUtUUU1ZM043bmpLR0ZBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkRvbWluaWsiLCJmYW1pbHlfbmFtZSI6IlN0dWRuaWEiLCJpYXQiOjE3MjcyMDkyMjUsImV4cCI6MTcyNzIxMjgyNX0.fgU6XS3-KoKpMzwMw4CwCqT5REBBU_1m4qtb_gFeJpIuZRhTO1Qy5N5aeauef0Onrbei5Gdo2xUaJiqrauNWqL8nK-kudyLCLWUpzJW-cpidvfw6rJflOyvmoUunCtmMGvzY3YuzYrGdn2Kl00leSbeFX-mK8NO9ddWsCDydRnAhd-F6r6NMLjGLLlF3Mfv1xTSv-s57Dh3y54uI6jjr0BTHnVkLQ7ydy_C_OU-st1p-JwOVdM1ZkYQXQC5sx2r1j7L6Cso7-3eeSC3q099EkFIwZMNQe3DYykK6yeKQtiFFHi7RY3wlfSpu-Hn8wxPCoiC88NYDV2oOpVUaKwzK4A	\N	f
511f4cd6-d34b-4be3-885b-5891e9b3c910	oauth	google	110775588646464380238	1//09RnPMKtAsFRDCgYIARAAGAkSNwF-L9IrByCaB4QXxDdpRAGG8cnl_Y8bO5cv5-EffQPzLtcRvrLmHa6EfubGvzA4_RuD6MByr98	ya29.a0AcM612w3lPfOJDM2fe1-ocnHj_VIUx6rf2FHsV1UuhI1uNJJukpGe2ymBUOvukUK0lKKMpGj_NmjhYmYiB3PE8zXZXu28kcug63wQlcCvh6X-ezkU43oX7P7WmAncOpaWqapb-voMUeJS6qCA6YYYqcL57A723C_wpu_V6ZiaCgYKAQASARISFQHGX2MiM3PA7Lq7gglBTwq6lbrcOA0175	1727213291	Bearer	openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTA3NzU1ODg2NDY0NjQzODAyMzgiLCJlbWFpbCI6ImRvbWVxdTEyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImlIWmpWRnBCWEhHWWVGdHdmM2Y4OUEiLCJuYW1lIjoiRG9tbW1pc2lzaXNpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0sycXYyM0NGZ19PLVBaYzBxVERfR2JZUEQ0akJIaHhpc29WdTdFOE8xaE5rRHJfX2ZlPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkRvbW1taXNpc2lzaSIsImlhdCI6MTcyNzIwOTY5MiwiZXhwIjoxNzI3MjEzMjkyfQ.fpZsmKnhk2wSAdGtAgRllOtxxJypK_ZpS8X5xSdbg6t4Ui87q7v4uuGY3bRqIfhfmgKZVq0v-GvYCTtiToKCzICwZljUbmxQeaeEfquTmibvlClRIxMQOes5G7HarXMcypBAKXj81FlVPLL5XvT9DXyJYi2fn1CQber787YXnFxyD8Avm5B-xlWwSp2-SxkzB5KrmnKmmuMVKalT93pU2sOdH_UYup5Jji67lnOqFzbF4-8aPnZ03IbPGKbOqWPYMKuQLXZiR0l8U-4AGHYE0zn02R3y2YK4gG4iD8TePQsMR1BtIUKL9gB_SWfhyc-z51qVCenf_UsJYSYd0DVycQ	\N	f
67092c9d-fceb-457a-90d5-e3189d31f8a9	oauth	google	100746324825379844943	1//09vONwYqNW-5RCgYIARAAGAkSNwF-L9IrdwFZcuxk_rMXKeXcOsdE-EpWZP_9fXUTiAVEexEDCYbK83yxLd_Em60imURgLIs1tps	ya29.a0AcM612zhhSDBFpOPdQSJfFK7YiGUX79DrHQPA5KnJlOWP1yMl1I8OLas-9yzuWNsijChcYo89fJYj7OFsdaIvauCO6Lpn1GAxTvkQeNG-W0iMY_Pnn_UM_TH-KDlkPKRuEtl4ZktaiuQRZEewf4bAn6KKur1dRPCXJKtZWo5hAaCgYKAfoSARISFQHGX2MimTG0DHDO5PYEaJl0OnxehQ0177	1727227011	Bearer	openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA3NDYzMjQ4MjUzNzk4NDQ5NDMiLCJlbWFpbCI6ImFwa2FkbGFhcnR5c3Rvd0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InpqQ2dZcEpyOXVDdGpEbjZTdm5rUHciLCJuYW1lIjoiQXBrYSBkbGEgYXJ0eXN0w7N3IEEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSnVVc1RIbHNCXzRFUi1LSUZDbmphYW1maE1nQmQ0ZndYdTFJcjZDdjVlSHJtRkxBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFwa2EgZGxhIGFydHlzdMOzdyIsImZhbWlseV9uYW1lIjoiQSIsImlhdCI6MTcyNzIyMzQxMiwiZXhwIjoxNzI3MjI3MDEyfQ.BXWEwW-wLLUv2U23sAiACen_Zu0EPYTTkJo26evljH_nvGmTnVu_kQ3NEZ3MoaKGS6jYBrilDe8uDeWcHDHGVDapHBrW6nZoQuQDhvRbVnGT4FgideyPmFIVLowtY7_B9Q99OrRZOfyn1QiHLmNUE2-ZmR-CsHFfZ3uDl2YRmCXWLUEcP9tTDoMHcu8euyJjoL6rKGIcsCGvae2Q_bxWyPMeyhBzpJrg2RWKd_rcIgNM6PP731smKgBe09ve4Blihr2Dc5drWywrAsFryLK4mgu1WOCZX-Kf3vzOIvrg2L8v89OtOtUD-QvVA8ivVMH1HS5UfVmTMxD7MNmOnFj5Cw	\N	f
ccfbd35a-2d79-4e8d-928e-2d3ed2859160	oauth	google	117148218365356011600	1//09OqcasI_GjEZCgYIARAAGAkSNwF-L9IrmeEQYO9JSf63mubVrqFd_W2rbfMarMpeykrUPVxZJuY2NBm6kZE7NdBBPA0uaUhllhE	ya29.a0AcM612wVAt7Vue47j4FaeJeLx6uq_J_JYwxY3gOZTnRJ37CWNYbYpiomBo_6ZkkAiazwXcUZqHuDRtq2lvSCfLkShkb51c4s1z_C_u89gBoTAch6rS5Mva3oabB0ujHt0CNy5i4ll8wbJJ47qqGl92AKbArECkOWqa_G_9wtXQaCgYKAf8SARESFQHGX2Mib86-FZKiZRLgomC3otPvLw0177	1727278623	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcxNDgyMTgzNjUzNTYwMTE2MDAiLCJlbWFpbCI6InByenl0dWxuZS5taWVzemthbmllLmtpZWxwaW5la0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ik42dnJpOEItVFBJRDVpV3p2Xy00UmciLCJpYXQiOjE3MjcyNzUwMjQsImV4cCI6MTcyNzI3ODYyNH0.TpQbn4JiRDoRLRr9xtw6ZzlA3kXoSv-Jq0D9U86QKXNW1OmUgqg_nWjm633nPXo6bC3rtuMFWrsXm65SWu-vI3BkUk6h9BkIcXVmvp2KSPLNsUJLmdCfhKx9Ts-GxrWxD9Ta48MEtnD7W33RAk1rcVTQ3uVacIYJoZTunhHM44MQQJbeNrJN6UO6ZC9u45boyS62SIe3lwbR2D-GpF_rtn9bYtfxd6GNw1-eiTWyA9FYxaYxxY0nZ-ybO2gEF_pX4KHFVRwoDW9Ue9TkoPi8JTIaYzSYzTca2SXeM8mCptOUydqz8l9ZEp4LQIqhTDW7L-Yrmrz05n4MikgMJrKfkA	\N	f
600d2f1c-0e7b-4341-b25d-9722f3cef8c0	oauth	google	103221263883597573662	1//09OC_ZQWLYZC4CgYIARAAGAkSNwF-L9IreS6W37hE6XgyTgKCxv7TcFjBlmZbqNpy2od6nkcemwh-IQoVNoSXS3PNHqLT5Y-P_Fk	ya29.a0AcM612w0tiNU0azbLreUVmXIlYqZokgJVKK0XTdYD9Zw-x9U-a6pWqGdntprSLPRgiPGtQ3J1EG_ROWlsW-016TWuGfDxqEYn4_dQgMnm-NWYg3VnVmxEW7y-CAWjCNlHx5tEZw9okfkWdATV-wNqOEwCX6oVDI6wNrF3yne2AaCgYKAUUSARESFQHGX2Mi606GvPVi_PmwBa1DHjT_Qw0177	1727354002	Bearer	openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMyMjEyNjM4ODM1OTc1NzM2NjIiLCJlbWFpbCI6InN0dWRuaWEua2Fyb2xAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJTd3AxWVd4V1l0QkwzLU1SV3NWazlnIiwibmFtZSI6Ikthcm9sIFN0dWRuaWFyZWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSm0wU3VaNFIwblJ4LUZPOUM1MHlDaXhEdlk1OUZINXRaTFBuY0thc2gxSlphNUNlOD1zOTYtYyIsImdpdmVuX25hbWUiOiJLYXJvbCIsImZhbWlseV9uYW1lIjoiU3R1ZG5pYXJlayIsImlhdCI6MTcyNzM1MDQwMywiZXhwIjoxNzI3MzU0MDAzfQ.AHspeKpBgYMxY0pxAVt7xeQQETsnUay0wJl1Q8I96VsAiG_MLggb8lMUTjbj2huQoRw7eEBEuhm-s-UD0gUCeh2S8b8mlPPksiACyR8lM5B_2wZaFdO-bdIk8oxjI00XKbRURe0i-1mIRIr93NzMKgBNFBS6MrQ2LdVhrevB8WyMkwahlx3CFyjEEorI2frSt72m2GwzzoPwayAjxsPUEGWjdsYbv_fAEkVf7-cw2yjZuUN-ZY8rp9YY5s8C6vODozj_V0zI6d_C4fRsOtxyklJfWqyDcBjXyvXzIolZejoYo1kcJ4TO3-swZ5oENn_0CwEJ73eyASpI8qCWmipzPw	\N	f
20c652ed-666a-4f77-8c1a-974b7836d7ef	oauth	google	106353802240089635404	1//09Y5V05hBy8CkCgYIARAAGAkSNwF-L9Ir_PMikDfEJa3MdZbBiVeOQnzq3Lwxa-T-z-rhQYbGuExR5fFlv9J-O8DGUvVxQhueSb0	ya29.a0AcM612wMzPG-5t7ukuYhbaX6SLhUxxcfyc-2RzyBl2SOJX5e3gGe8jZGGnngAe5yLK92RlYAJoKGN7ra5NHbiO5iZr8LxmD8Zq2Gq9SPGTtbaiNnpWILgXBkRngu2kI2nR8VwYsgQVmiWBEpDBiCxWOR-UrxlwSJ3MCofwCAdgaCgYKAZoSARMSFQHGX2Mi5HnIvuZHK1QbwHFpohy8Ww0177	1727266691	Bearer	openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYzNTM4MDIyNDAwODk2MzU0MDQiLCJlbWFpbCI6Indhc293c2tpMjAwNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImJnYTRyOElGQlpXTDRBaFd6NHJGZWciLCJuYW1lIjoiTWFyY2luIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tpTndZVHRfSHBEaDMyUUNRb0JpSzdLczhzMHhxdjU4ZFJzRTN0c2NXa2kxNTNjbXM9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFyY2luIiwiaWF0IjoxNzI3MjYzMDkyLCJleHAiOjE3MjcyNjY2OTJ9.d9AU6k8pF1wnPKx5W763FfefnQMDcLs7zZXc8fMB0H0X21QJgrWugYf5u4oNoo9uYeVCysYp2bGNdLPkmqGSJY2IfV54fiCGPccgeHHDs-2TjrEmn-1jQar194cgMqSlUguZBIYVHpKK0ndkEgFTeULhj13YY-0NyCp6ev-wOwtLqAFThfDVCzi3niJzPJb7wBNwsQGmIohhOHk2OVxnYCGb3lcfrZKZPi_Tj0pcK31FeF7w9vY80f8KIPCjw2tPmDoAxVUCd7AnDNGTdDITzusyR2gQC0KAhwPM73XVn0BoGQdRB9p5RWwlNbquJS8i9Voa5iQU4X2TeTY6Jme2cg	\N	f
fdd5612d-53a7-4a9b-9867-4325887886fa	oauth	google	103823905431875475755	1//09g7ctpnzjysrCgYIARAAGAkSNwF-L9Irvf1Arz7DPfP7etLnjP0ZlqLOGgY_TtAxrB73wH1s7Zp9lAWX8HqXnNV1xGc5PxQfYBU	ya29.a0AcM612w5PS6tvcetv-mny9_b82bEKiz-LZiEpsE5XeYj-Kn0heG4EVXXn2Q-NI4e2HffjNFWtgo1c-jOWAXJZVd1dJE7LefKkqzM-vTpbvzohCZg8LMCXsRWPXzcbGceUpA_mS666LneaI9tkdbcysp0MiVQL0ScOQxQ8l1xaCgYKAZESARASFQHGX2Mizi0u2JPp6maQpZKwAH5C6w0175	1727353042	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhYWZmNDdjMjFkMDZlMjY2Y2NlMzk1YjIxNDVjN2M2ZDQ3MzBlYTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzU2MzIzNjg0MTItcjJoamw5YzFwYTA5dTZsNGw2NTJuajhxc2RnczlscWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM4MjM5MDU0MzE4NzU0NzU3NTUiLCJlbWFpbCI6ImtyZWNpbzU1NUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il85RjBfUjZidHlWQXBGaVU2LXFsc1EiLCJuYW1lIjoiTWFjaWVqIFPFgmFka2lld2ljeiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLUWhVdHVmZnZDclAzMkw1bVpRTk1kUV9FdVVvcWJfMHlXVjJWZjduYUxUSklNS3B3Z3dRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1hY2llaiIsImZhbWlseV9uYW1lIjoiU8WCYWRraWV3aWN6IiwiaWF0IjoxNzI3MzQ5NDQzLCJleHAiOjE3MjczNTMwNDN9.IFyqsMBXA3uUXWInV-IBlrbiWrz7a73IvsKWrTkVP-55gMgT1gI_VGzNvqlNOpo3Ejhft-gumtsyXgauGhrdGHgFiI2g2SqsgBeV04LU5r5Buv6zp2eMVOtNtYFtkICsK-ciJnpkAq38Alk5p1yWy5UnTJ8punsWTYZJ-vrbWu06BvpbtWi8U12OleHXIV_bM9CH9yF5B5iXp4EDbWy6-SMzweKZGdRPaKU6OsOSOWYOoiNn7LIcUk_rVrOA6dcADZE_s_pA6bmhBNXxUI4abbS1Kd48wiDbuyN6oGgMnW4edVMOCemlB4eX8XYoaSDYKqyFjCn9bhZrVHHetJri1w	\N	f
\.


--
-- Data for Name: offer; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.offer (id, ratings, votes, "userId", name, price, "shortDescription", "longDescription", "locationName", location, distance, files, "createdAt") FROM stdin;
90ca7bf2-4438-4964-bb80-eb237282f97b	\N	\N	600d2f1c-0e7b-4341-b25d-9722f3cef8c0	Designer stron internetowych!!	420	Zrobie Ci design strony tak piękny, że dostaniesz 5 na dyplomie!	<h1><strong>Kocham </strong><span style="color: #e99401"><strong>d</strong></span><span style="color: #f54def"><strong>e</strong></span><span style="color: #4187d2"><strong>s</strong></span><span style="color: #f1ff33"><strong>i</strong></span><span style="color: #9d2f2f"><strong>g</strong></span><span style="color: #3fc660"><strong>n</strong></span></h1><hr><blockquote><p>to najlepszy designer na świeci</p><div data-youtube-video=""><iframe width="320" height="200" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube-nocookie.com/embed/i6kQWppFAsM" start="0"></iframe></div></blockquote>	Niemyje-Ząbki	{"x": 22.6765832, "y": 52.73995250000001}	50	[{"url": "https://utfs.io/f/xRDkIJbh5lPCiOJUPqLNBpCy0ZqrUMvQaTVls2hWeObLAnmK", "type": "image/png"}, {"url": "https://utfs.io/f/xRDkIJbh5lPC5ggTjIeJryx0FBQlIOkRq45PX9Ewu3a6jhoA", "type": "image/png"}]	2024-09-25 21:09:16.175803
ead960b0-3946-45dc-8771-c67a223235ad	\N	\N	108f5663-ddc9-4721-92bb-1348d64227f5	Śpiewam 	1000	Rock and roll 	<p>Jestem po akademii muzycznej</p><p>Tworzę muzykę </p><p>Mam 25 lat</p>	Gdańsk	{"x": 18.6466384, "y": 54.35202520000001}	115	\N	2024-09-25 21:09:16.175803
9a77cdc1-8cc8-4919-8055-b5f1ddcd6c36	\N	\N	adf1b7d8-3aba-470b-a8e7-7e276e635a00	Testuje to tutaj	90	test test test	<p>Testuje to tutaj <span style="color: #e60a0a">też</span></p>	Gdańsk	{"x": 18.6466384, "y": 54.35202520000001}	15	[{"url": "https://utfs.io/f/xRDkIJbh5lPCZytp4zmb1wcYECRFGA0Vk6nNspvmXyl8ZLU5", "type": "image/jpeg"}]	2024-09-25 21:09:16.175803
4ca18d8c-5bd0-41d1-bc52-4f84bc9ebbc0	\N	\N	87928946-e2f7-40a5-a6c4-f772aa3aa363	jacula bałagane	4000020	polski raper i producent, znany z charakterystycznego stylu łączącego uliczny rap z autotune'em i nowoczesnymi brzmieniami trapu. 	<p></p><div data-youtube-video=""><iframe width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube-nocookie.com/embed/tuFkBYXpbY4" start="0"></iframe></div><p><strong><em>polski raper i producent</em></strong>, znany z charakterystycznego stylu łączącego uliczny rap z autotune'em i nowoczesnymi brzmieniami trapu. Jego twórczość często porusza tematy związane z życiem w mieście,<span style="color: #fa0000"> ambicjami, bogactwem</span>, ale także trudnościami, z którymi mierzą się młodzi ludzie w Polsce. Dzięki <span style="color: #d00b0b">oryginalnym tekstom i unikalnemu brzmieniu</span> zdobył wierne grono fanów oraz wyraźne miejsce na polskiej scenie hip-hopowej.</p><blockquote><p><strong><em>Nowy kaz to świętość sportowa noc a nie friendzone</em></strong></p></blockquote>	Warszawa	{"x": 21.0122287, "y": 52.2296756}	420	[{"url": "https://utfs.io/f/xRDkIJbh5lPCPOMOEKdBebD5WMI647vqYNpTVmkHUstX9nac", "type": "image/jpeg"}]	2024-09-25 21:09:16.175803
2373a566-0570-425a-a6a2-c6ddc229ca0d	\N	\N	fdd5612d-53a7-4a9b-9867-4325887886fa	Testowa oferta	90.99	Testowy opis	<p>Testowy opis główny</p>	Sopot	{"x": 18.5600956, "y": 54.441581}	20	[{"url": "https://utfs.io/f/xRDkIJbh5lPCzlG8q43YJgF0m1LN6XOAnCpQyPeEdqKhZ4R2", "type": "image/jpeg"}]	2024-09-25 21:09:16.175803
7b57cf79-6707-445e-9364-1dfdf4ee7857	\N	\N	83558133-ed81-4f7d-b36e-bb22c9003449	Tworze muzyke filmową na pianinie 	5400	chill / medytacja / terapia muzyka	<p>Cześć jestem kompozytorem muzyki klasycznej oraz filmowej, specjalizującym się w tworzeniu oryginalnych ścieżek dźwiękowych, które wzbogacają wizualne opowieści i wzbudzają głębokie emocje.</p>	Warszawa	{"x": 21.0122287, "y": 52.2296756}	600	[{"url": "https://utfs.io/f/xRDkIJbh5lPCS6s3XdqwGDX54tfm93vudN72l1hASqOzkQFR", "type": "image/jpeg"}]	2024-09-25 21:09:16.175803
c0b5a7f0-3fb8-4f1d-9dc9-2103b5ecb7cd	\N	\N	e8f47442-5c3e-4b51-91d0-880c729f77f7	jazz	370	Muzyka nie ma granic bo dźwięk jest uniwersalnym językiem, którym wyrażam to, co niewyrażalne.	<p>Nie lubię ograniczeń ani etykiet. Nie grupuję, nie definiuję, nie wpisuję się w żadne ramy – dla mnie liczy się po prostu dobre brzmienie. Tworzę muzykę wyzwoloną, otwartą na wszystko, taką, która nie zna granic, bo dźwięk jest uniwersalnym językiem, którym wyrażam to, co niewyrażalne.</p><div data-youtube-video=""><iframe width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube-nocookie.com/embed/BhqQFs7huwU" start="0"></iframe></div>	Śródmieście	{"x": 21.0122287, "y": 52.2296756}	20	\N	2024-09-25 21:09:16.175803
491c1b05-2e34-468e-a2ad-a688870495ef	\N	\N	511f4cd6-d34b-4be3-885b-5891e9b3c910	SBM hiphop	1111	W 2008 roku swoją działalność rozpoczeliśmy jako duet Solar/Białas, wokół którego szybko zawiązał się hip-hopowa ekipa SB Maffija.	<p></p><div data-youtube-video=""><iframe width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube-nocookie.com/embed/tm5Z88WFiqs" start="0"></iframe></div><p>Jestesmy labelem, jestesmy polska muzyka, jestesmy hiphopem</p>	Warszawa	{"x": 21.0122287, "y": 52.2296756}	155	[{"url": "https://utfs.io/f/xRDkIJbh5lPCSEGWQNjqwGDX54tfm93vudN72l1hASqOzkQF", "type": "image/jpeg"}]	2024-09-25 21:09:16.175803
69b602a8-db24-4d14-b975-b374d2b5d306	\N	\N	ccfbd35a-2d79-4e8d-928e-2d3ed2859160	Brykanie na zawołanie	100	Brykanie to tu to tam tak jak Tygryski lubią najbardziej	<p>Jeszcze nie widziałeś takiego brykania - Ty i Twoi goście będziecie zachwyceni.</p>	Cieciorka	{"x": 18.2087697, "y": 53.9281079}	30	[{"url": "https://utfs.io/f/xRDkIJbh5lPCKFsKlczghu2Srw9mksjIcvD54OWpiCTnoGaU", "type": "image/jpeg"}]	2024-09-25 21:09:16.175803
\.


--
-- Data for Name: offerTag; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."offerTag" ("offerId", "tagId") FROM stdin;
90ca7bf2-4438-4964-bb80-eb237282f97b	4
90ca7bf2-4438-4964-bb80-eb237282f97b	6
90ca7bf2-4438-4964-bb80-eb237282f97b	9
ead960b0-3946-45dc-8771-c67a223235ad	12
9a77cdc1-8cc8-4919-8055-b5f1ddcd6c36	11
9a77cdc1-8cc8-4919-8055-b5f1ddcd6c36	12
4ca18d8c-5bd0-41d1-bc52-4f84bc9ebbc0	9
4ca18d8c-5bd0-41d1-bc52-4f84bc9ebbc0	10
4ca18d8c-5bd0-41d1-bc52-4f84bc9ebbc0	2
2373a566-0570-425a-a6a2-c6ddc229ca0d	4
2373a566-0570-425a-a6a2-c6ddc229ca0d	12
2373a566-0570-425a-a6a2-c6ddc229ca0d	11
2373a566-0570-425a-a6a2-c6ddc229ca0d	10
7b57cf79-6707-445e-9364-1dfdf4ee7857	13
c0b5a7f0-3fb8-4f1d-9dc9-2103b5ecb7cd	81
c0b5a7f0-3fb8-4f1d-9dc9-2103b5ecb7cd	51
c0b5a7f0-3fb8-4f1d-9dc9-2103b5ecb7cd	50
c0b5a7f0-3fb8-4f1d-9dc9-2103b5ecb7cd	47
491c1b05-2e34-468e-a2ad-a688870495ef	81
491c1b05-2e34-468e-a2ad-a688870495ef	164
491c1b05-2e34-468e-a2ad-a688870495ef	197
491c1b05-2e34-468e-a2ad-a688870495ef	225
69b602a8-db24-4d14-b975-b374d2b5d306	16
69b602a8-db24-4d14-b975-b374d2b5d306	21
69b602a8-db24-4d14-b975-b374d2b5d306	41
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.review (id, "userId", "offerId", rating, comment) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.session ("sessionToken", "userId", expires) FROM stdin;
609cf936-9424-4bb4-a8f1-cc19fe794284	0f1f1e28-aa43-44ae-a664-b8064599e4dd	2024-10-23 10:02:17.249
4e1fb663-ee04-478b-96f6-8f29200ef1dc	e7064f15-be63-4935-8a18-16dcbdf57e9f	2024-10-23 10:59:04.322
1527818f-7331-40f9-9d50-8445ea06e4e0	e5e52e40-e7f6-4ffb-9921-f3f2bf1c4714	2024-10-23 11:13:10.239
f8aa48be-15ad-4097-a61d-e6ef5c75f6f1	e7064f15-be63-4935-8a18-16dcbdf57e9f	2024-10-23 11:21:29.88
a938d79b-0334-4954-8ce5-ec16e07b8ed0	e7064f15-be63-4935-8a18-16dcbdf57e9f	2024-10-23 12:31:35.771
7e1c8164-64ee-4320-91ec-f9d507f2b5d4	e7064f15-be63-4935-8a18-16dcbdf57e9f	2024-10-23 16:35:41.672
0d94a8b2-ee5d-4cbd-9288-c6d4f0ec32b8	511f4cd6-d34b-4be3-885b-5891e9b3c910	2024-10-24 20:28:13.07
56abfea3-b876-4177-80c0-c519ace5ea9d	fdd5612d-53a7-4a9b-9867-4325887886fa	2024-10-24 20:59:35.164
dff3c962-c31c-4f08-a8a5-8cc877888b7e	20c652ed-666a-4f77-8c1a-974b7836d7ef	2024-10-24 23:34:36.545
094f8ebd-5bfd-4e8e-9ca8-2a472ba2f357	600d2f1c-0e7b-4341-b25d-9722f3cef8c0	2024-10-25 06:08:48.417
2670b114-99ee-44db-9156-297a0584b685	600d2f1c-0e7b-4341-b25d-9722f3cef8c0	2024-10-25 08:02:55.358
977d4c22-4f50-44a1-a066-a0bfd4d74b7b	ccfbd35a-2d79-4e8d-928e-2d3ed2859160	2024-10-25 09:49:34.214
4c2e5f6d-cce5-4ecf-bc9f-c8da07bcad23	ca21955f-95c4-4297-8220-99f4db43240b	2024-10-25 11:56:43.328
0e16b591-645a-4915-ab27-c4a7cf256f5b	fdd5612d-53a7-4a9b-9867-4325887886fa	2024-10-25 21:42:12.609
928ba0ec-4d91-4e1b-924a-1ea03276e34c	fdd5612d-53a7-4a9b-9867-4325887886fa	2024-10-26 11:17:23.454
b064775a-1c4e-4d25-b3d4-6f2de58f6170	600d2f1c-0e7b-4341-b25d-9722f3cef8c0	2024-10-26 11:33:23.43
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: cloud_admin
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.tag (id, name) FROM stdin;
1	Malarstwo
2	Rzeźba
3	Fotografia
4	Sztuka cyfrowa
5	Ilustracja
6	Projektowanie graficzne
7	Ceramika
8	Sztuka uliczna
9	Sztuka współczesna
10	Impresjonizm
11	Gitara
12	Rock
13	Muzyka klasyczna
14	Jazz
15	Teatr
16	Taniec
17	Fotoreportaż
18	Sztuka instalacji
19	Rysunek
20	Grafika warsztatowa
21	sztuka abstrakcyjna
22	muzyka akustyczna
23	rock alternatywny
24	muzyka ambient
25	wystawy sztuki
26	instalacje artystyczne
27	secesja
28	portfolio artysty
29	awangarda
30	malarstwo barokowe
31	gitara basowa
32	rzeźba z brązu
33	kaligrafia
34	sztuka klasyczna
35	gitara klasyczna
37	modelowanie z gliny
39	grafika cyfrowa
40	malarstwo cyfrowe
41	performance artystyczny
43	rzeźba ekspresjonistyczna
44	malarstwo ekspresjonistyczne
45	rzeźba figuratywna
46	freski
47	improwizacja muzyczna
48	malarstwo impresjonistyczne
49	sztuka interaktywna
50	artysta niezależny
51	muzyka jazzowa
52	kreatywne pisanie
53	malarstwo kubistyczne
54	sztuka ludowa
57	malarstwo współczesne
58	malarstwo krajobrazowe
59	performance multimedialny
60	mikrorzeźba
62	malarstwo realistyczne
63	malarstwo renesansowe
65	gitara elektryczna
66	sztuka sakralna
69	rzeźba surrealistyczna
71	rzeźba współczesna
72	muzyka pop
74	portret artystyczny
75	rzeźba w kamieniu
76	malarstwo temperowe
77	street art
78	taniec współczesny
79	sztuka uliczna
80	sztuka użytkowa
81	muzyka world music
82	muzyka etniczna
83	rzeźba drewniana
84	muzyka latynoska
85	malarstwo akrylowe
86	rysunek
87	sztuka konceptualna
88	kompozycja muzyczna
90	malarstwo plenerowe
91	muzyka bluesowa
92	sztuka minimalistyczna
94	teatr alternatywny
95	malarstwo akwarelowe
96	muzyka punk rock
97	fotografia cyfrowa
98	muzyka soul
99	aranżacja muzyczna
100	komiks artystyczny
101	rzeźba nowoczesna
103	rzeźba realistyczna
104	portrety
105	rzeźba klasyczna
106	malarstwo sztalugowe
107	muzyka orkiestrowa
108	malarstwo monochromatyczne
109	malarstwo street art
111	design graficzny
112	scenografia artystyczna
113	rzeźba w metalu
114	muzyka instrumentalna
115	fotografia analogowa
116	malarstwo dekoracyjne
117	sztuka performance
118	muzyka house
119	rzeźba abstrakcyjna
120	fotografia portretowa
121	rzeźba w marmurze
124	malarstwo portretowe
125	gitara akustyczna
126	muzyka eksperymentalna
127	rzeźba kinetyczna
128	rzeźba organiczna
129	malarstwo abstrakcjonistyczne
130	fotografia kreatywna
131	kompozycja orkiestrowa
132	instalacja świetlna
133	sztuka audiowizualna
134	muzyka elektroniczna
135	malarstwo intuicyjne
136	sztuka eklektyczna
137	fotografia artystyczna
138	performance muzyczny
139	muzyka ambientowa
140	muzyka alternatywna
141	fotografia mody
142	sztuka nowoczesna
143	architektura artystyczna
144	rzeźba wielkoformatowa
145	malarstwo narracyjne
146	wideo-art
147	rzeźba użytkowa
148	aranżacja dźwięku
149	malarstwo pejzażowe
150	muzyka klasyczna
151	projektowanie dźwięku
152	street performance
153	rzeźba z drewna
154	sztuka współczesna
156	muzyka progresywna
157	rzeźba z materiałów z odzysku
158	malarstwo sakralne
159	fotografia dokumentalna
160	muzyka minimalistyczna
161	rzeźba modernistyczna
162	sztuka performatywna
163	malarstwo geometryczne
164	muzyka taneczna
165	fotografia uliczna
166	instalacja interaktywna
167	sztuka instalacji
168	rzeźba monumentalna
169	malarstwo ikonograficzne
170	muzyka operowa
171	sztuka feministyczna
172	art brut
173	malarstwo ekspresyjne
174	muzyka neoklasyczna
175	rzeźba renesansowa
176	malarstwo marynistyczne
177	muzyka ludowa
178	malarstwo pop-art
179	rzeźba z kamienia
180	fotografia koncertowa
181	muzyka chóralna
182	grafika komputerowa
184	muzyka symfoniczna
185	malarstwo olejne
186	rzeźba metalowa
187	muzyka industrialna
188	sztuka cyfrowa
189	performance uliczny
190	rzeźba futurystyczna
191	fotografia krajobrazowa
192	fotografia reportażowa
193	rzeźba z odpadów
194	muzyka fusion
195	malarstwo barwne
196	rzeźba abstrakcjonistyczna
197	muzyka współczesna
198	performance taneczny
199	fotografia artystyczna czarno-biała
200	malarstwo witrażowe
201	muzyka kameralna
202	instalacje audiowizualne
203	rzeźba postmodernistyczna
204	malarstwo figuratywne
205	muzyka liryczna
206	malarstwo iluzjonistyczne
207	malarstwo mistyczne
208	sztuka dekonstrukcyjna
209	muzyka folkowa
210	fotografia studyjna
211	fotografia reklamowa
212	malarstwo historyczne
213	muzyka filmowa
214	rzeźba interaktywna
215	fotografia artystyczna analogowa
216	malarstwo surrealistyczne
217	muzyka klubowa
218	rzeźba plenerowa
219	fotografia fine art
220	sztuka site-specific
221	malarstwo pastelowe
222	kompozycje graficzne
223	rzeźba strukturalna
224	malarstwo gestu
225	muzyka new age
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."user" (id, name, "firstName", "lastName", email, "emailVerified", image, "isPremium", "isAdmin", "isActive", registered) FROM stdin;
600d2f1c-0e7b-4341-b25d-9722f3cef8c0	Larok Studniarz	Larok	Studniarz	studnia.karol@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocJm0SuZ4R0nRx-FO9C50yCixDvY59FH5tZLPncKash1JZa5Ce8=s96-c	f	f	t	t
0f1f1e28-aa43-44ae-a664-b8064599e4dd	Karol Studniarek	Karol	Studniarek	studniarekkarol@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocIGKsZxc24_bjoPwTkJXQe-G61NP3ywlEsu6sHOVZzFK1Z9Ag=s96-c	f	f	t	f
67092c9d-fceb-457a-90d5-e3189d31f8a9	Apka Apkowska	Apka	Apkowska	apkadlaartystow@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocJuUsTHlsB_4ER-KIFCnjaamfhMgBd4fwXu1Ir6Cv5eHrmFLA=s96-c	f	f	t	t
83558133-ed81-4f7d-b36e-bb22c9003449	Dominik Studniarek	Ludovico	Einaudi	dominik.studniarek@gmail.com	\N	https://utfs.io/f/xRDkIJbh5lPCqm2cl0oyaGx1cjNtL263IUKBiO0gsEZdPrkv	f	f	t	t
e8f47442-5c3e-4b51-91d0-880c729f77f7	Yusuf Lateef	Yusuf	Lateef	freekodziki@gmail.com	\N	https://utfs.io/f/xRDkIJbh5lPCgWDQbdiW7wcJE4HOA8KiCRBZryPx0dtXnjqz	f	f	t	t
511f4cd6-d34b-4be3-885b-5891e9b3c910	solar białas	Solar	Białas	domequ123@gmail.com	\N	https://utfs.io/f/xRDkIJbh5lPC2uGKAYNiVXQl5NPn94fpyhrGAJOL78CU3jwc	f	f	t	t
e7064f15-be63-4935-8a18-16dcbdf57e9f	Magda Mwjwj	Magda	Mwjwj	nitka550@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocJPPjpkBl1hpPcdqYPdTMGppmZwDW1BMWecXxdyKv68fzjQNhbh=s96-c	f	f	t	t
20c652ed-666a-4f77-8c1a-974b7836d7ef	Marcin Wąsowski	Marcin	Wąsowski	wasowski2006@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocKiNwYTt_HpDh32QCQoBiK7Ks8s0xqv58dRsE3tscWki153cms=s96-c	f	f	t	t
e5e52e40-e7f6-4ffb-9921-f3f2bf1c4714	Piotr Selak	Piotr	Selak	piotr.selak.it@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocKA2tDFXZ8oB63lnnLpJ07AtHuB5ZG0GT6vsvfF9pyanjIvyA=s96-c	f	f	t	t
fdd5612d-53a7-4a9b-9867-4325887886fa	Maciej Sładkiewicz	Maciej	Sładkiewicz	krecio555@gmail.com	\N	https://utfs.io/f/xRDkIJbh5lPClqLxijYjibIrwVgUBvAfLhR4lP32ZCeOTNQa	f	f	t	t
be697184-e4de-4695-b774-9f0f16ec56f6	Piotr Selak	Piotr	Selak	piotr.selak123@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocKNSVfl4_sQnAbICFynTTK1rPYFauR2P9aK9cbxymUuCKGPpA=s96-c	f	f	t	t
ccfbd35a-2d79-4e8d-928e-2d3ed2859160	Łukasz Kuszner	Łukasz	Kuszner	przytulne.mieszkanie.kielpinek@gmail.com	\N	https://utfs.io/f/xRDkIJbh5lPCQ7KkEnTnwvsNot9XCJbzr0LeKg36hGD5i2R1	f	f	t	t
108f5663-ddc9-4721-92bb-1348d64227f5	Magda Aaa	Sza	Akan	magdaaa123a123@gmail.com	\N	https://utfs.io/f/xRDkIJbh5lPCKW4uL5Vzghu2Srw9mksjIcvD54OWpiCTnoGa	f	f	t	t
ca21955f-95c4-4297-8220-99f4db43240b	Łukasz Kuszner	Łukasz	Kuszner	lukasz.kuszner@gmail.com	\N	https://lh3.googleusercontent.com/a/ACg8ocLv_-0UqrRR2LtdVfaiKE1hQB4DmRHcLpF8YCrcXK_63JDcKmjY=s96-c	f	f	t	t
87928946-e2f7-40a5-a6c4-f772aa3aa363	Domis Studniarek	Jacula	stary odnowiciel	dominjunior123@gmail.com	\N	https://utfs.io/f/xRDkIJbh5lPCMGCljdwnA8Wy27zkT40ZNQCd5oKJa6PISgLB	f	f	t	t
adf1b7d8-3aba-470b-a8e7-7e276e635a00	Maciej Sładkiewicz	Maciej	Sładkiewicz	maciej.sladkiewicz.it@gmail.com	\N	https://utfs.io/f/xRDkIJbh5lPC5TabiieJryx0FBQlIOkRq45PX9Ewu3a6jhoA	f	f	t	t
\.


--
-- Data for Name: verificationToken; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."verificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: default
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 15, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.review_id_seq', 1, false);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.tag_id_seq', 225, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: default
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: account account_provider_providerAccountId_pk; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: offerTag offerTag_offerId_tagId_pk; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."offerTag"
    ADD CONSTRAINT "offerTag_offerId_tagId_pk" PRIMARY KEY ("offerId", "tagId");


--
-- Name: offer offer_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT offer_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY ("sessionToken");


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: verificationToken verificationToken_identifier_token_pk; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."verificationToken"
    ADD CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY (identifier, token);


--
-- Name: account_userId_idx; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX "account_userId_idx" ON public.account USING btree ("userId");


--
-- Name: session_userId_idx; Type: INDEX; Schema: public; Owner: default
--

CREATE INDEX "session_userId_idx" ON public.session USING btree ("userId");


--
-- Name: account account_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: offerTag offerTag_offerId_offer_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."offerTag"
    ADD CONSTRAINT "offerTag_offerId_offer_id_fk" FOREIGN KEY ("offerId") REFERENCES public.offer(id);


--
-- Name: offerTag offerTag_tagId_tag_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."offerTag"
    ADD CONSTRAINT "offerTag_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- Name: offer offer_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.offer
    ADD CONSTRAINT "offer_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: review review_offerId_offer_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "review_offerId_offer_id_fk" FOREIGN KEY ("offerId") REFERENCES public.offer(id);


--
-- Name: review review_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "review_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: session session_userId_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: default
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

