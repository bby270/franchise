// React 훅과 CSS 불러오기
import React, { useState } from "react";
import "./ReviewListPage.css";

// 리뷰 페이지 컴포넌트
export default function ReviewListPage() {
  // 모달 표시 여부 상태
  const [showModal, setShowModal] = useState(false);

  // 입력된 리뷰 내용과 이름 상태
  const [review, setReview] = useState("");
  const [name, setName] = useState("");

  // 샘플 리뷰 데이터 (6개)
  const reviews = Array(8).fill({
    name: "소소한 고객님",
    content: "고기가 정말 맛있고 직원분들도 친절했어요. 다음에 또 방문할게요!",
    rating: 5, // 별점
  });

  // 후기 제출 처리
  const handleSubmit = () => {
    alert("✅ 후기 제출이 완료되었습니다!"); // 알림 표시
    setReview(""); // 입력값 초기화
    setName("");
    setShowModal(false); // 모달 닫기
  };

  return (
    <section className="review-page-section">
      <div className="review-page-inner">
        {/* 제목 영역 */}
        <h2 className="review-page-title">전체 고객 후기</h2>
        <p className="review-subtitle">
          방문해주신 고객님들의 진심 어린 후기입니다.
        </p>
        <p className="review-count">
          총 <strong>{reviews.length}</strong>개의 소중한 후기가 있습니다.
        </p>

        {/* 리뷰 카드 리스트 */}
        <div className="review-page-list">
          {reviews.map((item, i) => (
            <div className="review-card" key={i}>
              <p className="review-icon">👤</p>
              <p className="review-name">{item.name}</p>
              <p className="review-content">{item.content}</p>
              <p className="stars">{"★".repeat(item.rating)}</p> {/* 별점 출력 */}
            </div>
          ))}
        </div>

        {/* 후기 남기기 버튼 */}
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
              {/* 이름 입력 (선택사항) */}
              <input
                type="text"
                placeholder="이름 (선택)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* 후기 내용 입력 */}
              <textarea
                placeholder="후기를 작성해주세요"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="modal-buttons">
                {/* 모달 닫기 버튼 */}
                <button
                  className="premium-btn"
                  onClick={() => setShowModal(false)}
                >
                  닫기
                </button>
                {/* 후기 등록 버튼 */}
                <button className="premium-btn" onClick={handleSubmit}>
                  등록
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🏠 홈으로 돌아가기 버튼 */}
      <div className="review-home-link">
        <button
          className="premium-btn"
          onClick={() => (window.location.href = "/")}
        >
          홈으로 돌아가기
        </button>
      </div>

      {/* 하단 푸터 */}
      <footer className="review-footer-copyright">
        ⓒ 2025 소소한우게시판. All rights reserved.
      </footer>
    </section>
  );
}
