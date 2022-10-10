import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { url } from "../constant";
import { useRef } from "react";
import { uploadImage } from "../upload";
import { ToastContainer } from "react-toastify";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.descr || "");
  const [title, setTitle] = useState(state?.title  || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [postImage, setPostImage] = useState( state?.img ? [state?.img]  : [])

  const navigate = useNavigate()
  const list = useRef([])

  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await axios.post(`${url}/upload`, formData);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    // const imgUrl = await upload();

    try {
      state
        ? await axios.put(`${url}/posts/${state.id}`, {
            title,
            descr: value,
            cat,
            img: postImage.length ? postImage[0]  : "",
          },  { withCredentials: true })
        : await axios.post(`${url}/posts/`, {
            title,
            descr: value,
            cat,
            img: postImage.length ? postImage[0]  : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },  { withCredentials: true });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };



  

  const removeImage = async () => {
    setPostImage([]);
  };

  // file creation
  async function setPhoto(e) {
    for (let index = 0; index < e.target.files.length; index++) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(async () => {
          let res = await uploadImage(e.target.result);
          if (res) {
            list.current.push(res);
            setPostImage([...list.current]);
          }
        }, 2000);
      };
      reader.readAsDataURL(e.target.files[index]);
    }
    list.current = [];
  }

























  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>

        <div className="row">
              <div className="form-group mb-3 col-12">
                  <label className="text-black font-w600">
                    Blog Image
                  </label>
                  <label mfor="file">
                    <div className="pickImage">
                        <div className="form-group" style={{height: '100%', textAlign: "center"}}>
                          <div className="imageboxInfo">
                            pick image
                          </div>
                          <input 
                            onChange={(e) => setPhoto(e)}
                            name="file"
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            style={{ display: "none" }}
                          />
                        </div>
                    </div>
                  </label>
              </div>

                <div className="row col-12 ">
                  {postImage?.length !== 0 &&
                    postImage?.map((image, index) => (
                      <div
                        key={image}
                        className="border border-light shadow p-2 mx-2 col-md-4 col-sm-6 col-6"
                        id=" imagePreview "
                      >
                        <img
                          width="100"
                          height="90"
                          id="saveImageFile"
                          src={image}
                          alt="asseimage"
                        />
                        <i
                          title="delete image"
                          onClick={() => removeImage()}
                          className="flaticon-381-trash-3 text-danger text-lg my-2 mx-2 cursor-pointer"
                        ></i>
                      </div>
                    ))}
                </div>
        </div>
    

            
            

      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          {/* <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          /> */}
          {/* <label className="file" htmlFor="file">
            Upload Image
          </label> */}
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>{state ? 'Update' : 'Publish'}</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "health"}
              name="cat"
              value="health"
              id="health"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="health">Health</label>
          </div>
        </div>
      </div>
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

export default Write;
