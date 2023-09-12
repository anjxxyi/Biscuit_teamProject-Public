-- 테스트 sql 문

-- book table
insert into books (`title` , `author` , `isbn` , `detail` , `price` , `publisher` , `published_date` , `book_img_url`)
    values
    ('테스트제목1' , '테스트작가1' , '10001' , '테스트내용내용1', ' 10000' , '테스트출판사' , '2020-12-06' , 'somewhere');

insert into books (`title` , `author` , `isbn` , `detail` , `price` , `publisher` , `published_date` , `book_img_url`)
    values
    ('테스트제목2' , '테스트작가2' , '10002' , '테스트내용내용2', ' 20000' , '테스트출판사2' , '2020-11-30' , 'somewhere');

insert into books (`title` , `author` , `isbn` , `detail` , `price` , `publisher` , `published_date` , `book_img_url`)
    values
    ('테스트제목3' , '테스트작가3' , '10003' , '테스트내용내용3', ' 30000' , '테스트출판사3' , '2019-06-28' , 'somewhere');

-- user table
insert into `user`  (`user_id`  , `password` , `name` , `nickname` , `phone` , `email` , `birth` , `address` , `address_detail` , `gender` , `grade` , `point` , `created_at` , `updated_at` , `expired_at` , `quit_yn`)
    values ('testuser1' , '1234' , '테스트이름1' , '테스트닉네임1', ' 01012341234' , 'test1@gmail.com' , '1992-10-24' , '서울시 구로구 구로동' , '더조은 아카데미' , 'M' , 'A' , 3000 , now() , now() , null , null);

insert into `user`  (`user_id`  , `password` , `name` , `nickname` , `phone` , `email` , `birth` , `address` , `address_detail` , `gender` , `grade` , `point` , `created_at` , `updated_at` , `expired_at` , `quit_yn`)
    values ('testuser2' , '1234' , '테스트이름2' , '테스트닉네임2', ' 01012341235' , 'test2@gmail.com' , '1991-08-01' , '서울시 관악구 신림동' , '그린컴퓨터아카데미' , 'F' , 'N' , 4000 , now() , now() , null , null);

insert into `user`  (`user_id`  , `password` , `name` , `nickname` , `phone` , `email` , `birth` , `address` , `address_detail` , `gender` , `grade` , `point` , `created_at` , `updated_at` , `expired_at` , `quit_yn`)
    values ('testuser3' , '1234' , '테스트이름3' , '테스트닉네임3', ' 01012341237' , 'test3@gmail.com' , '1997-05-13' , '서울시 동작구 신대방동' , '586-1' , 'F' , 'N' , 4000 , now() , now() , null , null);

insert into `user`  (`user_id`  , `password` , `name` , `nickname`, `authority`, `phone` , `email` , `birth` , `address` , `address_detail` , `gender` , `grade` , `point` , `created_at` , `updated_at` , `expired_at` , `quit_yn`, `zip_code`)
    values ('testuser4', '$2a$10$MB7HTED.35/L2Owf54aqteMCbhRDVpCS73b8nyaWOHaSJmMhTr2Yq', '테스트이름4', '테스트닉네임4', 'A', '01012341238', 'test4@gmail.com' , '1997-05-13' , '서울시 동작구 신대방동' , '586-1' , 'F' , 'L' , 4000 , now() , now() , null , NULL, '');

insert into `user`  (`user_id`  , `password` , `name` , `nickname` , `authority`, `phone` , `email` , `birth` , `address` , `address_detail` , `gender` , `grade` , `point` , `created_at` , `updated_at` , `expired_at` , `quit_yn`, `zip_code`)
    values ('testuser5', '$2a$10$MB7HTED.35/L2Owf54aqteMCbhRDVpCS73b8nyaWOHaSJmMhTr2Yq' , '테스트이름5' , '테스트닉네임5', 'U', '01012341239', 'test5@gmail.com' , '1997-05-13' , '서울시 동작구 신대방동' , '586-1' , 'F' , 'M' , 4000 , now() , now() , null , NULL, '');

-- booklog table

insert into booklog (`booklog_name`  , `today` , `total` , `suber` , `intro`, `user_no`)
    values ('블로그test1' , '0' , '0' , '0', '블로그 소개 입니다 테스트 1' , 1);

insert into booklog (`booklog_name`  , `today` , `total` , `suber` , `intro`, `user_no`)
    values ('블로그test2' , '0' , '0' , '0', '블로그 소개 입니다 테스트 2' , 2);

