
export interface ReviewAttributes {
    id?: number;
    user_id: number;
    rol: string;
    title: string;
    review: string;
    published_at?: Date;
    updated_at?: Date;
    image_url: string;
    author: string;
    num_likes?: number;
    rating?: string;
  }

