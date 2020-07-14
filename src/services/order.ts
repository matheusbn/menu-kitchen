import firebase from 'firebase/app'
import 'firebase/firestore'

class OrderService {
  constructor(private ref) {}

  async advanceStatus(currentStatus: orderStatus) {
    let nextStatus: orderStatus
    if (currentStatus === 'open') nextStatus = 'preparing'
    else if (currentStatus === 'preparing') nextStatus = 'done'
    else throw new Error(`Received wrong status: ${currentStatus}`)

    console.log(currentStatus, nextStatus)

    return this.ref.update({ status: nextStatus })
  }
}

export default OrderService
