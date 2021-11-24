import React, { createContext, useState } from "react";
import { create } from "../../services/postService";
import ImageEdit from "./ImageEdit/ImageEdit";
import { useHistory } from "react-router-dom";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import "./PostCreate.scss";
import PostCreateDropzone from "./PostCreateDropzone/PostCreateDropzone";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
export const PostCreateContext = createContext([]);

function PostCreate() {
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [description, setDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const aspects = [1 / 1, 3 / 4, 5 / 4];
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
        <header>
          <h1>Post Create</h1>
        </header>
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

              <ToggleGroup.Root
                type="single"
                orientation="horizontal"
                className="aspect-root"
                onValueChange={(value) => setAspectRatio(value)}>
                <ToggleGroup.Item className="aspect-button" value={aspects[0]}>
                  <FontAwesomeIcon
                    icon={faSquare}
                    color="#ccc"
                    style={{ transform: "scale(1.2)" }}
                  />
                </ToggleGroup.Item>
                <ToggleGroup.Item className="aspect-button" value={aspects[1]}>
                  <FontAwesomeIcon
                    icon={faSquare}
                    color="#ccc"
                    style={{ transform: "scaleY(1.5)" }}
                  />
                </ToggleGroup.Item>
                <ToggleGroup.Item className="aspect-button" value={aspects[2]}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faSquare}
                    color="#ccc"
                    style={{ transform: "scaleX(1.5)" }}
                  />
                </ToggleGroup.Item>
              </ToggleGroup.Root>

              {/* <select
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
              </select> */}
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
