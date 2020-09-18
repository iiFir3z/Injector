let version = '2.0.1';

let obj = {
  onImport: async function() {
    this.logger.debug('visualTweaks', 'Enabling Visual Tweaks');
    
    this.tweaks = {
      'removeHelpButton': true,
      'darkerMode': true,
      'darkestMode': true
    };

    let sheet = window.document.styleSheets[0];

    // Darker Theme / Mode
    sheet.insertRule(`body.theme-darker {
    --background-primary: #000;
    --background-secondary: #111;
    --background-secondary-alt: #000;
    --background-tertiary: #222;

    --channeltextarea-background: #111;
    --background-message-hover: rgba(255,255,255,0.025);

    --background-accent: #222;
    --background-floating: #111;
    }`, sheet.cssRules.length);

    // Darkest Theme / Mode
    sheet.insertRule(`html > body.theme-darkest {
    --background-primary: #000;
    --background-secondary: #050505;
    --background-secondary-alt: #000;
    --background-tertiary: #080808;

    --channeltextarea-background: #080808;

    --background-accent: #111;
    --background-floating: #080808;
    }`, sheet.cssRules.length);

    // Friends menu main container - fix hard coded colors
    sheet.insertRule(`body.theme-darker .container-1D34oG {
      background-color: var(--background-primary);
    }`, sheet.cssRules.length);

    // Autocomplete slash and mention menu - fix hard coded colors
    sheet.insertRule(`body.theme-darker .autocomplete-1vrmpx {
      background-color: var(--background-floating);
    }`, sheet.cssRules.length);
    sheet.insertRule(`body.theme-darker .selectorSelected-1_M1WV {
      background-color: var(--background-accent);
    }`, sheet.cssRules.length);

    // Profile popup - fix hard coded colors
    sheet.insertRule(`body.theme-darker .body-3iLsc4, body.theme-darker .footer-1fjuF6 {
      background-color: var(--background-floating);
    }`, sheet.cssRules.length);

    // Server Boost layer / page - fix hard coded colors
    sheet.insertRule(`body.theme-darker .perksModal-fSYqOq {
      background-color: var(--background-primary);
    }`, sheet.cssRules.length);

    sheet.insertRule(`body.theme-darker .tierBody-16Chc9 {
      background-color: var(--background-floating);
    }`, sheet.cssRules.length);

    sheet.insertRule(`body.theme-darker .perk-2WeBWW {
      background-color: var(--background-floating);
    }`, sheet.cssRules.length);

    
    let tweakFunctions = {
      'removeHelpButton': {
        enable: () => {
          document.querySelector('a[href="https://support.discord.com"] > div[role="button"]').parentElement.style.display = 'none';
        },
        
        disable: () => {
          document.querySelector('a[href="https://support.discord.com"] > div[role="button"]').parentElement.style.display = 'flex';
        }
      },

      'darkerMode': {
        enable: () => {
          document.body.classList.add('theme-darker');
        },

        disable: () => {
          document.body.classList.remove('theme-darker');
        }
      },
      'darkestMode': {
        enable: () => {
          document.body.classList.add('theme-darkest');
        },

        disable: () => {
          document.body.classList.remove('theme-darkest');
        }
      }
    };
    
    this.enableTweak = (tweakName) => {
      tweakFunctions[tweakName].enable();

      this.tweaks[tweakName] = true;
    };
    
    this.disableTweak = (tweakName) => {
      tweakFunctions[tweakName].disable();

      this.tweaks[tweakName] = false;
    };
    
    this.setTweak = (tweakName, value) => {
      if (value === true) {
        this.enableTweak(tweakName);
      } else {
        this.disableTweak(tweakName);
      }
    };
  },
  
  onLoadingFinished: async function() {
    for (let t in this.tweaks) {
      if (this.tweaks[t] === true) this.enableTweak(t);
    }

    this.settings.createItem('Visual Tweaks', [
      `(v${version})`,

      {
        type: 'header',
        text: 'Themes'
      },
      {
        type: 'toggle',
        text: 'Darker Mode',
        subtext: 'A more darker mode',
        onToggle: (c) => { this.setTweak('darkerMode', c); },
        isToggled: () => this.tweaks['darkerMode']
      },
      {
        type: 'toggle',
        text: 'Darkest Mode',
        subtext: 'Pure dark',
        onToggle: (c) => { this.setTweak('darkestMode', c); },
        isToggled: () => this.tweaks['darkestMode']
      },

      {
        type: 'header',
        text: 'Individual Minor Tweaks'
      },
      {
        type: 'toggle',
        text: 'Hide Help Button',
        subtext: 'Hides the help button in the top right corner',
        onToggle: (c) => { this.setTweak('removeHelpButton', c); },
        isToggled: () => this.tweaks['removeHelpButton']
      }
    ]);
  },

  remove: async function() {
    for (let t in this.tweaks) {
      if (this.tweaks[t] === true) this.disableTweak(t);
    }

    let settingItem = this.settings.items.find((x) => x[1] === 'Visual Tweaks');
    this.settings.items.splice(this.settings.items.indexOf(settingItem), 1);
  },
  
  logRegionColor: 'darkred',

  name: 'Visual Tweaks',
  description: 'A variety of visual tweaks, including themes and small changes',

  author: 'Ducko',

  version
};

obj