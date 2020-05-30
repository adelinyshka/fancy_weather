function startPreloader() {
  const preloaderHtml = document.createElement('div');
  preloaderHtml.classList.add('preloader');
  preloaderHtml.innerHTML =
    '<div class="cssload-wrap">\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  <div class="cssload-circle"></div>\n' +
    '  </div>';

  document.body.append(preloaderHtml);
}


export { startPreloader };
