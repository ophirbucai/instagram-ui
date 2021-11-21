import React, { createContext, useState } from "react";
import { create } from "../services/postService";
import ImageEdit from "./ImageEdit/ImageEdit";
import { useHistory } from "react-router-dom";
import "./PostCreate.scss";
import PostCreateDropzone from "./PostCreateDropzone/PostCreateDropzone";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const PostCreateContext = createContext([]);

function PostCreate() {
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [description, setDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const aspects = [4 / 3, 16 / 9, 1 / 1];
  function getAspectLabel(aspect) {
    if (aspect === 4 / 3) {
      return "4 / 3";
    } else if (aspect === 16 / 9) {
      return "16 / 9";
    } else {
      return "1 / 1";
    }
  }
  const history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const formToSubmit = {
        description,
        images,
      };
      await create(formToSubmit).then(() => history.push("/"));
    } catch (err) {
      console.log(err);
    }
  };
  const settings = {
    draggable: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <PostCreateContext.Provider value={{ images, setImages }}>
      <div className="PostCreate">
        <form onSubmit={submit}>
          <div className="form-group">
            {images.length === 0 && (
              <PostCreateDropzone setDisplayedImages={setDisplayedImages} />
            )}
            {images.length > 0 && (
              <Slider {...settings}>
                {displayedImages.map((displayedImage, i) => (
                  <ImageEdit
                    key={i}
                    displayedImage={displayedImage}
                    index={i}
                    aspectRatio={aspectRatio}
                  />
                ))}
              </Slider>
            )}
          </div>
          {images.length > 0 && (
            <div className="controller">
              <label htmlFor="aspect">Select an Aspect Ratio:</label>
              <select
                name="aspect"
                id="aspect"
                onChange={(e) =>
                  setAspectRatio(aspects[e.target.selectedIndex])
                }>
                {aspects.map((aspect, i) => (
                  <option key={i} name="aspect" id="aspect">
                    {getAspectLabel(aspect)}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <input
              className="description"
              name="description"
              placeholder="Write a post"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="submit">
            <button type="submit">Create Post</button>
          </div>
        </form>
      </div>
    </PostCreateContext.Provider>
  );
}

export default PostCreate;
