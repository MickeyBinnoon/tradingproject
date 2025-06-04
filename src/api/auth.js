// Simple local authentication system
const users = new Map();

export const auth = {
  // Register a new user
  register: async (email, password, userData) => {
    if (users.has(email)) {
      throw new Error('User already exists');
    }
    users.set(email, { password, ...userData });
    return { email, ...userData };
  },

  // Login user
  login: async (email, password) => {
    const user = users.get(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    return { email, ...user };
  },

  // Get current user
  me: async () => {
    // In a real app, this would get the user from a session/token
    // For demo purposes, return the first user
    const firstUser = users.values().next().value;
    return firstUser || null;
  },

  // Update user data
  updateMyUserData: async (data) => {
    // In a real app, this would update the user in a database
    // For demo purposes, update the first user
    const firstUser = users.values().next().value;
    if (firstUser) {
      Object.assign(firstUser, data);
    }
    return firstUser;
  }
}; 