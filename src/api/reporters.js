import apiClient from './apiClient.js';

export const applyForReporter = async (applicationData) => {
  const { data } = await apiClient.post('/reporters/apply', applicationData);
  return data;
};

export const fetchReporterApplications = async () => {
  const { data } = await apiClient.get('/reporters/applications');
  return data;
};
