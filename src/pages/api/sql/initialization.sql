CREATE TABLE user (
  id int PRIMARY KEY AUTO_INCREMENT,
  nickname varchar(20) NOT NULL,
  profile_image_url text NOT NULL,
  email varchar(255) UNIQUE,
  gender int,
  birthyear char(4),
  birthday char(4),
  phone_number varchar(20) UNIQUE,
  kakao_id int UNIQUE,
);