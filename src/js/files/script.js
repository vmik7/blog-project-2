
// * Blocking Elements functons

function makeBlocking(element) {
    document.$blockingElements.push(element);
}
function undoBlocking(element) {
    document.$blockingElements.remove(element);
}




// * Hero slider

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




// * Variables

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

const progressValue = document.querySelector('.top-menu__progress-value');

const sidebarFixedBar = document.querySelector('.sidebar__fixed-bar');
const sidebarFixedBarContent = document.querySelector('.sidebar__fixed-bar-content');
const sidebarContent = document.querySelector('.sidebar__content');

let prevScroll = pageYOffset;

let withoutTransition = (elem, func) => {
    let tranBackup = window.getComputedStyle(elem).transitionDuration;
    elem.style.transitionDuration = '0s';
    func();
    setTimeout(() => {
        elem.style.transitionDuration = tranBackup;
    }, 10);
};




// * Burger interactive

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




// * Login button interactive

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




// * PaddingTop to body (because of TopHeader fixed position)

pageBody.style.paddingTop = `${pageTopHeader.offsetHeight}px`;




// * Top-Header interactive

// Functional

let topHeaderHidden;
let showTopHeader = () => {
    if (topHeaderHidden) {
        topHeaderHidden = false;
        pageTop.style.top = `0px`;
        pageTop.classList.remove('page__top_hidden');

        // Smooth fixing sidebar along 500 ms
        // let timerId = setInterval(fixSidebar, 10);
        // setTimeout(() => {
        //     clearInterval(timerId);
        // }, 500);
    }
};
let hideTopHeader = () => {
    if (!topHeaderHidden) {
        topHeaderHidden = true;
        pageTop.style.top = `-${pageTopHeader.offsetHeight}px`;
        pageTop.classList.add('page__top_hidden');

        // Smooth fixing sidebar along 500 ms
        // let timerId = setInterval(fixSidebar, 10);
        // setTimeout(() => {
        //     clearInterval(timerId);
        // }, 500);
    }
};
let fixTopHeader = () => {
    if (pageYOffset > prevScroll) {
        if (pageYOffset > pageTopHeader.offsetHeight) {
            hideTopHeader();
        }
    }
    else {
        showTopHeader();
    }
    prevScroll = pageYOffset;
};

// Initialization

topHeaderHidden = false;
withoutTransition(pageTop, () => {
    pageTop.style.top = `0px`;
    pageTop.classList.remove('page__top_hidden');
});
window.addEventListener('scroll', fixTopHeader);




// * Top-Menu interactive

// Default is hidden, because Top-Menu can be missing
let topMenuHidden = true;

// If Top-Menu exists only
if (pageTopMenu) {

    // Functional
    let showTopMenu = () => {
        if (topMenuHidden) {
            topMenuHidden = false;
            pageTopMenu.style.top = `100%`;
            pageTopMenu.classList.remove('page__top-menu_hidden');
        }
    };
    let hideTopMenu = () => {
        if (!topMenuHidden) {
            topMenuHidden = true;
            pageTopMenu.style.top = `${pageTopHeader.offsetHeight - pageTopMenu.offsetHeight}px`;
            pageTopMenu.classList.add('page__top-menu_hidden');
        }
    };
    let fixTopMenu = () => {
        let offsetValue = pageContent.offsetTop;
        if (pageArticleAction) {
            offsetValue = pageArticleAction.offsetTop + pageArticleAction.offsetHeight;
        }
        if (pageYOffset >= offsetValue) {
            showTopMenu();
        }
        else {
            hideTopMenu();
        }
    };

    let currentArticleProgress;
    let setProgressBarWidth = () => {
        let fullScroll = pageBody.offsetHeight - window.innerHeight;
        currentArticleProgress = Math.max(currentArticleProgress, pageYOffset * 100 / fullScroll);
        progressValue.style.width = `${currentArticleProgress}%`;
    };

    // Initialization

    topMenuHidden = true;
    topMenuHidden = true;
    withoutTransition(pageTopMenu, () => {
        pageTopMenu.style.top = `${pageTopHeader.offsetHeight - pageTopMenu.offsetHeight}px`;
        pageTopMenu.classList.add('page__top-menu_hidden');
    });
    window.addEventListener('scroll', fixTopMenu);

    currentArticleProgress = 0;
    withoutTransition(progressValue, () => {
        progressValue.style.width = `${currentArticleProgress}%`;
    });
    window.addEventListener('scroll', setProgressBarWidth);
}




