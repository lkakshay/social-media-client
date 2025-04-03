export interface Comment {
  id: number;
  userId: number;
  username: string;
  content: string;
}

export interface Post {
  id: number;
  userId: number;
  username: string;
  userAvatar: string;
  content: string;
  image: string;
  likes: number;
  comments: Comment[];
  shares: number;
  createdAt: string;
  isLiked: boolean;
} 