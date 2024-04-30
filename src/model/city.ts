import { Entity, Fields } from 'remult'

@Entity('cities', {
  allowApiCrud: true,
})
export class City {
  @Fields.cuid()
  id = ''
  @Fields.string()
  name = ''
}
