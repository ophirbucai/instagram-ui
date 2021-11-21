import React, { useCallback } from "react";
import "./ProfileCustomize.scss";
import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons/";
import { headStyle, faceStyle, skinColor, hairColor } from "./customize-config";

export default function ProfileCustomize({ setCustomAvatarStyle }) {
  const changeAttribute = useCallback(
    (attribute, selectedValue) => {
      setCustomAvatarStyle((obj) => {
        let customStyle = Object.assign({}, obj);
        customStyle[attribute] = selectedValue;
        return customStyle;
      });
    },
    [setCustomAvatarStyle]
  );

  const prev = useCallback(
    (e) => {
      try {
        const attribute = e.target.previousElementSibling;
        if (!attribute) {
          return;
        }
        attribute.selectedIndex--;
        if (attribute.selectedIndex === -1 || attribute.selectedIndex === 0) {
          attribute.selectedIndex = attribute.length - 1;
        }
        const selectedValue = attribute.options[attribute.selectedIndex].value;
        changeAttribute(attribute.name, selectedValue);
      } catch (e) {
        console.log(e);
      }
    },
    [changeAttribute]
  );

  const next = useCallback(
    (e) => {
      try {
        const attribute = e.target.nextElementSibling;
        if (!attribute) {
          return;
        }
        attribute.selectedIndex++;
        if (attribute.selectedIndex === -1) {
          attribute.selectedIndex++;
          attribute.selectedIndex++;
        }
        const selectedValue = attribute.options[attribute.selectedIndex].value;
        changeAttribute(attribute.name, selectedValue);
      } catch (e) {
        console.log(e);
      }
    },
    [changeAttribute]
  );

  return (
    <div className="ProfileCustomize">
      <header>
        <h1>Customize Avatar</h1>
      </header>
      <div className="select-group">
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowAltCircleRight}
          onClick={next}></FontAwesomeIcon>
        <Field
          as="select"
          name="head"
          onChange={(e) =>
            changeAttribute(
              e.target.name,
              e.target.options[e.target.selectedIndex].value
            )
          }>
          <option style={{ display: "none" }}>Hair</option>
          {headStyle.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </Field>
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowAltCircleLeft}
          onClick={prev}></FontAwesomeIcon>
      </div>
      <div className="select-group">
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowAltCircleRight}
          onClick={next}></FontAwesomeIcon>
        <Field
          as="select"
          name="face"
          onChange={(e) =>
            changeAttribute(
              e.target.name,
              e.target.options[e.target.selectedIndex].value
            )
          }>
          <option style={{ display: "none" }}>Face</option>
          {faceStyle.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </Field>
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowAltCircleLeft}
          onClick={prev}></FontAwesomeIcon>
      </div>
      <div className="select-group">
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowAltCircleRight}
          onClick={next}></FontAwesomeIcon>
        <Field
          as="select"
          name="skinColor"
          onChange={(e) =>
            changeAttribute(
              e.target.name,
              e.target.options[e.target.selectedIndex].value
            )
          }>
          <option style={{ display: "none" }}>Skin Tone</option>
          {skinColor.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </Field>
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowAltCircleLeft}
          onClick={prev}></FontAwesomeIcon>
      </div>
      <div className="select-group">
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowAltCircleRight}
          onClick={next}></FontAwesomeIcon>
        <Field
          as="select"
          name="hairColor"
          onChange={(e) =>
            changeAttribute(
              e.target.name,
              e.target.options[e.target.selectedIndex].value
            )
          }>
          <option style={{ display: "none" }}>Hair Color</option>
          {hairColor.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </Field>
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowAltCircleLeft}
          onClick={prev}></FontAwesomeIcon>
      </div>
    </div>
  );
}