insert into booklog (`booklog_name`  , `today` , `total` , `suber` , `intro`, `user_no`)
    values ('블로그test3' , '0' , '0' , '0', '블로그 소개 입니다 테스트 3' , 3);

-- booklog_article table

insert into booklog_article (`title`  , `content` , `likes` , `cnt` , `groups`, `kinds` , `created_at` , `updated_at` , `booklog_no` , `books_no` )
    values ('북로그 게시글 제목 테스트1' , '내용테스트 너무 재밌었어요 ㅎㅎㅎㅎㅎ ㅡㅡ 테스트1' , '0' , '0', '혼자 읽은 책', '감성적인' , now() , now() , 1 , 1);

insert into booklog_article (`title`  , `content` , `likes` , `cnt` , `groups`, `kinds` , `created_at` , `updated_at` , `booklog_no` , `books_no` )
    values ('북로그 게시글 제목 테스트2' , '내용테스트 별로 sdf  테스트2' , '0' , '0', '예전에 읽은 책', '스릴러' , now() , now() , 2 , 1);

insert into booklog_article (`title`  , `content` , `likes` , `cnt` , `groups`, `kinds` , `created_at` , `updated_at` , `booklog_no` , `books_no` )
    values ('북로그 게시글 제목 테스트3' , '내용테스트 별로 fdg  테스트3' , '0' , '0', '아이와 함께 읽은 책', '동화' , now() , now() , 3 , 2);

insert into booklog_article (`title`  , `content` , `likes` , `cnt` , `groups`, `kinds` , `created_at` , `updated_at` , `booklog_no` , `books_no` )
    values ('북로그 게시글 제목 테스트4' , '내용테스트 aadf  테스트4' , '0' , '0', '혼자 읽은 책', '감성적인' , now() , now() , 1 , 2);

insert into booklog_article (`title`  , `content` , `likes` , `cnt` , `groups`, `kinds` , `created_at` , `updated_at` , `booklog_no` , `books_no` )
    values ('북로그 게시글 제목 테스트5' , '내용테스트 별로 안무섭네  테스트5' , '0' , '0', '혼자 읽은 책', '스릴러' , now() , now() , 2 , 3);

-- comment table

insert into comment (`content`  , `del_yn` , `created_at` , `updated_at` , `user_no`, `booklog_article_no`  , `upcomment_no`)
    values ('맞아요 맞아요 테스트1' , 'N' , now() , now() , 2 , 1 , null);

insert into comment (`content`  , `del_yn` , `created_at` , `updated_at` , `user_no`, `booklog_article_no`  , `upcomment_no`)
    values ('아니요 아니요 테스트2' , 'N' , now() , now() , 2 , 1 , 1);

insert into comment (`content`  , `del_yn` , `created_at` , `updated_at` , `user_no`, `booklog_article_no`  , `upcomment_no`)
    values ('재밌다 테스트3' , 'N' , now() , now() , 1 , 2 , null);

-- user_sub table

insert into user_sub  (`created_at`  , `user_no` , `subed_no`)
    values (now() , 1 , 2 );

insert into user_sub  (`created_at`  , `user_no` , `subed_no`)
    values (now() , 1 , 3 );

insert into user_sub  (`created_at`  , `user_no` , `subed_no`)
    values (now() , 2 , 1 );

-- event table

insert into event  (`title`  , `content` , `cnt` , `likes` , `del_yn` , `created_at` , `updated_at`)
    values ('김지석과 함께하는 모임 테스트1', '작가 김지석과 소통하는 이벤트 	블라블라 테스트1' , '0' , '0' , 'N' , now() , now() );

insert into event  (`title`  , `content` , `cnt` , `likes` , `del_yn` , `created_at` , `updated_at`)
    values ('윤길 선생의 다작 테스트2', '윤길 선생 작품의 비법 소개 블라블라 테스트2' , '0' , '0' , 'N' , now() , now() );

-- participation table 이벤트 참여 목록

insert into participation  (`event_no`  , `user_no` , `created_at`)
    values (1, 3 , now() );

insert into participation  (`event_no`  , `user_no` , `created_at`)
    values (1, 2 , now() );

insert into participation  (`event_no`  , `user_no` , `created_at`)
    values (1, 1 , now() );

insert into participation  (`event_no`  , `user_no` , `created_at`)
    values (2, 3 , now() );

-- 주의 ! DB UTF- 8 적용 ddl

ALTER TABLE bookclass CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE bookclip CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE booklog CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE booklog_article CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE books CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE comment CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE event CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE goods CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE images CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE orders CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE participation CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE recycle CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE saved_goods CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE test1 CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE `user` CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE user_sub CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE useraddress CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;

