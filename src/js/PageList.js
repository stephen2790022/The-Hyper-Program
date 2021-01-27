let nextPage;
let count = 0;

const PageList = (argument = "") => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";
    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "search=" + argument;
      } else {
        finalURL = url + "dates=2021-01-01,2022-01-01&ordering=-added";
      }
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          nextPage = response.next;
          console.log(response.results)
          response.results.forEach((article) => {
            let logo = '';
            article.parent_platforms.forEach((support) => {
             logo +=  `<p class="${support.platform.name}"></p>`
            });
            let genre = '';
            article.genres.forEach((genres) => {
              genre = genres.name
            })
            articles += `
            <a href = "#pagedetail/${article.id}" id='linkCard'>
              <div class="cardGame">
                <div class='displayInfo'>
                  <p>Genre: ${genre}</p>
                  <p>Released: ${article.released}</p>
                  <p>Rating: ${article.rating}</p>
                </div>
                <img class="fit-picture"src="${article.background_image}"
                alt="Grapefruit slice atop a pile of other slices">
                <h1>${article.name}</h1>
                <div class='platLogo'>${logo}</div>
              </div>
            </a>
                `;
          });
          // <!--<h2>${article.released}</h2>-->
          document.querySelector(".displayPlatformSelect").innerHTML = `
          <select name="" class="platformSelection">
          <option value="1,2,3,4,5,6,7,8,9">--Choose an option--</option>
          <option value="1">Pc</option>
          <option value="2">Playstation</option>
          <option value="3">Xbox</option>
          <option value="4">ios</option>
          <option value="5">Mac</option>
          <option value="6">Linux</option>
          <option value="7">Nitendo</option>
          <option value="8">Andoid</option>
          <span class="focus"></span>
          </select>
          `
          document.querySelector('.platformSelection').addEventListener('change', (event) => platformSelect(event));
          document.querySelector(".addMoreContent").innerHTML = `
              <button class='btnMoreContent'>See more content</button>
          `
          document.querySelector('.btnMoreContent').addEventListener('click', () => moreContent());
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games?page=1&page_size=9&", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };
  render();
};
const moreContent = () => {
  count++;
  fetch(`${nextPage}`)
    .then((response) => response.json())
    .then((response) => {
      nextPage = response.next;
      response.results.forEach((article) => {
        document.querySelector(".page-list .articles").innerHTML += `
        <a href = "#pagedetail/${article.id}" id='linkCard'>
          <div class="cardGame">
            <img class="fit-picture"src="${article.background_image}"
            alt="Grapefruit slice atop a pile of other slices">
            <h1>${article.name}</h1>
          </div>
        </a>
            
          `;
      });
    })

  if (count === 2) document.querySelector(".addMoreContent").innerHTML = '';
}



const platformSelect = (event) => {
  let path = window.location.hash.substring(1).split("/");
  let pageArgument = path[1] || "";
  const cleanedArgument = pageArgument.replace(/\s+/g, "-");
  let selection = document.querySelector('.platformSelection').value;
  let url = "https://api.rawg.io/api/games?page=1&page_size=9&";
  let finalURL = url;
  if (cleanedArgument) {
    finalURL = url + `parent_platforms=${selection}&search=` + cleanedArgument
  } else {
    finalURL = url + `parent_platforms=${selection}&dates=2021-01-01,2022-01-01&ordering=-added`
  }

  fetch(`${finalURL}`)
    .then((response) => response.json())
    .then((response) => {
      document.querySelector(".page-list .articles").innerHTML = ""
      nextPage = response.next;
      response.results.forEach((article) => {
        document.querySelector(".page-list .articles").innerHTML += `
        <a href = "#pagedetail/${article.id}" id='linkCard'>
          <div class="cardGame">
            <img class="fit-picture"src="${article.background_image}"
            alt="Grapefruit slice atop a pile of other slices">
            <h1>${article.name}</h1>
          </div>
        </a>
          `;
      })

    })
}


export { PageList };