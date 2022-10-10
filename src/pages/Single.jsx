import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import { url } from "../constant";
import { ToastContainer } from "react-toastify";
import { inform, informSuccess } from "../methods";
import defaultImg from '../assets/default.png'

const Single = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState( "");

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);



  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`${url}/posts/comment/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  }, [postId]);



  const handleDelete = async ()=>{
    try {
      await axios.delete(`${url}/posts/${postId}`,  { withCredentials: true });
      informSuccess('post deleted successfully!');
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }


  const postComment = async ()=>{
    if (text != '') {
      try {
        var json = {
          content: text,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        }

        await axios.post(`${url}/posts/${postId}`, json,   { withCredentials: true });
        informSuccess('comment added successfully!');
        setComments(prev=> [...prev, {
          ...json,
          userImg: currentUser.userImg,
          username: currentUser.username
        } ])
      } catch (err) {
        console.log(err);
      }
    }else{
      inform('field cannot be empty')
    }
  }


  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post.userImg ?
          <img
            src={post.userImg}
            alt=""
          /> :
          <img
            src={defaultImg}
            alt=""
          />
          
          }
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.descr),
          }}
        ></p>


        <div className="comments">
            <div className="commentBox">
              <label htmlFor="comment">Comment</label>
                  <textarea 
                  name="" id="" 
                  cols="20" rows="10" 
                  placeholder="type your comment"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  ></textarea> <br />
             
                    <button onClick={postComment}>Post Comment</button>
            </div>
            <br /><br />

            <div>
              <span>Users comments</span>
            </div>

            <div className="userComments">
              {
                comments.map((comment) => (
                  <div key={comment.id} className="commentSegment">
                      <div className="user">
                        {
                          comment.userImg ? 
                          <img
                          src={ comment.userImg}
                          alt=""
                        /> :  <img
                              src={defaultImg}
                              alt=""
                            />
                        }
                       
                        <div>
                          <span>{comment.username}</span> .
                          <span>{moment(comment.date).fromNow()}</span>
                        </div>
                      </div>
                        <div className="commentContent">
                          <span>{comment.content}</span>
                        </div>
                  </div>
                ))
              }
           
            </div>
        </div>    
      </div>
      <Menu cat={post.cat} postId={postId} />
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  );
};

export default Single;
