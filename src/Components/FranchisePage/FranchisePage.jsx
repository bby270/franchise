// React 훅과 라우팅 훅 가져오기
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FranchisePage.css"; // 스타일 시트

// 이미지 가져오기
import main1 from "../../assets/image/main1.png";
import main2 from "../../assets/image/main2.png";
import main3 from "../../assets/image/main3.png";
import logo from "../../assets/image/간판이미지 사진.png";
import storeImg from "../../assets/image/매장소개 사진.png";
import menu1 from "../../assets/image/꽃등심.png";
import menu2 from "../../assets/image/살치살.png";
import menu3 from "../../assets/image/꽃살.png";

// 메인 배경 이미지 배열
const images = [logo,main1, main2, main3];

export default function FranchisePage() {
  // 상태 정의
  const [currentImage, setCurrentImage] = useState(0); // 현재 슬라이드 이미지
  const [activeSection, setActiveSection] = useState("top"); // 활성화된 섹션
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const navigate = useNavigate(); // 페이지 이동 훅

  // 이미지 자동 슬라이드 (5초 간격)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval); // 클린업
  }, []);

  // 스크롤 시 섹션 및 애니메이션 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "board", "reviews", "contact", "intro", "menu"];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(id); // 현재 화면에 보이는 섹션 활성화
        }
      }

      // 페이드 인 애니메이션 적용
      document.querySelectorAll(".fade-in").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.9) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 부드럽게 스크롤 이동하는 함수
  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const start = window.scrollY || window.pageYOffset;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    const duration = 800;
    let startTime = null;

    // easeInOut cubic 함수
    const easeInOut = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeInOut(progress);
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <div className="franchise-wrapper premium-bg">
      {/* 헤더 영역 */}
      <header className="franchise-header premium-header">
        <img src={logo} alt="로고" className="franchise-logo" />
        <nav className="franchise-nav">
          {/* 네비게이션 메뉴 */}
          {["top", "board", "reviews", "contact", "intro", "menu"].map((id) => (
            <a
              key={id}
              onClick={() => scrollTo(id)}
              className={activeSection === id ? "active" : ""}
            >
              {/* 한글 메뉴명 매핑 */}
              {id === "top"
                ? "홈"
                : id === "board"
                ? "게시판"
                : id === "reviews"
                ? "고객후기"
                : id === "contact"
                ? "상담문의"
                : id === "intro"
                ? "매장소개"
                : "메뉴소개"}
            </a>
          ))}
        </nav>
      </header>

      {/* 슬라이드 배경 영역 */}
      <div
        id="top"
        className="franchise-hero fade-in"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="franchise-hero-overlay">
          <h1 className="premium-title">최고의 고기질을 자부하다</h1>
          <p className="premium-sub">대한민국 고기 트렌드를 선도합니다.</p>
        </div>
      </div>

      {/* 게시판 섹션 */}
      <section id="board" className="franchise-section fade-in">
        <div className="inner">
          <h2>📢 게시판</h2>
          <div className="franchise-board-list">
            {/* 최근 게시글 6개 미리보기 */}
            {[
              {
                label: "이벤트",
                date: "2024.04.01",
                title: "창업시 인테리어 비용 10% 할인 이벤트",
              },
              {
                label: "이벤트",
                date: "2024.04.10",
                title: "지금 바로 창업 상담시 추가 혜택 제공",
              },
              {
                label: "이벤트",
                date: "2024.05.10",
                title: "인테리어 비용 10% 할인 이벤트 행사",
              },
              {
                label: "이벤트",
                date: "2024.06.10",
                title:
                  "상담만 해도 사은품 증정 해드리고 있습니다 많은 문의 주세요",
              },
              {
                label: "이벤트",
                date: "2024.07.10",
                title: "마진 없이 다 오픈해드립니다.",
              },
              {
                label: "공지",
                date: "2024.08.10",
                title: "평수는 대표님이 원하시는 대로!",
              },
            ].map((post, idx) => (
              <div className="franchise-board-card" key={idx}>
                <div className="board-meta">
                  <span className="board-label">{post.label}</span>
                  <span className="board-date">{post.date}</span>
                </div>
                <div className="board-title">{post.title}</div>
              </div>
            ))}
          </div>
          {/* 게시판 전체 보기 버튼 */}
          <div className="board-more">
            <button className="premium-btn" onClick={() => navigate("/board")}>
              전체 게시글 보기
            </button>
          </div>
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section id="reviews" className="franchise-section fade-in">
        <div className="inner">
          <h2>고객 후기</h2>
          <div className="franchise-reviews">
            {/* 후기 예시 4개 */}
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div className="franchise-review premium-card" key={i}>
                  <p>고기가 너무 맛있어요 다음에도 또 방문할게요~!</p>
                  <p className="franchise-stars">★★★★★</p>
                </div>
              ))}
          </div>
          <div className="franchise-review-btn-wrap">
            <button
              className="franchise-review-btn"
              onClick={() => navigate("/reviews/all")}
            >
              후기 더 보기
            </button>
          </div>
        </div>
      </section>

      {/* 상담 문의 폼 */}
      <section id="contact" className="franchise-section gray fade-in">
        <div className="inner">
          <h2>상담 문의</h2>
          <form className="franchise-form premium-form contact-grid">
            <input placeholder="성함" />
            <input placeholder="연락처" />
            <input placeholder="이메일" className="full-row" />
            {/* 창업 유형 선택 */}
            <div className="franchise-radio-group full-row">
              <label>
                <input type="radio" name="type" defaultChecked /> 현재 매장
                운영중
              </label>
              <label>
                <input type="radio" name="type" /> 신규 창업
              </label>
            </div>
            <input placeholder="창업 희망 지역" />
            <input placeholder="창업 희망 평수" />
            <textarea className="full-row" placeholder="문의 내용" />
            {/* 제출 버튼 */}
            <div className="form-button full-row">
              <button
                type="button"
                className="franchise-submit premium-btn"
                onClick={() => setShowModal(true)}
              >
                창업 문의하기
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 문의 완료 모달 */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>문의 완료</h3>
            <p>곧 담당자가 연락드릴 예정입니다. 감사합니다!</p>
            <button onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 매장 소개 섹션 */}
      <section id="intro" className="franchise-section fade-in">
        <div className="inner">
          <h2>매장 소개</h2>
          <div className="franchise-intro">
            <img src={storeImg} alt="매장" />
            <div>
              <p className="premium-name">
                <strong>소(笑)소(素)한(韓)우(牛)</strong>
              </p>
              <p>최고의 고기질을 자부하다</p>
              <p>남녀노소 누구나 찾을 수 있는 소고기집이 되겠다는 의미</p>
              <p>
                영업시간
                <br />
                오전 10:00 ~ 오후 10:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 메뉴 소개 섹션 */}
      <section id="menu" className="franchise-section fade-in">
        <div className="inner">
          <h2>메뉴 소개</h2>
          <div className="franchise-menu">
            {/* 메뉴 카드 */}
            {[
              { name: "꽃등심", price: 55000, img: menu1 },
              { name: "살치살", price: 85000, img: menu2 },
              { name: "꽃살", price: 75000, img: menu3 },
            ].map((item, idx) => (
              <div className="franchise-menu-item premium-card" key={idx}>
                <img src={item.img} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price.toLocaleString()} 원</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="franchise-footer fade-in">
        <h3>최고의 고기질을 자부하다</h3>
        <p>대한민국 고기 트렌드를 선도합니다.</p>
        <p className="brand">소 소 한 우</p>
        <div className="footer-icons">
          <span className="bizno">사업자등록번호: 123-45-67890</span>
          <span className="address">대전광역시 유성구 봉명동 582-1</span>
          <span className="phone">042-225-5664</span>
          <span className="email">contact@sosohanwoo.co.kr</span>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#666" }}>
          © 2025 소소한우. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
