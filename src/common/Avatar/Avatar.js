import React, { useMemo } from "react";
import PropTypes from "prop-types";
import "./Avatar.scss";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";

function Avatar({ username, size, customStyle }) {
  const avatarCustomStyle = useMemo(() => {
    let styleObject = {};
    if (customStyle) {
      for (const prop in customStyle) {
        styleObject[prop] = [customStyle[prop]];
      }
    }
    return styleObject;
  }, [customStyle]);

  return (
    <div className={`Avatar ${size || "md"}`}>
      {username && (
        <div
          dangerouslySetInnerHTML={{
            __html: createAvatar(style, {
              seed: username,
              backgroundColor: "#ccc",
              ...avatarCustomStyle,
            }),
          }}
        />
      )}
    </div>
  );
}

Avatar.propTypes = {
  user: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
};

export default Avatar;
