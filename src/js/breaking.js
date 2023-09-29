import { setActiveNavLinks } from './import/HEADER.js';
import { filterData } from './import/methods.js';

function immediatelyActions() {
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLinks();
  });
}
immediatelyActions();

/* Fetching Breaking News */
async function fetchBreakingNews() {
  if (!sessionStorage.getItem('breaking')) {
    const API_KEY = '5f4ed83a0b0a4e3f71a1a8a9b95afaa9';
    const breakingNews = await fetch(
      `https://gnews.io/api/v4/search?q=breaking&lang=en&apikey=${API_KEY}`
    );

    try {
      const jsonData = await breakingNews.json();
      sessionStorage.setItem('breaking', JSON.stringify(jsonData.articles));
      return jsonData.articles;
    } catch (error) {
      console.log('There is something wrong: ' + error);
    }
  } else {
    return JSON.parse(sessionStorage.getItem('breaking'));
  }
}

/* show breaking news data */
const breakingNewsData = await fetchBreakingNews();
injectBreakingNewsSection(breakingNewsData);

function injectBreakingNewsSection(data) {
  const breakingNewsSection = document.querySelector('.breaking__news');
  console.log(breakingNewsSection);
  const filteredData = filterData(data);

  filteredData.forEach(article => {
    breakingNewsSection.innerHTML += `
    <div>
      <img src="${article.image}" alt="${article.title} image" />
      <div>
        <h3>${
          article.title.slice(0, 10) === 'BREAKING: '
            ? `<span>${article.title.slice(0, 10)}</span>${article.title.slice(
                10
              )}`
            : article.title
        }</h3>
        <p>${article.description}</p>
      </div>
    </>
    `;
  });
}
