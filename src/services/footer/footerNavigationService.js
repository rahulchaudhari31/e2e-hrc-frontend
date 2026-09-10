const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Unable to load footer navigation');
  }
  return data;
};

export const getFooterNavigation = async () => {
  const response = await fetch('/api/footer-navigation', { credentials: 'include' });
  return handleResponse(response);
};
