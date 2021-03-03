/** Class representing a Tabs component. */
class Tabs {
  /**
   * Creates a Tabs component instance and
   * initializes sub-components.
   * @param {Object} props - The component properties.
   * @param {HTMLElement} props.tabList - The tab list node.
   * @param {NodeList} props.tabs - The collection of tab nodes.
   * @param {NodeList} props.tabPanels - The collection of panel nodes.
   */
  constructor(props) {
    this.tabList = props.tabList;
    this.tabs = props.tabs;
    this.tabPanels = props.tabPanels;
    this.componentId = Math.random().toString(36).slice(-4);

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabKeyboardEvent = this.handleTabKeyboardEvent.bind(this);

    this.initializeSubComponents();
  }

  /**
   * Initializes sub-components.
   */
  initializeSubComponents() {
    this.initializeTabList();
    this.initializeTabs();
    this.initializeTabPanels();
  }

  /**
   * Initializes tab list by adding needed semantics.
   */
  initializeTabList() {
    this.tabList.setAttribute('role', 'tablist');
  }

  /**
   * Initializes tab controls by adding needed semantics, attributes.
   * Attaches event listeners for tabs switching.
   * Marks first tab as selected.
   */
  initializeTabs() {
    this.tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('id', `tab-${this.componentId}-${index}`);
      tab.setAttribute('tabindex', '-1');

      tab.addEventListener('click', this.handleTabClick);
      tab.addEventListener('keydown', this.handleTabKeyboardEvent);
    });

    const newTab = this.tabs[0];

    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');

    this.dispatchTabChangedEvent(newTab);
  }

  /**
   * Initializes tab panels by adding needed semantics, attributes.
   * Hides all panels but first.
   */
  initializeTabPanels() {
    this.tabPanels.forEach((panel, index) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-labelledby', this.tabs[index].id);

      panel.hidden = true;
    });

    this.tabPanels[0].hidden = false;
  }

  /**
   * Switches tab to a new one.
   * @param {HTMLElement} oldTab - The old tab node.
   * @param {HTMLElement} newTab - The new tab node.
   */
  switchTab(oldTab, newTab) {
    oldTab.setAttribute('tabindex', '-1');
    oldTab.removeAttribute('aria-selected');

    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');
    newTab.focus();

    const oldTabIndex = Array.prototype.indexOf.call(this.tabs, oldTab);
    const newTabIndex = Array.prototype.indexOf.call(this.tabs, newTab);

    this.tabPanels[oldTabIndex].hidden = true;
    this.tabPanels[newTabIndex].hidden = false;

    this.dispatchTabChangedEvent(newTab);
  }

  /**
   * Dispatches tabchanged event to the world.
   * @param {HTMLElement} tab - The new selected tab.
   */
  dispatchTabChangedEvent(tab) {
    const event = new CustomEvent('tabchanged', {
      bubbles: true,
    });

    tab.dispatchEvent(event);
  }

  /**
   * Handle click event for tab (in order to switch tab).
   * @param {Object} event - The click event.
   */
  handleTabClick(event) {
    event.preventDefault();

    const newTab = event.currentTarget;
    const oldTab = this.tabList.querySelector('[aria-selected]');

    if (newTab !== oldTab) {
      this.switchTab(oldTab, newTab);
    }
  }

  /**
   * Handle keyboard event for tab.
   * @param {Object} event - The keyboard event.
   */
  handleTabKeyboardEvent(event) {
    const oldTab = event.currentTarget;

    const oldTabIndex = Array.prototype.indexOf.call(this.tabs, oldTab);

    let newTabIndex = null;

    switch (event.key) {
      case 'Down':
      case 'ArrowDown':
        this.tabPanels[oldTabIndex].focus();
        break;
      case 'Left':
      case 'ArrowLeft':
        newTabIndex= oldTabIndex - 1;

        newTabIndex = newTabIndex < 0 ? this.tabs.length - 1 : newTabIndex;
        break;
      case 'Right':
      case 'ArrowRight':
        newTabIndex = oldTabIndex + 1;

        newTabIndex = newTabIndex > this.tabs.length - 1 ? 0 : newTabIndex;
        break;
      default:
        break;
    }

    if (newTabIndex !== null) {
      event.preventDefault();

      this.switchTab(oldTab, this.tabs[newTabIndex]);
    }
  }
}

export default Tabs;
