import {startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isAfter} from 'date-fns'
import Appointment from '../models/Appointment'
import {Op} from 'sequelize'

class AvailableController {
  async index(req, res) {//listando todos os horarios disponiveis apenas do dia em causa
    const {date} = req.query//data pega do browser(new Date.getTime())

    if(!date) {//se a data nao existe
      return res.status(400).json({error: 'Invalid date'})
    }

    const searchDate = Number(date)

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(searchDate),
            endOfDay(searchDate),
          ]
        }

      }
    })

    const schedule = [//todos horarios disponiveis que um prestador possui
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ]

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0)
      //ver se o horario ja nao passou
      
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),//repersentacao da data completa com o timestamp
        available: 
          isAfter(value, new Date()) &&//horarios futuros
          !appointments.find(a =>// vem se os appointments ja nao estao marcados
            format(a.date, 'HH:mm') === time
            )
      }

      //ver se ja nao esta ocupado
    })

    return res.json(available)
  }
}

export default new AvailableController()