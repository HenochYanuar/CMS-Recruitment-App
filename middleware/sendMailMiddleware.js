const { mailer } = require('../config/mailConfig')
const ejs = require('ejs')
const path = require('path')

class MailRegister {

  constructor( data ){
    this.data = data
  }

  async sendMail(){
    const templatePath = path.join(__dirname, '..', 'view', 'mail', 'invitationMail.ejs');

    const renderedTemplate = await ejs.renderFile(templatePath, {
      data: this.data,
    })

    mailer(this.data.userDetail.email, renderedTemplate)

  }

}

module.exports = MailRegister