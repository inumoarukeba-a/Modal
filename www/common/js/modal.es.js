'use strict'

/* Variables
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
const DOC = document
const WIN = window
const UA = navigator.userAgent
const $HTML = DOC.querySelector('html')
const $BODY = DOC.querySelector('body')
let scroll_top = WIN.pageYOffset
let modal_active = false
let modal_target
let $SCROLL_TAG
if (UA.indexOf('OPR') !== -1 || UA.indexOf('Edge') !== -1) {
  $SCROLL_TAG = $BODY
} else {
  $SCROLL_TAG =
    !window.chrome && 'WebkitAppearance' in document.documentElement.style
      ? $BODY
      : $HTML
}

/* Closest
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
const _CLOSEST = (element, targetClass) => {
  for (let item = element; item; item = item.parentElement) {
    if (item.classList.contains(targetClass)) {
      return item
    }
  }
}

/* Modal
=========================================================== */
/* Functions
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
// Show Modal
const SHOW_MODAL = element => {
  // Add Class
  element.classList.add('-opened')
  element.focus()
  // Set Active Element
  setTimeout(() => {
    modal_active = element
  }, 100)
}

// Show Overlay
const SHOW_OVERLAY = () => {
  // HTML
  scroll_top = WIN.pageYOffset
  $HTML.style.top = -scroll_top + 'px'
  $HTML.classList.add('-fixed')
  // Add Class
  DOC.querySelector('.modal').classList.add('-opened')
}

// Close Modal
const CLOSE_MODAL = () => {
  // Remove Class
  modal_active.classList.remove('-opened')
  $HTML.focus()
}

// Close Overlay
const CLOSE_OVERLAY = () => {
  // Remove Active Element
  modal_active = false
  // HTML
  $HTML.classList.remove('-fixed')
  $SCROLL_TAG.scrollTop = scroll_top
  // Remove Class
  DOC.querySelector('.modal').classList.remove('-opened')
}

// Move Modal
const MOVE_MODAL = direction => {
  // Variables
  const $MODAL_ITEM = DOC.querySelectorAll('.modal__item')
  const MODAL_ITEM_LENGTH = $MODAL_ITEM.length
  // Get Target
  modal_target = [].slice.call($MODAL_ITEM).indexOf(modal_active)
  modal_target = Number(modal_target)
  if (direction == 'prev' && modal_target > 0) {
    modal_target = modal_target - 1
  } else if (direction == 'next' && modal_target < MODAL_ITEM_LENGTH - 1) {
    modal_target = modal_target + 1
  } else {
    return false
  }
  // Call Function
  CLOSE_MODAL()
  SHOW_MODAL($MODAL_ITEM[modal_target])
}

// iOS Scroll Measure
// [reference] https://qiita.com/noraworld/items/2834f2e6f064e6f6d41a
const HANDLE_TOUCH_MOVE = (event, element) => {
  if (
    event.target === element &&
    element.scrollTop !== 0 &&
    element.scrollTop + element.clientHeight !== element.scrollHeight
  ) {
    event.stopPropagation()
  } else {
    event.preventDefault()
  }
}
const SCROLL_LIMITEDLY = element => {
  element.scrollTop = 1
  element.addEventListener(
    'scroll',
    () => {
      if (element.scrollTop === 0) {
        element.scrollTop = 1
      } else if (
        element.scrollTop + element.clientHeight ===
        element.scrollHeight
      ) {
        element.scrollTop = element.scrollTop - 1
      }
    },
    {
      passive: true,
    }
  )
  DOC.addEventListener('touchmove', HANDLE_TOUCH_MOVE(event, element), {
    passive: false,
  })
}
const SCROLL_RESTART = element => {
  DOC.removeEventListener('touchmove', HANDLE_TOUCH_MOVE(event, element), {
    passive: false,
  })
}

/* Triggers
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
DOC.addEventListener(
  'click',
  event => {
    const THIS_TARGET = event.target

    /* Show Modal
    −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
    if (_CLOSEST(THIS_TARGET, 'modal__trigger')) {
      const THIS_ELEMENT = _CLOSEST(THIS_TARGET, 'modal__trigger')
      // Stop Link
      event.preventDefault()
      // Get Target
      modal_target = THIS_ELEMENT.getAttribute('href')
      modal_target = DOC.querySelector(modal_target)
      // Call Functions
      SCROLL_LIMITEDLY(modal_target)
      SHOW_OVERLAY()
      SHOW_MODAL(modal_target)
    }

    /* Modal Controll
    −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
    if (!modal_active) return false

    /* Move Modal
    −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
    if (_CLOSEST(THIS_TARGET, 'modal__prev')) {
      // Call Functions
      MOVE_MODAL('prev')
      return false
    }
    if (_CLOSEST(THIS_TARGET, 'modal__next')) {
      // Call Functions
      MOVE_MODAL('next')
      return false
    }

    /* Close Modal
    −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
    if (
      _CLOSEST(THIS_TARGET, 'modal__closeButton') ||
      _CLOSEST(THIS_TARGET, 'modal__closeInterface')
    ) {
      SCROLL_RESTART(modal_target)
      CLOSE_MODAL()
      CLOSE_OVERLAY()
    }
    if (_CLOSEST(THIS_TARGET, 'modal__inner')) return false
    // Call Functions
    SCROLL_RESTART(modal_target)
    CLOSE_MODAL()
    CLOSE_OVERLAY()

    return false
  },
  {
    once: false,
    passive: false,
    capture: false,
  }
)

// Keydown
WIN.addEventListener('keydown', () => {
  if (!modal_active) return false

  const keyCode = event.keyCode
  // Escape
  if (keyCode == 27) {
    CLOSE_MODAL()
    CLOSE_OVERLAY()
  }
  // <-
  if (keyCode == 37) {
    MOVE_MODAL('prev')
  }
  // ->
  if (keyCode == 39) {
    MOVE_MODAL('next')
  }

  return false
})
