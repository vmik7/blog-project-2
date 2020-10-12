
// Blocking Elements functons

function makeBlocking(element) {
    document.$blockingElements.push(element);
}
function undoBlocking(element) {
    document.$blockingElements.remove(element);
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

    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><svg height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 21.9996L19.821 43.0996L24 38.6505L8.358 21.9996L24 5.34869L19.821 0.899609L0 21.9996Z" fill="white"/></svg></button>',
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><svg height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 21.9996L19.821 43.0996L24 38.6505L8.358 21.9996L24 5.34869L19.821 0.899609L0 21.9996Z" fill="white"/></svg></button>',
});



// Page elements to controll

const pageTopHeader = document.querySelector('.page__top-header');
const pageBody = document.querySelector('.page__body');
const pageMain = document.querySelector('.page__main');
const pageSidebar = document.querySelector('.page__sidebar');
const pageContent = document.querySelector('.page__content');

const mainTopHeader = document.querySelector('.main-top-header');

const menuButton = document.querySelector('.main-top-header__menu .menu__button');
const menuBody = document.querySelector('.main-top-header__menu .menu__body');

const userBlockBody = document.querySelector('.main-top-header .user-block__body');
const userBlockButton = document.querySelector('.main-top-header .user-block__button');

const sidebarControlButton = document.querySelector('.sidebar__control-btn');
const sidebarFixedBar = document.querySelector('.sidebar__fixed-bar');
const sidebarContent = document.querySelector('.sidebar__content');



// Burger interactive

if (window.matchMedia('(max-width: 768px)').matches) {
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



// Page-main padding 

pageBody.style.paddingTop = `${mainTopHeader.offsetHeight}px`;
window.addEventListener('resize', () => {
    pageBody.style.paddingTop = `${mainTopHeader.offsetHeight}px`;
});

// Header scrolling
let prevScroll = pageYOffset;
window.addEventListener('scroll', () => {
   
    if (pageYOffset > prevScroll) {
        if (pageYOffset > mainTopHeader.offsetHeight) {
            pageTopHeader.style.top = `-${mainTopHeader.offsetHeight}px`;
            pageTopHeader.classList.add('top-header_hide');
        }
    }
    else {
        pageTopHeader.style.top = `-${0}px`;
        pageTopHeader.classList.remove('top-header_hide');
    }

    prevScroll = pageYOffset;
});



// Sidebar interactive

// Fixing
let fixSidebar = () => {
    pageSidebar.style.top = `${Math.max(pageMain.offsetTop - pageYOffset, 0)}px`;
    pageSidebar.style.paddingTop = `${pageTopHeader.offsetHeight + pageTopHeader.offsetTop}px`;
}; fixSidebar();
window.addEventListener('scroll', fixSidebar);

// Hide / Show
let showSidebar = () => {
    sidebarControlButton.setAttribute('aria-expanded', true)
    sidebarControlButton.classList.add('sidebar__control-btn_active');
    pageSidebar.classList.remove('sidebar_hide');
    pageSidebar.style.right = `${0}px`;
    pageMain.style.paddingRight = `${pageSidebar.offsetWidth}px`;
};

let hideSidebar = () => {
    sidebarControlButton.setAttribute('aria-expanded', false)
    sidebarControlButton.classList.remove('sidebar__control-btn_active');
    pageSidebar.classList.add('sidebar_hide');
    pageSidebar.style.right = `${-sidebarContent.offsetWidth}px`;
    pageMain.style.paddingRight = `${sidebarFixedBar.offsetWidth}px`;
};

pageSidebar.addEventListener('click', () => {
    let expanded = sidebarControlButton.getAttribute('aria-expanded') === 'true' || false;

    if (!expanded) {
        showSidebar();
    }
    else {
        hideSidebar();
    }
});

showSidebar();