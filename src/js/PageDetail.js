const PageDetail = (argument) => {
  const preparePage = () => {
    document.querySelector(".welcome").innerHTML = '';
    document.querySelector(".displayPlatformSelect").innerHTML = '';
    document.querySelector(".addMoreContent").innerHTML = '';
    let cleanedArgument = argument.replace(/\s+/g, "-");
    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response )
          let name = response.name;
          let description = response.description;
          let released = response.released;
          let background = response.background_image;
          let raiting = response.rating;
          let votes = response.ratings_count;
          let platform = ''
          response.parent_platforms.forEach((support) => {
            platform += `${support.platform.name} `
          });
          let publisher = '';
          response.publishers.forEach((publish) => {
            publisher += `${publish.name}`
          });
          let developerName = '';
          response.developers.forEach((developer) => {
            developerName += `${developer.name} `
          });

          let genre = '';
          response.genres.forEach((genres) => {
            genre += `${genres.name} `
          })
          let tags = '';
          response.tags.forEach((tag) => {
            tags += `${tag.name} `
          })
          let stores = '';
          response.stores.forEach((store) => {
            stores += `<a href='${store.url}'><p>${store.store.name}</p></a><br>`
          })

          let video = response.clip.clip;
          let slug;
          fetch(`https://api.rawg.io/api/games/${response.slug}/screenshots`)
            .then((response) => response.json())
            .then((response) => {
              response.results.forEach((screenshot) => {
                document.querySelector('.screenShot').innerHTML += `
                  <img src="${screenshot.image}">
                `
              })
            })
            
          fetch(`https://api.rawg.io/api/games/${response.id}/youtube?page=1&page_size=4`)
            .then((response) => response.json())
            .then((response) => {  
                       
              response.results.forEach((youtubeVideo, index) => {
           
                if (index == 0) {
                  document.querySelector('.youtubeImage').innerHTML += `
                  <img class="#" src="${youtubeVideo.thumbnails.high.url}">
                  <div class='title'>
                    <h1>${youtubeVideo.name}</h1>
                    <p>${youtubeVideo.channel_title} - ${youtubeVideo.created}</p>
                    
                  </div>
                  `
                } else {
                  document.querySelector('.youtubeVideo').innerHTML += `
                  <a href = "https://www.youtube.com/watch?v=${youtubeVideo.external_id} ">
                    <div class="youtubeCard">
                      <img class="cardImage" src="${youtubeVideo.thumbnails.high.url}"
                      alt="Grapefruit slice atop a pile of other slices">
                      <h1>${youtubeVideo.name}</h1>
                      <p>${youtubeVideo.created}</p>
                    </div>
                  </a>
                  `
                }     
              })
            })


            let logo = '';
            response.parent_platforms.forEach((support) => {
             logo +=  `<p class="${support.platform.name}"></p>`
            });
            let genree = '';
            response.genres.forEach((genre) => {
              genree = genre.name
            })
            fetch(`https://api.rawg.io/api/games/${response.id}/suggested`)
              .then((response) => response.json())
              .then((response) => {
                response.results.forEach((suggested) => {
                  document.querySelector('.similarGame').innerHTML += `
                  <a href = "#pagedetail/${suggested.id}" id='linkCard'>
                  <div class="cardGame">
                    <div class='displayInfo'>
                      <p>Genre: ${genree}</p>
                      <p>Released: ${suggested.released}</p>
                      <p>Rating: ${suggested.rating}/5 - ${suggested.ratings_count} votes</p>
                    </div>
                    <img class="fit-picture"src="${suggested.background_image}"
                    alt="Grapefruit slice atop a pile of other slices">
                    <h1>${suggested.name}</h1>
                    <div class='platLogo'>${logo}</div>
                  </div>
                </a>
                  `
                })
              })


          document.querySelector(".addJumbotron").innerHTML = `
           <div class="jumbotron" style="background-image: url('${background}')">
           `
          document.querySelector("#pageContent").innerHTML = `
          </div>
          <section class="content">
            <div class='displayTitleVotes'>
              <h1 id='description'>${name},</h1>
              <p>${raiting}/5 - ${votes} votes</p>
            </div>

            <p ><span>Resum:</span><br>${description}</p>
            <div class="package">
              <p><span>Released:</span><br>${released}</p>
              <p><span>Developer:</span><br>${developerName}</p>
              <p><span>Platform:</span><br>${platform}</p>
              <p><span>Publisher:</span><br>${publisher}</p>
            </div>
            <div class="morePackage">
              <p><span>Genre:</span><br>${genre}</p>
              <p class='tags'><span>Tags:</span><br>${tags}</p>
            </div>
            <div class="store">
              <h1>BUY</h1>
              <p>${stores} </p>
            </div>
            <div class="video">
              <h1>TRAILER</h1>
              <video src="${video}" controls>
                Your browser does not support the video tag.
              </video>
            </div>
            <h1 id='screenshottitle'>SCREENSHOTS</h1>
            <div class='screenShot'>
            </div>

            <h1 id='youtubeH'>YOUTUBE</h1>   
            <div class='youtubeImage'>
            </div>
            <div class='youtubeVideo'>
            </div>

            <h1 id='similarH'>SIMILAR GAME</h1>
            <div class='similarGame'>
            </div>

              
            
              
            
          </section>
          `
        });
    };
    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };
  preparePage();
};
export { PageDetail };