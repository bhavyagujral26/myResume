// Typewriter Effect
class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let delta = 200 - Math.random() * 100;
        if (this.isDeleting) delta /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

// Project Data
const projects = [
    { name: "AI resume optimizer", category: "WebDevelopment", image: "AIresume.png", description: "AI Resume Optimizer helps job seekers enhance their resumes.", video: "AIresume.mp4" },
    { name: "Self Learning ChessBot", category: "MachineLearning", image: "chessbot.png", description: "Chessbot that uses self learning to improve performance.", video: "chessbot.mp4" },
    { name: "Hand Gestures Using Machine Learning", category: "MachineLearning", image: "HandGestures.png", description: "A python program that uses machine learning to label the hand movements and adjust the volume of the device accordingly", video: "Gesture.mp4" },
];

// Hover Preview Video Setup
const previewVideo = document.createElement('video');
previewVideo.muted = true;
previewVideo.loop = true;
previewVideo.style.position = 'absolute';
previewVideo.style.pointerEvents = 'none';
previewVideo.style.display = 'none';
previewVideo.style.maxWidth = '400px';
previewVideo.style.maxHeight = '400px';
previewVideo.style.borderRadius = '10px';
previewVideo.style.zIndex = '9999';
previewVideo.style.border = '5px solid rgba(204, 204, 204, 0.3)';
document.body.appendChild(previewVideo);

// Display Projects Dynamically
function displayProjects(filteredCategory = "all") {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = ""; // Clear existing projects

    projects.forEach(project => {
        if (filteredCategory === "all" || project.category.toLowerCase() === filteredCategory.toLowerCase()) {
            const card = document.createElement("div");
            card.classList.add("portfolio-item", project.category);
            card.setAttribute('data-video', project.video);

            card.innerHTML = `
                <img src="${project.image}" alt="${project.name}">
                <div class="project-details">
                    <h3 class="project-name">${project.name}</h3>
                    <p>${project.description}</p>
                </div>
            `;

            projectList.appendChild(card);
        }
    });
}

let currentVideoSrc = '';

document.addEventListener('mousemove', (e) => {
    const item = e.target.closest('.portfolio-item');

    if (item) {
        const videoSrc = item.getAttribute('data-video');

        if (videoSrc && videoSrc !== currentVideoSrc) {
            currentVideoSrc = videoSrc;
            previewVideo.src = videoSrc;
            previewVideo.style.display = 'block';
            previewVideo.play();
        }

        previewVideo.style.left = `${e.pageX + 20}px`;
        previewVideo.style.top = `${e.pageY + 20}px`;
    } else {
        previewVideo.style.display = 'none';
        previewVideo.pause();
        previewVideo.currentTime = 0;
        currentVideoSrc = '';
    }
});

// Filter Function
function filterProjects(category) {
    const buttons = document.querySelectorAll(".button-value");
    buttons.forEach(button => {
        button.classList.toggle("active", button.innerText.replace(/\s+/g, '').toLowerCase() === category.toLowerCase() || (category === "all" && button.innerText.toLowerCase() === "all"));
    });

    displayProjects(category === "all" ? "all" : category.replace(/\s+/g, '').toLowerCase());
}

// Navigation Highlight on Scroll
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animate Skill Progress Bars
document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress-bar");

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = "0%";
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    const skillsSection = document.querySelector("#skills");
    const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting) {
                animateProgressBars();
            }
        },
        { threshold: 0.3 }
    );

    observer.observe(skillsSection);
});

// DOMContentLoaded to Run All Scripts Seamlessly
document.addEventListener('DOMContentLoaded', () => {
    // Typewriter Initialization
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // Display All Projects Initially
    displayProjects("all");

    // Attach Filter Buttons
    document.querySelectorAll(".button-value").forEach(button => {
        button.addEventListener("click", () => filterProjects(button.innerText.replace(/\s+/g, '').toLowerCase()));
    });

    // Navigation Scroll Highlight
    window.addEventListener('scroll', highlightNav);
});
