const heroMessage = document.querySelector("#hero-message");
const currentYear = document.querySelector("#current-year");
const revealItems = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const chronicles = [
  "Java Programador.",
  "Ambicioso por Dados.",
  "Explorador de Tecnologias."
];

let chronicleIndex = 0;

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (heroMessage && !prefersReducedMotion) {
  setInterval(() => {
    heroMessage.classList.add("is-changing");

    window.setTimeout(() => {
      chronicleIndex = (chronicleIndex + 1) % chronicles.length;
      heroMessage.textContent = chronicles[chronicleIndex];
      heroMessage.classList.remove("is-changing");
    }, 180);
  }, 4200);
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

let posicao = 0;

function moverCarrossel(direcao) {
  const track = document.getElementById("carousel");
  const viewport = document.querySelector(".carousel-viewport");
  if (!track || !viewport) return;

  const slides = track.querySelectorAll(".game-slide");
  const totalItens = slides.length;
  if (totalItens === 0) return;

  const estilosTrack = window.getComputedStyle(track);
  const gap = parseFloat(estilosTrack.gap || "0");
  const larguraItem = slides[0].offsetWidth + gap;
  const itensVisiveis = Math.floor(viewport.offsetWidth / larguraItem) || 1;
  const maxPosicao = Math.max(0, totalItens - itensVisiveis);

  posicao += direcao;

  if (posicao < 0) posicao = 0;
  if (posicao > maxPosicao) posicao = maxPosicao;

  track.style.transform = `translateX(-${posicao * larguraItem}px)`;
}

window.addEventListener("resize", () => {
  posicao = 0;
  const track = document.getElementById("carousel");
  if (track) {
    track.style.transform = "translateX(0)";
  }
});
