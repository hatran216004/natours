export const hideAlert = () => {
  const ele = document.querySelector('.alert');
  if (ele) {
    ele.parentElement.removeChild(ele);
  }
};

// type is success or error
// 'afterbegin': Chèn vào bên trong, ngay sau thẻ mở của phần tử.
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  setTimeout(hideAlert, 5000);
};
