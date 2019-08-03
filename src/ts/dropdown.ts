const CLOSED_CLASS = 'closed';
const NAVBAR_CLASS = 'navbar-dropdown';

function isClosed(dropdown: HTMLElement) {
  return dropdown.classList.contains(CLOSED_CLASS);
}

function navbarForEach(callback: Function) {
  const dropdowns = document.getElementsByClassName(NAVBAR_CLASS);
  for (var i = 0; i < dropdowns.length; i++) {
    callback(dropdowns[i]);
  }
}

function open(dropdown: HTMLElement) {
  dropdown.classList.remove(CLOSED_CLASS);
}

function close(dropdown: HTMLElement) {
  dropdown.classList.add(CLOSED_CLASS);
}

function triggerDropdown(dropdown: HTMLElement) {
  const closed = isClosed(dropdown);
  navbarForEach(close);
  if (closed) {
    open(dropdown);
  }
  return false;
}

function registerListener(dropdown: HTMLElement) {
  dropdown.children[0].addEventListener("click", triggerDropdown.bind(this, dropdown));
}

export function registerDropdownListener() {
  navbarForEach(registerListener);
}
