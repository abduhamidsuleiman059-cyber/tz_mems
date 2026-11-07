const navbar = document.getElementById("navbar");

fetch("components/navbar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Navbar could not load");
        }
        return response.text();
    })
    .then(html => {
        navbar.innerHTML = html;

        const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    })
    .catch(error => console.error(error));