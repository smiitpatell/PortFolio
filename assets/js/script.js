// Scroll Reveal
function reveal(){
  const reveals=document.querySelectorAll(".reveal");
  for(let i=0;i<reveals.length;i++){
    let windowHeight=window.innerHeight;
    let elementTop=reveals[i].getBoundingClientRect().top;
    if(elementTop < windowHeight-100){
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll",reveal);

// Navbar Shadow
window.addEventListener("scroll",function(){
  document.querySelector(".glass")
  .classList.toggle("scrolled",window.scrollY>50);
});

// Typing Animation
const words=["Frontend Developer","Backend Developer","FullStack Developer", "Problem Solver", "Fast Leaner"];
let i=0,j=0,current="",isDeleting=false;

function type(){
  if(i<words.length){
    if(!isDeleting && j<=words[i].length){
      current=words[i].substring(0,j++);
    }else if(isDeleting && j>=0){
      current=words[i].substring(0,j--);
    }
    document.getElementById("typing").innerHTML=current;
    if(j==words[i].length) isDeleting=true;
    if(isDeleting && j==0){ i++; isDeleting=false;}
  }else{i=0;}
  setTimeout(type,100);
}
type();

// Theme Toggle
document.getElementById("themeToggle").onclick=function(){
  document.body.classList.toggle("light");
  this.innerHTML=document.body.classList.contains("light")?"🌙":"☀";
};

// Mobile Menu
function toggleMenu(){
  document.querySelector(".nav-links").classList.toggle("show");
}
