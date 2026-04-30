import api from './api';

export const healthMetricsService = {
  async getMetrics() {
    const response = await api.get('/patient/health-metrics');
    return response.data;
  },
  async updateMetrics(data) {
    const response = await api.post('/patient/health-metrics', data);
    return response.data;
  }
};