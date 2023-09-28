import { setActiveNavLinks } from './HEADER.js';

function immediatelyActions() {
  document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLinks();
  });
}
immediatelyActions();

/*
now it is time to work on the performance of the website which will include:
1. improving the code itself
*/

/* Fetching top articles data */
async function fetchTopArticles() {
  if (!sessionStorage.getItem('top')) {
    const apiKey = '5f4ed83a0b0a4e3f71a1a8a9b95afaa9';
    const category = 'general';
    const data = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${apiKey}`
    );
    // const data = await fetch('http://localhost:3000/news');

    try {
      const dataJson = await data.json();
      sessionStorage.setItem('top', JSON.stringify(dataJson.articles));
      return dataJson.articles;
    } catch (error) {
      throw new Error('this is an Error: ' + error);
    }
  } else {
    return JSON.parse(sessionStorage.getItem('top'));
  }
}

function filterData(arr) {
  return arr.filter(
    data => data.image && data.title && data.source.name && data.description
  );
}

const topArticlesData = await fetchTopArticles();
injectMainArticleSection(topArticlesData);
injectSubArticlesSection(topArticlesData);

/* Show the data on the website page */
async function injectMainArticleSection(data) {
  const showcaseMainCard = document.querySelector(
    '.mainContent__showcase__mainCard'
  );
  const filteredData = filterData(data);
  const mainArticle = filteredData[0];
  showcaseMainCard.innerHTML = `
  <div class="mainContent__showcase__card">
    <div class="mainContent__showcase__card__image">
      <img src="${mainArticle.image}" alt="${mainArticle.title} image" />
    </div>
    <div class="mainContent__showcase__card__details">
      <p>${mainArticle.description}</p>
      <small>${mainArticle.source.name}</small>
    </div>
  </div>
  `;
}

/* Show the data on the website page */
async function injectSubArticlesSection(data) {
  const showcaseSubCards = document.querySelector(
    '.mainContent__showcase__subCards'
  );
  const filteredData = filterData(data);
  const subArticles = filteredData.slice(1, 4);
  subArticles.forEach(article => {
    showcaseSubCards.innerHTML += `
  <div class="mainContent__showcase__card">
    <div class="mainContent__showcase__card__image">
      <img src="${article.image}" alt="${article.title} image" />
    </div>
    <div class="mainContent__showcase__card__details">
      <p>${article.description}</p>
      <small>${article.source.name}</small>
    </div>
  </div>
  `;
  });
}

/* Fetching some news data for side part of news section */
async function fetchSideNewsData() {
  if (!sessionStorage.getItem('side')) {
    const API_KEY = '5f4ed83a0b0a4e3f71a1a8a9b95afaa9';
    const category = 'world';
    const data = await fetch(
      `https://gnews.io/api/v4/top-headlines?lang=en&category=${category}&apikey=${API_KEY}`
    );
    // const data = await fetch('http://localhost:3000/news');
    try {
      const dataJson = await data.json();
      sessionStorage.setItem('side', JSON.stringify(dataJson.articles));
      return dataJson.articles;
    } catch (error) {
      throw new Error('this is an Error: ' + error);
    }
  } else {
    return JSON.parse(sessionStorage.getItem('side'));
  }
}
const sideNews = await fetchSideNewsData();
injectSideSection(sideNews);

/* Show the data on the website page */
async function injectSideSection(data) {
  const asideSection = document.querySelector(
    '.mainContent__news__content__sideList > ul'
  );
  const filteredSideData = filterData(data);
  filteredSideData.forEach(article => {
    asideSection.innerHTML += `
    <li>
      <img src="${article.image}" alt="${article.title} image" />
      <p> ${article.description.substring(0, 80) + '...'} </p>
    </li>
    `;
  });
}

