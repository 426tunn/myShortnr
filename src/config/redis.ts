import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

class Cache {
  private redis: any;

  constructor() {
    this.redis = null;
  }

  async connect(): Promise<void> {
    try {
      this.redis = redis.createClient();

      this.redis.on('connect', () => {
        console.log('Redis connected');
      });

      this.redis.on('error', () => {
        console.log('Redis connection error');
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const instance = new Cache();

export default instance;
