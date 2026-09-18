/* =========================================================
   TRAVELEASE — 3D PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initParticles();

    initCursor();

    init3DScene();

    initTiltCards();

    initMagneticButtons();

    initRevealAnimations();

    initNavigation();

    initScrollProgress();

    initScreenshots();

    initBackToTop();

    initYear();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader =
        document.getElementById("loader");

    document.body.classList.add("no-scroll");


    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

            document.body.classList.remove(
                "no-scroll"
            );

        }, 900);

    });

}


/* =========================================================
   PARTICLES
========================================================= */

function initParticles() {

    const container =
        document.getElementById("particles");

    if (!container) return;


    const particleCount =
        window.innerWidth < 700
            ? 25
            : 55;


    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";


        const left =
            Math.random() * 100;

        const top =
            35 + Math.random() * 65;

        const duration =
            3 + Math.random() * 5;


        particle.style.left =
            `${left}%`;

        particle.style.top =
            `${top}%`;

        particle.style.setProperty(
            "--duration",
            `${duration}s`
        );

        particle.style.animationDelay =
            `${Math.random() * 5}s`;


        container.appendChild(
            particle
        );

    }

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {

    const dot =
        document.querySelector(".cursor-dot");

    const ring =
        document.querySelector(".cursor-ring");

    if (!dot || !ring) return;


    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * .15;

        ringY +=
            (mouseY - ringY) * .15;


        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const hoverElements =
        document.querySelectorAll(
            "a, button, [data-tilt]"
        );


    hoverElements.forEach((element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                ring.classList.add(
                    "hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                ring.classList.remove(
                    "hover"
                );

            }
        );

    });

}


/* =========================================================
   HERO 3D MOUSE PARALLAX
========================================================= */

function init3DScene() {

    const scene =
        document.getElementById("scene3d");

    if (!scene) return;


    const visual =
        document.querySelector(".hero-visual");


    if (window.innerWidth < 900) return;


    visual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                visual.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) /
                centerX) * 8;


            const rotateX =
                ((centerY - y) /
                centerY) * 7;


            scene.style.transform =
                `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    visual.addEventListener(
        "mouseleave",
        () => {

            scene.style.transform =
                "rotateX(0deg) rotateY(0deg)";

        }
    );

}


/* =========================================================
   TILT CARDS
========================================================= */

function initTiltCards() {

    const cards =
        document.querySelectorAll(
            "[data-tilt]"
        );


    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 800)
                    return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -4;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 5;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(5px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {

    const buttons =
        document.querySelectorAll(
            ".magnetic"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 800)
                    return;


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `
                    translate(
                        ${x * .12}px,
                        ${y * .12}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!("IntersectionObserver" in window)) {

        elements.forEach((element) => {

            element.classList.add(
                "visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .15
            }
        );


    elements.forEach((element) => {

        observer.observe(element);

    });


    /* Animate major cards too */

    const cards =
        document.querySelectorAll(
            ".glass-card, .feature-card, .architecture-layer"
        );


    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${Math.min(index * .06, .3)}s`;

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    const mobileNavigation =
        document.getElementById(
            "mobileNavigation"
        );


    /* Mobile menu */

    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            () => {

                mobileNavigation.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* Mobile links */

    if (mobileNavigation) {

        mobileNavigation
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileNavigation.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* Active desktop nav */

    function updateActiveNavigation() {

        let current =
            "home";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;


            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href === `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const progress =
        document.getElementById(
            "scrollProgress"
        );


    if (!progress) return;


    function updateProgress() {

        const scrollTop =
            window.scrollY;


        const height =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;


        progress.style.width =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();

}


/* =========================================================
   SCREENSHOT SWITCHER
========================================================= */

function initScreenshots() {

    const thumbnails =
        document.querySelectorAll(
            ".screen-thumb"
        );


    const image =
        document.getElementById(
            "mainScreenImage"
        );


    const number =
        document.getElementById(
            "screenNumber"
        );


    const title =
        document.getElementById(
            "screenTitle"
        );


    const description =
        document.getElementById(
            "screenDescription"
        );


    if (
        !thumbnails.length ||
        !image
    ) {
        return;
    }


    thumbnails.forEach(
        (thumbnail) => {

            thumbnail.addEventListener(
                "click",
                () => {

                    const imagePath =
                        thumbnail.dataset.image;

                    const imageTitle =
                        thumbnail.dataset.title;

                    const imageDescription =
                        thumbnail.dataset.description;


                    thumbnails.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    thumbnail.classList.add(
                        "active"
                    );


                    image.style.opacity =
                        "0";


                    setTimeout(() => {

                        image.src =
                            imagePath;

                        image.alt =
                            imageTitle;

                        image.style.opacity =
                            "1";

                    }, 180);


                    const thumbNumber =
                        thumbnail
                            .querySelector(
                                "span"
                            )
                            ?.textContent ||
                        "01";


                    number.textContent =
                        thumbNumber;

                    title.textContent =
                        imageTitle;

                    description.textContent =
                        imageDescription;

                }
            );

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backTop"
        );


    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   YEAR
========================================================= */

function initYear() {

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date()
                .getFullYear();

    }

}


/* =========================================================
   IMAGE ERROR FALLBACK
========================================================= */

document.addEventListener(
    "error",
    (event) => {

        const element =
            event.target;


        if (
            element.tagName !== "IMG"
        ) {
            return;
        }


        if (
            element.dataset.fallbackUsed
        ) {
            return;
        }


        element.dataset.fallbackUsed =
            "true";


        element.src =
            "images/travelease-preview.png";

    },
    true
);