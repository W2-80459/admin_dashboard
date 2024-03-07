// reducers.js
const initialState = {
    formData: {
      busNumber: "",
      busType: "",
      numberOfSeats: "",
      departureTime: null,
      arrivalTime: null,
      departureDate: null,
      arrivalDate: null,
      driverName: "",
      driverPhone: "",
    },
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FORM_DATA':
        return {
          ...state,
          formData: action.payload,
        };
      case 'RESET_FORM_DATA':
        return {
          ...state,
          formData: initialState.formData,
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  