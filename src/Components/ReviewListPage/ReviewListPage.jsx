// React 훅과 axios, CSS 불러오기
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewListPage.css";

export default function ReviewListPage() {
  // 모달 상태 및 입력값 상태 정의
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5); // 기본 별점 5
  const [reviews, setReviews] = useState([]); // 리뷰 목록 상태

  // 리뷰 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8083/api/review")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("리뷰 불러오기 실패", err));
  }, []);

  // 후기 제출 처리
  const handleSubmit = () => {
    const newReview = { name: name || "익명 고객", content: review, rating };

    axios
      .post("http://localhost:8083/api/review", newReview)
      .then(() => {
        alert("✅ 후기 제출이 완료되었습니다!");
        setReview("");
        setName("");
        setRating(5);
        setShowModal(false);

        // 새로 등록한 리뷰 포함되도록 다시 불러오기
        return axios.get("http://localhost:8083/api/review");
      })
      .then((res) => setReviews(res.data))
      .catch(() => alert("리뷰 등록 실패"));
  };

  return (
    <section className="review-page-section">
      <div className="review-page-inner">
        <h2 className="review-page-title">전체 고객 후기</h2>
        <p className="review-subtitle">
          방문해주신 고객님들의 진심 어린 후기입니다.
        </p>
        <p className="review-count">
          총 <strong>{reviews.length}</strong>개의 소중한 후기가 있습니다.
        </p>

        <div className="review-page-list">
          {reviews.map((item, i) => (
            <div className="review-card" key={i}>
              <p className="review-icon">👤</p>
              <p className="review-name">{item.name}</p>
              <p className="review-content">{item.content}</p>
              <p className="stars">{"★".repeat(item.rating)}</p>
            </div>
          ))}
        </div>

        <div className="review-footer">
          <button className="premium-btn" onClick={() => setShowModal(true)}>
            후기 남기기
          </button>
        </div>

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>후기 작성</h3>
              <input
                type="text"
                placeholder="이름 (선택)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="후기를 작성해주세요"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div>
                <label>별점: </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {"★".repeat(r)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-buttons">
                <button
                  className="premium-btn"
                  onClick={() => setShowModal(false)}
                >
                  닫기
                </button>
                <button className="premium-btn" onClick={handleSubmit}>
                  등록
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="review-home-link">
        <button
          className="premium-btn"
          onClick={() => (window.location.href = "/")}
        >
          홈으로 돌아가기
        </button>
      </div>

      <footer className="review-footer-copyright">
        ⓒ 2025 소소한우게시판. All rights reserved.
      </footer>
    </section>
  );
}
