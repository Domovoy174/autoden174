(function () {
  // ===========================================================
  // ---------------------- innit swiper -----------------------
  const swiper = new Swiper('.swiper', {
    speed: 400,
    // slidesPerView: 3,
    spaceBetween: 100,
    direction: 'horizontal',
    loop: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      560: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      1000: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      // when window width is >= 640px
      1100: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  })
  // ===========================================================
  // ---------------------- validate -----------------
  function validate(userRespond) {
    hideError();
    let err = [];
    if (userRespond.name.length < 2) {
      err.push('В имени мало символов');
    };
    if (userRespond.phone.length < 10) {
      err.push('В номере телефона мало символов');
    };
    if (err.length > 0) {
      showError(err, userRespond);
      return false
    }
    return true
  };
  // ===========================================================
  // ---------------------- Show error  -----------------
  function showError(err, userRespond) {
    const errorDiv = document.createElement('div');
    errorDiv.setAttribute('id', 'error');
    errorDiv.classList.add('error');
    for (let key of err) {
      const errorText = document.createElement('p');
      errorText.classList.add('paragraph');
      errorText.innerText = key;
      errorDiv.append(errorText);
    };
    userRespond.el.before(errorDiv);
  };
  // ===========================================================
  // ---------------------- Hide error  -----------------
  function hideError() {
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove('.error');
    };
  };
  // ===========================================================
  // ---------------------- innit burger menu -----------------
  const bntBurger = document.getElementById('nav-burger');
  const nav = document.getElementById('nav');
  const body = document.querySelector('.body');
  const navLink = document.querySelectorAll('.nav__link');

  function burgerMenu() {
    nav.classList.toggle('nav-menu');
    bntBurger.classList.toggle('burger-active')
    body.classList.toggle('body-scroll');
  }
  for (let link of navLink) {
    link.addEventListener('click', () => {
      if (nav.classList.contains('nav-menu')) {
        burgerMenu();
      };
    });
  };
  bntBurger.addEventListener('click', burgerMenu);
  // ===========================================================
  // ---------------------- innit mask number phone ------------
  const buttonForm = document.querySelector('#btnform');
  const phoneClient = document.querySelector('#phone');
  const nameClient = document.querySelector('#name');
  const commentClient = document.querySelector('#comment');
  const mas = new Inputmask("+9(999) 99-999-99");
  mas.mask(phoneClient);
  buttonForm.addEventListener('click', (element) => {
    let phone = Inputmask.unmask(phoneClient.value, { mask: "+9(999) 99-999-99" });
    let name = nameClient.value.trim();
    let comment = commentClient.value.trim();
    const el = element.target;
    const userRespond = {
      name,
      phone,
      comment,
      el,
    };
    if (validate(userRespond)) {
      sendData(userRespond);
    };
  });
  // ===========================================================
  // -------------------- modal windows for message -----------
  function createModalMessage(message) {
    setTimeout(() => {
      const container = document.createElement('div');
      const title = document.createElement('h4');
      const buttonSend = document.createElement('button');
      const buttonClose = document.createElement('button');
      buttonSend.classList.add('btn-send');
      buttonSend.innerText = "Ок";
      buttonClose.classList.add('btn-close');
      container.classList.add('modal__container');
      title.classList.add('title');
      title.classList.add('modal__title');
      title.innerText = message;
      buttonSend.addEventListener('click', () => {
        modalVisible();
        window.location.href = window.location.origin;
      });
      buttonClose.addEventListener('click', () => {
        modalVisible();
        window.location.href = window.location.origin;
      });
      container.append(buttonClose);
      container.append(title);
      container.append(buttonSend);
      modal.append(container);
      modalVisible();
    }, 1000);
  };
  // ===========================================================
  // ---------------------- innit modal windows ------------
  const modal = document.querySelector('.modal');
  function createModal() {
    const container = document.createElement('div');
    const title = document.createElement('h4');
    const labelUserName = document.createElement('label');
    const userName = document.createElement('input');
    const labelUserPhone = document.createElement('label');
    const userPhone = document.createElement('input');
    const labelUserComment = document.createElement('label');
    const userComment = document.createElement('textarea');
    const buttonSend = document.createElement('button');
    const buttonClose = document.createElement('button');
    const buttonCancel = document.createElement('button');
    buttonSend.classList.add('btn-send');
    buttonCancel.classList.add('btn-cancel');
    buttonSend.innerText = "Записаться";
    buttonCancel.innerText = "Отмена";
    buttonClose.classList.add('btn-close');
    buttonSend.addEventListener('click', (element) => {
      let phone = Inputmask.unmask(userPhone.value, { mask: "+9(999) 99-999-99" });
      let name = userName.value.trim();
      let comment = userComment.value.trim();
      const el = element.target;
      const userRespond = {
        name,
        phone,
        comment,
        el,
      };
      if (validate(userRespond)) {
        sendData(userRespond);
        modalVisible();
      };
    })
    buttonCancel.addEventListener('click', () => {
      modalVisible();
    });
    buttonClose.addEventListener('click', () => {
      modalVisible();
    });
    container.classList.add('modal__container');
    title.classList.add('title');
    title.classList.add('modal__title');
    title.innerText = 'Записаться';
    labelUserName.classList.add('paragraph');
    labelUserName.classList.add('modal__label');
    labelUserPhone.classList.add('paragraph');
    labelUserPhone.classList.add('modal__label');
    labelUserComment.classList.add('paragraph');
    labelUserComment.classList.add('modal__label');
    labelUserName.innerText = "Ваше имя";
    labelUserPhone.innerText = "Ваш номер телефона";
    labelUserComment.innerText = "Комментарий";
    userName.classList.add('modal__input');
    userName.setAttribute('type', 'text');
    userName.setAttribute('name', 'name');
    userName.setAttribute('required', '');
    userPhone.classList.add('modal__input');
    userPhone.setAttribute('type', 'text');
    userPhone.setAttribute('name', 'phone');
    userPhone.setAttribute('required', '');
    userComment.classList.add('modal__input');
    userComment.setAttribute('name', 'comment');
    container.append(buttonClose);
    container.append(title);
    labelUserName.append(userName);
    container.append(labelUserName);
    labelUserPhone.append(userPhone);
    container.append(labelUserPhone);
    labelUserComment.append(userComment);
    container.append(labelUserComment);
    container.append(buttonSend);
    container.append(buttonCancel);
    modal.append(container);
    mas.mask(userPhone);
    modalVisible();
  };
  // ===========================================================
  // ---------------------- modal visible -----------------
  function modalVisible() {
    if (modal.classList.contains('modal-active')) {
      document.querySelector('.modal__container').classList.remove('modal__container-active');
      setTimeout(() => {
        modal.classList.remove('modal-active');
        body.classList.remove('body-scroll');
      }, 400);
      setTimeout(() => {
        modal.removeChild(document.querySelector('.modal__container'));
      }, 300);
    } else {
      modal.classList.add('modal-active');
      if (!body.classList.contains('body-scroll')) {
        body.classList.add('body-scroll');
      };
      setTimeout(() => {
        document.querySelector('.modal__container').classList.add('modal__container-active');
      }, 200);
    }
  };
  let callbackButtonArray = document.querySelectorAll('.callback-send');
  for (let callbackButton of callbackButtonArray) {
    callbackButton.addEventListener('click', () => {
      createModal();
    });
  };
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      modalVisible();
    };
  });
  // ===========================================================
  // ---------------------- send data ------------
  function sendData(userRespond) {
    try {
      const form = document.querySelector('.form-hidden');
      document.querySelector('#form-hidden-name').value = userRespond.name;
      document.querySelector('#form-hidden-phone').value = userRespond.phone;
      document.querySelector('#form-hidden-comment').value = userRespond.comment;
      form.submit();
    } catch (e) {
      console.log(e);
    };
  };
  // ===========================================================
  // ------------   Opening a modal window if search params  ------------
  const arg = new URL(location).searchParams.get('send');
  if (arg === 'true') {
    createModalMessage("Мы скоро свяжемся с Вами");
  };
  if (arg === 'false') {
    createModalMessage("Произошла ошибка. Повторите позже");
  };
})()
