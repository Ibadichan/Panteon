import Tabs from './Tabs';

document.addEventListener('DOMContentLoaded', () => {
  const tabContainers = document.querySelectorAll('[data-component=Tabs]');

  tabContainers.forEach(initializeUI);
});

/**
 * Initializes interface.
 * @param {HTMLElement} container - The tabs container node.
 */
function initializeUI(container) {
  const tabList = container.querySelector('[data-component=TabList]');
  const tabs = container.querySelectorAll('[data-component=Tab]');
  const tabPanels = container.querySelectorAll('[data-component=TabPanel]');

  new Tabs({
    tabList,
    tabs,
    tabPanels,
  });
}
