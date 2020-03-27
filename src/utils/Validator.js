const privates = {
  validate ({ key, value }) {
    if (this.patterns[key]) {
      if (this.patterns[key].test(value)) {
        this.isValid = true
      } else {
        this.error = this.errors[key]
      }
    }
  }
}

export default class Validator {
  constructor () {
    this.patterns = {
      name: /^[0-9a-zA-Zа-яА-ЯёЁ]+$/i,
      // eslint-disable-next-line no-useless-escape
      email: /^[0-9a-zA-Z-\.]+\@[0-9a-zA-Z-]{2,}\.[a-zA-Z]{2,}$/i,
      password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z0-9!@#$%^&*]{6,}/i
    }
    this.errors = {
      name: 'Name must contain only letters or numbers',
      email: 'Invalid email',
      password: 'password is not strong enough: at least one digit, uppercase and lowercase letters, length not less than 6 but not more than 50 characters'
    }
    this.isValid = false
    this.error = ''
  }

  validateForm ({ key, value }) {
    privates.validate.call(this, { key, value })
  }
}
