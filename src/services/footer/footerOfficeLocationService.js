const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Unable to load footer office location');
  }
  return data;
};

export const getFooterOfficeLocation = async () => {
  const response = await fetch('/api/footer-office-location', { credentials: 'include' });
  return handleResponse(response);
};
