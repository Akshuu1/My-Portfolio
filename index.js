function revealtoSpan(){
document.querySelectorAll(".reveal")
.forEach(function (elem){
    let parent = document.createElement("span");
    let child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem. appendChild(parent)
})
}

function valueSetters(){
    gsap.set(".nav a",{y:"-100%",opacity:0})
    gsap.set(".home span .child",{y:"100%"})
    gsap.set(".home .row img",{opacity:0})

    document.querySelectorAll("#Visual path, #Visual polyline").forEach(function (character) {
        let length = character.getTotalLength();
        character.style.strokeDasharray = length + 'px';
        character.style.strokeDashoffset = length + 'px';
    });
}

function loaderAnimation() {
    let tl = gsap.timeline();

    gsap.set(".nav", { display: "none", padding: "0", margin: "0" });
    gsap.set(".everything", { padding: "0px", margin: "0px" ,overflow: "hidden"});

    tl
    .from(".loader .child span", {
        x: 100,
        stagger: 0.4,
        duration: 1.4,
        ease: Power3.easeInOut
    })
    .to(".parent .child", {
        y: "-100%",
        duration: 1,
        ease: Circ.easeInOut
    })
    .to(".loader", {
        height: 0,
        duration: 1,
        ease: Circ.easeInOut
    })
    .to(".green", {
        top: 0,
        height: "100%",
        duration: 1,
        delay: -0.8,
        ease: Circ.easeInOut
    })
    .to(".green", {
        height: "0%",
        delay: -0.5,
        duration: 0.7,
        ease: Circ.easeInOut,
        onComplete: function () {
            gsap.set(".nav", { display: "flex", padding: "20px 50px" });
            gsap.from(".nav", { opacity: 0, duration: 1, ease: Power3.easeInOut });
            gsap.set(".everything", { overflow: "visible" });
            ScrollTrigger.refresh(); // Refresh triggers after layout settles
            animateHomepage();
        }
    });
}

function animateHomepage(){
    var tl = gsap.timeline();
    tl.to(".nav a",{
        y:0, 
        opacity:1,
        stagger:0.05,
        ease:Expo.easeInOut
    })
    .to(".home .parent .child",{
        y:0,
        duration:1.5 ,
        stagger:0.1,
        ease:Expo.easeInOut
    })
    .to(".home .row img",{
        opacity:1,
        ease:Expo.easeInOut,
        onComplete:function(){
            console.log("Homepage animation complete.");
            animateSvg();
            landingPageLife();
        }
    })
    
}

function animateSvg() {
    gsap.to("#Visual path, #Visual polyline", {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: Expo.easeInOut,
    });
}

/* ── Landing Page Life ── */
function landingPageLife() {
    console.log("Landing page life starting...");
    
    // Abstract floating elements entrance
    gsap.from(".home::before", {
        opacity: 0,
        scale: 0.8,
        duration: 2.5,
        ease: "expo.out"
    });

    // Hero title staggered reveal enhancement
    gsap.from(".row h1", {
        y: 100,
        rotateX: -45,
        stagger: 0.15,
        duration: 1.5,
        ease: "expo.out",
        opacity: 0
    });

    // Mouse parallax tilt on the hero rows
    if (hero) {
        console.log("Attaching landing page parallax...");
        window.addEventListener("mousemove", (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;

            gsap.to(".row h1, .home .row img", {
                x: dx * 30,
                y: dy * 15,
                duration: 1.2,
                ease: "power2.out",
                stagger: 0.05
            });
            gsap.to(".c-visual", {
                x: dx * -40,
                y: dy * -20,
                rotationY: dx * 12,
                rotationX: dy * -8,
                duration: 1.5,
                ease: "power2.out"
            });
            gsap.to(".down-arrow", {
                x: dx * 15,
                y: dy * 15,
                duration: 1.2,
                ease: "power2.out"
            });
        });
    }

    // Scroll down indicator pulse
    gsap.to(".down-arrow", {
        y: "+=12",
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut"
    });

    // Subtle nav logo float
    gsap.to(".nav a:first-child", {
        y: "-3px",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut"
    });
}

function cardHoverEffect() {
    const masteryItems = document.querySelectorAll(".mastery");
    const cursorContainer = document.querySelector(".cursor > div");
    const images = document.querySelectorAll(".cursor .elem img");
  
    masteryItems.forEach(function(item) {
      item.addEventListener("mouseenter", function(event) {
        cursorContainer.style.transition = "none";
        cursorContainer.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        cursorContainer.style.opacity = 1;
        void cursorContainer.offsetWidth;
        cursorContainer.style.transition = "transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)";
      });
      
      item.addEventListener("mousemove", function(event) {
        const index = this.dataset.index;
        cursorContainer.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        if (images[index]) {
          images[index].style.opacity = 1;
        }
      });
      
      item.addEventListener("mouseleave", function() {
        const index = this.dataset.index;
        cursorContainer.style.opacity = 0;
        if (images[index]) {
          images[index].style.opacity = 0;
        }
      });
    });
}

