document.addEventListener("DOMContentLoaded", loadMemes);

async function loadMemes() {
    const trendingContainer = document.getElementById("trending-memes");
    const latestContainer = document.getElementById("latest-memes");

    try {
        const response = await fetch("data/memes.json");

        if (!response.ok) {
            throw new Error("Failed to load memes");
        }

        const memes = await response.json();

        function createMemeCard(meme) {
            return `
                <article class="meme-card" id="meme-${meme.id}">
                    <div class="meme-image">
                        <img src="${meme.image}"
                             alt="${meme.title}"
                             loading="lazy">

                        ${meme.trending
                            ? '<span class="meme-badge">Trending</span>'
                            : ''}
                    </div>

                    <div class="meme-info">
                        <span class="meme-category">
                            ${meme.category}
                        </span>

                        <h3>${meme.title}</h3>

                        <div class="meme-actions">

                            <button class="meme-action-btn like-btn"
                                data-id="${meme.id}"
                                aria-label="Like meme"
                                aria-pressed="false">

                                <svg class="action-icon like-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>
                                </svg>

                                <span class="like-count">
                                    ${meme.likes}
                                </span>
                            </button>

                            <span class="meme-views">

                                <svg class="action-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>

                                ${meme.views}
                            </span>

                            <button class="meme-action-btn share-btn"
                                data-id="${meme.id}"
                                aria-label="Share meme">

                                <svg class="action-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="18" cy="5" r="3"/>
                                    <circle cx="6" cy="12" r="3"/>
                                    <circle cx="18" cy="19" r="3"/>
                                    <path d="m8.7 10.7 6.6-4.4"/>
                                    <path d="m8.7 13.3 6.6 4.4"/>
                                </svg>

                                <span>Share</span>
                            </button>

                        </div>
                    </div>
                </article>
            `;
        }

        if (trendingContainer) {
            trendingContainer.innerHTML = memes
                .filter(meme => meme.trending)
                .map(createMemeCard)
                .join("");
        }

        if (latestContainer) {
            latestContainer.innerHTML = [...memes]
                .reverse()
                .map(createMemeCard)
                .join("");
        }

    } catch (error) {
        console.error("Meme loading error:", error);
    }
}

// LIKE AND SHARE ACTIONS
document.addEventListener("click", async (event) => {

    const likeButton = event.target.closest(".like-btn");

    if (likeButton) {
        const countElement = likeButton.querySelector(".like-count");
        const isLiked = likeButton.dataset.liked === "true";

        const currentCount = Number(countElement.textContent);

        likeButton.dataset.liked = String(!isLiked);
        likeButton.setAttribute("aria-pressed", String(!isLiked));

        countElement.textContent = isLiked
            ? currentCount - 1
            : currentCount + 1;

        likeButton.classList.toggle("is-liked", !isLiked);
    }

    const shareButton = event.target.closest(".share-btn");

if (shareButton) {
    const memeId = shareButton.dataset.id;
    const memeCard = shareButton.closest(".meme-card");

    const memeTitle = memeCard.querySelector("h3").textContent;
    const memeUrl = new URL(
        `#meme-${memeId}`,
        window.location.href
    ).href;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "TZ MEMES",
                text: memeTitle,
                url: memeUrl
            });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = memeUrl;

            document.body.appendChild(textArea);
            textArea.select();

            document.execCommand("copy");
            textArea.remove();

            alert("Meme link copied successfully!");
        }
    } catch (error) {
        console.error("Share error:", error);
        alert("Imeshindikana kushare. Jaribu tena.");
    }
}
});