-- Admin 관리자
INSERT INTO admin (id, username, password, created_at)
VALUES (1, 'admin', '$2a$10$FQ7cCqzAoD6ZBvHjG7cl1uM21xBTNEymU9dBcl/PMbG0QFnkZkK2W', '2025-04-11');


-- 게시판
INSERT INTO board (title, content, date) VALUES ('가맹점 창업 설명회', '창업 설명회가 4월 15일에 열립니다.', '2025-04-01');
INSERT INTO board (title, content, date) VALUES ('신규 매장 오픈', '서울 강남점 오픈했습니다!', '2025-04-02');
INSERT INTO board (title, content, date) VALUES ('이벤트 공지', 'SNS 공유 이벤트에 참여하세요!', '2025-04-03');

--고객리뷰
INSERT INTO customer_review (content, rating) VALUES ('정말 맛있어요!', 5);
INSERT INTO customer_review (content, rating) VALUES ('직원분들 친절해요.', 4);
INSERT INTO customer_review (content, rating) VALUES ('고기 퀄리티가 좋아요.', 5);

--상담문의
INSERT INTO consultation_inquiries
(name, phone, email, type, region, size, message)
VALUES
('김민수', '010-1234-5678', 'hong@naver.com', '신규 창업', '대전시 중구 대흥동', '25평', '창업 조건이 궁금합니다.');

INSERT INTO consultation_inquiries
(name, phone, email, type, region, size, message)
VALUES
('임영웅', '010-9876-5432', 'kim@daum.net', '현재 매장 운영중', '서울 강남구 역삼1동', '30평', '가맹 혜택 문의드립니다.');

INSERT INTO consultation_inquiries
(name, phone, email, type, region, size, message)
VALUES
('남재우', '010-4682-9852', 'pororo@email.com', '신규 창업', '대전시 서구 둔산동', '35평', '평수 조건이 궁금합니다.');
