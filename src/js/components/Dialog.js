import {select} from '../helpers'

class Dialog {
  constructor ({elems, dialogEl, overlayEl}) {
    // console.log('Dialog.js')
    this.dialogEls = elems
    this.dialogEl = select(`.${ dialogEl }`)
    this.overlayEl = select(`.${ overlayEl }`)

    let focusableEls = this.dialogEl.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
    )
    this.focusableEls = Array.prototype.slice.call(focusableEls)
    this.firstFocusableEl = focusableEls[0]
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1]

    // bind methods
    this.init = this.init.bind(this)
    // this.addEventListeners = this.addEventListeners.bind(this);
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleBackwardTab = this.handleBackwardTab.bind(this)
    this.handleForwardTab = this.handleForwardTab.bind(this)

    // // return
    // if (!this.dialogEl || !this.overlayEl) {
    //   console.log("Dialog Error: missing dialog container or overlay element");
    //   return;
    // }
    this.init()
  }

  init () {
    // console.log('init')
    let Dialog = this
    this.dialogEls.forEach(country => {
      country.addEventListener('click', function(e) {
        e.preventDefault()
        Dialog.open()
        this.closeBtn = select('.js-close-dialog')
        this.closeBtn.addEventListener('click', Dialog.close)
      })
    })
  }

  // addEventListeners (openDialog, closeDialog) {
  //   this.openBtn = openDialog
  //   this.closeBtn = select(closeDialog);
  //   this.openBtn.addEventListener("click", this.open);
  //   this.closeBtn.addEventListener("click", this.close);
  //   console.log(this.openBtn, this.closeBtn)
  // }

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

  close () {
    // console.log('close()')
    select('body').classList.remove('u-noscroll')
    this.dialogEl.setAttribute('aria-hidden', 'true')
    this.overlayEl.setAttribute('aria-hidden', 'true')
    this.focusedElBeforeOpen.focus()
  }

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

  handleBackwardTab (e) {
    if (document.activeElement === this.firstFocusableEl) {
      e.preventDefault()
      this.lastFocusableEl.focus()
    }
  }

  handleForwardTab (e) {
    if (document.activeElement === this.lastFocusableEl) {
      e.preventDefault()
      this.firstFocusableEl.focus()
    }
  }
}

export default Dialog
