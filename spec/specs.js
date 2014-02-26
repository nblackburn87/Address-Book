describe("Address", function () {
  describe("fullAddress", function() {
    it("returns the full address with nice formatting", function() {
      var testAddress = Object.create(Address);
      testAddress.street = "123 4th Ave";
      testAddress.city = "Portland";
      testAddress.state = "Oregon";
      testAddress.fullAddress().should.equal("123 4th Ave, Portland, Oregon");
    });
  });
  describe("valid", function() {
    it("returns false if City is not a string", function() {
      var testAddress = Object.create(Address);
      testAddress.city = "125Dre";
      testAddress.valid().should.equal(false);
    });
  });
});

describe("Phone", function(){
  describe("phoneNumber", function(){
    it("returns a phone number with nice formatting", function(){
      var testPhone = Object.create(Phone);
      testPhone.areaCode = "545";
      testPhone.firstThreeNumbers = "551";
      testPhone.lastFourNumbers = "1234"; 
      testPhone.phoneNumber().should.equal("545-551-1234");
    });
  });
  describe("valid", function() {
    it("returns invalid for an entry containing non-number characters", function() {
      var testPhone = Object.create(Phone);
      testPhone.areaCode = "332";
      testPhone.firstThreeNumbers = "3445";
      testPhone.lastFourNumbers = "5698";
      testPhone.valid().should.equal(false);
    });
  });
});
