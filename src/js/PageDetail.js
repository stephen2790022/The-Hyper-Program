const PageDetail = (argument) => {
  const preparePage = () => {
    document.querySelector(".displayPlatformSelect").innerHTML = '';
    document.querySelector(".addMoreContent").innerHTML = '';
    let cleanedArgument = argument.replace(/\s+/g, "-");
    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          let name = response.name;
          let description = response.description;
          let released = response.released;
          let background = response.background_image;
          let platform = ''
          response.parent_platforms.forEach((support) => {
            platform += `${support.platform.name} `
          });
          let publisher = '';
          response.publishers.forEach((publish) => {
            publisher += `${publish.name}`
          });
          let developer = '';
          response.developers.forEach((developer) => {
            developer += `${developer.name} `
          })
          let genre = '';
          response.genres.forEach((genres) => {
            genre += `${genres.name} `
          })
          let tags = '';
          response.tags.forEach((tag) => {
            tags += `${tag.name} `
          })
          let stores = '';
          //console.log(response.stores[0].url)
          
          
            response.stores.forEach((store) => {
              stores += `<a href='${store.url}'><p>${store.store.name}</p></a><br>`
            })
  
            let video = response.clip.clip;
            console.log(video)

          document.querySelector(".addJumbotron").innerHTML = `
           <div class="jumbotron" style="background-image: url('${background}')">
           `
          document.querySelector("#pageContent").innerHTML = `
          </div>
          <section class="content">
            <h1>${name}</h1>
            <p id='description'><span>Resum:</span><br>${description}</p>
            <div class="package">
              <p><span>Released:</span><br>${released}</p>
              <p><span>Developer:</span><br>${developer}</p>
              <p><span>Platform:</span><br>${platform}</p>
              <p><span>Publisher:</span><br>${publisher}</p>
            </div>
            <div class="morePackage">
              <p><span>Genre:</span><br>${genre}</p>
              <p class='tags'><span>Tags:</span><br>${tags}</p>
            </div>
            <div class="store">
              <h1>Buy</h1>
              <p>${stores} </p>
            </div>
            <div class="video">
              <h1>Trailer</h1>
              <video src="${video}" controls>
                Your browser does not support the video tag.
              </video>
            </div>
          </section>
          <div class='screenShot'>
            
          </div>
          `
        });
    };
    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };
  preparePage();
};
export { PageDetail };