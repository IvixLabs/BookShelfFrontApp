import {RefAuthorDto} from '../../author/dto/ref-author.dto'

export interface BookListModel {
    id: string
    name: string
    author: RefAuthorDto
}
