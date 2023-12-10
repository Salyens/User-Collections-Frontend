import React, { useContext, useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import renderErrors from "../../helpers/renderErrors";
import { Button } from "react-bootstrap";
import { DataContext } from "../../contexts/DataContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./tagcloud.css"

const TagCloud = () => {
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const { setSearchInput } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const handleGetTags = async () => {
    try {
      const response = await ApiService.getTags();
      const slicedTags = response.slice(0, 10);
      setTags(slicedTags);
    } catch (error) {
      setError("Something went wrong while getting tags");
    }
  };

  useEffect(() => {
    handleGetTags();
  }, []);

  const maxWeight = tags.length > 0 ? tags[0].weight : 1;
  const minFontSize = 12;
  const maxFontSize = 30;

  const getTagSize = (weight) => {
    const rate = weight / maxWeight;
    let size = maxFontSize * rate;
    if (size < minFontSize) size = minFontSize;
    return `${Math.round(size)}px`;
  };

  return (
    <div className="tag-cloud">
      {renderErrors(error)}
      {tags.map((tag) => (
        <Button
          key={tag.name}
          className={`${theme} tag badge`}
          style={{ fontSize: getTagSize(tag.weight) }}
          onClick={() => setSearchInput(tag.name)}
        >
          #{tag.name}
        </Button>
      ))}
    </div>
  );
};

export default TagCloud;
