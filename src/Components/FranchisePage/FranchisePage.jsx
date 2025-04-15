// React 훅과 라우팅 훅 가져오기
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // HTTP 요청을 위한 axios 사용
import "./FranchisePage.css"; // 페이지 스타일

// 이미지 불러오기
import main1 from "../../assets/image/main1.png";
import main2 from "../../assets/image/main2.png";
import main3 from "../../assets/image/main3.png";
import logo from "../../assets/image/간판이미지 사진.png";
import storeImg from "../../assets/image/매장소개 사진.png";
import menu1 from "../../assets/image/꽃등심.png";
import menu2 from "../../assets/image/살치살.png";
import menu3 from "../../assets/image/꽃살.png";
import menu4 from "../../assets/image/계란찜.png";
import menu5 from "../../assets/image/김치찌게.png";
import menu6 from "../../assets/image/된장찌게.png";
import menu7 from "../../assets/image/뚝배기라면.png";

// 메인 배경 이미지 배열
const images = [logo, main1, main2, main3, storeImg];

export default function FranchisePage() {
  // 이미지 슬라이드용 상태
  // const [currentImage, setCurrentImage] = useState(0);
  // 새롭게 카드 클릭용 상태 추가
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  // 현재 활성화된 섹션 추적 (스크롤 따라 nav 강조용)
  const [activeSection, setActiveSection] = useState("top");

  // 문의 완료 모달 표시 여부
  const [showModal, setShowModal] = useState(false);

  // 페이지 이동용 라우팅 훅
  const navigate = useNavigate();

  // 문의 폼 상태 관리
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("현재 매장 운영중");
  const [region, setRegion] = useState("");
  const [size, setSize] = useState("");
  const [message, setMessage] = useState("");

  // 게시판 및 후기 목록 상태
  const [boardList, setBoardList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  // 게시글/후기 데이터를 백엔드에서 불러오기
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8083/api/board"),
      axios.get("http://localhost:8083/api/review"),
    ])
      .then(([boardRes, reviewRes]) => {
        setBoardList(boardRes.data);
        setReviewList(reviewRes.data);
      })
      .catch((error) => console.error("데이터 가져오기 실패", error));
  }, []);

  // 문의폼 제출 시 동작
  const handleSubmit = async () => {
    if (!name || !phone || !email || !region || !size || !message) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      await axios.post("http://localhost:8083/api/consultation", {
        name,
        phone,
        email,
        type,
        region,
        size,
        message,
      });

      // 폼 초기화 및 완료 모달 표시
      setName("");
      setPhone("");
      setEmail("");
      setType("현재 매장 운영중");
      setRegion("");
      setSize("");
      setMessage("");
      setShowModal(true);
    } catch (error) {
      alert("전송 중 오류가 발생했습니다.");
    }
  };

  // 메인 이미지 슬라이드 4초마다 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoSlide]);

  // 스크롤 이벤트 핸들링 (fade-in 효과 및 메뉴 활성화)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "board", "reviews", "contact", "intro", "menu"];

      for (let id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(id);
        }
      }

      // 요소가 화면 안으로 들어오면 fade-in 효과 적용
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

  // 부드러운 스크롤 함수 (네비게이션 클릭 시 사용)
  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const start = window.scrollY || window.pageYOffset;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    const duration = 800;
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
      {/* 헤더 */}
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

      {/* 메인 히어로 이미지 */}
      <div
        id="top"
        className="franchise-hero fade-in"
        style={{ backgroundImage: `url(${images[selectedIndex]})` }}
      >
        <div className="franchise-hero-overlay">
          <h1 className="premium-title">최고의 고기질을 자부하다</h1>
          <p className="premium-sub">대한민국 고기 트렌드를 선도합니다.</p>
        </div>
      </div>
      {/*클릭 시 자동 전환 멈춤*/}
      <div className="thumbnail-container fade-in">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`thumbnail-card ${
              selectedIndex === idx ? "active" : ""
            }`}
            onClick={() => {
              setSelectedIndex(idx);
              setAutoSlide(false);
              setTimeout(() => setAutoSlide(true), 8000);
            }}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* 게시판 섹션 */}
      <section id="board" className="franchise-section fade-in">
        <div className="inner">
          <h2>📢 게시판</h2>
          <div className="franchise-board-list">
            {boardList.map((post, idx) => (
              <div className="franchise-board-card" key={idx}>
                <div className="board-meta">
                  <span className="board-label">{post.label || "공지"}</span>
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

      {/* 고객 후기 섹션 */}
      <section id="reviews" className="franchise-section fade-in">
        <div className="inner">
          <h2>고객 후기</h2>
          <div className="franchise-reviews">
            {reviewList.length > 0 ? (
              reviewList.map((review, i) => (
                <div className="franchise-review premium-card" key={i}>
                  <p>{review.content}</p>
                  <p className="franchise-stars">{"★".repeat(review.rating)}</p>
                </div>
              ))
            ) : (
              <p>등록된 후기가 없습니다.</p>
            )}
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

      {/* 상담 문의 섹션 */}
      <section id="contact" className="franchise-section gray fade-in">
        <div className="inner">
          <h2>상담 문의</h2>
          <form className="franchise-form premium-form contact-grid">
            {/* 입력 필드들 */}
            <input
              placeholder="성함"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="연락처"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              placeholder="이메일"
              className="full-row"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* 라디오 버튼 */}
            <div className="franchise-radio-group full-row">
              <label>
                <input
                  type="radio"
                  name="type"
                  checked={type === "현재 매장 운영중"}
                  onChange={() => setType("현재 매장 운영중")}
                />
                현재 매장 운영중
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  checked={type === "신규 창업"}
                  onChange={() => setType("신규 창업")}
                />
                신규 창업
              </label>
            </div>

            {/* 나머지 폼 필드 */}
            <input
              placeholder="창업 희망 지역(예:대전시 중구 대흥동)"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <input
              placeholder="창업 희망 평수"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <textarea
              className="full-row"
              placeholder="문의 내용"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="form-button full-row">
              <button
                type="button"
                className="franchise-submit premium-btn"
                onClick={handleSubmit}
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

      {/* 매장 소개 */}
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

      {/* 메뉴 소개 */}
      <section id="menu" className="franchise-section fade-in">
        <div className="inner">
          <h2>메뉴 소개</h2>
          <div className="franchise-menu">
            {/* 메뉴 항목 반복 렌더링 */}
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
      {/* 사이드 메뉴 소개  */}
      <section id="side-menu" className="franchise-section fade-in">
        <div className="inner">
          <h2>사이드 메뉴 소개</h2>
          <div className="franchise-menu">
            {[
              { name: "뚝배기라면", price: 5000, img: menu7 },
              { name: "계란찜", price: 4000, img: menu4 },
              { name: "김치찌게", price: 7000, img: menu5 },
              { name: "된장찌게", price: 7000, img: menu6 },
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
