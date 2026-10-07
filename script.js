const PAGES = {
  1: { max: 20, next: "page2.html", messages: [
    ["Please maan jao na 🥺", "Mujhse galti ho gayi ❤️"],
    ["Please mujhe maaf kar do 🥺", "I'm really sorry ❤️"],
    ["Mujhse naraz mat raho 😔", "Please meri baat samjho"],
    ["Ek baar maan jao na 🥺", "Dil se sorry ❤️"],
    ["Please forgive me 😔", "Maine jaan-bujhkar nahi kiya"],
    ["Mujhe sach mein regret hai 🥺", "Please gussa mat karo"],
    ["Bas ek chance de do ❤️", "Main sach mein sorry hoon"],
    ["Please mujhse baat kar lo 🥺", "I really want to talk to you"],
    ["Meri galti thi 😔", "Please mujhe maaf kar do"],
    ["Please maan jao ❤️", "Main dobara aisa nahi karunga"],
    ["Itna gussa mat ho 🥺", "Please forgive me"],
    ["I'm truly sorry 😔", "Please ek baar smile kar do"],
    ["Mujhe pata hai meri galti hai 🥺", "Please mujhe maaf kar do"],
    ["Ek last chance please ❤️", "I really mean it"],
    ["Please mujhse naraz mat raho 😔", "Dil se sorry"],
    ["Mujhe tumhe hurt nahi karna tha 🥺", "Please understand me"],
    ["Please maan jao ❤️", "I promise I'll do better"],
    ["Bas ek baar forgive kar do 🥺", "Please"],
    ["Almost maan jao na 😔❤️", "Sirf thoda sa aur"],
    ["Please mujhe maaf kar do 🥺❤️", "Ab Page 2 par chalte hain"]
  ]},
  2: { max: 10, next: "page3.html", messages: [
    ["Please maan jao na 🥺", "Mujhse sach mein galti ho gayi ❤️"],
    ["Abhi bhi naraz ho? 🥺", "Please mujhe maaf kar do"],
    ["I'm really sorry 😔", "Please ek baar meri baat sun lo"],
    ["Meri galti thi 🥺", "Please gussa mat karo ❤️"],
    ["Ek chance de do please 😔", "Main dil se sorry bol raha hoon"],
    ["Please mujhe forgive kar do 🥺", "I promise I'll do better ❤️"],
    ["Bas thoda sa maan jao na 😔", "Tumhari narazgi achhi nahi lagti"],
    ["Please ab gussa chhod do 🥺", "I really mean my sorry ❤️"],
    ["Ek baar smile kar do please 🥺", "Mujhe maaf kar do"],
    ["Thank you 🥺❤️", "Ab please mujhe maaf kar do"]
  ]}
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function floatHearts(count) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = ["❤️", "💖", "🥺", "💗"][i % 4];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 18 + Math.random() * 20 + "px";
    h.style.animationDuration = 3 + Math.random() * 3 + "s";
    h.style.animationDelay = Math.random() * 1.5 + "s";
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
}

const page = PAGES[document.body.dataset.page];

if (page) {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const mainText = document.getElementById("mainText");
  const subText = document.getElementById("subText");
  const counter = document.getElementById("counter");
  const bar = document.getElementById("barFill");
  let yesCount = 0;

  yesBtn.addEventListener("click", () => {
    if (yesCount >= page.max) return;
    yesCount++;
    const [title, sub] = page.messages[yesCount - 1];
    mainText.textContent = title;
    subText.textContent = sub;
    counter.textContent = `YES clicks: ${yesCount} / ${page.max}`;
    bar.style.width = (yesCount / page.max) * 100 + "%";
    floatHearts(2);
    if (yesCount >= page.max) {
      yesBtn.disabled = true;
      floatHearts(14);
      setTimeout(() => (location.href = page.next), 900);
    }
  });

  // NO button dodges the pointer; it leaves a same-size gap so the layout doesn't jump
  const slot = noBtn.parentElement;
  function moveNoButton() {
    if (!noBtn.classList.contains("dodging")) {
      slot.style.width = noBtn.offsetWidth + "px";
      slot.style.height = noBtn.offsetHeight + "px";
      noBtn.classList.add("dodging");
    }
    const maxX = Math.max(10, innerWidth - noBtn.offsetWidth - 10);
    const maxY = Math.max(10, innerHeight - noBtn.offsetHeight - 10);
    noBtn.style.left = 10 + Math.random() * (maxX - 10) + "px";
    noBtn.style.top = 10 + Math.random() * (maxY - 10) + "px";
  }
  noBtn.addEventListener("pointerenter", moveNoButton);
  noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoButton(); }, { passive: false });
  noBtn.addEventListener("click", (e) => { e.preventDefault(); moveNoButton(); });
} else {
  floatHearts(30);
  setInterval(() => floatHearts(3), 2500);
}