document.getElementById("about").addEventListener("click", function (event) {
  event.preventDefault();
  const target = document.querySelector(".imagery");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

/* ── Stacked Card Parallax ── */
function projectScrollAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const cards = Array.from(document.querySelectorAll(".p-card"));
    const total = cards.length;

    cards.forEach((card, i) => {
        // Optimization: Each card only worries about its own entry
        // We'll use a cleaner layout where the PREVIOUS card scales down
        // when the NEXT card hits its sticky top.
        if (i < total - 1) {
            const nextCard = cards[i + 1];
            
            gsap.to(card, {
                scale: 0.75,
                filter: "brightness(0.3)",
                opacity: 0.5,
                scrollTrigger: {
                    trigger: nextCard,
                    start: "top 90%",
                    end: "top 8vh",
                    scrub: true,
                    // markers: true, // debug
                    invalidateOnRefresh: true
                }
            });
        }

        // Image parallax inside each card
        const img = card.querySelector(".p-card-img img");
        if (img) {
            gsap.fromTo(img,
                { y: "0%" },
                {
                    y: "-8%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    }
                }
            );
        }
    });
}

/* ── Sitewide Scroll Animations ── */
function sitewideAnimations() {

    // About: text + photos (Using fromTo for guaranteed visibility)
    gsap.fromTo(".imglef h1", 
        { opacity: 0, y: 60 },
        {
            opacity: 1, y: 0,
            duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: ".imagery", start: "top 80%" }
        }
    );

    gsap.fromTo(".imgcntr", 
        { opacity: 0, y: 100, scale: 0.8 },
        {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.15, duration: 1.4, ease: "power4.out",
            scrollTrigger: { trigger: ".imgrig", start: "top 80%" }
        }
    );

    // Feat Works heading
    gsap.from(".workrow h1", {
        opacity: 0, x: -80,
        duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".workrow", start: "top 85%" }
    });

    // Education
    gsap.from(".education .eduHead h1", {
        opacity: 0, y: 50,
        duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".education", start: "top 80%" }
    });

    gsap.from(".educationLeft img", {
        opacity: 0, x: -60, rotate: -4,
        duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".edu", start: "top 80%" }
    });

    gsap.from(".educationRight ul li", {
        opacity: 0, x: 50,
        stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".educationRight", start: "top 80%" }
    });

    // Skills: heading + pills pop in (Using fromTo for guaranteed visibility)
    gsap.fromTo(".skills .eduHead", 
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0,
            duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: ".skills", start: "top 82%" }
        }
    );

    gsap.fromTo(".skillslLeft ul li", 
        { opacity: 0, y: 50, scale: 0.8 },
        {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.06, duration: 0.65, ease: "back.out(1.7)",
            scrollTrigger: { trigger: ".skillslLeft", start: "top 85%" },
            onComplete: function() {
            console.log("Skills entrance complete, starting float...");
            // Once they pop in, start floating them continuously
            gsap.to(".skillslLeft ul li", {
                y: "-12px",
                duration: 2,
                ease: "sine.inOut",
                stagger: {
                    each: 0.15,
                    repeat: -1,
                    yoyo: true
                }
            });
        }
    });

    // Footer
    gsap.from(".conn h1", {
        opacity: 0, y: 80,
        duration: 1.3, ease: "power4.out",
        scrollTrigger: { trigger: ".footer", start: "top 85%" }
    });

    gsap.from(".msg", {
        opacity: 0, scaleX: 0.6,
        duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".msg", start: "top 88%" }
    });

    gsap.from(".social a", {
        opacity: 0, y: 30,
        stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".social", start: "top 88%" }
    });

    gsap.from(".links a", {
        opacity: 0, y: 20,
        stagger: 0.08, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".links", start: "top 90%" }
    });

    // Magnetic nav links
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("mousemove", (e) => {
            const rect = link.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top  - rect.height / 2) * 0.4;
            gsap.to(link, { x, y, duration: 0.3, ease: "power2.out" });
        });
        link.addEventListener("mouseleave", () => {
            gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        });
    });

    // Hover tilt on aboutphoto stack
    document.querySelectorAll(".imgcntr").forEach((img) => {
        img.addEventListener("mousemove", (e) => {
            const rect = img.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width/2) / rect.width * 15;
            const y = (e.clientY - rect.top  - rect.height/2) / rect.height * 15;
            gsap.to(img, { rotationY: x, rotationX: -y, duration: 0.4, ease: "power2.out", transformPerspective: 600 });
        });
        img.addEventListener("mouseleave", () => {
            gsap.to(img, { rotationY: 0, rotationX: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
        });
    });
}

revealtoSpan();
valueSetters();
loaderAnimation();
cardHoverEffect();
projectScrollAnimation();
sitewideAnimations();