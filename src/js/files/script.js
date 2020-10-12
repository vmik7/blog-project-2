
// Blocking Elements functons

function makeBlocking(element) {
    document.$blockingElements.push(element);
}
function undoBlocking(element) {
    document.$blockingElements.remove(element);
}




// Burger interactive

if (window.matchMedia('(max-width: 768px)').matches) {
    const pageBody = document.querySelector('.page__body');
    const mainTopHeader = document.querySelector('.main-top-header');
    const menuButton = document.querySelector('.main-top-header__menu .menu__button');
    const menuBody = document.querySelector('.main-top-header__menu .menu__body');

    let showNavMenu = () => {
        menuButton.setAttribute('aria-expanded', true)
        menuButton.classList.add('menu__button_active');
        menuBody.classList.add('menu__body_open');

        pageBody.classList.add('page__body_lock');
        makeBlocking(mainTopHeader);
    };

    let hideNavMenu = () => {
        menuButton.setAttribute('aria-expanded', false)
        menuButton.classList.remove('menu__button_active');
        menuBody.classList.remove('menu__body_open');

        pageBody.classList.remove('page__body_lock');
        undoBlocking(mainTopHeader);
    };
    
    menuButton.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;

        if (!expanded) {
            showNavMenu();
        }
        else {
            hideNavMenu();
        }
    });

    hideNavMenu();
}



// Login button interactive

if (window.matchMedia('(max-width: 768px)').matches) {
    const pageBody = document.querySelector('.page__body');
    const mainTopHeader = document.querySelector('.main-top-header');
    const userBlockBody = document.querySelector('.main-top-header .user-block__body');
    const userBlockButton = document.querySelector('.main-top-header .user-block__button');

    let showLogin = () => {
        userBlockButton.setAttribute('aria-expanded', true)
        userBlockButton.classList.add('user-block__button_active');
        userBlockBody.classList.add('user-block__body_open');

        pageBody.classList.add('page__body_lock');
        makeBlocking(mainTopHeader);
    };

    let hideLogin = () => {
        userBlockButton.setAttribute('aria-expanded', false)
        userBlockButton.classList.remove('user-block__button_active');
        userBlockBody.classList.remove('user-block__body_open');

        pageBody.classList.remove('page__body_lock');
        undoBlocking(mainTopHeader);
    };
    
    userBlockButton.addEventListener('click', () => {
        let expanded = userBlockButton.getAttribute('aria-expanded') === 'true' || false;

        if (!expanded) {
            showLogin();
        }
        else {
            hideLogin();
        }
    });

    hideLogin();
}



// Hero slider

$('.hero__slider').slick({
    dots: true,
    infinite: true,
    initialSlide: 1,
    speed: 500,
    fade: true,
    adaptiveHeight: true,
    cssEase: 'ease',

    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 21.9996L19.821 43.0996L24 38.6505L8.358 21.9996L24 5.34869L19.821 0.899609L0 21.9996Z" fill="white"/></svg></button>',
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 21.9996L19.821 43.0996L24 38.6505L8.358 21.9996L24 5.34869L19.821 0.899609L0 21.9996Z" fill="white"/></svg></button>',
});



// Page interactive (menu, fixed header, ...)

const pageTopHeader = document.querySelector('.page__top-header');
const pageMain = document.querySelector('.page__main');
const pageContent = document.querySelector('.page__content');
const mainTopHeader = document.querySelector('.main-top-header');


// Page-main padding 
pageMain.style.paddingTop = `${mainTopHeader.offsetHeight}px`;
window.addEventListener('resize', () => {
    pageMain.style.paddingTop = `${mainTopHeader.offsetHeight}px`;
});

// Header scrolling
let prevScroll = pageYOffset;
window.addEventListener('scroll', () => {
   
    if (pageYOffset > prevScroll) {
        if (pageYOffset > mainTopHeader.offsetHeight) {
            pageTopHeader.style.top = `-${mainTopHeader.offsetHeight}px`;
        }
    }
    else {
        pageTopHeader.style.top = `-${0}px`;
    }

    prevScroll = pageYOffset;
});

// Sidebar interactive
