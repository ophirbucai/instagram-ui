import React, { useRef, useCallback } from "react";
import "./Select.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, useFormikContext } from "formik";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons/";

export default function Select({ cb, name, styles, label }) {
  const { setFieldValue } = useFormikContext();

  const ref = useRef();
  const prev = useCallback(
    (selectRef, style) => {
      let { name: field, selectedIndex, length } = selectRef;
      let selectedValue = style[selectedIndex - 2];
      if (!selectedValue) selectedValue = style[length - 2];
      setFieldValue(field, selectedValue);
      cb(field, selectedValue);
    },
    [cb, setFieldValue]
  );

  const next = useCallback(
    (selectRef, style) => {
      let { name: field, selectedIndex } = selectRef;
      let selectedValue = style[selectedIndex++];
      if (!selectedValue) selectedValue = style[0];
      setFieldValue(field, selectedValue);
      cb(field, selectedValue);
    },
    [cb, setFieldValue]
  );
  return (
    <section className="Select">
      <div className="select-icon">
        <FontAwesomeIcon
          icon={faArrowAltCircleLeft}
          onClick={() => prev(ref.current, styles)}></FontAwesomeIcon>
      </div>
      <Field as="select" innerRef={ref} name={name}>
        <option style={{ display: "none" }}>{label}</option>
        {styles.map((type, i) => (
          <option key={i}>{type}</option>
        ))}
      </Field>
      <div className="select-icon">
        <FontAwesomeIcon
          icon={faArrowAltCircleRight}
          onClick={() => next(ref.current, styles)}></FontAwesomeIcon>
      </div>
    </section>
  );
}
