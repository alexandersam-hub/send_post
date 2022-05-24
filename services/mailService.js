const mailer = require('nodemailer')
const config = require('../config')

class MailService {
    constructor() {
        this.transporter = mailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "info@rodnyeigry.ru", // generated ethereal user
                pass: "NG326272" // generated ethereal password
            }
        });
    }

    async sendMessageToInfo(text, mail) {
        try{

            await this.transporter.sendMail({
                from: "info@rodnyeigry.ru",
                to: "info@rodnyeigry.ru",
                subject: 'Родные игры.',
                text: '',
                html: `
            <div>
                <h1>Поступило обращение</h1>
                <div>Пользователь: ${mail}</div>
                <div>Текст сообщения:</div>
                <div>${text}</div>
            </div>
            `
            })
            return {warning: false}
        }catch (e) {
            console.log(e)
            return {warning:true, message:'Ошибка отправки письма пользователю'}
        }
    }
    async sendInformationUser(toMail) {
        try{

            await this.transporter.sendMail({
                from: "info@rodnyeigry.ru",
                to: toMail,
                subject: 'Родные игры.',
                text: '',
                html: `
            <div>
                <h1>Команда Родные Игры</h1>
                <div>Ваша заявка принята</div>
            </div>
            `
            })
            return {warning: false}
        }catch (e) {
            console.log(e)
            return {warning:true, message:'Ошибка отправки письма пользователю'}
        }
    }

}

module.exports = new MailService()