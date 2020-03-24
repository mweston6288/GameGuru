$(document).ready(function() {
  const login = $("form.login");
  login.on("submit", function(event){
    event.preventDefault();
    console.log("Here");
  });
});