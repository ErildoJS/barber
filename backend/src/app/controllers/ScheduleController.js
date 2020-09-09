import {startOfDay, endOfDay, parseISO} from 'date-fns'
import {Op} from 'sequelize'

import Appointment from "../models/Appointment"
import User from "../models/User"

class ScheduleController {
  async index(req, res) {//listagem de todos agendamentos do prestador de serviço
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    })

    if (!checkUserProvider) {
      return res.status(401).json({error: 'User is not a provider'})
    }

    //levando em consideracao apenas os agendamentos do dia em que
    //estamos 


    const {date} = req.query
    const parsedDate = parseISO(date)
    //pegando apenas o dia
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(parsedDate),
            endOfDay(parsedDate),
          ]
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ],
      order: ['date'],
    })

    return res.json(appointments)
  }
}

export default new ScheduleController()