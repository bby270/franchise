// FranchisePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FranchisePage.css";

import main1 from "../assets/image/main1.png";
import main2 from "../assets/image/main2.png";
import main3 from "../assets/image/main3.png";
import logo from "../assets/image/간판이미지 사진.png";
import storeImg from "../assets/image/매장소개 사진.png";
import menu1 from "../assets/image/꽃등심.png";
import menu2 from "../assets/image/살치살.png";
import menu3 from "../assets/image/꽃살.png";

const images = [main1, main2, main3];

export default function FranchisePage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "board", "reviews", "contact", "intro", "menu"];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(id);
        }
      }
      document.querySelectorAll(".fade-in").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.9) {
          el.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const start = window.scrollY || window.pageYOffset;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    const duration = 800; // 원하는 부드러움 정도 (ms)
    let startTime = null;

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
      <header className="franchise-header premium-header">
        <img src={logo} alt="로고" className="franchise-logo" />
        <nav className="franchise-nav">
          {["top", "board", "reviews", "contact", "intro", "menu"].map((id) => (
            <a
              key={id}
              onClick={() => scrollTo(id)}
              className={activeSection === id ? "active" : ""}
            >
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

      <section id="board" className="franchise-section fade-in">
        <div className="inner">
          <h2>📢 게시판</h2>
          <div className="franchise-board-list">
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
                title:
                  "예비 창업주 대표님 저의 소소한우 는 대표님한테 마진없이 다 오픈해드립니다.",
              },
              {
                label: "이벤트",
                date: "2024.08.10",
                title:
                  "가게 창업시 평수는 예비 창업대표님이 원하시는 평수대로 모두 맞춰드리겠습니다.",
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
          <div className="board-more">
            <button className="premium-btn" onClick={() => navigate("/board")}>
              전체 게시글 보기
            </button>
          </div>
        </div>
      </section>

      <section id="reviews" className="franchise-section fade-in">
        <div className="inner">
          <h2>고객 후기</h2>
          <div className="franchise-reviews">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div className="franchise-review premium-card" key={i}>
                  <p>고기가 너무 맛있어요 다음에도 또 방문할게요~!</p>
                  <p className="franchise-stars">★★★★★</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section id="contact" className="franchise-section gray fade-in">
        <div className="inner">
          <h2>상담 문의</h2>
          <form className="franchise-form premium-form contact-grid">
            <input placeholder="성함" />
            <input placeholder="연락처" />
            <input placeholder="이메일" className="full-row" />
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

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>문의 완료</h3>
            <p>곧 담당자가 연락드릴 예정입니다. 감사합니다!</p>
            <button onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}

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
              <p>
                남녀노소 누구나 찾을 수 있는 소고기집이 되겠다는 의미로
                소소한우입니다
              </p>
              <p>
                영업시간
                <br />
                오전 10:00 ~ 오후10:00
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="franchise-section fade-in">
        <div className="inner">
          <h2>메뉴 소개</h2>
          <div className="franchise-menu">
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
