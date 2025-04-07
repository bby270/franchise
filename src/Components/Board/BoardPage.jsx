//  게시판 페이지 (BoardPage.jsx)
// 사용자 게시글을 조회, 추가, 검색할 수 있는 게시판 UI 구성

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BoardPage.css"; // 게시판 스타일 시트 불러오기

export default function BoardPage() {
  // 게시글 상태 및 기타 UI 제어용 상태 정의
  const [boardData, setBoardData] = useState([]); // 게시글 목록
  const [selected, setSelected] = useState(null); // 선택된 게시글 index
  const [showForm, setShowForm] = useState(false); // 작성 폼 표시 여부
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  // 오늘 날짜 반환 함수 (게시글 기본 날짜용)
  const getToday = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10).replace(/-/g, ".");
  };

  // 새 게시글 입력 상태
  const [newPost, setNewPost] = useState({
    date: getToday(),
    title: "",
    content: "",
  });

  //  게시글 목록 불러오기 (백엔드 연동)
  useEffect(() => {
    axios.get("http://localhost:8081/api/board")
      .then((res) => setBoardData(res.data))
      .catch((err) => console.error("게시글 불러오기 오류:", err));
  }, []);

  //  게시글 추가 (폼 제출 시)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/board", newPost);
      setBoardData([res.data, ...boardData]); // 새 글을 앞에 추가
      setNewPost({ date: getToday(), title: "", content: "" });
      setShowForm(false);
    } catch (error) {
      alert("게시글 등록 오류 발생");
    }
  };

  // 검색어로 필터링된 게시글 리스트
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
              setShowForm(!showForm);
              if (!showForm) {
                setNewPost({ date: getToday(), title: "", content: "" });
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
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            <textarea
              placeholder="내용"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
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

        {/* 공지 안내 */}
        <div className="boardpage-footer-info">
          📅 전체공지 : 매월 5일은 본사에서 교육진행 됩니다. 감사합니다.
        </div>

        {/* 상담 신청 버튼 */}
        <div className="boardpage-cta">
          <p>상담을 신청하시면 창업 지원 혜택을 안내드립니다!</p>
          <button className="boardpage-btn" onClick={() => setShowModal(true)}>
            상담 신청하기
          </button>
        </div>

        {/* 홈 이동 버튼 */}
        <div className="boardpage-home-link">
          <button className="premium-btn" onClick={() => (window.location.href = "/")}>홈으로 돌아가기</button>
        </div>

        {/* 푸터 */}
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