const lifeOnMars = document.querySelector('.life-on-mars');

lifeOnMars.addEventListener('tabchanged', (event) => {
  const selectedTab = event.target;
  const lifeOnMarsTabs = lifeOnMars.querySelectorAll('.tabs__item');

  lifeOnMarsTabs.forEach((tab) => {
    const tabName = tab.querySelector('.tabs__name');

    tab.classList.remove('tabs__item_selected');

    tabName.classList.add('visually-hidden');
  });

  const tabName = selectedTab.querySelector('.tabs__name');

  selectedTab.parentNode.classList.add('tabs__item_selected');

  tabName.classList.remove('visually-hidden');
});
