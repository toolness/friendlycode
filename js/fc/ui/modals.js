"use strict";

define(function() {

  return function(options) {
    var codeMirror = options.codeMirror,
        publishUI = options.publishUI,
        socialMedia = options.socialMedia;

    var hideModals = function() {
      $(".modal-overlay").hide();
    }

    /**
     * When someone clicks on the darkening-overlay, rather
     * than the modal dialog, close the modal dialog again.
     */
    $(".modal-overlay").click(function() { $(this).hide(); });
    // intercept and block for clicks inside the modal
    $(".modal-overlay div").click(function() { return false; });
   
    /**
     * The escape key should univerally close modal dialogs
     */ 
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        hideModals();
      }
    });

    /**
     * Add accordion behaviour to the publication dialog.
     */
    var accordion = $(".thimble-menu-content div.accordion");
    var clickHandler = function(item) {
      accordion.addClass("collapsed");
      $(item).removeClass("collapsed");
    }
    accordion.click(function() { clickHandler(this); });

    /**
     * modal dialog interaction sequence
     */
    codeMirror.on("change", function() {
      var isEnabled = codeMirror.getValue().trim().length ? true : false;
      $("#publish-button").toggleClass("enabled", isEnabled);
    });
    
    $("#publish-button").click(function(){
      if ($(this).hasClass("enabled")) $("#confirm-dialog").show();
    });

    // CONFIRM DIALOG IS IN MAIN.JS FOR THE MOMENT DUE TO
    // ITS NEED TO CALL A PUBLICATION CALLBACK IN MAIN.JS

    $("#modal-close-button, #cancel-publication").click(function(){ 
      hideModals();
    });

    /**
     * Late-loading for social media
     */
    $("#share-result").click(function() {
      var mediaList = $("#share-result li");
      mediaList.each(function() {
        var element = $(this),
             medium = element.attr("data-medium");
        if (!element.hasClass("hotloaded") && medium && socialMedia[medium]) {
          socialMedia.hotLoad($, element, socialMedia[medium]);
          element.addClass("hotloaded");
        }
      });
    });
  };
});
