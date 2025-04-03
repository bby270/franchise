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
    title: "4월 교육 진행 합니다.",
    date: "2024.04.10",
    content: "4월 교육 일정은 추후 공지됩니다.",
  },
  {
    id: 4,
    title: "5월 교육 진행 합니다.",
    date: "2024.05.13",
    content: "5월 교육에 대한 자세한 일정은 개별 연락 예정입니다.",
  },
  {
    id: 5,
    title: "6월 교육 진행 합니다.",
    date: "2024.06.15",
    content: "6월에도 많은 관심 부탁드립니다.",
  },
  {
    id: 6,
    title: "7월 교육 진행 합니다.",
    date: "2024.07.01",
    content: "7월 교육도 곧 시작됩니다.",
  },
];

export default function BoardPage() {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ date: "", title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: boardData.length + 1,
      ...newPost,
    };
    setBoardData([...boardData, newEntry]);
    setNewPost({ date: "", title: "", content: "" });
    setShowForm(false);
  };

  return (
    <div className="board-page-container"> {/* ✅ 좌측 밀림 방지 컨테이너 */}
      <div className="board-page">
        <h2 className="board-title">📢 게 시 판</h2>

        <button
          className="add-post-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "취소" : "＋ 게시글 추가"}
        </button>

        {showForm && (
          <form className="add-post-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="날짜 (YYYY.MM.DD)"
              value={newPost.date}
              onChange={(e) =>
                setNewPost({ ...newPost, date: e.target.value })
              }
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

        <div className="board-list">
          {boardData.map((item, idx) => (
            <div
              className="board-item"
              key={item.id}
              onClick={() =>
                setSelected(selected === idx ? null : idx)
              }
            >
              <div className="board-icon">📌</div>
              <h4>{item.date}</h4>
              <p>{item.title}</p>
              {selected === idx && item.content && (
                <div className="board-content">{item.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
