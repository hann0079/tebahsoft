import { useState } from "react";
import styles from "../styles/Tag.module.css";

function Tag() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const onChange = (event) => {
    setTag(event.target.value);
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter" && tag.trim() !== "") {
      event.preventDefault();
      const newTag = {
        text: tag.trim(),
        id: Date.now(),
      };

      setTags((prevTags) => [...prevTags, newTag]);
      setTag("");
    }
  };

  const deleteTag = (id) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  return (
    <div className={styles.hashWrap}>
      <span className={styles.label}>해시태그</span>
      <div className={styles.inputContainer}>
        {tags.map((tag) => (
          <div key={tag.id} className={styles.tagItem}>
            <span>{tag.text}</span>
            <button onClick={() => deleteTag(tag.id)}>❌</button>
          </div>
        ))}
        <input
          className={styles.hashInput}
          type="text"
          value={tag}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </div>
    </div>
  );
}

export default Tag;
