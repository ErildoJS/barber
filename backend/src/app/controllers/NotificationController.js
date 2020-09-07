import Notification from '../schemas/Notification'
import User from '../models/User'
class NotificationController {
  async index(req, res) {//listando notificaçoes do prestador de serviço
    const isProvider = await User.findOne({
      where: {id: req.userId, provider: true}
    })

    if(!isProvider) {
      return res.status(401).json({error: 'Only provider can load notification'})
    }

    const notification = await Notification.find({//find == findAll - retorna tudo
      user: req.userId
    }).sort({createdAt: 'desc'}).limit(20)//order alterada

    return res.json(notification)
  }

  async update(req, res) {//marcando a notificaçao com lida
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {read: true},
      {new: true}//retorna o novo registro actualizado
      )
      return res.json(notification)
  }
}

export default new NotificationController()