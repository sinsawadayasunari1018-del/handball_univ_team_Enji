/* ============================
  ページ表示フェードイン
============================ */
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
  });
  
  
  /* ============================
    ページ遷移フェードアウト
  （#リンク、外部リンク、_blank を除外）
  ============================ */
  document.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (!link) return;
  
    const href = link.getAttribute("href");
    if (!href) return;
  
    // ページ内リンク (#〜) → 除外
    if (href.startsWith("#")) return;
  
    // 外部サイト → 除外
    if (href.startsWith("http")) return;
  
    // 新しいタブ → 除外
    if (link.target === "_blank") return;
  
    // 通常ページ遷移のみフェードアウト
    e.preventDefault();
    document.body.classList.remove("loaded");
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  });
  
  
  /* ============================
    スムーズスクロール（#リンク）
  ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
  
      const target = document.querySelector(targetId);
      if (!target) return;
  
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
  
  
  /* ============================
    セクションのフェードイン
  ============================ */
  const sections = document.querySelectorAll("section");
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });
  
  sections.forEach(section => observer.observe(section));
  
  
  /* ============================
    ヒーロースライドショー
  ============================ */
  const slides = document.querySelectorAll(".hero-slide");
  let heroIndex = 0;
  
  setInterval(() => {
    slides[heroIndex].classList.remove("active");
    heroIndex = (heroIndex + 1) % slides.length;
    slides[heroIndex].classList.add("active");
  }, 4000);
  
  
  /* ============================
    メンバースライドショー（3枚ランダム表示）
  ============================ */
  const members = [
    { name: "山田 太郎", img: "https://placehold.jp/220x220.png?text=Yamada", link: "member_yamada.html" },
    { name: "佐藤 花子", img: "https://placehold.jp/220x220.png?text=Sato", link: "member_sato.html" },
    { name: "田中 一郎", img: "https://placehold.jp/220x220.png?text=Tanaka", link: "member_tanaka.html" },
    { name: "鈴木 次郎", img: "https://placehold.jp/220x220.png?text=Suzuki", link: "member_suzuki.html" },
    { name: "高橋 美咲", img: "https://placehold.jp/220x220.png?text=Takahashi", link: "member_takahashi.html" },
    { name: "伊藤 健", img: "https://placehold.jp/220x220.png?text=Ito", link: "member_ito.html" },
    { name: "渡辺 愛", img: "https://placehold.jp/220x220.png?text=Watanabe", link: "member_watanabe.html" },
    { name: "中村 翔", img: "https://placehold.jp/220x220.png?text=Nakamura", link: "member_nakamura.html" },
    { name: "加藤 優", img: "https://placehold.jp/220x220.png?text=Kato", link: "member_kato.html" },
    { name: "小林 彩", img: "https://placehold.jp/220x220.png?text=Kobayashi", link: "member_kobayashi.html" }
  ];
  
  const memberContainer = document.getElementById("member-slideshow");
  let currentMembers = [];
  
  function showRandomMembers() {
    // ランダムで3名
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
  
    // 前の画像 → フェードアウト
    currentMembers.forEach(a => a.classList.remove("active"));
  
    // 切り替え
    setTimeout(() => {
      memberContainer.innerHTML = "";
      currentMembers = selected.map(m => {
        const a = document.createElement("a");
        a.href = m.link;
        a.innerHTML = `<img src="${m.img}" alt="${m.name}">`;
        memberContainer.appendChild(a);
        return a;
      });
  
      // フェードイン
      setTimeout(() => {
        currentMembers.forEach(a => a.classList.add("active"));
      }, 50);
    }, 1000);
  }
  
  showRandomMembers();
  setInterval(showRandomMembers, 5000);
  
  
  /* ============================
    ハンバーガーメニュー
  ============================ */
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
  