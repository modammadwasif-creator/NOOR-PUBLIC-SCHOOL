 /* =========================================================
   NOOR PUBLIC SCHOOL
   MAIN JAVASCRIPT
   ========================================================= */

 const IMAGE_URLS = {
    logo: "https://i.ibb.co/PGTJ0D4g/logo.png",

    hero: "https://i.ibb.co/GQD53JJT/Screenshot-2026-10-09-161717.png",

    image1: "https://i.ibb.co/5Cq9tsv/Screenshot-2026-10-09-161929.png",

    najeebsir: "https://i.ibb.co/svH3VR9k/najeebsir.jpg",

    classroom1: "https://i.ibb.co/35xC9nnV/classroom1.jpg",

    classroom2: "https://i.ibb.co/0yfy5vvP/Screenshot-2026-10-09-162012.png",

    classroom3: "https://i.ibb.co/Z1d4D2vr/Screenshot-2026-10-09-162548.png",

    schoolStudents: "https://i.ibb.co/Pvx5NzCn/Screenshot-2026-10-09-162610.png"
};

/* =========================================================
   AUTOMATIC IMAGE LOADER
   ========================================================= */

function loadWebsiteImages() {

    const imageMap = {

        "logo.jpg": IMAGE_URLS.logo,

        "hero.jpg": IMAGE_URLS.hero,

        "image1.jpg": IMAGE_URLS.image1,

        "najeebsir.jpg": IMAGE_URLS.najeebsir,

        "classroom1.jpg": IMAGE_URLS.classroom1,

        "classroom2.jpg": IMAGE_URLS.classroom2,

        "classroom3.jpg": IMAGE_URLS.classroom3,

        "school-students.jpg": IMAGE_URLS.schoolStudents

    };


    /* -----------------------------------------
       NORMAL IMG TAGS
       ----------------------------------------- */

    const images = document.querySelectorAll("img");

    images.forEach(function (img) {

        const source = img.getAttribute("src");

        if (!source) {
            return;
        }

        const fileName = source.split("/").pop().toLowerCase();

        if (imageMap[fileName]) {

            img.src = imageMap[fileName];

            img.addEventListener("error", function () {

                console.warn(
                    "Image could not be loaded:",
                    imageMap[fileName]
                );

                img.style.display = "none";

            });

        }

    });


    /* -----------------------------------------
       HERO BACKGROUND
       ----------------------------------------- */

    const hero = document.querySelector(".hero-bg");

    if (hero && IMAGE_URLS.hero) {

        hero.style.backgroundImage =
            `url("${IMAGE_URLS.hero}")`;

    }


    /* -----------------------------------------
       HERO IMAGE ERROR PROTECTION
       ----------------------------------------- */

    if (hero) {

        const heroUrl = IMAGE_URLS.hero;

        if (heroUrl) {

            const testImage = new Image();

            testImage.onload = function () {

                hero.style.backgroundImage =
                    `url("${heroUrl}")`;

            };

            testImage.onerror = function () {

                console.warn(
                    "Hero image could not be loaded."
                );

            };

            testImage.src = heroUrl;

        }

    }

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("active");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /* Close menu after clicking a link */

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   ADMIN PASSWORD
   ========================================================= */

const ADMIN_PASSWORD = "12345";


/* =========================================================
   LOAD SAVED ADMIN MESSAGE
   ========================================================= */

window.addEventListener("DOMContentLoaded", function () {

    /* Load images */
    loadWebsiteImages();


    /* Load admin message */

    const savedMessage =
        localStorage.getItem("adminMessage");


    const messageText =
        document.getElementById("messageText");


    if (savedMessage && messageText) {

        messageText.textContent =
            savedMessage;

    }


    /* Current year */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

function adminLogin() {

    const password =
        document.getElementById("adminPassword");

    const error =
        document.getElementById("loginError");

    const loginBox =
        document.getElementById("adminLogin");

    const panel =
        document.getElementById("adminPanel");


    if (!password || !error || !loginBox || !panel) {
        return;
    }


    if (password.value === ADMIN_PASSWORD) {

        loginBox.style.display = "none";

        panel.style.display = "block";

        error.textContent = "";

    } else {

        error.textContent =
            "Incorrect password!";

    }

}


/* =========================================================
   SEND ADMIN MESSAGE
   ========================================================= */

function sendAdminMessage() {

    const input =
        document.getElementById("adminMessageInput");

    const messageText =
        document.getElementById("messageText");


    if (!input || !messageText) {
        return;
    }


    const message =
        input.value.trim();


    if (message === "") {

        alert("Please write a message.");

        return;

    }


    localStorage.setItem(
        "adminMessage",
        message
    );


    messageText.textContent =
        message;


    input.value = "";


    alert(
        "Message sent successfully!"
    );

}


/* =========================================================
   DELETE ADMIN MESSAGE
   ========================================================= */

function deleteAdminMessage() {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this message?"
        );


    if (!confirmDelete) {
        return;
    }


    localStorage.removeItem(
        "adminMessage"
    );


    const messageText =
        document.getElementById("messageText");


    if (messageText) {

        messageText.textContent =
            "No message available.";

    }


    alert(
        "Message deleted successfully!"
    );

}


/* =========================================================
   ADMIN LOGOUT
   ========================================================= */

function adminLogout() {

    const panel =
        document.getElementById("adminPanel");

    const loginBox =
        document.getElementById("adminLogin");

    const password =
        document.getElementById("adminPassword");


    if (panel) {

        panel.style.display =
            "none";

    }


    if (loginBox) {

        loginBox.style.display =
            "block";

    }


    if (password) {

        password.value = "";

    }

}


/* =========================================================
   SCHOOL CONTACT → WHATSAPP
   ========================================================= */


function sendMessage(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const formNote = document.getElementById("formNote");

    if (!name || !email || !message) {
        if (formNote) {
            formNote.textContent = "Please fill in your name, email and message.";
        }
        return;
    }

    // Save the message for the Admin Panel
    try {
        const savedMessages = JSON.parse(
            localStorage.getItem("noorContactMessages") || "[]"
        );

        savedMessages.unshift({
            name: name,
            email: email,
            phone: phone,
            message: message,
            date: new Date().toLocaleString()
        });

        localStorage.setItem(
            "noorContactMessages",
            JSON.stringify(savedMessages)
        );
    } catch (error) {
        console.error("Could not save contact message:", error);

        if (formNote) {
            formNote.textContent = "Message could not be saved. Please try again.";
        }
        return;
    }

    if (formNote) {
        formNote.textContent =
            "Message saved! Opening WhatsApp...";
    }

    // Open WhatsApp with the message
    const whatsappText =
        "New Website Message\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + (phone || "Not provided") + "\n" +
        "Message: " + message;

    const whatsappURL =
        "https://wa.me/923007024050?text=" +
        encodeURIComponent(whatsappText);

    window.open(whatsappURL, "_blank");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";
}


/* =========================================================
   WEBSITE SERVICE → WHATSAPP
   ========================================================= */

function contactForWebsite() {

    const whatsappNumber =
        "923007024050";


    const text =
        "Assalam-u-Alaikum!\n\n" +

        "I am interested in getting a website made.\n" +

        "Please share the details and pricing.";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(text);


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) {
            return;
        }


        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(
                targetId
            );


        if (target) {

            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }
);


/* =========================================================
   BACK TO TOP
   ========================================================= */

const toTop =
    document.querySelector(".to-top");


if (toTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                toTop.classList.add(
                    "show"
                );

            } else {

                toTop.classList.remove(
                    "show"
                );

            }

        }
    );


    toTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   IMAGE URL HELPER
   =========================================================

   Browser console mein test karne ke liye:

   setImage("logo", "YOUR_IMAGE_LINK");

   ========================================================= */