// * Sidebar interactive

// Functional

let sidebarFixedBarContentHidden;
let showSidebarFixedBarContent = () => {
    if (sidebarFixedBarContentHidden) {
        sidebarFixedBarContentHidden = false;
        sidebarFixedBarContent.style.display = 'block';
        setTimeout(() => {
            sidebarFixedBarContent.classList.remove('sidebar__fixed-bar-content_hidden');
        }, 10);
    }
};
let hideSidebarFixedBarContent = () => {
    if (!sidebarFixedBarContentHidden) {
        sidebarFixedBarContentHidden = true;
        sidebarFixedBarContent.classList.add('sidebar__fixed-bar-content_hidden');
        setTimeout(() => {
            sidebarFixedBarContent.style.display = 'none';
        }, 400);
    }
};
let fixSidebarFixedBarContent = () => {
    let headerOffset = Math.max(pageMain.offsetTop - pageYOffset, 0);
    let expanded = pageSidebarToggle.getAttribute('aria-expanded') === 'true' || false;

    if (headerOffset === 0 && !expanded) {
        showSidebarFixedBarContent();
    }
    else {
        hideSidebarFixedBarContent();
    }
};
let fixSidebar = () => {
    fixSidebarFixedBarContent();

    let headerOffset = Math.max(pageMain.offsetTop - pageYOffset, 0);

    let topOffset = 0;
    if (pageTop && !topHeaderHidden) {
        topOffset += pageTop.offsetHeight;
    }
    if (pageTopMenu && !topMenuHidden) {
        topOffset += pageTopMenu.offsetHeight;
    }

    pageSidebar.style.top = `${headerOffset}px`;
    pageSidebar.style.paddingTop = `${Math.max(topOffset - headerOffset, 0)}px`;
};

let sidebarHidden;
let showSidebar = () => {
    if (sidebarHidden) {
        sidebarHidden = false;
        pageSidebarToggle.setAttribute('aria-expanded', true)
        pageSidebarToggle.classList.add('sidebar__toggle_active');
        pageSidebar.style.right = `${0}px`;
        pageMain.style.paddingRight = `${pageSidebar.offsetWidth}px`;
        fixSidebarFixedBarContent();
    }
};
let hideSidebar = () => {
    if (!sidebarHidden) {
        sidebarHidden = true;
        pageSidebarToggle.setAttribute('aria-expanded', false)
        pageSidebarToggle.classList.remove('sidebar__toggle_active');
        pageSidebar.style.right = `${-sidebarContent.offsetWidth}px`;
        pageMain.style.paddingRight = `${sidebarFixedBar.offsetWidth}px`;
        fixSidebarFixedBarContent();
    }
};

// Initialization

// Show sidebar
sidebarHidden = false;
withoutTransition(pageSidebarToggle, () => {
    pageSidebarToggle.setAttribute('aria-expanded', true)
    pageSidebarToggle.classList.add('sidebar__toggle_active');
});
withoutTransition(pageSidebar, () => {
    pageSidebar.style.right = `${0}px`;
});
withoutTransition(pageMain, () => {
    pageMain.style.paddingRight = `${pageSidebar.offsetWidth}px`;
});

// Setup sidebar top property
let headerOffset = Math.max(pageMain.offsetTop - pageYOffset, 0);
let topOffset = 0;
if (pageTop && !topHeaderHidden) {
    topOffset = pageTop.offsetHeight;
}
if (pageTopMenu && !topMenuHidden) {
    topOffset += pageTopMenu.offsetHeight;
}
pageSidebar.style.top = `${Math.max(headerOffset, topOffset)}px`;

// Hide sidebar-fixed-bar content 
sidebarFixedBarContentHidden = true;
sidebarFixedBarContent.classList.add('sidebar__fixed-bar-content_hidden');
sidebarFixedBarContent.style.display = 'none';

// Toggle button interactive
pageSidebarToggle.addEventListener('click', () => {
    let expanded = pageSidebarToggle.getAttribute('aria-expanded') === 'true' || false;
    if (!expanded) {
        showSidebar();
    }
    else {
        hideSidebar();
    }
});

// Fixing sidebar on scroll
window.addEventListener('scroll', fixSidebar);