const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Unable to load footer company info');
  }
  return data;
};

export const getFooterCompany = async () => {
  const response = await fetch('/api/footer-company', { credentials: 'include' });
  return handleResponse(response);
};
