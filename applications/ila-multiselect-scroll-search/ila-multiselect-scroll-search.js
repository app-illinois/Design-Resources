(function ($) {
  function itemClick() {
  var listbutton = $("#ila-selected-item");
  var fieldset = $("fieldset[aria-labelledby='ila-multiselect-container']");
  
  if ($(listbutton).attr("aria-expanded") == "true") {
    $(listbutton).attr("aria-expanded", "false");
    fieldset.removeClass("expanded");
    $("#ila-selected-item .fa-chevron-down").removeClass("fa-chevron-down--open");
  } else {
    $(listbutton).attr("aria-expanded", "true");
    fieldset.addClass("expanded");
    $("#ila-selected-item .fa-chevron-down").addClass("fa-chevron-down--open");
    // Focus on search box when dropdown opens
    setTimeout(function() {
      $("#search-box").focus();
    }, 300); // Wait for animation to complete
  }
}

  $(function() {
    // Add click handler for the button
    $("#ila-selected-item").on("click", function() {
      itemClick();
    });
    
    // Add Enter key support for the button
    $("#ila-selected-item").on("keydown", function(e) {
      if (e.keyCode == 13) { // Enter key
        e.preventDefault();
        itemClick();
      }
    });
    
    
    // Global escape key handler - closes dropdown if open
    $(document).on("keyup", function(e) {
      if (e.keyCode == 27) { // Escape key
        if ($("#ila-selected-item").attr("aria-expanded") == "true") {
          itemClick();
          $("#ila-selected-item").focus();
        }
      }
    });
    
    // Search functionality
    $("#search-box").on("input", function() {
      var searchTerm = $(this).val().toLowerCase();
      $(".ila-checkbox-item").each(function() {
        var labelText = $(this).find("label").text().toLowerCase();
        if (labelText.includes(searchTerm)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
    
    // Prevent search box clicks from closing dropdown
    $("#search-box").on("click", function(e) {
      e.stopPropagation();
    });
    
    // Clear search when dropdown closes
    $("#ila-selected-item").on("click", function() {
      if ($(this).attr("aria-expanded") == "true") {
        $("#search-box").val("");
        $(".ila-checkbox-item").show();
      }
    });
    
    $("input[name='multiselect-item']").on("change", function() {
      var itemCount = $("input[name='multiselect-item']:checked").length;
      if (itemCount == 0)
        $("#label-slot").html("Choose a car:");
      else if (itemCount == 1)
        $("#label-slot").html($("label[for='" + $("input[name='multiselect-item']:checked")[0].id + "']").text());
      else
        $("#label-slot").html(itemCount + " items selected");
    });
    
    // Remove the old escape key handler from checkboxes since we now have a global one
    
    // Add Enter key support for checkboxes
    $("input[name='multiselect-item']").on("keydown", function(e) {
      if (e.keyCode == 13) { // Enter key
        e.preventDefault();
        $(this).prop("checked", !$(this).prop("checked")).trigger("change");
      }
    });
  });
  

})(jQuery);
