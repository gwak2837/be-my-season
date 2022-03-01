DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  nickname varchar(20) NOT NULL,
  profile_image_url text NOT NULL,
  email varchar(255) UNIQUE,
  gender int,
  birthyear char(4),
  birthday char(4),
  phone_number varchar(20) UNIQUE,
  kakao_id int UNIQUE,
  is_admin boolean NOT NULL DEFAULT false
);

DROP TABLE IF EXISTS wysiwyg;

CREATE TABLE wysiwyg (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  contents text NOT NULL,
  `type` int NOT NULL
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

CREATE TABLE program (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
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

CREATE TABLE community (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT NOW(),
  modification_time timestamp NOT NULL DEFAULT NOW(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
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