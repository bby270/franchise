import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./adminpage.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("board");
  const [boardList, setBoardList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [inquiryList, setInquiryList] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      alert("관리자만 접근 가능합니다.");
      navigate("/");
    } else {
      fetchBoardData();
      fetchReviewData();
      fetchInquiryData();
    }
  }, [navigate]);

  const fetchBoardData = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/board");
      setBoardList(res.data);
    } catch (err) {
      console.error("게시판 데이터 로딩 실패", err);
    }
  };

  const fetchReviewData = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/review");
      setReviewList(res.data);
    } catch (err) {
      console.error("리뷰 데이터 로딩 실패", err);
    }
  };

  const fetchInquiryData = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/consultation");
      setInquiryList(res.data);
    } catch (err) {
      console.error("문의 데이터 로딩 실패", err);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const urlMap = {
      board: `http://localhost:8083/api/board/${id}`,
      review: `http://localhost:8083/api/review/${id}`,
      inquiry: `http://localhost:8083/api/consultation/simple/${id}`,
    };

    try {
      await axios.delete(urlMap[type]);
      if (type === "board") fetchBoardData();
      if (type === "review") fetchReviewData();
      if (type === "inquiry") fetchInquiryData();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="admin-page" style={{ padding: "2rem" }}>
      <h1>📋 관리자 페이지</h1>

      {/* 탭 메뉴 */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("board")}>📝 게시판 관리</button>
        <button onClick={() => setActiveTab("review")}>⭐ 고객리뷰 관리</button>
        <button onClick={() => setActiveTab("inquiry")}>📞 상담문의 확인</button>
      </div>

      {/* 게시판 관리 */}
      {activeTab === "board" && (
        <div>
          <h2>📝 게시판 관리</h2>
          {boardList.map((post) => (
            <div key={post.id}>
              <div className="admin-box">
                <div
                  style={{ cursor: "pointer", flex: 1 }}
                  onClick={() => toggleExpand(post.id)}
                >
                  <strong>{post.date}</strong> - {post.title}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id, "board");
                  }}
                >
                  삭제
                </button>
              </div>
              {expandedId === post.id && (
                <div className="admin-content-box">
                  {post.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 고객리뷰 관리 */}
      {activeTab === "review" && (
        <div>
          <h2>⭐ 고객리뷰 관리</h2>
          {reviewList.map((review) => (
            <div key={review.id} className="admin-box">
              <div>
                <strong>{review.name}</strong> / 평점: {review.rating}점
                <p style={{ marginTop: "6px" }}>{review.comment}</p>
              </div>
              <button onClick={() => handleDelete(review.id, "review")}>
                삭제
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 상담문의 확인 */}
      {activeTab === "inquiry" && (
  <div>
    <h2>📞 상담문의 확인</h2>
    {inquiryList.map((inq) => (
      <div key={inq.id} className="admin-box">
        <div>
          <p><strong>이름:</strong> {inq.name}</p>
          <p><strong>연락처:</strong> {inq.phone}</p>
          <p><strong>이메일:</strong> {inq.email}</p>
          <p><strong>문의 유형:</strong> {inq.type}</p>
          <p><strong>희망 지역:</strong> {inq.region}</p>
          <p><strong>희망 평수:</strong> {inq.size}</p>
          <p><strong>메시지:</strong><br />{inq.message}</p>
        </div>
        <button onClick={() => handleDelete(inq.id, "inquiry")}>
          삭제
        </button>
      </div>
    ))}
  </div>
)}

      <hr style={{ margin: "2rem 0" }} />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
