import { auth } from './auth';

// Mock data for demo purposes
const mockPerformanceMetrics = [
  { date: "2024-01-01", total_return: 12.5, monthly_return: 2.1, drawdown: -1.2, trades_count: 45, win_rate: 72 },
  { date: "2024-01-02", total_return: 14.2, monthly_return: 2.3, drawdown: -0.8, trades_count: 52, win_rate: 74 },
  { date: "2024-01-03", total_return: 15.8, monthly_return: 2.5, drawdown: -1.5, trades_count: 48, win_rate: 71 },
  { date: "2024-01-04", total_return: 18.3, monthly_return: 2.7, drawdown: -0.9, trades_count: 56, win_rate: 75 },
  { date: "2024-01-05", total_return: 20.1, monthly_return: 2.8, drawdown: -1.1, trades_count: 51, win_rate: 73 }
];

const mockTestimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Professional Trader",
    content: "Alchemist has transformed my trading strategy completely.",
    rating: 5
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Investment Manager",
    content: "The automated trading features are exceptional.",
    rating: 5
  }
];

export const PerformanceMetric = {
  list: async (sortBy = "-date", limit = 30) => {
    return mockPerformanceMetrics;
  }
};

export const Testimonial = {
  list: async () => {
    return mockTestimonials;
  }
};

export const User = auth;