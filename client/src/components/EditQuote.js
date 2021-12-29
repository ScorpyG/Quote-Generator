import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReturnNav from "./ReturnNav";
import PageTitle from "./PageTitle";

const EditQuote = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/${id}`)
    .then((res) => {
      setQuote(res.data.quote);
      setAuthor(res.data.author);
    })
    .catch((err) => alert(`Error: ${err}`));
  }, [id])

  const submitEdit = (e) => {
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
      .post(`${process.env.REACT_APP_API_URL}/update/${id}`, newQuote)
      .then(alert("Your quote updated successfully!"))
      .catch((err) => alert(`Error: ${err}`));

    // Return to main page
    window.location = '/';
  }

  return (
    <>
      <ReturnNav />

      <PageTitle title="Edit Quote"/>

      <form className="add-quote" onSubmit={submitEdit}>
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
            onChange={(e) => {setQuote(e.target.value)}}
          />
          <label className="label2">
            <i className="fas fa-user" /> Author
          </label>
          <input
            id="author"
            type="text"
            placeholder="Enter author's name"
            value={author}
            onChange={(e) => {setAuthor(e.target.value)}}
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

export default EditQuote;
