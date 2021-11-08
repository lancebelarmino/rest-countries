export default class Theme {
  constructor() {}

  init(theme) {
    this.setTheme(theme);
  }

  setTheme(theme) {
    console.log('Setting Theme To', theme);

    if (theme === 'dark') {
      document.body.classList.add('dark-mode');

      this.updateBtn(theme);
    } else if (theme === 'light' || theme === undefined) {
      console.log('Light Theme Enabled');

      document.body.classList.remove('dark-mode');

      this.updateBtn(theme);
    }
  }

  updateBtn(theme) {
    const themeBtn = document.querySelector('.js-themeBtn');

    themeBtn.innerHTML = '';

    if (theme === 'dark') {
      themeBtn.innerHTML = `
        <span class="btn__icon js-btnIcon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1V2.45455M9 15.5455V17M3.3418 3.3418L4.37452 4.37452M13.6254 13.6254L14.6582 14.6582M1 9H2.45455M15.5455 9H17M3.3418 14.6582L4.37452 13.6254M13.6254 4.37452L14.6582 3.3418M12.6364 9C12.6364 11.0083 11.0083 12.6364 9 12.6364C6.99169 12.6364 5.36364 11.0083 5.36364 9C5.36364 6.99169 6.99169 5.36364 9 5.36364C11.0083 5.36364 12.6364 6.99169 12.6364 9Z" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        
        Light Mode
      `;
    } else if (theme === 'light' || theme === undefined) {
      themeBtn.innerHTML = `
        <span class="btn__icon js-btnIcon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 8.63063C14.8774 9.95738 14.3795 11.2218 13.5645 12.2759C12.7495 13.33 11.6512 14.1301 10.398 14.5828C9.14485 15.0354 7.78869 15.1218 6.48822 14.8319C5.18775 14.5419 3.99677 13.8875 3.05461 12.9454C2.11246 12.0032 1.45811 10.8122 1.16814 9.51178C0.878168 8.21131 0.96456 6.85515 1.41721 5.60199C1.86986 4.34883 2.67005 3.2505 3.72413 2.43552C4.77822 1.62054 6.04262 1.12261 7.36937 1C6.5926 2.05088 6.21881 3.34566 6.31599 4.64884C6.41317 5.95202 6.97487 7.17704 7.89892 8.10109C8.82296 9.02513 10.048 9.58683 11.3512 9.68401C12.6543 9.78119 13.9491 9.4074 15 8.63063V8.63063Z" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        
        Dark Mode
      `;
    }
  }
}