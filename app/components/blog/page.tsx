'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaCalendar, FaUser, FaClock, FaArrowRight, FaSearch, FaHeart, FaComment, FaShare } from 'react-icons/fa';

// Define Blog Post Type
interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image?: string | any;
  tags?: string[];
  likes?: number;
  comments?: number;
}

// Define Props Interface
interface BlogProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  columns?: 2 | 3 | 4;
  onReadMore?: (post: BlogPost) => void;
}

// Default Blog Posts
const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: '5 Tips for a Healthy Heart',
    excerpt: 'Learn how to keep your heart healthy with these simple tips.',
    date: 'June 15, 2026',
    author: 'Dr. Rajesh Kumar',
    category: 'Cardiology',
    readTime: '5 min read',
    likes: 45,
    comments: 12
  },
  {
    id: 2,
    title: 'Advancements in Robotic Surgery',
    excerpt: 'A.D Clinic now offers robotic-assisted surgeries with enhanced precision.',
    date: 'June 10, 2026',
    author: 'Dr. Anil Sharma',
    category: 'Surgery',
    readTime: '7 min read',
    likes: 38,
    comments: 8
  },
  {
    id: 3,
    title: 'COVID-19 Vaccine Update',
    excerpt: 'Latest information on COVID-19 vaccination availability.',
    date: 'June 5, 2026',
    author: 'Dr. Priya Patel',
    category: 'Infectious Diseases',
    readTime: '4 min read',
    likes: 52,
    comments: 15
  },
  {
    id: 4,
    title: 'Mental Health Awareness',
    excerpt: 'Understanding the importance of mental health support.',
    date: 'June 1, 2026',
    author: 'Dr. Sunita Singh',
    category: 'Psychiatry',
    readTime: '6 min read',
    likes: 67,
    comments: 19
  },
  {
    id: 5,
    title: 'Nutrition for Diabetic Patients',
    excerpt: 'Essential dietary recommendations for managing diabetes.',
    date: 'May 28, 2026',
    author: 'Dr. Meera Reddy',
    category: 'Nutrition',
    readTime: '8 min read',
    likes: 41,
    comments: 10
  },
  {
    id: 6,
    title: 'Pediatric Care Essentials',
    excerpt: 'Comprehensive guide for new parents on newborn care.',
    date: 'May 25, 2026',
    author: 'Dr. Priya Patel',
    category: 'Pediatrics',
    readTime: '6 min read',
    likes: 55,
    comments: 14
  }
];

// Category colors
const categoryColors: Record<string, string> = {
  'Cardiology': 'bg-red-100 text-red-800',
  'Surgery': 'bg-blue-100 text-blue-800',
  'Infectious Diseases': 'bg-purple-100 text-purple-800',
  'Psychiatry': 'bg-green-100 text-green-800',
  'Nutrition': 'bg-yellow-100 text-yellow-800',
  'Pediatrics': 'bg-pink-100 text-pink-800',
};

// Column classes
const columnClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const Blog: React.FC<BlogProps> = ({
  title = "Health Blog",
  subtitle = "Stay informed with the latest health news",
  posts = defaultBlogPosts,
  columns = 3,
  onReadMore,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedPosts, setLikedPosts] = useState<Set<string | number>>(new Set());

  // Get unique categories
  const categories = ['All', ...new Set(posts.map(post => post.category))];

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (postId: string | number): void => {
    if (likedPosts.has(postId)) {
      likedPosts.delete(postId);
    } else {
      likedPosts.add(postId);
    }
    setLikedPosts(new Set(likedPosts));
  };

  const handleShare = (post: BlogPost): void => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header - Compact */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-hospital-dark">{title}</h2>
          <div className="w-16 h-1 bg-hospital-blue mx-auto mt-2"></div>
          <p className="text-gray-600 text-sm mt-2">{subtitle}</p>
        </div>

        {/* Search and Filter - Compact */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between max-w-3xl mx-auto mb-8">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:border-hospital-blue"
            />
            <FaSearch className="absolute left-2.5 top-2 text-gray-400 text-sm" />
          </div>
          
          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  selectedCategory === category
                    ? 'bg-hospital-blue text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid - Compact */}
        <div className={`grid ${columnClasses[columns]} gap-5`}>
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-1">
              {/* Image Placeholder - Compact */}
              <div className="h-32 bg-gradient-to-r from-hospital-blue to-blue-400 relative">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                )}
                {post.category && (
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
                    {post.category}
                  </span>
                )}
              </div>

              <div className="p-4">
                {/* Meta - Compact */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 flex-wrap">
                  <span className="flex items-center gap-0.5">
                    <FaCalendar size={10} /> {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <FaClock size={10} /> {post.readTime}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <FaUser size={10} /> {post.author.split(' ').pop()}
                  </span>
                </div>

                {/* Title - Compact */}
                <h3 className="text-base font-bold text-hospital-dark mb-1 line-clamp-1">
                  {post.title}
                </h3>

                {/* Excerpt - Compact */}
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Actions - Compact */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-0.5 text-xs transition ${
                        likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <FaHeart size={12} /> {post.likes && (likedPosts.has(post.id) ? post.likes + 1 : post.likes)}
                    </button>
                    {post.comments && (
                      <span className="flex items-center gap-0.5 text-xs text-gray-500">
                        <FaComment size={12} /> {post.comments}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(post)}
                      className="text-gray-400 hover:text-hospital-blue transition text-xs"
                    >
                      <FaShare size={12} />
                    </button>
                    <button
                      onClick={() => onReadMore ? onReadMore(post) : console.log('Read more')}
                      className="text-hospital-blue text-xs font-medium hover:underline flex items-center gap-0.5"
                    >
                      Read <FaArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No posts found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;