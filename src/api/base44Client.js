import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "683db1637f28b76cbf2cf4a8", 
  requiresAuth: true // Ensure authentication is required for all operations
});
