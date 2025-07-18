// TypeScript interfaces for frontend consumption

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string; // ISO date string
  avatar: string;
  level: string;
  totalXP: number;
  currentLevelXP: number;
  nextLevelXP: number;
  stats: {
    cropsGrown: number;
    problemsSolved: number;
    knowledgeShared: number;
    communityPosts: number;
    daysActive: number;
    seasonsCompleted: number;
    soilTypesManaged: number;
    organicCrops: number;
    farmersHelped: number;
    totalYield?: number;
    landAreaManaged?: number;
  };
  badges?: BadgeData[];
}

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'crop_management' | 'soil_expertise' | 'seasonal_farming' | 'sustainable_farming' | 'community_helper' | 'knowledge_sharing' | 'innovation' | 'achievement' | 'specialist';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  earnedDate?: string; // ISO date string
  progress?: number;
  maxProgress?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface XPResult {
  user: Partial<UserProfile>;
  xpAdded: number;
  leveledUp: boolean;
  newLevel: string;
}

// API endpoints type-safe functions
export class UserAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUserProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    const response = await fetch(`${this.baseUrl}/api/users/profile/${userId}`);
    return response.json();
  }

  async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    const response = await fetch(`${this.baseUrl}/api/users/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async addXP(userId: string, xpAmount: number, reason?: string): Promise<ApiResponse<XPResult>> {
    const response = await fetch(`${this.baseUrl}/api/users/xp/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ xpAmount, reason })
    });
    return response.json();
  }

  async updateUserStats(userId: string, statType: string, increment: number = 1): Promise<ApiResponse<UserProfile>> {
    const response = await fetch(`${this.baseUrl}/api/users/stats/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statType, increment })
    });
    return response.json();
  }
}

export class BadgeAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAllBadges(): Promise<ApiResponse<BadgeData[]>> {
    const response = await fetch(`${this.baseUrl}/api/badges`);
    return response.json();
  }

  async getUserBadges(userId: string): Promise<ApiResponse<BadgeData[]>> {
    const response = await fetch(`${this.baseUrl}/api/badges/user/${userId}`);
    return response.json();
  }

  async awardBadge(userId: string, badgeId: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/api/badges/award/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ badgeId })
    });
    return response.json();
  }
}
