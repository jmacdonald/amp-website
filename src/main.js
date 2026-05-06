import "./styles.css";

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
  } catch {
    // Static "Install" label remains useful when the release API is unavailable.
  }
}

updateInstallLabels();
