const footer = document.getElementById("footer");

fetch("components/footer.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Footer could not load");
        }

        return response.text();
    })
    .then(html => {
        footer.innerHTML = html;
    })
    .catch(error => console.error(error));