
// ---------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");
    const languageSelect = document.getElementById("language-select");

    const apiKey = 'pub_60757cb6ac2fc1f137f9be2f4a385bf436718';
    let currentLanguage = 'en'; // Default to English

    // Helper function to truncate descriptions
    const truncateDescription = (description, maxLength = 150) => {
        if (description && description.length > maxLength) {
            return description.substring(0, maxLength) + "...";
        }
        return description || "No description available.";
    };

    const fetchNews = () => {
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=Agriculture&country=in&language=${currentLanguage}&category=environment,food`;

        // Clear previous news
        newsContainer.innerHTML = "<p>Loading news...</p>";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const articles = data.results;
                newsContainer.innerHTML = ""; // Clear loading message

                if (!articles || articles.length === 0) {
                    newsContainer.innerHTML = "<p>No news found for agriculture in India.</p>";
                } else {
                    articles.forEach(article => {
                        const newsCard = document.createElement("div");
                        newsCard.classList.add("news-card");

                        // Add image if available
                        if (article.image_url) {
                            const image = document.createElement("img");
                            image.src = article.image_url;
                            image.alt = article.title;
                            newsCard.appendChild(image);
                        }

                        // Add title
                        const title = document.createElement("h2");
                        title.innerText = article.title;

                        // Add truncated description
                        const description = document.createElement("p");
                        description.innerText = truncateDescription(article.description, 150);

                        // Add link
                        const link = document.createElement("a");
                        if (article.link && /^https?:\/\/.+/.test(article.link)) {
                            link.href = article.link;
                            link.innerText = "Read more";
                            link.target = "_blank";
                        } else {
                            link.innerText = "No valid link available";
                            link.href = "#";
                        }

                        // Append elements to the news card
                        newsCard.appendChild(title);
                        newsCard.appendChild(description);
                        newsCard.appendChild(link);

                        // Append the news card to the container
                        newsContainer.appendChild(newsCard);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
            });
    };

    // Fetch news when the page loads
    fetchNews();

    // Update news when language changes
    languageSelect.addEventListener("change", () => {
        currentLanguage = languageSelect.value;
        fetchNews();
    });
});