async function selectTags() {
  const tags = document.querySelectorAll('.mainContent__news__tags > div');
  const mainNewsSection = document.querySelector(
    '.mainContent__news__content__newsList'
  );
  tags.forEach(tag => {
    tag.addEventListener('click', async () => {
      tags.forEach(t => t.classList.remove('selected'));
      tag.classList.add('selected');
      mainNewsSection.innerHTML = '';
      const newsCategoryData = await fetchNewsCategoryData();
      InjectMainNewsSection(newsCategoryData);
    });
  });
}
selectTags();

function getSelectedTag() {
  const tags = document.querySelectorAll('.mainContent__news__tags > div');

  for (let tag of tags) {
    if (tag.classList.contains('selected')) return tag.dataset.sort;
  }
}

/* Fetching News data */
async function fetchNewsCategoryData() {
  let category = getSelectedTag();
  if (!sessionStorage.getItem(category)) {
    const apiKey = '5f4ed83a0b0a4e3f71a1a8a9b95afaa9';
    const data = await fetch(
      `https://gnews.io/api/v4/top-headlines?lang=en&category=${category}&apikey=${apiKey}`
    );
    // const data = await fetch('http://localhost:3000/news');
    try {
      const dataJson = await data.json();
      sessionStorage.setItem(category, JSON.stringify(dataJson.articles));
      return dataJson.articles;
    } catch (error) {
      throw new Error('this is an Error: ' + error);
    }
  } else {
    return JSON.parse(sessionStorage.getItem(category));
  }
}

const newsCategoryData = await fetchNewsCategoryData();
InjectMainNewsSection(newsCategoryData);

/* show the news category data in news section */
async function InjectMainNewsSection(data) {
  console.log(data);
  const filteredData = filterData(data);
  console.log(filteredData);
  const mainNewsSection = document.querySelector(
    '.mainContent__news__content__newsList'
  );
  filteredData.forEach(article => {
    mainNewsSection.innerHTML += `
      <div class='mainContent__news__content__newsList__card'>
        <div class='mainContent__news__content__newsList__card__image'>
         <img src="${article.image}" alt='${article.title} image' />
        </div>
        <div class='mainContent__news__content__newsList__card__details'>
          <div>
           <p>${article.title.substring(0, 70) + '...'}</p>
           <small><span>${article.source.name}</span></small>
           <time datetime='${
             article.publishedAt
           }'> 20:00 <span>2030/12/12</span> </time>
          </div>
        </div>
      </div>
    `;
  });
}

function formVerification(email) {
  const emailPattern = /[a-zA-Z0-9_]+@gmail.com/g;

  return emailPattern.test(email);
}

function sendSubscribtionEmail() {
  const subForm = document.querySelector('.mainContent__findUs__contact__form');
  const handleSubscription = e => {
    e.preventDefault();
    const messageParams = {
      name: subForm.name.value,
      email: subForm.email.value,
    };
    if (!formVerification(messageParams.email)) {
      subForm.email.placeholder = 'Wrong email!';
      const faliedAlert = document.getElementById('sub-failed');
      faliedAlert.style.display = 'flex';
      setTimeout(() => {
        faliedAlert.style.display = 'none';
      }, 5000);
      return;
    } else {
      const API_KEY = '_KQJQShsdzZUZcrYU';
      const serviceId = 'service_7co2e1d';
      const templageId = 'template_h5tl79i';
      emailjs
        .send(serviceId, templageId, messageParams, API_KEY)
        .then(() => {
          const successAlert = document.getElementById('sub-success');
          successAlert.style.display = 'flex';
          setTimeout(() => {
            successAlert.style.display = 'none';
          }, 8000);
        })
        .catch(() => {
          const faliedAlert = document.getElementById('sub-failed');
          faliedAlert.style.display = 'flex';
        });
      subForm.email.placeholder = 'Email';
      subForm.name.value = '';
      subForm.email.value = '';
    }
  };

  subForm.addEventListener('submit', handleSubscription);
}
sendSubscribtionEmail();
