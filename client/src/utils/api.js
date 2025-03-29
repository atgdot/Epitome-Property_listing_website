export const BASE_URL = "http://localhost:3000"; // Ensure this is correct

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

