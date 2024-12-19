import React from 'react';
import { Heart, Share } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';
import { timeAgo } from '../../utils/date';
import { sharePostAsImage } from '../../utils/sharing';
import { FollowButton } from '../ui/FollowButton';
import { useHookstate } from '@hookstate/core';
import { globalState } from '../../store';

interface PostListProps {
  posts: Post[];
  onLike: (postId: string) => void;
}

export const PostList = ({ posts, onLike }: PostListProps) => {

  const state = useHookstate(globalState)
  const users = state.users.get();
  const currentUser = state.currentUser.get();

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={users.filter((user) => user.email == post.creator)[0]?._id} id={`post-${post._id}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Link to={`/user/${post.creator}`} className="flex items-center flex-grow">
              <img
                src={(post.creator == currentUser?.email) ? (currentUser?.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg") : (users.filter((user) => user.email == post.creator)[0]?.profilePhoto || "https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg")}
                alt={(post.creator == currentUser?.email) ? currentUser?.fullName : users.filter((user) => user.email == post.creator)[0]?.fullName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {(post.creator == currentUser?.email) ? currentUser?.fullName : users.filter((user) => user.email == post.creator)[0]?.fullName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date.split("T")[0]}
                </p>
              </div>
            </Link>
            <FollowButton userId={users.filter((user) => user.email == post.creator)[0]?._id} />
            <div className="ml-4 text-xs text-gray-500 dark:text-gray-400">GaibrairHub</div>
          </div>

          <p className="text-gray-800 dark:text-gray-200 mb-4">{post.text}</p>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post content"
              className="rounded-lg mb-4 max-h-96 w-full object-cover"
            />
          )}

          <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
            <button
              onClick={() => onLike(post._id)}
              className="flex items-center space-x-2 hover:text-indigo-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>{post.likes?.length}</span>
            </button>
            {/* <button
              onClick={() => sharePostAsImage(post)}
              className="flex items-center space-x-2 hover:text-indigo-600 transition-colors"
            >
              <Share className="w-5 h-5" />
              <span>Partager</span>
            </button> */}
          </div>
        </article>
      ))}
    </div>
  );
};