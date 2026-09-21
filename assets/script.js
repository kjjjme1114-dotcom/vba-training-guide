document.addEventListener("DOMContentLoaded", () => {
  // 코드 복사 버튼
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-target");
      const codeEl = document.getElementById(targetId);
      const text = codeEl.innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // 클립보드 API 미지원 브라우저 대비 fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      const original = btn.textContent;
      btn.textContent = "✅ 복사됨!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 1500);
    });
  });

  // 사이드바 활성 메뉴 하이라이트 (스크롤 위치 기준)
  const sections = document.querySelectorAll("section.step");
  const navLinks = document.querySelectorAll(".sidebar nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((sec) => observer.observe(sec));
});
