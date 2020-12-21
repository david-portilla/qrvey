import {select, selectId} from '../helpers'

/**
* Dialog modal component
* @author David Portilla <david_portilla@hotmail.com>
*/
class Dialog {
  /**
  * Constructor method
  * @param {Nodelist} elems list of countries
  * @param {String} dialogEl dialog class handler
  * @param {String} dialogEl overlay class handler
  */
  constructor ({elems, dialogEl, overlayEl}) {
    this.dialogEls = elems
    this.dialogEl = select(`.${ dialogEl }`)
    this.overlayEl = select(`.${ overlayEl }`)
    this.cname = selectId('country-name')
    this.cregion = selectId('country-region')
    this.cflag = selectId('country-flag')
    this.cpopulation = selectId('country-population')
    this.ccapital = selectId('country-capital')
    this.ccurrency = selectId('country-currency')
    this.clanguage = selectId('country-language')
    this.cborder = selectId('country-border')
    this.ccountryFavorite = selectId('country-favorite')
    let focusableEls = this.dialogEl.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
    )
    this.focusableEls = Array.prototype.slice.call(focusableEls)
    this.firstFocusableEl = focusableEls[0]
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1]
    // bind methods
    this.init = this.init.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.getCountryNames = this.getCountryNames.bind(this)
    this.setFavorite = this.setFavorite.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleBackwardTab = this.handleBackwardTab.bind(this)
    this.handleForwardTab = this.handleForwardTab.bind(this)
    if (!this.dialogEl || !this.overlayEl) {
      console.log('Dialog Error: missing dialog container or overlay element')
      return
    }
    this.init()
  }

  /**
* Initialize method
*/
  init () {
    let Dialog = this
    Dialog.dialogEls.forEach(country => {
      country.addEventListener('click', function(e) {
        e.preventDefault()
        Dialog.setInfo(this)
        Dialog.open()
        this.closeBtn = select('.js-close-dialog')
        this.closeBtn.addEventListener('click', Dialog.close)
        /* eslint-disable-next-line */
        localStorage.getItem(this.id) && Dialog.ccountryFavorite.classList.add('is-favorite')
      })
    })

    Dialog.ccountryFavorite.addEventListener('click', function(e) {
      e.preventDefault()
      Dialog.setFavorite(this)
    })
  }

  /**
* Function to open Dialog modal
*/
  open () {
    // console.log('open()')
    select('body').classList.add('u-noscroll')
    this.focusedElBeforeOpen = document.activeElement
    this.dialogEl.setAttribute('aria-hidden', 'false')
    this.overlayEl.setAttribute('aria-hidden', 'false')
    this.firstFocusableEl.focus()

    this.dialogEl.addEventListener('keydown', (e) => {
      this.handleKeyDown(e)
    })

    this.overlayEl.addEventListener('click', (e) => {
      this.close()
    })
  }

  /**
* Function to close Dialog modal
*/
  close () {
    // console.log('close()')
    select('body').classList.remove('u-noscroll')
    this.dialogEl.setAttribute('aria-hidden', 'true')
    this.overlayEl.setAttribute('aria-hidden', 'true')
    this.ccountryFavorite.classList.remove('is-favorite')
    this.focusedElBeforeOpen.focus()
  }

  /**
* Add information to modal
* @param {Object} obj the Object with the information
*/
  setInfo (obj) {
    this.cname.innerHTML = obj.dataset.name
    this.cregion.innerHTML = obj.dataset.region
    this.cpopulation.innerHTML = obj.dataset.population
    this.ccapital.innerHTML = obj.dataset.capital
    this.ccurrency.innerHTML = obj.dataset.currency
    this.clanguage.innerHTML = obj.dataset.languages
    if (obj.dataset.borders.trim() !== 'undefined') {
      this.cborder.innerHTML = 'loading border countries..'
      this.getCountryNames(obj.dataset.borders).then(res => {
        this.cborder.innerHTML = res
      })
    } else {
      this.cborder.innerHTML = 'No border countries found'
    }
    this.cflag.style.backgroundImage = `url(${ obj.dataset.flag })`
    this.ccountryFavorite.dataset.favorite = `${ obj.dataset.name }`
  }

  /**
* Add information to modal
* @param {Button} btn the button to handle the favorite options
*/
  setFavorite (btn) {
    /* eslint-disable */
    let isFavorite = localStorage.getItem(btn.dataset.favorite)
    if (isFavorite === null) {
      localStorage.setItem(btn.dataset.favorite, true)
      btn.classList.add('is-favorite')
    }
    if (isFavorite) {
      localStorage.removeItem(btn.dataset.favorite)
      btn.classList.remove('is-favorite')
    }
    /* eslint-eneable */
  }

  /**
* Handle key down events
* @param {Object} e the event Object
*/
  handleKeyDown (e) {
    const tab = 'Tab' || 9
    const esc = 'Escape' || 'Esc' || 27

    switch (e.code || e.keyCode) {
      // User navigating with a keyboard should not be able to TAB out of the dialog content
      case tab:
        if (this.focusableEls.length === 1) {
          e.preventDefault()
          break
        }

        if (e.shiftKey) {
          this.handleBackwardTab(e)
        } else {
          this.handleForwardTab(e)
        }
        break

      // When the dialog is open, pressing the ESC key should close it
      case esc:
        this.close()
        break

      default:
        break
    }
  }

  /**
* Handle Backward Tab event
* @param {Object} e the event Object
*/
  handleBackwardTab (e) {
    if (document.activeElement === this.firstFocusableEl) {
      e.preventDefault()
      this.lastFocusableEl.focus()
    }
  }

  /**
* Handle Forward  Tab event
* @param {Object} e the event Object
*/
  handleForwardTab (e) {
    if (document.activeElement === this.lastFocusableEl) {
      e.preventDefault()
      this.firstFocusableEl.focus()
    }
  }

  /**
* Handle Forward  Tab event
* @param {string} str str
*/
  async getCountryNames (str) {
    let cname = str.split(', ')
    let res = ''
    try {
      const params = {
        method: 'GET',
        mode: 'cors'
      }
      for (let h = 0;h < cname.length;h++) {
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${ cname[h] }/`, params)
        if (response.ok) {
          const data = await response.json()
          h < cname.length - 1 ? res += `${ data.name }, ` : res += `${ data.name }`
          // if (h < cname.length - 1) {
          //   res += `${ data.name }, `
          // } else {
          //   res += `${ data.name }`
          // }
        } else {
          res = 'Server Error'
        }
      }
      return res
    } catch (error) {
      console.log('Fetch Country Name Failed: ', error.message)
    }
  }
}

export default Dialog
