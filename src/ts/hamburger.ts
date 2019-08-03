const CLOSED_CLASS = 'closed';
const NAVBAR_CLASS = 'navbar-nav';
const HAMBURGER_CLASS = 'navbar-hamburger';

function isClosed(navbar: HTMLElement) {
  return navbar.classList.contains(CLOSED_CLASS);
}

function classForEach(clz: string, callback: Function) {
  const elements = document.getElementsByClassName(clz);
  console.log(elements);
  for (var i = 0; i < elements.length; i++) {
    callback(elements[i]);
  }
}

function open(navbar: HTMLElement) {
  navbar.classList.remove(CLOSED_CLASS);
}

function close(navbar: HTMLElement) {
  navbar.classList.add(CLOSED_CLASS);
}

function toggle(navbar: HTMLElement) {
  if (isClosed(navbar)) open(navbar);
  else close(navbar);
}

function triggerHamburger(hamburger: HTMLElement) {
  classForEach(NAVBAR_CLASS, toggle);
  return false;
}

function registerListener(hamburger: HTMLElement) {
  hamburger.onclick = triggerHamburger.bind(this, hamburger);
}

export function registerHamburgerListener() {
  console.log("register hamburger");
  classForEach(HAMBURGER_CLASS, registerListener);
}
