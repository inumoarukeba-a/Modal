'use strict';



/* Common
=========================================================== */

/* Variables
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
var doc   = document,
    win   = window;


/* Closest
−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */
var closest = function ( node, selector ) {
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
      MODAL_ITEM_NUM  = MODAL_ITEM.length,
      MODAL_WRAP      = doc.getElementsByClassName('modal__wrap'),
      MODAL_TRIGGER   = doc.getElementsByClassName('modal__trigger'),
      MODAL_CLOSE     = doc.getElementsByClassName('modal__close'),
      MODAL_PREV      = doc.getElementsByClassName('modal__prev'),
      MODAL_NEXT      = doc.getElementsByClassName('modal__next'),
      modalActive     = null,
      modalTarget;


  /* Functions
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */

  // Show Modal
  var showModal = function (e) {
    // Init Scroll Position
    e.scrollTop = 0;
    // Add Class
    e.classList.add('-show');
    // Set Active Element
    setTimeout(function(){
      modalActive = e;
    }, 100);
  }

  // Close Modal
  var closeModal = function (e) {
    // Remove Class
    modalActive.classList.remove('-show');
  }

  // Move Modal
  var moveModal = function (direction) {
    // Get Target
    modalTarget = [].slice.call(MODAL_ITEM).indexOf(modalActive);
    modalTarget = Number(modalTarget);
    if (direction == 'prev' && modalTarget > 0) {
      modalTarget = modalTarget - 1;
    } else if (direction == 'next' && modalTarget < MODAL_ITEM_NUM - 1) {
      modalTarget = modalTarget + 1;
    } else {
      return false;
    }
    // Call Function
    closeModal();
    showModal(MODAL_ITEM[modalTarget]);
  }

  // Show Overlay
  var showOverlay = function (e) {
    // Add Class
    MODAL[0].classList.add('-show');
  }

  // Close Overlay
  var closeOverlay = function (e) {
    // Remove Active Element
    modalActive = null;
    // Add Class
    MODAL[0].classList.remove('-show');
  }


  /* Triggers
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− */

  // Show Modal
  Array.prototype.forEach.call(MODAL_TRIGGER, function(e, i) {
    e.addEventListener('click', function (e) {
      // Stop Link
      e.preventDefault();
      // Get Target
      modalTarget = this.getAttribute('href');
      modalTarget = doc.querySelector(modalTarget);
      // Call Functions
      showOverlay();
      showModal(modalTarget);
    });
  });

  // Close Modal
  Array.prototype.forEach.call(MODAL_CLOSE, function(e, i) {
    e.addEventListener('click', function (e) {
      // Call Functions
      closeModal();
      closeOverlay();
    });
  });
  doc.addEventListener('click', function (e) {
    if(
      !(modalActive == null) &&
      (!(closest(e.target, '.modal__wrap')) || e.target.className == 'modal__wrap')
    ) {
      // Call Functions
      closeModal();
      closeOverlay();
    };
  });

  // Move Modal
  Array.prototype.forEach.call(MODAL_PREV, function(e, i) {
    e.addEventListener('click', function (e) {
      // Call Functions
      moveModal('prev');
    });
  });
  Array.prototype.forEach.call(MODAL_NEXT, function(e, i) {
    e.addEventListener('click', function (e) {
      // Call Functions
      moveModal('next');
    });
  });

  // Keydown
  window.addEventListener('keydown', function(e) {
    if(!(modalActive == null)) {
      var keyCode = event.keyCode;
      // Escape
      if(keyCode == 27){
        closeModal();
        closeOverlay();
      }
      // <-
      if (keyCode == 37) {
        moveModal('prev');
      }
      // ->
      if (keyCode == 39) {
        moveModal('next');
      }
    }
  });


}, false);
