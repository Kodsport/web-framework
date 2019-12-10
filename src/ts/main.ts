import { registerDropdownListener } from "./dropdown";
import { registerHamburgerListener } from "./hamburger";
import { initTimers } from "./timer";

window.onload = function() {
  registerDropdownListener();
  registerHamburgerListener();
  initTimers();
}
