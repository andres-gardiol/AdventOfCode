class Validator {

  isANumber(iyr) {
    return parseInt(iyr) !== NaN;
  }

  issueYearIsValid = (iyr) => {
    return this.isANumber(iyr) && iyr.length == 4 && (iyr > 2010 && iyr < 2020);
  }

  birthYearIsValid = (byr) => {
    return this.isANumber(byr) && byr.length == 4 && (byr > 1920 && byr < 2002);
  }

  passportIsValid = (passport) => {
    if (!passport.byr)
      return false;
    if (!passport.iyr)
      return false;
    if (!passport.eyr)
      return false;
    if (!passport.hgt)
      return false;
    if (!passport.hcl)
      return false;
    if (!passport.ecl)
      return false;
    if (!passport.pid)
      return false;
    return true;
  }

  parsePassport = (passportAsString) => {
    const pasportAsArray = passportAsString.replace(/\n/g, ' ').split(' ');

    return pasportAsArray.reduce((acum, current) => {
      let keyValue = current.split(':');
      acum[keyValue[0]] = keyValue[1];
      return acum;
    }, {})
  }

  getValidPassports = (input) => {
    return this.getPassportsAsString(input).reduce((acum, current) => {
      this.passportIsValid(this.parsePassport(current)) && acum++;
      return acum;
    }, 0);
  }

  getPassportsAsString = (passports) => {
    return passports.split('\n\n');
  }
}
module.exports = Validator;