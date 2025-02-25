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

    // Completely remove navbar and padding
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
            // Bring back navbar with original padding
            gsap.set(".nav", { display: "flex", padding: "20px 50px" }); // Adjust to your original padding
            gsap.from(".nav", { opacity: 0, duration: 1, ease: Power3.easeInOut });

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
            animateSvg();
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

function locoInitialize(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('.everything'),
        smooth: true
    });

}

function cardHoverEffect() {
    const masteryItems = document.querySelectorAll(".mastery");
    const cursorContainer = document.querySelector(".cursor > div");
    const images = document.querySelectorAll(".cursor .elem img");
  
    masteryItems.forEach(function(item) {
      item.addEventListener("mouseenter", function(event) {
        // Disable transition temporarily so it appears at the current mouse position immediately
        cursorContainer.style.transition = "none";
        cursorContainer.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        cursorContainer.style.opacity = 1;
        
        // Force a reflow so that the style is applied immediately
        void cursorContainer.offsetWidth;
        
        // Re-enable the transition for subsequent mouse movements
        cursorContainer.style.transition = "transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)";
      });
      
      item.addEventListener("mousemove", function(event) {
        const index = this.dataset.index;
        // Smoothly update the container's position on mousemove
        cursorContainer.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        // Show the corresponding image
        if (images[index]) {
          images[index].style.opacity = 1;
        }
      });
      
      item.addEventListener("mouseleave", function() {
        const index = this.dataset.index;
        // Hide the container immediately (no transform change needed)
        cursorContainer.style.opacity = 0;
        if (images[index]) {
          images[index].style.opacity = 0;
        }
      });
    });
  }
  
locoInitialize();
revealtoSpan();
valueSetters();
loaderAnimation();
cardHoverEffect();