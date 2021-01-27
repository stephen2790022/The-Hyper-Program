const Home = (argument = "") => {
  const PageList = (argument = "") => {
    const preparePage = () => {
      let cleanedArgument = argument.replace(/\s+/g, "-");
      let articles = "";
      const fetchList = (url, argument) => {
        let finalURL = url;
        if (argument) {
          finalURL = url + "?search=" + argument;
        }
  
        fetch(`${finalURL}`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
            response.results.forEach((article) => {
              articles += `
                    <div class="cardGame">
                      <h1>${article.name}</h1>
                      <h2>${article.released}</h2>
                      <a href = "#pagedetail/${article.id}">See more</a>
                    </div>
                  `;
            });
            document.querySelector(".page-list .articles").innerHTML = articles;
          });
      };
  
      fetchList("https://api.rawg.io/api/games", cleanedArgument);
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
  PageList(argument = "")
};

export { Home };