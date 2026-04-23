import api from "./api";
import axios from "axios";


export const doctorService = {
  async getDoctor(params) {
    console.log("get doctor function is running here");
    console.log(params);
    const response = await axios.get("http://localhost:3000/api/avail/doctors", {
      params,
    }
  
  );
    console.log(response);
    return response.data;
  },
  async getDoctorSlots(doctorId, date) {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3000/api/avail/doctor/${doctorId}/slots`,
      {
        params: { date },
      },
       {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 THIS LINE IS MUST
        },
      },
    );
    console.log(response);
    return response.data;
  },
};
