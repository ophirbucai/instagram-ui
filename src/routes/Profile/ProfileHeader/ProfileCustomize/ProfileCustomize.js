import React, { useCallback } from "react";
import "./ProfileCustomize.scss";
import { useFormikContext } from "formik";
import {
  headStyle,
  faceStyle,
  skinColor,
  hairColor,
  accessories,
  mask,
  facialHair,
  backgroundColor,
} from "./customize-config";
import { TwitterPicker } from "react-color";
import Select from "./Select/Select";

export default function ProfileCustomize({ setCustomAvatarStyle }) {
  const { setFieldValue } = useFormikContext();

  const changeAttribute = useCallback(
    (attribute, selectedValue) => {
      setCustomAvatarStyle((obj) => {
        let customStyle = { ...obj };
        customStyle[attribute] = selectedValue;
        return customStyle;
      });
    },
    [setCustomAvatarStyle]
  );

  const modify = useCallback(
    (e, value, field) => {
      if (!field) {
        // eslint-disable-next-line
        let { name: field } = e.target;
      }
      if (!value) {
        // eslint-disable-next-line
        let { value } = e.target;
      }
      setFieldValue(field, value);
      changeAttribute(field, value);
    },
    [changeAttribute, setFieldValue]
  );

  return (
    <div className="ProfileCustomize">
      <header>
        <h1>Customize Avatar</h1>
      </header>
      <Select
        cb={changeAttribute}
        name="head"
        styles={headStyle}
        label="Head"
      />
      <Select
        cb={changeAttribute}
        name="face"
        styles={faceStyle}
        label="Face"
      />
      <Select
        cb={changeAttribute}
        name="facialHair"
        styles={facialHair}
        label="Beard"
      />
      <Select
        cb={changeAttribute}
        name="accessories"
        styles={accessories}
        label="Accessories"
      />
      <Select cb={changeAttribute} name="mask" styles={mask} label="Mask" />

      <section className="colorpicker-group">
        <label htmlFor="skinColor">Hair Color: </label>
        <TwitterPicker
          onChange={(color, e) => modify(e, color.hex, "hairColor")}
          name="hairColor"
          triangle="hide"
          colors={hairColor}
          id="hairColor"
        />
      </section>
      <section className="colorpicker-group">
        <label htmlFor="skinColor">Skin Tone:</label>
        <TwitterPicker
          onChange={(color, e) => modify(e, color.hex, "skinColor")}
          triangle="hide"
          name="skinColor"
          colors={skinColor}
          id="skinColor"
        />
      </section>
      <section className="colorpicker-group">
        <label htmlFor="skinColor">Background:</label>
        <TwitterPicker
          onChange={(color, e) => modify(e, color.hex, "backgroundColor")}
          triangle="hide"
          name="backgroundColor"
          colors={backgroundColor}
          id="backgroundColor"
        />
      </section>
    </div>
  );
}
