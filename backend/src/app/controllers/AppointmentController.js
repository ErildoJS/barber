import Appointment from '../models/Appointment'
import {startOfHour, parseISO, isBefore, format, subHours} from 'date-fns'
import pt from 'date-fns/locale/pt'
import User from '../models/User'
import File from '../models/File'
import * as Yup from 'yup'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import CancellationMail from '../jobs/CancellationMail'

class AppointmentController {
  //listagem dos agendamentos do user logado e com quais prestadores 
    //ele tem esses agendamentos
  async index(req, res) {
    const {page = 1} = req.query

    const appointments = await Appointment.findAll({
      where: {user_id: req.userId, canceled_at: null},
      order: ['date'],
      attributes: ['id', 'date',  'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            }
          ]
        }
      ]
    })

    return res.json(appointments)

  }

  async store(req, res) {////para um user poder agendar o serviço com algum prestador de serviço
    const schema = Yup.object().shape({
      provider_id: Yup.date().required(),
      date: Yup.date().required(),
    })

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validations fails'})
    }

    const {provider_id, date} = req.body

    //verificar se esse provider_id é mesmo um provider
    const isProvider = await User.findOne({
      where: {id: provider_id, provider: true}
    })

    if(!isProvider) {
      return res.status(401).json({error: 'You can only create appointment with providers'})
    }

    //verificaçao em falta - para que o user(provider) nao possa marcar agendamento
    // com ele proprio
    //o req.userId nao pode ser  mesmo que o provider_id
    //-----------------------------------------------------------------------

    //parseIso - trasnforma string no objecto date do js
    //startOfHour - pega o inicio da hora sem minutos ou segundos
    //verificano se a data que o user esta tentando passar ja nao passou
    const hourStart = startOfHour(parseISO(date))

    if(isBefore(hourStart, new Date())) {
      return res.status(400).json({error: 'Past dates are not permitted'})
    }

    //verificando se a data ja nao esta sendo usada por este prestador de serviço
    //se permitimos um agendamento por Hora
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
         canceled_at: null,
          date: hourStart
        }
    })

    if(checkAvailability) {
      return res.status(400).json({error: 'Appointment date is not available'})

    }


    const appointment = await Appointment.create({
      user_id: req.userId,//o user que esta marcando o agendamento
      provider_id,//o prestador que vai atender esse agendamento
      date: hourStart
    })

    //notificar prestador de serviço

    const user = await User.findByPk(req.userId)
    const formattedDate = format(hourStart, 
      "'dia' dd 'de' MMM', às' H:mm'h'",
      {locale: pt}
      )
    await Notification.create({
      content: `novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id
    })

    return res.json(appointment)
  }

  async delete(req, res) {//rota para cancelar o agendamento
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    })

    if(appointment.user_id !== req.userId) {
      return res.status(401).json({error: "You dont't have permition to cancel this appointment"})
    }

    //tem que tar 2 horas antes
    const dateWithSub = subHours(appointment.date, 2)

    if(isBefore(dateWithSub, new Date())) {
      return res.status(401).json({error: 'You can only cancel appointment 2 hours in advance'})
    }

    appointment.canceled_at = new Date()

    await appointment.save()

    await Queue.add(CancellationMail.key, {
      appointment
    })

    return res.json(appointment)
  }
}

export default new AppointmentController()