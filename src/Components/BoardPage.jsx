import React, { useState } from "react";
import "./BoardPage.css";

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
  const [boardData, setBoardData] = useState(initialBoardData);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ 모달 상태 추가

  const getToday = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10).replace(/-/g, ".");
  };

  const [newPost, setNewPost] = useState({
    date: getToday(),
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: boardData.length + 1,
      ...newPost,
    };
    setBoardData([newEntry, ...boardData]);
    setNewPost({ date: getToday(), title: "", content: "" });
    setShowForm(false);
  };

  const filteredData = boardData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="boardpage-container">
      <div className="boardpage-inner">
        <div className="boardpage-header">
          <h2 className="boardpage-title">📢 게시판</h2>

          <button
            className="boardpage-btn"
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setNewPost({ date: getToday(), title: "", content: "" });
              }
            }}
          >
            {showForm ? "취소" : "＋ 게시글 추가"}
          </button>
        </div>
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

        <div className="boardpage-list">
          {filteredData.map((item, idx) => (
            <div
              className="boardpage-item"
              key={item.id}
              onClick={() => setSelected(selected === idx ? null : idx)}
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

        {/* 📅 공지 */}
        <div className="boardpage-footer-info">
          📅 전체공지 : 매월 5일은 본사에서 교육진행 됩니다. 감사합니다.
        </div>

        {/* 📢 CTA 버튼 */}
        <div className="boardpage-cta">
          <p>상담을 신청하시면 창업 지원 혜택을 안내드립니다!</p>
          <button className="boardpage-btn" onClick={() => setShowModal(true)}>
            상담 신청하기
          </button>
        </div>

        {/* ⓒ 푸터 */}
        <footer className="boardpage-footer">
          ⓒ 2025 소소한우게시판. All rights reserved.
        </footer>
      </div>

      {/* ✅ 모달 */}
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
