<script>
	function toggle(btnID) {
  var theButton = document.getElementById(btnID);
  if (theButton.getAttribute("aria-pressed") == "false") {
    theButton.setAttribute("aria-pressed", "true");
  } else {
    theButton.setAttribute("aria-pressed", "false");
  }
}
</script>