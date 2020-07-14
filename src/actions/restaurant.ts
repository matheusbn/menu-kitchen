import RestaurantService from "../services/restaurant";

export const fetchRestaurant = (user) =>
  async (dispatch) => {
    const snapshot = await RestaurantService.getRestaurantSnapshotByStaff(user);
    if (!snapshot) throw new Error("no restaurant registered yet");

    const restaurant = {
      ref: snapshot.ref,
      data: snapshot.data(),
    };

    dispatch({
      type: "SET_RESTAURANT",
      restaurant,
    });
  };
