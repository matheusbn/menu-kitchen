interface Restaurant {
  ref: firebase.firestore.DocumentReference
  data: {
    name: string
    coverPicture: string
    foodType: string
    maxCapacity: number
    address: {
      city: string
      state: string
      street: string
      number: string
      complement: string
    }
    tableCodes: string[]
  }
}

type orderStatus = 'open' | 'preparing' | 'done'
interface OrderData {
  items: ItemOrder[]
  status: orderStatus
  fromTable?: string
  sessionId?: string
  orderedAt?: firebase.firestore.Timestamp
}

interface Session {
  ref: firebase.firestore.DocumentReference
}

interface Order {
  ref: firebase.firestore.DocumentReference
  data: OrderData
}

interface MenuItemData {
  name: string
  description: string
  price?: number
  pictures: string[]
  section: string
  optionals: Optional[]
}

interface MenuItem {
  ref: firebase.firestore.DocumentReference
  data: MenuItemData
}

interface Option {
  name: string
  price?: number
}

interface Optional {
  name: string
  options: Option[]
  required: {
    min?: number
    max?: number
  }
}

interface SelectedOptionals {
  [index: string]: Option[] | Option
}

interface ItemOrder {
  item: {
    id: string
    name: string
  }
  amount: number
  selectedOptionals: SelectedOptionals
  observation: string
  price: number
}
