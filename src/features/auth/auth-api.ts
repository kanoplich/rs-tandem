export const authApi = {
  async login(email: string, password: string) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при входе в систему');
    }

    return response.json();
  },
};
