import {RefAuthorDto} from '../../author/dto/ref-author.dto'

export interface BookFormModel {
    id?: string
    name?: string
    description?: string
    author?: RefAuthorDto
}
