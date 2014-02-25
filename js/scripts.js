var Contact = {
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

var Address = {
  fullAddress: function() {
    return this.street + ", " + this.city + ", " + this.state;
  }
};

var Phone = {
  phoneNumber: function() {
    return this.areaCode + "-" + this.firstThreeNumbers + "-" + this.lastFourNumbers;
  },

  valid: function() {
    if ((this.areaCode.length === 3) && (this.firstThreeNumbers.length === 3) && (this.lastFourNumbers.length === 4)) {
      if ((this.areaCode % 1 !== 0) || (this.firstThreeNumbers % 1 !== 0) || (this.lastFourNumbers % 1 !== 0)) {
        return false;
      } 
    } else {
      return false;
    } 
    return true;
  } 
};

$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('Next Address' + '<div class="new-address">' +
                                  '<div class="form-group">' +
                                    '<input type="text" class="form-control new-street" placeholder="Street">' +
                                  '</div>' +
                                  '<div class="form-group">' +
                                    '<input type="text" class="form-control new-city" placeholder="City">' +
                                  '</div>' +
                                  '<div class="form-group">' +
                                    '<input type="text" class="form-control new-state" placeholder="State">' +
                                  '</div>' +
                                '</div>') 
  });
  $("#add-phone").click(function() {
    $("#new-phone-numbers").append('<div class="new-phone">' +
                                      '<div class="col-xs-3">' +
                                        '<div class="form-group">' +
                                          '<input type="text" class="form-control new-area-code"  placeholder="Area Code">' +
                                        '</div>' +
                                      '</div>' +
                                      '<div class="col-xs-4">  ' +
                                        '<div class="form-group">' +
                                          '<input type="text" class="form-control new-first-three" placeholder="First Three Digits">' +
                                        '</div>' +
                                      '</div>' +
                                      '<div class="col-xs-5">' +
                                        '<div class="form-group">' +
                                          '<input type="text" class="form-control new-last-four"  placeholder="Last Four Digits">' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>')
  });
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = Object.create(Contact);
    newContact.firstName = inputtedFirstName;
    newContact.lastName = inputtedLastName;

    newContact.phoneNumbers = [];
    newContact.addresses = [];

    var newPhone = Object.create(Phone);

    $(".new-phone").each(function() {
      var inputtedAreaCode = $(this).find("input.new-area-code").val();
      var inputtedFirstThree = $(this).find("input.new-first-three").val();
      var inputtedLastFour = $(this).find("input.new-last-four").val();
  
        newPhone.areaCode = inputtedAreaCode;
        newPhone.firstThreeNumbers = inputtedFirstThree;
        newPhone.lastFourNumbers = inputtedLastFour;
        newContact.phoneNumbers.push(newPhone);
    });

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();

      var newAddress = Object.create(Address);
      newAddress.street = inputtedStreet;
      newAddress.city = inputtedCity;
      newAddress.state = inputtedState;

      newContact.addresses.push(newAddress);
    });

    if (newPhone.valid()) {
      $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

      $(".contact").last().click(function() {
      
        $("#show-contact").show();

        $("#show-contact h2").text(newContact.fullName());
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);

        $("ul#phone-numbers").text("");
        newContact.phoneNumbers.forEach(function(phone) {
          $("ul#phone-numbers").append("<li>" + phone.phoneNumber() + "</li>");
        });

        $("ul#addresses").text("");
        newContact.addresses.forEach(function(address) {
          $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
        });
      });
      } else {
        alert("Please Enter a Valid Number.");  
      }
    

    this.reset();
  });
});

