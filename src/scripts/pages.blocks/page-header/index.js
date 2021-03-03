document.addEventListener('DOMContentLoaded', () => {
  const scrollDownButton = document.querySelector('.page-header__scroll-down');
  const projectIdea = document.querySelector('.project-idea');

  scrollDownButton.addEventListener('click', () => {
    projectIdea.scrollIntoView();
  });
});
