const CONTENT_TYPE_BLOBS = [
    'application/octet-stream',
    'image/png',
    'image/jpeg',
    'application/excel',
  ];
  

  export const processSuccessResponse = async <T extends unknown>(response: Response): Promise<T> => {
    try {
      let result;
      const contentType = response?.headers.get('Content-Type');
  
      if (contentType && CONTENT_TYPE_BLOBS.includes(contentType)) {
        result = await response.blob();
      } else {
        result = await response.json();
      }
      return result;
    } catch (error) {
      return undefined as T;
    }
  };
  