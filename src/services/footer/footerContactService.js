const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Unable to load footer contact info');
  }
  return data;
};

export const getFooterContact = async () => {
  const response = await fetch('/api/footer-contact', { credentials: 'include' });
  return handleResponse(response);
};
