import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, Comment } from '../../types/post';

interface CreatePostData {
  image: File;
  caption: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [
    {
      id: 1,
      userId: 1,
      username: 'travel_lover',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      content: 'Exploring the beautiful streets of Paris! 🗼✨ #travel #paris #wanderlust',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60',
      likes: 1243,
      comments: [
        { id: 1, userId: 2, username: 'photo_master', content: 'Stunning shot! The lighting is perfect 👌' },
        { id: 2, userId: 3, username: 'wanderer', content: 'Paris is always a good idea! 😍' }
      ],
      shares: 89,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      isLiked: false
    },
    {
      id: 2,
      userId: 2,
      username: 'foodie_adventures',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      content: 'Homemade pasta night! 🍝 Nothing beats fresh pasta with homemade sauce. #food #cooking #italian',
      image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&auto=format&fit=crop&q=60',
      likes: 856,
      comments: [
        { id: 3, userId: 1, username: 'travel_lover', content: 'This looks amazing! Recipe please? 😋' }
      ],
      shares: 45,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      isLiked: false
    },
    {
      id: 3,
      userId: 3,
      username: 'nature_photography',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Morning hike in the mountains 🌄 Nature never fails to amaze me. #nature #photography #hiking',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60',
      likes: 2103,
      comments: [
        { id: 4, userId: 4, username: 'adventure_seeker', content: 'What a view! Where is this? 🏔️' },
        { id: 5, userId: 1, username: 'travel_lover', content: 'This is breathtaking! 😍' }
      ],
      shares: 156,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      isLiked: false
    },
    {
      id: 4,
      userId: 4,
      username: 'urban_style',
      userAvatar: 'https://i.pravatar.cc/150?img=4',
      content: 'Street style in NYC 🗽 Fashion week vibes! #fashion #style #nyc',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60',
      likes: 3421,
      comments: [
        { id: 6, userId: 2, username: 'foodie_adventures', content: 'Love the urban aesthetic! 🌆' }
      ],
      shares: 234,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      isLiked: false
    },
    {
      id: 5,
      userId: 5,
      username: 'coffee_culture',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      content: 'Perfect latte art ☕️ Starting the day right! #coffee #latteart #morning',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60',
      likes: 987,
      comments: [
        { id: 7, userId: 3, username: 'nature_photography', content: 'That heart is perfect! ❤️' }
      ],
      shares: 67,
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
      isLiked: false
    }
  ],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: (state, action: PayloadAction<Omit<Post, 'id' | 'createdAt' | 'isLiked'>>) => {
      const newPost: Post = {
        ...action.payload,
        id: state.posts.length + 1,
        createdAt: new Date().toISOString(),
        isLiked: false,
        comments: []
      };
      state.posts.unshift(newPost);
    },
    fetchPosts: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    },
    addComment: (state, action: PayloadAction<{ postId: number; userId: number; username: string; content: string }>) => {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        const newComment: Comment = {
          id: post.comments.length + 1,
          userId: action.payload.userId,
          username: action.payload.username,
          content: action.payload.content
        };
        post.comments.push(newComment);
      }
    },
    sharePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.shares += 1;
      }
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  }
});

export const { 
  createPost, 
  fetchPosts, 
  fetchPostsSuccess, 
  fetchPostsFailure,
  likePost, 
  addComment, 
  sharePost,
  toggleLike,
  deletePost
} = postSlice.actions;

export default postSlice.reducer; 