
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




// * Cards slider

$('.cards-slider__body').slick({
    dots: true,
    infinite: false,
    appendDots: '.cards-slider__bottom-controls',
    appendArrows: '.cards-slider__bottom-controls',
    prevArrow: '<button type="button" class="slick-prev">Назад</button>',
    nextArrow: '<button type="button" class="slick-next">Вперед</button>',
});




// * Variables

const pageTop = document.querySelector('.page__top');
const pageTopHeader = document.querySelector('.page__top-header');
const pageTopMenu = document.querySelector('.page__top-menu');
const pageBody = document.querySelector('.page__body');
const pageMain = document.querySelector('.page__main');
const pageSidebar = document.querySelector('.page__sidebar');
const pageSidebarToggle = document.querySelector('.page__sidebar-toggle');
const pageSidebarOverlayer = document.querySelector('.page__sidebar-overlayer');
const pageContent = document.querySelector('.page__content');
const pageArticleAction = document.querySelector('.page__article-action');
const pageFooter = document.querySelector('.page__footer');

const menuButton = pageTopHeader.querySelector('.top-header__menu .menu__button');
const menuBody = pageTopHeader.querySelector('.top-header__menu .menu__body');

const userBlockBody = pageTopHeader.querySelector('.user-block__body');
const userBlockButton = pageTopHeader.querySelector('.user-block__button');

const progressValue = document.querySelector('.top-menu__progress-value');

const sidebarFixedBar = document.querySelector('.sidebar__fixed-bar');
const sidebarFixedBarContent = document.querySelector('.sidebar__fixed-bar-content');
const sidebarContent = document.querySelector('.sidebar__content');

const contentsTable = document.querySelector('.article-header__contents-table');
const contentsTableControl = contentsTable && contentsTable.querySelector('.contents-table__control');
const contentsTableBody = contentsTable && contentsTable.querySelector('.contents-table__body');

const scrollButton = document.querySelector('.article__scroll-top');

const cardsSlider = document.querySelector('.cards-slider');
const cardsControlSort = cardsSlider && cardsSlider.querySelector('.cards-slider__control-sort');
const cardsSortButton = cardsControlSort && cardsControlSort.querySelector('.cards-slider__sort-button');
const cardsSortLabel = cardsControlSort && cardsControlSort.querySelector('.cards-slider__sort-label');
const cardsSortIcon = cardsControlSort && cardsControlSort.querySelector('.cards-slider__sort-icon');
const cardsSortList = cardsControlSort && cardsControlSort.querySelector('.cards-slider__sort-list');
const cardsSortValues = cardsControlSort && cardsControlSort.querySelectorAll('.cards-slider__sort-value');

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




// * Cards-slider sort select

if (cardsControlSort) {
    let showSelectList = () => {
        cardsSortButton.classList.add('cards-slider__sort-button_active');
        cardsSortList.classList.add('cards-slider__sort-list_show');
        cardsSortButton.removeEventListener('click', fixSelect);
        setTimeout(() => {
            window.addEventListener('click', closeOnClick);
        }, 10);
    };
    let hideSelectList = () => {
        cardsSortButton.classList.remove('cards-slider__sort-button_active');
        cardsSortList.classList.remove('cards-slider__sort-list_show');
        cardsSortButton.addEventListener('click', fixSelect);
    };
    let closeOnClick = (event) => {
        hideSelectList();
        window.removeEventListener('click', closeOnClick);
    };
    let fixSelect = () => {
        showSelectList();
        for (let value of cardsSortValues) {
            value.addEventListener('click', (event) => {
                cardsSortLabel.innerText = event.target.innerText;
                hideSelectList();
            });
        }
    };
    
    hideSelectList();
}




// * Contents-Table interactive

