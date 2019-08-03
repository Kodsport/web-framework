import { registerDropdownListener } from "./dropdown";
import { registerHamburgerListener } from "./hamburger";

window.onload = function() {
  registerDropdownListener();
  registerHamburgerListener();
}
