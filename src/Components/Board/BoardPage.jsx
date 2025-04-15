// 게시판 페이지 컴포넌트
// 게시글 조회, 추가, 검색, 빠른 상담신청 기능 포함

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BoardPage.css"; // 게시판 전용 스타일

export default function BoardPage() {
  // 게시글 상태 관리
  const [boardData, setBoardData] = useState([]);
  const [selected, setSelected] = useState(null); // 선택된 게시글 index
  const [showForm, setShowForm] = useState(false); // 글쓰기 폼 토글
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [showModal, setShowModal] = useState(false); // 사용 안됨 (기존 모달)
  const [simpleModalOpen, setSimpleModalOpen] = useState(false); // 빠른 상담 모달
  const [simpleName, setSimpleName] = useState("");
  const [simplePhone, setSimplePhone] = useState("");

  // 오늘 날짜 반환 (글쓰기 폼 기본값용)
  const getToday = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10).replace(/-/g, ".");
  };

  // 새 글 작성 상태
  const [newPost, setNewPost] = useState({
    date: getToday(),
    title: "",
    content: "",
  });

  // 게시글 목록 불러오기 (최초 1회 실행)
  useEffect(() => {
    axios
      .get("http://localhost:8083/api/board")
      .then((res) => setBoardData(res.data))
      .catch((err) => console.error("게시글 불러오기 오류:", err));
  }, []);

  // 게시글 등록
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {title,content} = newPost;

    if(!title.trim() || !content.trim()) {
      alert("모든 내용을 작성해주세요.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8083/api/board", newPost);
      setBoardData([res.data, ...boardData]); // 최신글 앞에 추가
      setNewPost({ date: getToday(), title: "", content: "" }); // 초기화
      setShowForm(false); // 폼 닫기
    } catch (error) {
      alert("게시글 등록 오류 발생");
    }
  };

  // 빠른 상담 제출 처리
  const handleSimpleSubmit = async () => {
    if (!simpleName || !simplePhone) {
      alert("이름과 연락처를 입력해주세요.");
      return;
    }
    try {
      await axios.post("http://localhost:8083/api/consultation/simple",{
        name: simpleName,
        phone: simplePhone,
      });
      alert("문의가 접수되었습니다. 곧 연락드리겠습니다!");
      setSimpleModalOpen(false);
      setSimpleName("");
      setSimplePhone("");
    } catch (err) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  //  검색어로 필터링된 게시글
  const filteredData = boardData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="boardpage-container">
      <div className="boardpage-inner">
        {/* 상단 헤더 및 글쓰기 버튼 */}
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
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <textarea
              placeholder="내용"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            />
            <button type="submit">추가하기</button>
          </form>
        )}

        {/* 게시글 목록 */}
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

        {/* 공지사항 */}
        <div className="boardpage-footer-info">
          📅 전체공지 : 매월 5일은 본사에서 교육진행 됩니다. 감사합니다.
        </div>

        {/* 빠른 상담 CTA */}
        <div className="boardpage-cta">
          <p>상담을 신청하시면 창업 지원 혜택을 안내드립니다!</p>
          <button
            className="boardpage-btn"
            onClick={() => setSimpleModalOpen(true)}
          >
            상담 신청하기
          </button>
        </div>

        {/* 홈으로 돌아가기 */}
        <div className="boardpage-home-link">
          <button
            className="premium-btn"
            onClick={() => (window.location.href = "/")}
          >
            홈으로 돌아가기
          </button>
        </div>

        {/* 푸터 */}
        <footer className="boardpage-footer">
          ⓒ 2025 소소한우게시판. All rights reserved.
        </footer>
      </div>

      {/* 빠른 상담 모달창 */}
      {simpleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>빠른 상담 신청</h3>
            <input
              placeholder="이름"
              value={simpleName}
              onChange={(e) => setSimpleName(e.target.value)}
            />
            <input
              placeholder="연락처"
              value={simplePhone}
              onChange={(e) => setSimplePhone(e.target.value)}
            />
            <button className="premium-btn" onClick={handleSimpleSubmit}>
              제출하기
            </button>
            <button
              className="boardpage-btn"
              onClick={() => setSimpleModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
