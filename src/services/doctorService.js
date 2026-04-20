import api from "./api";
import axios from "axios";

export const doctorService = {
  async getDoctor(params) {
    console.log("get doctor function is running here");
    console.log(params);
    const response = await axios.get("http://localhost:3000/api/doctors", {
      params,
    });
    console.log(response);
    return response.data;
  },
  async getDoctorSlots(doctorId, date) {
    const response = await axios.get(
      `http://localhost:3000/avl/doctors/${doctorId}/slots`,
      {
        params: { date },
      },
    );
    console.log(response);
    return response.data;
  },
};
