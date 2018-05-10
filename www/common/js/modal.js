'use strict';



/* Common
=========================================================== */

/* Variables
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
var doc   = document,
    win   = window;


/* Closest
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
function closest(node, selector) {
  return (node.closest || function(_selector) {
    do {
      if ((node.matches || node.msMatchesSelector).call(node, _selector)) {
        return node;
      }
      node = node.parentElement || node.parentNode;
    } while (node !== null && node.nodeType === 1);

    return null;
  }).call(node, selector);
}



doc.addEventListener('DOMContentLoaded', function() {


  /* Modal
  =========================================================== */

  /* Variables
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
  var MODAL           = doc.getElementsByClassName('modal'),
      MODAL_ITEM      = doc.getElementsByClassName('modal__item'),
      MODAL_TRIGGER   = doc.getElementsByClassName('modal__trigger'),
      MODAL_CLOSE     = doc.getElementsByClassName('modal__close'),
      MODAL_PREV      = doc.getElementsByClassName('modal__prev'),
      MODAL_NEXT      = doc.getElementsByClassName('modal__next'),
      modalTarget;


  /* Functions
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */

  // Show Modal
  var showModal = function (e) {
    // Init Scroll Position
    e.scrollTop = 0;
    // Add Class
    e.classList.add('-show');
  }

  // Close Modal
  var closeModal = function (e) {
    // Get Target
    modalTarget = closest(e, '.modal__item');
    // Remove Class
    modalTarget.classList.remove('-show');
  }

  // Move Modal
  var moveModal = function (e) {
    // Get Target
    modalTarget = closest(e, '.modal__item');
    modalTarget = [].slice.call(MODAL_ITEM).indexOf(modalTarget);
    if (e.className == 'modal__prev') {
      modalTarget = parseInt(modalTarget - 1);
    } else if (e.className == 'modal__next') {
      modalTarget = parseInt(modalTarget + 1);
    }
    // Call Function
    showModal(MODAL_ITEM[modalTarget]);
  }

  // Show Overlay
  var showOverlay = function (e) {
    // Add Class
    MODAL[0].classList.add('-show');
  }

  // Close Overlay
  var closeOverlay = function (e) {
    // Add Class
    MODAL[0].classList.remove('-show');
  }


  /* Triggers
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */

  // Show Modal
  Array.prototype.forEach.call(MODAL_TRIGGER, function(e, index) {
    e.addEventListener('click', function (e) {
      // Stop Link
      e.preventDefault();
      // Get Target
      modalTarget = this.getAttribute('href');
      modalTarget = doc.querySelector(modalTarget);
      // Call Function
      showOverlay();
      showModal(modalTarget);
    });
  });

  // Close Modal
  Array.prototype.forEach.call(MODAL_CLOSE, function(e, index) {
    e.addEventListener('click', function (e) {
      // Call Function
      closeOverlay();
      closeModal(this);
    });
  });

  // Move Modal
  Array.prototype.forEach.call(MODAL_PREV, function(e, index) {
    e.addEventListener('click', function (e) {
      // Call Function
      closeModal(this);
      moveModal(this);
    });
  });
  Array.prototype.forEach.call(MODAL_NEXT, function(e, index) {
    e.addEventListener('click', function (e) {
      // Call Function
      closeModal(this);
      moveModal(this);
    });
  });



}, false);
