document.addEventListener("DOMContentLoaded", ()=> {
    const caruselInstance = new Carusel(
        document.querySelector(".carusel")
    );
    caruselInstance.init();

});

class Carusel{
    root = null;
    lane = null;
    waitInSeconds = 3;
    currentIndex = 0;
    slides = null;
    slidesCounter = 0;
    direction = 1;
    intervalId = null;
    buttonLeft = null;
    buttonRight = null;
    indexedButtons = [];
    indexedBtnContainer = null;

    constructor(rootContainer){
        this.root = rootContainer;
        this.lane = rootContainer.querySelector(".carusel-lane");
        this.slides = [...this.root.querySelectorAll(".carusel-lane>section")];
        this.slidesCounter= this.slides.length;
        this.createUX();
        this.createIndexedButtons();
    }
    createUX() {
        this.buttonLeft = document.createElement("DIV");
        this.buttonRight = document.createElement("DIV");
        this.buttonLeft.classList.add("carusel-btn", 'carusel-btn-left');
        this.buttonRight.classList.add("carusel-btn", 'carusel-btn-right');
        this.buttonLeft.innerHTML = "&lt;";
        this.buttonRight.innerHTML = "&gt;";
        this.buttonLeft.addEventListener(
            "click",
            (e)=> {
                e.preventDefault();
                e.stopPropagation();
                this.moveToLeft();
            }
        );
        this.buttonRight.addEventListener(
            "click",
            (e)=> {
                e.preventDefault();
                e.stopPropagation();
                this.moveToRight();
            }
        );
        this.root.appendChild(this.buttonLeft);
        this.root.appendChild(this.buttonRight);
    }
    createIndexedButtons() {
        this.indexedBtnContainer = document.createElement("DIV");
        this.indexedBtnContainer.classList.add("carusel-idx-btns");
        for (let i = 0; i < this.slidesCounter; i++) {
            let tmpBtn = document.createElement("DIV");
            tmpBtn.classList.add("carusel-idx-btn");
            tmpBtn.addEventListener("click", (e)=>{
                e.preventDefault();
                e.stopPropagation();
                this.currentIndex = i;
                if (this.intervalId) {
                    clearTimeout(this.intervalId);
                    this.intervalId = null;
                }
                this.moveToSlide();
            });
            this.indexedButtons.push(tmpBtn);
        }
        this.indexedButtons.forEach( (o)=>{
            this.indexedBtnContainer.appendChild(o);
            }
        );
        this.root.appendChild(this.indexedBtnContainer);
    }
    init(){
        this.intervalId = setTimeout(
            (()=>{
                this.currentIndex += this.direction;
                this.moveToSlide();
            }).bind(this)
            , this.waitInSeconds * 1000
        );
    }
    moveToRight(){
        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = null;
        }
        this.currentIndex = this.currentIndex + 1;
        this.moveToSlide();
    }
    moveToLeft(){
        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = null;
        }
        this.currentIndex = this.currentIndex -1;
        this.moveToSlide();
    }
    moveToSlide(){
        if(this.currentIndex >= this.slidesCounter || this.currentIndex < 0) {
            this.direction = this.direction * -1;
            this.currentIndex = this.currentIndex + (2 * this.direction);
        }
        this.updateSelectedIndex();
        this.lane.style.transform = `translateX(calc(-1 * 100vw * ${this.currentIndex}))`;
        this.init();
    }
    updateSelectedIndex(){
        this.indexedButtons.forEach(
            (o)=>{
                o.classList.remove("active");
            }
        );
        this.indexedButtons[this.currentIndex].classList.add("active");
    }
}