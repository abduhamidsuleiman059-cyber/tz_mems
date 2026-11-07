document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("memeSearch");
    const searchButton = document.getElementById("searchBtn");

    const memeContainers = [
        document.getElementById("trending-memes"),
        document.getElementById("latest-memes")
    ].filter(Boolean);

    if (!searchInput || !searchButton) return;

    function searchMemes() {
        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        memeContainers.forEach(container => {
            const memeCards = container.querySelectorAll(".meme-card");
            let visibleCount = 0;

            memeCards.forEach(card => {
                const memeText = card.textContent.toLowerCase();

                const matches = memeText.includes(searchTerm);

                card.style.display = matches ? "" : "none";

                if (matches) visibleCount++;
            });

            let emptyMessage = container.querySelector(
                ".search-empty-state"
            );

            if (!emptyMessage) {
                emptyMessage = document.createElement("p");
                emptyMessage.className = "search-empty-state";
                container.appendChild(emptyMessage);
            }

            if (searchTerm && visibleCount === 0) {
                emptyMessage.textContent =
                    "Hakuna meme iliyopatikana. Jaribu neno jingine.";
                emptyMessage.style.display = "block";
            } else {
                emptyMessage.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", searchMemes);

    searchButton.addEventListener("click", searchMemes);

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            searchMemes();
        }
    });
});