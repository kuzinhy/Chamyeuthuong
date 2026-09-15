import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cmsService } from './cmsService';
import { Story } from '../types';

export const postService = {
  // Get published stories
  async getPublishedStories(category?: string, region?: string, limitCount: number = 10) {
    try {
      const constraints: any[] = [
        where('status', '==', 'published'),
        where('isDeleted', '==', false),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      ];
      
      if (category) constraints.push(where('categoryId', '==', category));
      if (region) constraints.push(where('region', '==', region));
      
      return await cmsService.getAll<Story>('posts', constraints);
    } catch (error) {
      console.error('Error fetching published stories:', error);
      return [];
    }
  },

  // Get featured stories
  async getFeaturedStories(limitCount: number = 5) {
    try {
      const constraints = [
        where('status', '==', 'published'),
        where('featured', '==', true),
        where('isDeleted', '==', false),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      ];
      return await cmsService.getAll<Story>('posts', constraints);
    } catch (error) {
      console.error('Error fetching featured stories:', error);
      return [];
    }
  },

  // Create or Update Story
  async saveStory(story: Partial<Story>) {
    if (story.id) {
      return await cmsService.update('posts', story.id, story);
    } else {
      return await cmsService.create('posts', story as any);
    }
  }
};
