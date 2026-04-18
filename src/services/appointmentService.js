import api from './api';

export const appointmentService = {
  async bookAppointment(data) {
    const response = await api.post('/appointments', data);
    return response.data;
  },
  async getPatientAppointments(params) {
    const response = await api.get('/appointments/patient', { params });
    return response.data;
  },
  async getDoctorAppointments(params) {
    const response = await api.get('/appointments/doctor', { params });
    return response.data;
  },
  async updateStatus(appointmentId, status, cancellationReason = '') {
    const response = await api.patch(`/appointments/${appointmentId}/status`, { status, cancellationReason });
    return response.data;
  }
};