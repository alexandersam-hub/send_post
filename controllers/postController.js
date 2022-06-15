const mailService = require('../services/mailService')
const telegramSendService = require('../services/TelegramSendService')

class PostController{
    async sendPostToInfo(req,res){
        const {text, mail,phone} = req.body
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        if( mail){
            const result = await mailService.sendMessageToInfo(text, mail, phone)
            telegramSendService.sendMessageToAdmin(`Обратная связь. Родные игры - портал. Телефон: ${phone}, mail:${mail}, текст:${text}` )
            return res.json(result)
        }
        else
            return res.json({warning:true, message:'Заполнены не все данные'})
    }
}

module.exports = new PostController()