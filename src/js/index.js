import '../sass/style.scss';
import { routes } from './routes'

const button = document.querySelector('button')
const search = (event) => {
  event.preventDefault();
  const searchValue = document.searchForm.searchBar.value
  window.location.hash = '#pagelist/' + searchValue
}

let pageArgument;
const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

button.addEventListener('click', (event) => search(event));
window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
