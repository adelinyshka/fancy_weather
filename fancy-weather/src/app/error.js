function errBtnHandler(e) {
  if (e.keyCode === 13 || e.type === 'click') {
    document.querySelector('.fake').remove();
    window.removeEventListener('keypress', errBtnHandler);
  }
}

function showError({ name, message }) {
  if (document.querySelector('.input-search')) {
    document.querySelector('.input-search').blur();
  }

  const errorName = document.createElement('h5');
  errorName.classList.value = 'error-name modal-title';
  errorName.textContent = name;

  const errorHeader = document.createElement('div');
  errorHeader.classList.value = 'error-header modal-header';
  errorHeader.appendChild(errorName);

  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;

  const errorBody = document.createElement('div');
  errorBody.classList.value = 'error-body modal-body';
  errorBody.appendChild(errorMessage);

  const errorButton = document.createElement('button');
  errorButton.classList.value = 'btn btn-success error-button';
  errorButton.setAttribute('type', 'button');
  errorButton.textContent = 'Oops!';
  errorButton.addEventListener('click', errBtnHandler);
  window.addEventListener('keypress', errBtnHandler);

  const errorFooter = document.createElement('div');
  errorFooter.classList.value = 'error-footer modal-footer';
  errorFooter.appendChild(errorButton);

  const errorWrap = document.createElement('div');
  errorWrap.classList.add('error-wrapper');
  errorWrap.append(errorHeader, errorBody, errorFooter);

  const fake = document.createElement('div');
  fake.classList.add('fake');
  fake.appendChild(errorWrap);

  document.body.appendChild(fake);
}

export { errBtnHandler, showError };
