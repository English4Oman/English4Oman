import React, { useState } from 'react';

function Forum() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Tips for improving pronunciation',
      author: 'Ahmed',
      date: '2025-03-15',
      content: 'I\'ve been struggling with English pronunciation, especially with the "th" sound. Does anyone have any tips or resources that helped them?',
      replies: [
        {
          id: 101,
          author: 'Sarah',
          date: '2025-03-16',
          content: 'Try watching English movies with subtitles and repeating phrases. It helped me a lot!'
        },
        {
          id: 102,
          author: 'Mohammed',
          date: '2025-03-17',
          content: 'The text-to-speech feature on this platform is great for practicing. I use it daily.'
        }
      ]
    },
    {
      id: 2,
      title: 'Best resources for business English',
      author: 'Fatima',
      date: '2025-03-18',
      content: 'I need to improve my business English for my new job. Can anyone recommend good resources or courses?',
      replies: [
        {
          id: 201,
          author: 'Khalid',
          date: '2025-03-19',
          content: 'The Business Vocabulary section in the Quizzes area has been very helpful for me.'
        }
      ]
    },
    {
      id: 3,
      title: 'Study group for advanced learners',
      author: 'Omar',
      date: '2025-03-20',
      content: 'Would anyone be interested in forming a study group for advanced English learners? We could meet weekly on Zoom.',
      replies: []
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });

  const [activePost, setActivePost] = useState(null);
  const [newReply, setNewReply] = useState('');

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    
    const post = {
      id: posts.length + 1,
      title: newPost.title,
      author: 'User',
      date: new Date().toISOString().split('T')[0],
      content: newPost.content,
      replies: []
    };
    
    setPosts([...posts, post]);
    setNewPost({ title: '', content: '' });
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!newReply || !activePost) return;
    
    const reply = {
      id: Math.floor(Math.random() * 1000),
      author: 'User',
      date: new Date().toISOString().split('T')[0],
      content: newReply
    };
    
    const updatedPosts = posts.map(post => {
      if (post.id === activePost.id) {
        return {
          ...post,
          replies: [...post.replies, reply]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setNewReply('');
  };

  const viewPost = (post) => {
    setActivePost(post);
  };

  const backToList = () => {
    setActivePost(null);
  };

  return (
    <div className="forum-page">
      <h2>Community Forum</h2>
      
      {activePost ? (
        <div className="post-detail">
          <button onClick={backToList} className="back-button">Back to Forum</button>
          
          <div className="post-header">
            <h3>{activePost.title}</h3>
            <div className="post-meta">
              <span>Posted by {activePost.author}</span>
              <span>on {activePost.date}</span>
            </div>
          </div>
          
          <div className="post-content">
            <p>{activePost.content}</p>
          </div>
          
          <div className="replies-section">
            <h4>Replies ({activePost.replies.length})</h4>
            
            {activePost.replies.length > 0 ? (
              <div className="replies-list">
                {activePost.replies.map(reply => (
                  <div key={reply.id} className="reply-item">
                    <div className="reply-meta">
                      <span>{reply.author}</span>
                      <span>{reply.date}</span>
                    </div>
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No replies yet. Be the first to reply!</p>
            )}
            
            <div className="reply-form">
              <h4>Add a Reply</h4>
              <form onSubmit={handleSubmitReply}>
                <textarea 
                  value={newReply}
                  onChange={handleReplyChange}
                  placeholder="Write your reply here..."
                  required
                ></textarea>
                <button type="submit">Post Reply</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="forum-list">
          <div className="new-post-form">
            <h3>Start a New Discussion</h3>
            <form onSubmit={handleSubmitPost}>
              <input 
                type="text"
                name="title"
                value={newPost.title}
                onChange={handlePostChange}
                placeholder="Title"
                required
              />
              <textarea 
                name="content"
                value={newPost.content}
                onChange={handlePostChange}
                placeholder="Write your post here..."
                required
              ></textarea>
              <button type="submit">Create Post</button>
            </form>
          </div>
          
          <div className="posts-list">
            <h3>Recent Discussions</h3>
            {posts.map(post => (
              <div key={post.id} className="post-item" onClick={() => viewPost(post)}>
                <h4>{post.title}</h4>
                <div className="post-meta">
                  <span>Posted by {post.author}</span>
                  <span>on {post.date}</span>
                  <span>{post.replies.length} replies</span>
                </div>
                <p>{post.content.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Forum;
