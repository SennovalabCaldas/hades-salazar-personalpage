import React, { useState } from "react";
import "./Forum.scss";
import {
  UserOutlined,
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

export const Forum = () => {
  const [posts, setPosts] = useState([
    { id: 1, content: "Publicación 1", comments: [] },
    { id: 2, content: "Publicación 2", comments: [] },
  ]);

  const addComment = (postId, commentText, parentCommentIndex = null) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments:
              parentCommentIndex !== null
                ? post.comments.map((comment, index) =>
                    index === parentCommentIndex
                      ? {
                          ...comment,
                          replies: [
                            ...comment.replies,
                            { text: commentText, likes: 0, dislikes: 0 },
                          ],
                        }
                      : comment
                  )
                : [
                    ...post.comments,
                    { text: commentText, likes: 0, dislikes: 0, replies: [] },
                  ],
          }
        : post
    );

    setPosts(updatedPosts);
  };

  const handleLike = (postId, commentIndex, replyIndex) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment, index) => {
          if (index === commentIndex) {
            if (replyIndex !== undefined) {
              const updatedReplies = comment.replies.map((reply, replyIndex) =>
                replyIndex === replyIndex
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              );
              return { ...comment, replies: updatedReplies };
            } else {
              return { ...comment, likes: comment.likes + 1 };
            }
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  const handleDislike = (postId, commentIndex, replyIndex) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment, index) => {
          if (index === commentIndex) {
            if (replyIndex !== undefined) {
              const updatedReplies = comment.replies.map((reply, replyIndex) =>
                replyIndex === replyIndex
                  ? { ...reply, dislikes: reply.dislikes + 1 }
                  : reply
              );
              return { ...comment, replies: updatedReplies };
            } else {
              return { ...comment, dislikes: comment.dislikes + 1 };
            }
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  const [activeCommentIndex, setActiveCommentIndex] = useState(null);

  return (
    <div className="forum-container">
      <h1>Foro</h1>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <p>{post.content}</p>
          <ul className="comments">
            {post.comments.map((comment, commentIndex) => (
              <li key={commentIndex} className="comment">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: "1rem",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar size={40} icon={<UserOutlined />} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "1rem",
                      flexWrap: "wrap",
                      padding: "1rem",
                    }}
                  >
                    {comment.text}
                    <div>
                      <span style={{ marginRight: "1rem" }}>
                        <LikeOutlined
                          onClick={() => handleLike(post.id, commentIndex)}
                        />
                        {comment.likes}
                      </span>
                      <span style={{ marginRight: "1rem" }}>
                        <DislikeOutlined
                          onClick={() => handleDislike(post.id, commentIndex)}
                        />
                        {comment.dislikes}
                      </span>
                      <span onClick={() => setActiveCommentIndex(commentIndex)}>
                        <MessageOutlined />
                      </span>
                    </div>
                  </div>
                </div>
                {activeCommentIndex === commentIndex && (
                  <div>
                    <input
                      type="text"
                      placeholder="Responder comentario"
                      className="comment-input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addComment(post.id, e.target.value, commentIndex);
                          setActiveCommentIndex(null);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                )}

                {/* Respuestas a este comentario */}
                <ul className="replies">
                  {comment.replies.map((reply, replyIndex) => (
                    <li key={replyIndex} className="reply">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginRight: "1rem",
                          alignContent: "center",
                          alignItems: "center",
                          backgroundColor: "#f0f0f0", // Color de fondo diferente para respuestas
                          padding: "0.7rem",
                          borderRadius: "5px",
                        }}
                      >
                        <Avatar size={40} icon={<UserOutlined />} />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "1rem",
                            flexWrap: "wrap",
                          }}
                        >
                          {reply.text}
                          <div>
                            <span style={{ marginRight: "1rem" }}>
                              <LikeOutlined
                                onClick={() =>
                                  handleLike(post.id, commentIndex, replyIndex)
                                }
                              />
                              {reply.likes}
                            </span>
                            <span style={{ marginRight: "1rem" }}>
                              <DislikeOutlined
                                onClick={() =>
                                  handleDislike(
                                    post.id,
                                    commentIndex,
                                    replyIndex
                                  )
                                }
                              />
                              {reply.dislikes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              placeholder="Añadir comentario"
              className="comment-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addComment(post.id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
