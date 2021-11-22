import React, { useCallback, useRef } from "react";
import "./ProfileCustomize.scss";
import { Field, useFormikContext } from "formik";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  headStyle,
  faceStyle,
  skinColor,
  hairColor,
  accessories,
  mask,
  facialHair,
} from "./customize-config";
import { TwitterPicker } from "react-color";
import Select from "./Select/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

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
        let { name: field } = e.target;
      }
      if (!value) {
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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="open-colorpicker">
          <FontAwesomeIcon icon={faAddressBook} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="right">
          <section className="colorpicker-group">
            <label htmlFor="clothingColor">Clothes Color: </label>
            <Field
              as="input"
              type="color"
              name="clothingColor"
              id="clothingColor"
              onChange={modify}></Field>
          </section>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {/* <section className="colorpicker-group">
        <label htmlFor="skinColor">Skin Tone: </label>
        <TwitterPicker
          onChange={(color, e) => modify(e, color.hex, "skinColor")}
          name="skinColor"
          triangle="hide"
          colors={skinColor}
          id="skinColor"
        />
      </section> */}
    </div>

    /* <div className="select-group">
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
      </div> */
  );
}
