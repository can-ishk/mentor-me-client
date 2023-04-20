import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import "./tags.css";

export default function TagUpdateProfile(props){
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="tags"
        placeHolder="Add a tag!"
      />
    </div>
  );
};



