import api from "./api";
import axios from "axios";

export const appointmentService = {
  async bookAppointment(data) {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/api/appointments",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 THIS LINE IS MUST
        },
      },
    );
    return response.data;
  },
  async getPatientAppointments(params) {
    const response = await api.get(
      "http://localhost:3000/api/appointments/patient",
      { params },
    );
    console.log(response);
    return response;
  },
  async getDoctorAppointments() {
      const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/api/appointments/doctor",
      {headers: {
        Authorization: `Bearer ${token}`, // ✅ MUST
      },}
    );
    console.log(response)
    console.log("docTor appointment");
    return response.data;
  },
  async updateStatus(appointmentId, status, cancellationReason = "") {
    const response = await api.patch(`/appointments/${appointmentId}/status`, {
      status,
      cancellationReason,
    });
    return response.data;
  },
  // appointmentService.js
async updateAppointmentStatus(appointmentId, status) {
  const token = localStorage.getItem('token'); // or from authStore
  const response = await axios.patch(
    `http://localhost:3000/api/appointments/${appointmentId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
};
