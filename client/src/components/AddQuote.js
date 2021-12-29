import { useState } from "react";
import axios from "axios";
import ReturnNav from "./ReturnNav";
import PageTitle from "./PageTitle";

const AddQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // Check for null value in user's input
    if (!quote) {
      alert("Please enter your quote!");
      return;
    }
    if (!author) {
      alert(`Quote's author will display as Unknown if leave empty`);
      setAuthor("Unknown");
      return;
    }

    // Assigned user's new quote and author into an object
    const newQuote = { quote, author };

    // POST request to get the newQuote object to the database
    axios
      .post(`${process.env.REACT_APP_API_URL}/add`, newQuote)
      .then(alert("Your quote added successfully!"))
      .catch((err) => console.log(`Error: ${err}`));

    // Clear the form
    setQuote("");
    setAuthor("");
  };

  // JSX Component
  return (
    <>
      <ReturnNav/>

      <PageTitle title="Add Quote"/>

      <form className="add-quote" onSubmit={onSubmit}>
        <div className="input-box">
          <label className="label1">
            <i className="fas fa-paragraph" /> Quote
          </label>
          <textarea
            id="quote"
            type="text"
            placeholder="Enter your quote"
            spellCheck="true"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
          <label className="label2">
            <i className="fas fa-user" /> Author
          </label>
          <input
            id="author"
            type="text"
            placeholder="Enter author's name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="button-options save-btn">
          <button type="submit" className="submit-btn">
            Save <i className="fas fa-cloud-upload-alt" />
          </button>
        </div>
      </form>
    </>
  );
};

export default AddQuote;
