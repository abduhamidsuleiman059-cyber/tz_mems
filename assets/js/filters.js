document.addEventListener("DOMContentLoaded", loadCategories);

async function loadCategories() {
    const categoryList = document.getElementById("category-list");

    if (!categoryList) return;

    try {
        const response = await fetch("data/categories.json");

        if (!response.ok) {
            throw new Error("Categories could not load");
        }

        const categories = await response.json();

        categoryList.innerHTML = categories.map(category => `
            <a href="categories.html?category=${encodeURIComponent(category.id)}"
               class="category-card">

                <div class="category-icon">
                    ${category.icon}
                </div>

                <h3>${category.name}</h3>

                <p>${category.description}</p>

                <span class="category-arrow">Explore →</span>

            </a>
        `).join("");

    } catch (error) {
        console.error("Category error:", error);
        categoryList.innerHTML = "<p>Failed to load categories.</p>";
    }
}