export const handleAPIError = (res, error) => {
  console.error('Erro:', {
    message: error.message,
    url: error.config?.url,
    status: error.response?.status
  });

  res.status(error.response?.status || 500).json({
    error: error.response?.data?.message || 'Erro na API',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};