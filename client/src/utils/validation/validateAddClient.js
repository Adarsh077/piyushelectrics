export default (data, exceptions = {}) => {
  const errors = {};
  if (!data.name) errors.name = "Name is required";
  if (!data.room) errors.room = "Room is required";
  if (!data.wing) errors.wing = "Wing is required";
  if (!data.work || exceptions.work) errors.work = "Work is required";
  if (!data.date) errors.date = "Date is required";
  if (!data.area) errors.area = "Area is required.";
  if (!data.mobile) errors.mobile = "Mobile Number is required";
  if (!data.building) errors.building = "Building is required";
  if (data.mobile && data.mobile.toString().length !== 10)
    errors.mobile = "Please enter a valid mobile number";

  /**
   * Boolean({})
   * => true
   */
  return Object.keys(errors).length < 1 ? false : errors;
};
