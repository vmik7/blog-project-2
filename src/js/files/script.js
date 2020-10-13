
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



// Variables

const pageTop = document.querySelector('.page__top');
const pageTopHeader = document.querySelector('.page__top-header');
const pageTopMenu = document.querySelector('.page__top-menu');
const pageBody = document.querySelector('.page__body');
const pageMain = document.querySelector('.page__main');
const pageSidebar = document.querySelector('.page__sidebar');
const pageSidebarToggle = document.querySelector('.page__sidebar-toggle');
const pageContent = document.querySelector('.page__content');
const pageArticleAction = document.querySelector('.page__article-action');

const menuButton = pageTopHeader.querySelector('.top-header__menu .menu__button');
const menuBody = pageTopHeader.querySelector('.top-header__menu .menu__body');

const userBlockBody = pageTopHeader.querySelector('.user-block__body');
const userBlockButton = pageTopHeader.querySelector('.user-block__button');

const progressValue = pageTopMenu.querySelector('.top-menu__progress-value');

const sidebarFixedBar = document.querySelector('.sidebar__fixed-bar');
const sidebarContent = document.querySelector('.sidebar__content');



// Burger interactive

if (window.matchMedia('(max-width: 768px)').matches) {
    let showNavMenu = () => {
        menuButton.setAttribute('aria-expanded', true)
        menuButton.classList.add('menu__button_active');
        menuBody.classList.add('menu__body_open');

        pageBody.classList.add('page__body_lock');
        makeBlocking(pageTopHeader);
    };
    let hideNavMenu = () => {
        menuButton.setAttribute('aria-expanded', false)
        menuButton.classList.remove('menu__button_active');
        menuBody.classList.remove('menu__body_open');

        pageBody.classList.remove('page__body_lock');
        undoBlocking(pageTopHeader);
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
        makeBlocking(pageTopHeader);
    };
    let hideLogin = () => {
        userBlockButton.setAttribute('aria-expanded', false)
        userBlockButton.classList.remove('user-block__button_active');
        userBlockBody.classList.remove('user-block__body_open');

        pageBody.classList.remove('page__body_lock');
        undoBlocking(pageTopHeader);
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



// Padding in Main

let setPaddingMain = () => {
    pageBody.style.paddingTop = `${pageTopHeader.offsetHeight}px`;
}; setPaddingMain();
window.addEventListener('resize', setPaddingMain);



// Top-Header on scroll

let prevScroll = pageYOffset;
window.addEventListener('scroll', () => {
    if (pageYOffset > prevScroll) {
        if (pageYOffset > pageTopHeader.offsetHeight) {
            pageTop.style.top = `-${pageTopHeader.offsetHeight}px`;
            pageTop.classList.add('page__top_hidden');
        }
    }
    else {
        pageTop.style.top = `-${0}px`;
        pageTop.classList.remove('page__top_hidden');
    }
    prevScroll = pageYOffset;
});



// Top-Menu on scroll

if (pageTopMenu) {
    
    let fixTopMenu = () => {
        let offsetValue = pageContent.offsetTop;
        if (pageArticleAction) {
            offsetValue = pageArticleAction.offsetTop + pageArticleAction.offsetHeight;
        }
        if (pageYOffset >= offsetValue) {
            pageTopMenu.style.top = `100%`;
            pageTopMenu.classList.remove('page__top-menu_hidden');
        }
        else {
            pageTopMenu.style.top = `${pageTopHeader.offsetHeight - pageTopMenu.offsetHeight}px`;
            pageTopMenu.classList.add('page__top-menu_hidden');
        }
    }; fixTopMenu();
    window.addEventListener('scroll', fixTopMenu);

    let setProgressBarWidth = () => {
        let fullScroll = pageBody.offsetHeight - window.innerHeight;
        progressValue.style.width = `${pageYOffset * 100 / fullScroll}%`;
    }; setProgressBarWidth();
    window.addEventListener('scroll', setProgressBarWidth);
}




// Sidebar fixing

let fixSidebar = () => {
    let headerOffset = Math.max(pageMain.offsetTop - pageYOffset, 0);
    let topOffset = 0;
    if (pageTop && !pageTop.classList.contains('page__top_hidden')) {
        topOffset = pageTop.offsetHeight;
    }
    if (pageTopMenu && !pageTopMenu.classList.contains('page__top-menu_hidden')) {
        topOffset += pageTopMenu.offsetHeight;
    }
    pageSidebar.style.top = `${Math.max(headerOffset, topOffset)}px`;
}; fixSidebar();
window.addEventListener('scroll', fixSidebar);



// Sidebar hide / show

let showSidebar = () => {
    pageSidebarToggle.setAttribute('aria-expanded', true)
    pageSidebarToggle.classList.add('sidebar__toggle_active');
    pageSidebar.classList.remove('sidebar_hide');
    pageSidebar.style.right = `${0}px`;
    pageMain.style.paddingRight = `${pageSidebar.offsetWidth}px`;
};
let hideSidebar = () => {
    pageSidebarToggle.setAttribute('aria-expanded', false)
    pageSidebarToggle.classList.remove('sidebar__toggle_active');
    pageSidebar.classList.add('sidebar_hide');
    pageSidebar.style.right = `${-sidebarContent.offsetWidth}px`;
    pageMain.style.paddingRight = `${sidebarFixedBar.offsetWidth}px`;
};
pageSidebar.addEventListener('click', () => {
    let expanded = pageSidebarToggle.getAttribute('aria-expanded') === 'true' || false;

    if (!expanded) {
        showSidebar();
    }
    else {
        hideSidebar();
    }
});
showSidebar();