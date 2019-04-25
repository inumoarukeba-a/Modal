'use strict'

/* Common
=========================================================== */

/* Variables
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
const DOC = document
const WIN = window

/* Closest
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
const _CLOSEST = (el, targetClass) => {
  for (let item = el; item; item = item.parentElement) {
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
  const $MODAL = DOC.querySelector('.modal')
  const $MODAL_ITEM = DOC.querySelectorAll('.modal__item')
  const $MODAL_TRIGGER = DOC.querySelectorAll('.modal__trigger')
  const $MODAL_CLOSE = DOC.querySelectorAll('.modal__close')
  const $MODAL_PREV = DOC.querySelectorAll('.modal__prev')
  const $MODAL_NEXT = DOC.querySelectorAll('.modal__next')
  const $HTML = DOC.querySelector('html')
  const MODAL_ITEM_LENGTH = $MODAL_ITEM.length
  const MODAL_TRIGGER_LENGTH = $MODAL_TRIGGER.length
  const MODAL_CLOSE_LENGTH = $MODAL_CLOSE.length
  const MODAL_PREV_LENGTH = $MODAL_PREV.length
  const MODAL_NEXT_LENGTH = $MODAL_NEXT.length
  let scroll_top = WIN.pageYOffset
  let modal_active = false
  let modal_target

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

  // Close Modal
  const CLOSE_MODAL = () => {
    // Remove Class
    modal_active.classList.remove('-show')
    $HTML.focus()
  }

  // Move Modal
  const MOVE_MODAL = direction => {
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

  // Show Overlay
  const SHOW_OVERLAY = () => {
    // HTML
    scroll_top = WIN.pageYOffset
    $HTML.style.top = -scroll_top + 'px'
    $HTML.classList.add('-fixed')
    // Add Class
    $MODAL.classList.add('-show')
  }

  // Close Overlay
  const CLOSE_OVERLAY = () => {
    // Remove Active Element
    modal_active = false
    // HTML
    $HTML.classList.remove('-fixed')
    $HTML.scrollTop = scroll_top
    // Add Class
    $MODAL.classList.remove('-show')
  }

  /* Triggers
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
  // Show Modal
  for (let i = 0; i < MODAL_TRIGGER_LENGTH; i++)
    (n => {
      $MODAL_TRIGGER[n].addEventListener(
        'click',
        event => {
          // Stop Link
          event.preventDefault()
          // Get Target
          modal_target = $MODAL_TRIGGER[n].getAttribute('href')
          modal_target = DOC.querySelector(modal_target)
          // Call Functions
          SHOW_OVERLAY()
          SHOW_MODAL(modal_target)
        },
        false
      )
    })(i)

  // Close Modal
  for (let i = 0; i < MODAL_CLOSE_LENGTH; i++)
    (n => {
      $MODAL_CLOSE[n].addEventListener(
        'click',
        event => {
          // Call Functions
          CLOSE_MODAL()
          CLOSE_OVERLAY()
        },
        false
      )
    })(i)
  DOC.addEventListener('click', event => {
    if (modal_active == false) return
    if (_CLOSEST(event.target, 'modal__wrap')) return
    // Call Functions
    CLOSE_MODAL()
    CLOSE_OVERLAY()
  })

  // Move Modal
  for (let i = 0; i < MODAL_PREV_LENGTH; i++)
    (n => {
      $MODAL_PREV[n].addEventListener(
        'click',
        event => {
          // Call Functions
          MOVE_MODAL('prev')
        },
        false
      )
    })(i)
  for (let i = 0; i < MODAL_NEXT_LENGTH; i++)
    (n => {
      $MODAL_NEXT[n].addEventListener(
        'click',
        event => {
          // Call Functions
          MOVE_MODAL('next')
        },
        false
      )
    })(i)

  // Keydown
  WIN.addEventListener('keydown', () => {
    if (modal_active == true) {
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
  })
}

/* Call Function
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
DOC.addEventListener('DOMContentLoaded', () => {
  _MODAL()
})
