'use strict'

/* Common
=========================================================== */

/* Variables
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
const DOC = document
const WIN = window
const UA = navigator.userAgent

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
const _MODAL = () => {
  /* constiables
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
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

  /* Functions
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
  // Show Modal
  const SHOW_MODAL = node => {
    // Init Scroll Position
    node.scrollTop = 0
    // Add Class
    node.classList.add('-show')
    node.focus()
    // Set Active Element
    setTimeout(() => {
      modal_active = node
    }, 100)
  }

  // Show Overlay
  const SHOW_OVERLAY = () => {
    // HTML
    scroll_top = WIN.pageYOffset
    $HTML.style.top = -scroll_top + 'px'
    $HTML.classList.add('-fixed')
    // Add Class
    DOC.querySelector('.modal').classList.add('-show')
  }

  // Close Modal
  const CLOSE_MODAL = () => {
    // Remove Class
    modal_active.classList.remove('-show')
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
    DOC.querySelector('.modal').classList.remove('-show')
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
        SHOW_OVERLAY()
        SHOW_MODAL(modal_target)
      }

      /* Close Modal
      −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
      if (modal_active) {
        if (_CLOSEST(THIS_TARGET, 'modal__close')) {
          // Call Functions
          CLOSE_MODAL()
          CLOSE_OVERLAY()
        }
        if (_CLOSEST(THIS_TARGET, 'modal__wrap')) return
        // Call Functions
        CLOSE_MODAL()
        CLOSE_OVERLAY()
      }

      /* Move Modal
      −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
      if (_CLOSEST(THIS_TARGET, 'modal__prev')) {
        // Call Functions
        MOVE_MODAL('prev')
      }
      if (_CLOSEST(THIS_TARGET, 'modal__next')) {
        // Call Functions
        MOVE_MODAL('next')
      }

      return false
    },
    false
  )

  // Keydown
  WIN.addEventListener('keydown', () => {
    if (modal_active) {
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
    }

    return false
  })
}

/* Call Function
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
DOC.addEventListener('DOMContentLoaded', () => {
  _MODAL()
})
