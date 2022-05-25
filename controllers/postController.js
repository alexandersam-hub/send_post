const mailService = require('../services/mailService')

class PostController{
    async sendPostToInfo(req,res){
        console.log(req.body);
        const {text, mail,phone} = req.body
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        if( mail){
            const result = await mailService.sendMessageToInfo(text, mail, phone)
            return res.json(result)
        }
        else
            return res.json({warning:true, message:'Заполнены не все данные'})
    }
}

module.exports = new PostController()