import React, { useState } from "react";
import "./BoardPage.css"; // 게시판 스타일 시트 불러오기

// 초기 게시글 데이터
const initialBoardData = [
  {
    id: 1,
    title: "창업시 인테리어 비용 10% 할인 이벤트",
    date: "2024.04.01",
    content: "자세한 내용은 상담 시 안내드립니다.",
  },
  {
    id: 2,
    title: "지금 바로 창업 상담시 추가 혜택 제공",
    date: "2024.03.03",
    content: "상담만 받아도 창업 지원 혜택이 제공됩니다.",
  },
  // 추가 공지들
  {
    id: 3,
    title: "지금 바로 창업 상담시 추가 혜택 제공",
    date: "2025.04.13",
    content: "상담만 받아도 창업 지원 혜택이 제공됩니다.",
  },
  {
    id: 4,
    title: "지금 바로 창업 상담시 추가 혜택 제공",
    date: "2025.05.12",
    content: "상담만 받아도 창업 지원 혜택이 제공됩니다.",
  },
  {
    id: 5,
    title: "지금 바로 창업 상담시 추가 혜택 제공",
    date: "2025.05.12",
    content: "상담만 받아도 창업 지원 혜택이 제공됩니다.",
  },
  {
    id: 6,
    title: "지금 바로 창업 상담시 추가 혜택 제공",
    date: "2025.05.12",
    content: "상담만 받아도 창업 지원 혜택이 제공됩니다.",
  },
];

export default function BoardPage() {
  // 게시글 데이터 상태
  const [boardData, setBoardData] = useState(initialBoardData);
  const [selected, setSelected] = useState(null); // 선택된 게시글 (본문 보기용)
  const [showForm, setShowForm] = useState(false); // 게시글 작성 폼 표시 여부
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [showModal, setShowModal] = useState(false); // 상담 모달 상태

  // 오늘 날짜 구하기 함수
  const getToday = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10).replace(/-/g, ".");
  };

  // 새 게시글 작성용 상태
  const [newPost, setNewPost] = useState({
    date: getToday(),
    title: "",
    content: "",
  });

  // 게시글 등록 시 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: boardData.length + 1,
      ...newPost,
    };
    setBoardData([newEntry, ...boardData]); // 새 글을 앞에 추가
    setNewPost({ date: getToday(), title: "", content: "" }); // 입력 초기화
    setShowForm(false); // 폼 닫기
  };

  // 검색 필터 적용
  const filteredData = boardData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="boardpage-container">
      <div className="boardpage-inner">
        {/* 상단 제목 및 글쓰기 버튼 */}
        <div className="boardpage-header">
          <h2 className="boardpage-title">📢 게시판</h2>
          <button
            className="boardpage-btn"
            onClick={() => {
              setShowForm(!showForm); // 폼 열고 닫기 toggle
              if (!showForm) {
                setNewPost({ date: getToday(), title: "", content: "" }); // 새 글 초기화
              }
            }}
          >
            {showForm ? "취소" : "＋ 게시글 추가"}
          </button>
        </div>

        {/* 검색창 */}
        {!showForm && (
          <div className="boardpage-search-wrap">
            <input
              type="text"
              className="boardpage-search-input"
              placeholder="게시글 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="boardpage-search-btn">검색</button>
          </div>
        )}

        {/* 게시글 작성 폼 */}
        {showForm && (
          <form className="boardpage-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="날짜 (YYYY.MM.DD)"
              value={newPost.date}
              onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="제목"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="내용"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              required
            />
            <button type="submit">추가하기</button>
          </form>
        )}

        {/* 게시글 리스트 */}
        <div className="boardpage-list">
          {filteredData.map((item, idx) => (
            <div
              className="boardpage-item"
              key={item.id}
              onClick={() => setSelected(selected === idx ? null : idx)} // 클릭 시 내용 열고 닫기
            >
              <div className="boardpage-icon">📌</div>
              <h4>{item.date}</h4>
              <p>{item.title}</p>
              {selected === idx && (
                <div className="boardpage-content">{item.content}</div>
              )}
            </div>
          ))}
        </div>

        {/* 공지 안내 */}
        <div className="boardpage-footer-info">
          📅 전체공지 : 매월 5일은 본사에서 교육진행 됩니다. 감사합니다.
        </div>

        {/* 상담 신청 버튼 영역 */}
        <div className="boardpage-cta">
          <p>상담을 신청하시면 창업 지원 혜택을 안내드립니다!</p>
          <button className="boardpage-btn" onClick={() => setShowModal(true)}>
            상담 신청하기
          </button>
        </div>

        {/* 홈으로 이동 버튼 */}
        <div className="boardpage-home-link">
          <button
            className="premium-btn"
            onClick={() => (window.location.href = "/")}
          >
            홈으로 돌아가기
          </button>
        </div>

        {/* 하단 푸터 */}
        <footer className="boardpage-footer">
          ⓒ 2025 소소한우게시판. All rights reserved.
        </footer>
      </div>

      {/* 상담 완료 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>문의 완료</h3>
            <p>곧 담당자가 연락드릴 예정입니다. 감사합니다!</p>
            <button onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
