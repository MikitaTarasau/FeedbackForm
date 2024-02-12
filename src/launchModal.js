const body = document.querySelector("body");
const modalWindow = document.querySelector(".veil");
const mainEl = document.querySelector(".main");
const openWindowBtn = document.querySelector("#openWindow");
const closeWindow = document.querySelector(".modal-exit");

openWindowBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modalWindow.classList.add("open");
    const widthScroll = window.innerWidth - modalWindow.offsetWidth + 'px';
    body.classList.add("scroll-hidden");
    body.style.paddingRight = widthScroll;
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

closeWindow.addEventListener("click", () => {
    modalWindow.classList.remove("open");
    body.style.paddingRight = '0px';
    body.classList.remove("scroll-hidden");
});