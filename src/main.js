import "./styles.css";
import "asciinema-player/dist/bundle/asciinema-player.css";
import * as AsciinemaPlayer from "asciinema-player";

const releaseUrl = "https://api.github.com/repos/jmacdonald/amp/releases/latest";

async function updateInstallLabels() {
  try {
    const response = await fetch(releaseUrl, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) return;

    const release = await response.json();
    if (!release.tag_name) return;

    document.querySelectorAll(".install").forEach((element) => {
      element.textContent = `Install ${release.tag_name}`;
    });

    document.querySelectorAll(".release-version").forEach((element) => {
      element.textContent = release.tag_name;
    });
  } catch {
    // Static labels remain useful when the release API is unavailable.
  }
}

function createAsciicastPlayer(element) {
  const src = element.dataset.castSrc;

  if (!src || element.asciicastPlayer) return element.asciicastPlayer;

  element.asciicastPlayer = AsciinemaPlayer.create(src, element, {
    autoPlay: false,
    controls: false,
    loop: element.hasAttribute("data-loop"),
  });

  return element.asciicastPlayer;
}

function setupAsciicastScrollPlayback() {
  const embeds = document.querySelectorAll(".asciicast-embed");
  if (!embeds.length) return;

  embeds.forEach(createAsciicastPlayer);

  if (!("IntersectionObserver" in window)) {
    embeds.forEach((embed) => {
      embed.asciicastPlayer?.play();
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.asciicastPlayer?.play();
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "-25% 0px -25% 0px",
      threshold: 0.2,
    },
  );

  embeds.forEach((embed) => observer.observe(embed));
}

updateInstallLabels();
setupAsciicastScrollPlayback();
