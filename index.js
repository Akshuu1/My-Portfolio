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

function loaderAnimation(){
    let tl = gsap.timeline();

    tl
    .from(".loader .child span" ,{
        x:100,
        stagger: .4,
        duration: 1.4,
        delay: 0,
        ease: Power3.easeInOut
    })
    .to(".parent .child" ,{
        y:'-100%',
        duration: 1,
        ease: Circ.easeInOut
    })
    .to(".loader" ,{
        height:0,
        duration: 1,
        ease: Circ.easeInOut
    })
    .to(".green" ,{
        top:0,
        height:"100%",
        duration: 1,
        delay:-.7,
        ease: Circ.easeInOut
    })
    .to(".green" ,{
        height:"0%",
        delay:-.5,
        duration: .7,
        ease: Circ.easeInOut,
        onComplete:function(){
            animateHomepage();
        }
    })
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


revealtoSpan();
valueSetters();
loaderAnimation();
