import React, { useState } from "react";
import "./ReviewListPage.css";

export default function ReviewListPage() {
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");

  const reviews = Array(6).fill({
    name: "소소한 고객님",
    content: "고기가 정말 맛있고 직원분들도 친절했어요. 다음에 또 방문할게요!",
    rating: 5,
  });

  const handleSubmit = () => {
    alert("✅ 후기 제출이 완료되었습니다!");
    setReview("");
    setName("");
    setShowModal(false);
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

        {/* 후기 작성 모달 */}
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

      <footer className="review-footer-copyright">
        ⓒ 2025 소소한우게시판. All rights reserved.
      </footer>
    </section>
  );
}
