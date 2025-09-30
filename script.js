
// Dynamic Welcome Message

const welcomeMessageEl = document.getElementById('welcome-message');

function updateWelcomeMessage() {
    if (!welcomeMessageEl) return; // skip if element doesn't exist
    const now = new Date();
    const options = { 
        weekday: 'long', year: 'numeric', month: 'long', 
        day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' 
    };
    welcomeMessageEl.textContent = `Hello! Today is ${now.toLocaleDateString('en-US', options)}`;
}

setInterval(updateWelcomeMessage, 1000); 


// Random Background Color

const colorBtn = document.getElementById('color-btn');

if (colorBtn) {
    colorBtn.addEventListener('click', () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = randomColor;
    });
}


// Hero Slideshow

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(n) {
    if (!slides.length) return;
    slides.forEach(slide => slide.style.display = 'none');
    slides[n].style.display = 'block';
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

if (slides.length) showSlide(slideIndex);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (slides.length) setInterval(nextSlide, 5000);


// About Section & Fun Facts

const aboutSection = document.getElementById('about-section');
if (aboutSection) {
    const destination = {
        history: `Thaba-Bosiu played a central role in the unification of the Basotho nation under King Moshoeshoe I.
                  This stronghold became a symbol of strength and wisdom, where strategic decisions were made to defend
                  the land and people during turbulent times.`,
        culture: `The mountain's cultural significance is preserved today through stories and rituals.
                  It is a sacred place for the Basotho, deeply respected for its role in shaping the identity of Lesotho.`,
        attractions: `Visitors can explore the Thaba-Bosiu Cultural Village, showcasing traditional Basotho huts, clothing, 
                      and historical artifacts. Guided tours take you up the mountain to see King Moshoeshoe's grave 
                      and old fortifications. The breathtaking views from the plateau and the calm surroundings make it 
                      an ideal spot for both education and reflection.`
    };

    aboutSection.innerHTML = `
        <h2>History</h2>
        <p>${destination.history}</p>
        <h2>Culture</h2>
        <p>${destination.culture}</p>
        <h2>Attractions</h2>
        <p>${destination.attractions}</p>
    `;

    // Fun facts
    const funFacts = [
        "Thaba-Bosiu means 'Mountain at Night' and it was believed to grow taller at night, protecting the Basotho from enemies!",
        "King Moshoeshoe I founded the Basotho nation using Thaba-Bosiu as a strategic stronghold.",
        "Thaba-Bosiu is a sacred site and symbol of unity and resilience for the Basotho people.",
        "The mountain plateau was originally higher than it is today, according to oral history."
    ];

    const funFactEl = document.getElementById('fun-fact');
    if (funFactEl) {
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        funFactEl.textContent = funFacts[randomIndex];
    }

    // Show More / Show Less
    const toggleBtn = document.getElementById('toggle-more');
    const extraInfo = document.getElementById('extra-info');

    if (toggleBtn && extraInfo) {
        extraInfo.innerHTML = `
            <p>Thaba-Bosiu has been the site of many important events in Lesotho's history. Visitors today can walk
            the same paths as the ancestors and explore both cultural and historical landmarks that shaped the nation.</p>
        `;

        toggleBtn.addEventListener('click', () => {
            extraInfo.classList.toggle('show'); // toggle class
            toggleBtn.textContent = extraInfo.classList.contains('show') ? 'Show Less' : 'Show More';
        });
    }
}


// Gallery Filtering

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        galleryItems.forEach(item => {
            item.style.display = (category === 'all' || item.dataset.category === category) ? 'block' : 'none';
        });
    });
});


// Lightbox

const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const caption = lightbox.querySelector('.caption');
    const closeBtn = lightbox.querySelector('.close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');

    let currentIndex = 0;
    const images = Array.from(galleryItems);

    function openLightbox(index) {
        currentIndex = index;
        const imgEl = images[currentIndex].querySelector('img');
        lightboxImg.src = imgEl.src;
        caption.textContent = images[currentIndex].querySelector('p').textContent;
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }

    images.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}
