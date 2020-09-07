import User from "../models/User"
import File from "../models/File"

class ProviderController {
  async index(req, res) {//listagem de todos prestadores de servicos da app
    const providers = await User.findAll({
      where: {provider: true},
      attributes: ['id', 'name', 'email', 'avatar_id'],//retorna apenas as info que eu quero
      include: [//retornando as info de um Model em especifico (JOIN)
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        },
      ],
    })
    

    return res.json(providers)
  }
}

export default new ProviderController()

/* 
//retornando todos users que sao providers
    const providers = await User.findAll({
      where: {provider: true},
      attributes: ['id', 'name', 'email', 'avatar_id'],//retorna apenas as info que eu quero
      include: [//retornando as info de um Model em especifico (JOIN)
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        },
      ],
    })
*/