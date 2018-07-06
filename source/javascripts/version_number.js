var xhr = new XMLHttpRequest();
const RELEASE_API_URL = 'https://api.github.com/repos/jmacdonald/amp/releases/latest';

xhr.open('GET', RELEASE_API_URL);
xhr.onload = addVersionNumbers;
xhr.send();

function addVersionNumbers() {
  var release = JSON.parse(xhr.response);
  var versionPlaceholders = document.getElementsByClassName('install');

  for(i = 0; i < versionPlaceholders.length; i++) {
    versionPlaceholders[i].innerHTML = "Install v" + release.tag_name;
  }
}
