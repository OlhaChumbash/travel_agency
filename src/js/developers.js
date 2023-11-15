let blur = document.querySelector('.blur_container_br');
let posterior = document.querySelector('.posterior_background_br');
let container = document.getElementById('offcanvasRight');
let shows = document.querySelector('.offcanvas-end')
function brAdd() {
    shows.style.transition = 'all 0.9s ease 0s';
    blur.classList.add("blur_br");
    posterior.classList.add("posterior_background");
    container.classList.add('show');
    document.body.style.overflow = "hidden";
    container.style.overflow = 'auto';
}
function brRemove() {
    document.body.style.overflow = "scroll";
    blur.classList.remove("blur_br");
    posterior.classList.remove("posterior_background");
    container.classList.remove('show');
}
function brRemovee() {
    shows.style.transition = 'all 0s ease 0s';
    document.body.style.overflow = "scroll";
    blur.classList.remove("blur_br");
    posterior.classList.remove("posterior_background");
    container.classList.remove('show');
}
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 1,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});
//ARROW FOOTER
let Inter;
$('.arrow').on('mouseenter', function () {
    $('.hov-1').slideUp(300).fadeIn(100);
    $('.hov-2').slideUp(200).fadeIn(200);
    $('.hov-3').slideUp(100).fadeIn(300)
    Inter = setInterval(function () {
        $('.hov-1').slideUp(300).fadeIn(100);
        $('.hov-2').slideUp(200).fadeIn(200);
        $('.hov-3').slideUp(100).fadeIn(300)
    }, 600
    );

});
$('.arrow').on('click', function () {
    clearInterval(Inter);
});
$('.arrow').on('mouseleave', function () {
    clearInterval(Inter);
});