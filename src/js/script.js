//burger menu start
function toggleMenu() {
   const menuBox = document.getElementById('menuBox');
   menuBox.classList.toggle('active');
}

function navigateTo(sectionId) {
   const element = document.getElementById(sectionId);
   if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
   }
}

function closeMenu() {
   const menuToggle = document.getElementById('menu__toggle');
   menuToggle.checked = false;
   document.body.style.overflow = "auto";
}
//burger menu end
