const mailService = require('../services/mailService')

class PostController{
    async sendPostToInfo(req,res){
        const{text, mail} = req.body
        console.log(text, mail)
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        if(text && mail){
            const result = mailService.sendMessageToInfo(text, mail)
            return res.json(result)
        }
        else
            return res.json({warning:true, message:'Заполнены не все данные'})
    }
}

module.exports = new PostController()