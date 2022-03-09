DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  contents text NOT NULL
);

DROP TABLE IF EXISTS ritual_maker;

CREATE TABLE ritual_maker (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name varchar(255) NOT NULL,
  department varchar(255) NOT NULL,
  description text NOT NULL,
  image_url text
);

DROP TABLE IF EXISTS content;

-- type: 0 = column, 1 = interview
CREATE TABLE content (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  `type` int NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS program;

-- type: 0 = pre-w, 1 = re-w, 2 = re-turnship
CREATE TABLE program (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(255) NOT NULL,
  price int NOT NULL,
  description text NOT NULL,
  detail text NOT NULL,
  image_url text,
  `type` int NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_x_program;

CREATE TABLE user_x_program (
  user_id int REFERENCES user ON DELETE CASCADE,
  program_id int REFERENCES program ON DELETE CASCADE,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY (user_id, program_id)
);

DROP TABLE IF EXISTS community;

-- type: 0 = before, 1 = ing, 2 = after
CREATE TABLE community (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(255) NOT NULL,
  price int NOT NULL,
  description text NOT NULL,
  detail text NOT NULL,
  image_url text,
  `type` int NOT NULL,
  author_id int REFERENCES user ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_x_community;

CREATE TABLE user_x_community (
  user_id int REFERENCES user ON DELETE CASCADE,
  community_id int REFERENCES program ON DELETE CASCADE,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY (user_id, community_id)
);

DROP TABLE IF EXISTS review;

-- type: 0 = program, 1 = community
CREATE TABLE review (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  point int NOT NULL,
  `type` int NOT NULL,
  target_id int NOT NULL,
  author_id int REFERENCES user ON DELETE
  SET NULL
);

DROP TABLE IF EXISTS qna;

-- type: 0 = program, 1 = community
CREATE TABLE qna (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  `type` int NOT NULL,
  target_id int NOT NULL,
  author_id int REFERENCES user ON DELETE
  SET NULL
);

DROP TABLE IF EXISTS project;

CREATE TABLE project (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  image_url text
);

DROP TABLE IF EXISTS faq;

CREATE TABLE faq (
  id int PRIMARY KEY AUTO_INCREMENT,
  creation_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modification_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  category int NOT NULL,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL
);

-- password_hash: Qwe123!@#
INSERT INTO user (
    nickname,
    email,
    sex,
    birthyear,
    birthday,
    phone_number,
    is_admin,
    is_verified,
    login_id,
    password_hash
  )
VALUES (
    'nickname',
    'be@myseason.com',
    1,
    '1998',
    '0412',
    '010-0000-0000',
    1,
    1,
    'admin',
    '$2a$10$b9iZm0kbNyq4Q2px97Lh9uPkHcZv3JCBYbJBKw5YtcewpdZFIN2PO'
  );

INSERT INTO wysiwyg (contents)
VALUES ('hello world brand story');

INSERT INTO wysiwyg (contents)
VALUES ('hello world about us');

INSERT INTO wysiwyg (contents)
VALUES ('hello world ritual mate');

INSERT INTO content (title, description, `type`, author_id)
VALUES (
    'This is colume title1',
    'Welcome to Be:MySeason1',
    0,
    1
  );

INSERT INTO content (title, description, `type`, author_id)
VALUES (
    'This is colume title2',
    'Welcome to Be:MySeason2',
    0,
    1
  );

INSERT INTO content (title, description, `type`, author_id)
VALUES (
    'This is colume title3',
    'Welcome to Be:MySeason3',
    0,
    1
  );

INSERT INTO content (title, description, `type`, author_id)
VALUES (
    'This is interview title1',
    'Welcome to Be:MySeason1',
    1,
    1
  );

INSERT INTO content (title, description, `type`, author_id)
VALUES (
    'This is interview title2',
    'Welcome to Be:MySeason2',
    1,
    1
  );

INSERT INTO content (title, description, `type`, author_id)
VALUES (
    'This is interview title3',
    'Welcome to Be:MySeason3',
    1,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title1',
    'Welcome to Be:MySeason1',
    'Detail1',
    10000,
    0,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title2',
    'Welcome to Be:MySeason2',
    'Detail2',
    20000,
    0,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title3',
    'Welcome to Be:MySeason3',
    'Detail3',
    30000,
    0,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title1',
    'Welcome to Be:MySeason1',
    'Detail4',
    10000,
    1,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title2',
    'Welcome to Be:MySeason2',
    'Detail5',
    20000,
    1,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title3',
    'Welcome to Be:MySeason3',
    'Detail6',
    30000,
    1,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title1',
    'Welcome to Be:MySeason1',
    'Detail7',
    10000,
    2,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title2',
    'Welcome to Be:MySeason2',
    'Detail8',
    20000,
    2,
    1
  );

INSERT INTO program (
    title,
    description,
    detail,
    price,
    `type`,
    author_id
  )
VALUES (
    'This is title3',
    'Welcome to Be:MySeason3',
    'Detail9',
    30000,
    2,
    1
  );

INSERT INTO user_x_program (user_id, program_id)
VALUES (1, 1);

INSERT INTO user_x_program (user_id, program_id)
VALUES (1, 3);

INSERT INTO user_x_program (user_id, program_id)
VALUES (1, 5);

INSERT INTO user_x_program (user_id, program_id)
VALUES (1, 7);

INSERT INTO user_x_program (user_id, program_id)
VALUES (1, 9);

INSERT INTO review (
    title,
    description,
    point,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is review title',
    'review description',
    4,
    0,
    1,
    1
  );

INSERT INTO review (
    title,
    description,
    point,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is review title2',
    'review description2',
    5,
    0,
    1,
    1
  );

INSERT INTO review (
    title,
    description,
    point,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is review title3',
    'review description3',
    3,
    0,
    1,
    1
  );

INSERT INTO review (
    title,
    description,
    point,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is review title4',
    'review description4',
    3,
    0,
    2,
    1
  );

INSERT INTO review (
    title,
    description,
    point,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is review title5',
    'review description5',
    2,
    0,
    2,
    1
  );

INSERT INTO qna (
    title,
    description,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is qna title',
    'qna description',
    0,
    1,
    1
  );

INSERT INTO qna (
    title,
    description,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is qna title2',
    'qna description2',
    0,
    1,
    1
  );

INSERT INTO qna (
    title,
    description,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is qna title3',
    'qna description3',
    0,
    1,
    1
  );

INSERT INTO qna (
    title,
    description,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is qna title4',
    'qna description4',
    0,
    2,
    1
  );

INSERT INTO qna (
    title,
    description,
    `type`,
    target_id,
    author_id
  )
VALUES (
    'This is qna title5',
    'qna description5',
    0,
    2,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title1',
    10000,
    'Welcome to Be:MySeason1',
    'Detail1',
    0,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title2',
    20000,
    'Welcome to Be:MySeason2',
    'Detail2',
    0,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title3',
    30000,
    'Welcome to Be:MySeason3',
    'Detail3',
    0,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title1',
    40000,
    'Welcome to Be:MySeason1',
    'Detail4',
    1,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title2',
    50000,
    'Welcome to Be:MySeason2',
    'Detail5',
    1,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title3',
    60000,
    'Welcome to Be:MySeason3',
    'Detail6',
    1,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title1',
    70000,
    'Welcome to Be:MySeason1',
    'Detail7',
    2,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title2',
    80000,
    'Welcome to Be:MySeason2',
    'Detail8',
    2,
    1
  );

INSERT INTO community (
    title,
    price,
    description,
    detail,
    `type`,
    author_id
  )
VALUES (
    'This is title3',
    90000,
    'Welcome to Be:MySeason3',
    'Detail9',
    2,
    1
  );

INSERT INTO user_x_community (user_id, community_id)
VALUES (1, 2);

INSERT INTO user_x_community (user_id, community_id)
VALUES (1, 4);

INSERT INTO user_x_community (user_id, community_id)
VALUES (1, 6);

INSERT INTO user_x_community (user_id, community_id)
VALUES (1, 8);

INSERT INTO project (title, description)
VALUES (
    'This is project title',
    'Welcome to Be:MySeason, project description'
  );

INSERT INTO project (title, description)
VALUES (
    'This is project title2',
    'Welcome to Be:MySeason, project description2'
  );

INSERT INTO project (title, description)
VALUES (
    'This is project title3',
    'Welcome to Be:MySeason, project description3'
  );

INSERT INTO project (title, description)
VALUES (
    'This is project title4',
    'Welcome to Be:MySeason, project description4'
  );

INSERT INTO faq (category, title, description)
VALUES (
    0,
    'This is faq title',
    'This is faq description'
  );

INSERT INTO faq (category, title, description)
VALUES (
    1,
    'This is faq title2',
    'This is faq description2'
  );

INSERT INTO faq (category, title, description)
VALUES (
    1,
    'This is faq title3',
    'This is faq description3'
  );

INSERT INTO faq (category, title, description)
VALUES (
    2,
    'This is faq title4',
    'This is faq description4'
  );

INSERT INTO faq (category, title, description)
VALUES (
    2,
    'This is faq title5',
    'This is faq description5'
  );

INSERT INTO faq (category, title, description)
VALUES (
    2,
    'This is faq title6',
    'This is faq description6'
  );