function setImage(imageName, imageUrl) {

    if (!imageName || !imageUrl) {
        return;
    }


    if (
        Object.prototype.hasOwnProperty.call(
            IMAGE_URLS,
            imageName
        )
    ) {

        IMAGE_URLS[imageName] =
            imageUrl;


        loadWebsiteImages();

    }

}

/* =====================================================
   CONTACT FORM → WHATSAPP
   ===================================================== */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();


            const email =
                document.getElementById(
                    "contactEmail"
                ).value.trim();


            const subject =
                document.getElementById(
                    "contactSubject"
                ).value.trim();


            const message =
                document.getElementById(
                    "contactMessage"
                ).value.trim();


            const whatsappNumber =
                "923007024050";


            const whatsappMessage =
                "Hello Muhammad Wasif!\n\n" +

                "New Website Message\n\n" +

                "Name: " +
                name +

                "\nEmail: " +
                email +

                "\nSubject: " +
                subject +

                "\n\nMessage:\n" +
                message;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}/* ==========================================
   NOOR SCHOOL GALLERY LIGHTBOX
========================================== */

(() => {
    const gallery = document.querySelector(".gallery-grid");
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("galleryLightboxImage");
    const caption = document.getElementById("galleryLightboxCaption");
    const closeButton = document.getElementById("galleryLightboxClose");
    const previousButton = document.getElementById("galleryLightboxPrev");
    const nextButton = document.getElementById("galleryLightboxNext");

    if (
        !gallery ||
        !lightbox ||
        !lightboxImage ||
        !caption ||
        !closeButton ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }

    const cards = Array.from(gallery.querySelectorAll(".gallery-card"));
    let currentIndex = 0;
    let lastFocusedElement = null;

    function showImage(index) {
        if (!cards.length) return;

        currentIndex = (index + cards.length) % cards.length;

        const card = cards[currentIndex];
        const image = card.dataset.image;
        const title = card.dataset.title || "";

        lightboxImage.src = image;
        lightboxImage.alt = title;
        caption.textContent = title;

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("gallery-lightbox-open");
        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("gallery-lightbox-open");

        lightboxImage.src = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            lastFocusedElement = card;
            showImage(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    previousButton.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }
    });
})();
/* =========================================================
   END
   ========================================================= */