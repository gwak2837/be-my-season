DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  nickname varchar(20) NOT NULL,
  profile_image_url text,
  email varchar(255) NOT NULL UNIQUE,
  sex int NOT NULL,
  birthyear char(4) NOT NULL,
  birthday char(4) NOT NULL,
  phone_number varchar(20) NOT NULL UNIQUE,
  is_admin boolean NOT NULL DEFAULT false,
  is_verified boolean NOT NULL DEFAULT false,
  login_id varchar(20) UNIQUE,
  kakao_id int UNIQUE,
  naver_id int UNIQUE,
  password_hash varchar(1000)
);

DROP TABLE IF EXISTS wysiwyg;

CREATE TABLE wysiwyg (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  contents text NOT NULL
);

DROP TABLE IF EXISTS ritual_maker;

CREATE TABLE ritual_maker (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  name varchar(255) NOT NULL,
  department varchar(255) NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL
);

DROP TABLE IF EXISTS content;

-- type: 0 = column, 1 = interview
CREATE TABLE content (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  `type` int NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS program;

-- type: 0 = pre-w, 1 = re-w, 2 = re-turnship
CREATE TABLE program (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  detail text NOT NULL,
  price int NOT NULL,
  `type` int NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_x_program;

CREATE TABLE user_x_program (
  user_id int REFERENCES user ON DELETE CASCADE,
  program_id int REFERENCES program ON DELETE CASCADE,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, program_id)
);

DROP TABLE IF EXISTS community;

-- type: 0 = before, 1 = ing, 2 = after
CREATE TABLE community (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  detail text NOT NULL,
  `type` int NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_x_community;

CREATE TABLE user_x_community (
  user_id int REFERENCES user ON DELETE CASCADE,
  community_id int REFERENCES program ON DELETE CASCADE,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  --
  PRIMARY KEY (user_id, community_id)
);

DROP TABLE IF EXISTS review;

-- type: 0 = program, 1 = community
CREATE TABLE review (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  point int NOT NULL,
  `type` int NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS qna;

-- type: 0 = program, 1 = community
CREATE TABLE qna (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  `type` int NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS project;

CREATE TABLE project (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS faq;

CREATE TABLE faq (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  category int NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL
);

INSERT INTO wysiwyg (contents)
VALUES ('hello world brand story');

INSERT INTO wysiwyg (contents)
VALUES ('hello world about us');

INSERT INTO wysiwyg (contents)
VALUES ('hello world ritual mate');