export function setActiveNavLinks() {
  const navLinks = document.querySelectorAll('.mainHeader__navBar ul li a');

  for (let link of navLinks) {
    const linkPage = link.dataset.page;
    const currentUrl = location.href;
    if (currentUrl.includes(linkPage)) {
      link.classList.add('active');
      break;
    }
  }
}
