import { AppDataSource } from '../database/datasource'
import { TemplateModel } from '../models/template.model'
import { TemplateError } from '../errors/template.error'

const repository = AppDataSource.getRepository(TemplateModel)

class TemplateService {
    async getById(id: number) {
        const template = await repository.findOne({ where: { id } })
        if (template) return template
        throw new TemplateError(`Template with id = ${id} not found`)
    }

    async getAll() {
        return await repository.find()
    }

    async create(number_value: number, string_value: string) {
        const template = new TemplateModel()
        template.number_value = number_value
        template.string_value = string_value
        return await repository.save(template)
    }

    async update(
        id: number,
        number_value: number | null,
        string_value: string | null
    ) {
        const template = await this.getById(id)
        if (template.number_value) template.number_value = number_value
        if (template.string_value) template.string_value = string_value
        return await repository.save(template)
    }

    async delete(id: number) {
        const template = await this.getById(id)
        await repository.delete(template)
    }
}

export default TemplateService
