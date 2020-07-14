import firebase from "firebase/app";
import "firebase/firestore";

class RestaurantService {
  constructor(private ref) {}

  static async getRestaurantSnapshotByStaff(
    user,
  ): Promise<firebase.firestore.DocumentSnapshot | null> {
    const result = await firebase
      .firestore()
      .collection("restaurants")
      .where("staff", "array-contains", user.uid)
      .get();

    if (result.empty) return null;

    return result.docs[0];
  }

  // TODO: filter only orders from current day
  async onUnfinishedOrders(
    callback: (orders: Order[]) => void,
  ) {
    this.ref
      .collection("orders")
      .where("status", "in", ["open", "preparing"])
      .onSnapshot((querySnapshot) =>
        callback(querySnapshot.docs.map((o) => ({
          ref: o.ref,
          data: o.data(),
        })))
      );
  }
}

export default RestaurantService;