if (contentsTable) {
    let showContentsTableBody = () => {
        contentsTableControl.setAttribute('aria-expanded', true);
        contentsTableControl.classList.add('contents-table__control_hide');
        contentsTableControl.classList.remove('contents-table__control_show');
        contentsTable.classList.remove('contents-table_hidden');
        contentsTableBody.inert = false;
    };
    let hideContentsTableBody = () => {
        contentsTableControl.setAttribute('aria-expanded', false);
        contentsTableControl.classList.remove('contents-table__control_hide');
        contentsTableControl.classList.add('contents-table__control_show');
        contentsTable.classList.add('contents-table_hidden');
        contentsTableBody.inert = true;
    };
    
    contentsTableControl.addEventListener('click', () => {
        let expanded = contentsTableControl.getAttribute('aria-expanded') === 'true' || false;
        if (!expanded) {
            showContentsTableBody();
        }
        else {
            hideContentsTableBody();
        }
    });

    showContentsTableBody();
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
    let footerOffset = Math.max(window.innerHeight - pageFooter.offsetTop + window.pageYOffset, 0);
    let expanded = pageSidebarToggle.getAttribute('aria-expanded') === 'true' || false;

    if (headerOffset === 0 && footerOffset === 0 && !expanded) {
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

    let footerOffset = Math.max(window.innerHeight - pageFooter.offsetTop + window.pageYOffset, 0);
    pageSidebar.style.bottom = `${footerOffset}px`;
};

let sidebarHidden;
let showSidebar = () => {
    if (sidebarHidden) {
        sidebarHidden = false;
        pageSidebarToggle.setAttribute('aria-expanded', true)

        if (window.matchMedia('(min-width: 1291px)').matches) {

            // Desktop

            pageSidebar.style.right = `${0}px`;
            pageMain.style.paddingRight = `${pageSidebar.offsetWidth}px`;
            pageSidebarToggle.classList.add('sidebar__toggle_active');
            pageSidebar.classList.remove('sidebar_hidden');

            fixSidebarFixedBarContent();
        }
        else if (window.matchMedia('(min-width: 481px)').matches) {

            // Tablet

            pageSidebarOverlayer.classList.add('page__sidebar-overlayer_active');
            pageBody.classList.add('page__body_lock');

            let headerOffset = Math.max(pageMain.offsetTop - pageYOffset, 0);
            let footerOffset = Math.max(window.innerHeight - pageFooter.offsetTop + window.pageYOffset, 0);

            if (headerOffset || footerOffset) {

                withoutTransition(pageSidebarOverlayer, () => {
                    pageSidebarOverlayer.style.zIndex = '5';
                });
                withoutTransition(pageSidebar, () => {
                    pageSidebar.style.zIndex = '5';
                });

                setTimeout(() => {
                    let tranBackup = window.getComputedStyle(pageSidebar).transition;
                    pageSidebar.style.transition = 'all 0.3s ease';

                    let topOffset = 0;
                    if (pageTop && !topHeaderHidden) {
                        topOffset += pageTop.offsetHeight;
                    }
                    if (pageTopMenu && !topMenuHidden) {
                        topOffset += pageTopMenu.offsetHeight;
                    }

                    pageSidebar.style.top = `${topOffset}px`;
                    pageSidebar.style.paddingTop = `0px`;
                    pageSidebar.style.bottom = `0px`;

                    setTimeout(() => {
                        pageSidebar.style.transition = tranBackup;
                        pageSidebar.style.right = `${0}px`;
                        pageSidebarToggle.classList.add('sidebar__toggle_active');
                        pageSidebar.classList.remove('sidebar_hidden');
                    }, 300);
                }, 40);
            }
            else {
                pageSidebarOverlayer.style.zIndex = '5';
                pageSidebar.style.zIndex = '5';
                pageSidebar.style.right = `${0}px`;
                pageSidebarToggle.classList.add('sidebar__toggle_active');
                pageSidebar.classList.remove('sidebar_hidden');
            }

            fixSidebarFixedBarContent();
        }
        else {

            // Mobile

            pageSidebarOverlayer.classList.add('page__sidebar-overlayer_active');
            pageBody.classList.add('page__body_lock');

            pageSidebarToggle.classList.add('sidebar__toggle_active');
            pageSidebar.classList.remove('sidebar_hidden');

        }

    }
};
let hideSidebar = () => {
    if (!sidebarHidden) {
        sidebarHidden = true;
        pageSidebarToggle.setAttribute('aria-expanded', false);

        if (window.matchMedia('(min-width: 1291px)').matches) {

            // Desktop

            pageMain.style.paddingRight = `${sidebarFixedBar.offsetWidth}px`;
            pageSidebarToggle.classList.remove('sidebar__toggle_active');
            pageSidebar.classList.add('sidebar_hidden');
            pageSidebar.style.right = `${-sidebarContent.offsetWidth}px`;

            fixSidebarFixedBarContent();
        }
        else if (window.matchMedia('(min-width: 481px)').matches) {

            // Tablet

            pageSidebarToggle.classList.remove('sidebar__toggle_active');
            pageSidebar.classList.add('sidebar_hidden');
            pageSidebar.style.right = `${-sidebarContent.offsetWidth}px`;

            let headerOffset = Math.max(pageMain.offsetTop - pageYOffset, 0);
            let footerOffset = Math.max(window.innerHeight - pageFooter.offsetTop + window.pageYOffset, 0);

            if (headerOffset || footerOffset) {
                setTimeout(() => {
                    let tranBackup = window.getComputedStyle(pageSidebar).transition;
                    pageSidebar.style.transition = 'all 0.4s ease';
    
                    fixSidebar();
                    
                    pageSidebarOverlayer.classList.remove('page__sidebar-overlayer_active');
                    pageBody.classList.remove('page__body_lock');
    
                    setTimeout(() => {
                        pageSidebar.style.transition = tranBackup;
                        pageSidebar.style.zIndex = '0';
                        pageSidebarOverlayer.style.zIndex = '0';
                    }, 400);
                }, 400);
            }
            else {
                pageSidebarOverlayer.classList.remove('page__sidebar-overlayer_active');
                pageBody.classList.remove('page__body_lock');
                pageSidebar.style.zIndex = '0';
                pageSidebarOverlayer.style.zIndex = '0';
            }

            fixSidebarFixedBarContent();
        }
        else {

            // Mobile

            pageSidebarToggle.classList.remove('sidebar__toggle_active');
            pageSidebar.classList.add('sidebar_hidden');
            pageSidebarOverlayer.classList.remove('page__sidebar-overlayer_active');
            pageBody.classList.remove('page__body_lock');

        }
    }
};

// Initialization

if (window.matchMedia('(min-width: 1291px)').matches) {

    // Desktop

    // Show
    sidebarHidden = false;
    withoutTransition(pageSidebarToggle, () => {
        pageSidebarToggle.setAttribute('aria-expanded', true)
        pageSidebarToggle.classList.add('sidebar__toggle_active');
    });
    withoutTransition(pageSidebar, () => {
        pageSidebar.classList.remove('sidebar_hidden');
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

    // Fixing sidebar on scroll
    window.addEventListener('scroll', fixSidebar);
    
}
else if (window.matchMedia('(min-width: 481px)').matches) {

    // Tablet

    // Hide
    sidebarHidden = true;
    withoutTransition(pageSidebarToggle, () => {
        pageSidebarToggle.setAttribute('aria-expanded', false)
        pageSidebarToggle.classList.remove('sidebar__toggle_active');
    });
    withoutTransition(pageSidebar, () => {
        pageSidebar.classList.add('sidebar_hidden');
        pageSidebar.style.right = `${-sidebarContent.offsetWidth}px`;
    });
    withoutTransition(pageMain, () => {
        pageMain.style.paddingRight = `${sidebarFixedBar.offsetWidth}px`;
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

    // Fixing sidebar on scroll
    window.addEventListener('scroll', fixSidebar);

}
else {

    // Mobile

    // Hide
    sidebarHidden = true;
    withoutTransition(pageSidebarToggle, () => {
        pageSidebarToggle.setAttribute('aria-expanded', false)
        pageSidebarToggle.classList.remove('sidebar__toggle_active');
    });
    withoutTransition(pageSidebar, () => {
        pageSidebar.classList.add('sidebar_hidden');
    });

    // Padding-Bottom to Page-Body
    pageBody.style.paddingBottom = `${sidebarFixedBar.offsetHeight}px`;

}

// Toggle button interactive
let toggleSidebar = () => {
    let expanded = pageSidebarToggle.getAttribute('aria-expanded') === 'true' || false;
    if (!expanded) {
        showSidebar();
    }
    else {
        hideSidebar();
    }
}
pageSidebarToggle.addEventListener('click', toggleSidebar);
if (window.matchMedia('(max-width: 1290px)').matches) {
    pageSidebarOverlayer.addEventListener('click', toggleSidebar);
}




// * Scroll-Button interactive

if (scrollButton) {
    let showScrollButton = () => {
        scrollButton.classList.remove('article__scroll-top_hidden');
        scrollButton.inert = false;
    };
    let hideScrollButton = () => {
        scrollButton.classList.add('article__scroll-top_hidden');
        scrollButton.inert = true;
    };
    let fixScrollButton = () => {
        let footerOffset = Math.max(window.innerHeight - pageFooter.offsetTop + window.pageYOffset, 0);
        if (pageYOffset > contentsTable.offsetTop + contentsTable.offsetHeight && footerOffset === 0) {
            showScrollButton();
        }
        else {
            hideScrollButton();
        }
    };
    window.addEventListener('scroll', fixScrollButton);

    let smoothscroll = () => {
        let currentScroll = pageYOffset;
        let finishScroll = pageContent.offsetTop;

        if (currentScroll > finishScroll) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll - finishScroll) / 5);
        }
    };
    scrollButton.addEventListener('click', smoothscroll);

    hideScrollButton();
}