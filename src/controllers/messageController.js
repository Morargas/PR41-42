import * as messageService from '../services/messageService.js'
//Функция получкения сообщений
export async function getMessages(req, res, next) {
  try {
    const messages = await messageService.getMessages(req.params.id)
    res.status(200).json({ messages })
  } catch (error) {
    next(error)
  }
}
//Создания сообщения
export async function createMessage(req, res, next) {
    try {
        const message = await messageService.createMessage(
            req.params.id,        
            req.user.sub,        
            req.body.content      
        )
        res.status(201).json({ message }) 
    } catch (error) {
        next(error)
    }
}
