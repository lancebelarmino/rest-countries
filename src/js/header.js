import Storage from './helper-local-storage';
import Theme from './helper-theme';

const storage = new Storage('theme');
const theme = new Theme();



// Init
const lastTheme = storage.getItems()[0];

theme.init(lastTheme);



// Dark Mode Event
const themeBtn = document.querySelector('.js-themeBtn');

themeBtn.addEventListener('click', () => {
  const currentTheme = storage.getItems()[0];

  if (currentTheme === 'light' || currentTheme.length === 0) {
    theme.setTheme('dark');
    storage.updateItem('dark');
  } else if (currentTheme === 'dark') {
    theme.setTheme('light');
    storage.updateItem('light');
  }
});