import { useState } from "react";
import { Link } from "react-router-dom";
import FadingDots from "react-cssfx-loading/lib/FadingDots";
import axios from "axios";
import "./App.css";
import Navigator from "./components/AddNav";
import PageTitle from "./components/PageTitle";

function App() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [quoteObj, setQuoteObj] = useState(null);
  const [
    // eslint-disable-next-line
    completed,
    setCompleted,
  ] = useState(undefined);

  // Function GET request new quote from MongoDB
  const getNewQuote = () => {
    axios.get(url).then((res) => {
      setQuoteObj(res.data);
    });
  };

  // Onload the quote object is not yet exist then do get-request and create a quote object
  if (!quoteObj) {
    setTimeout(() => {
      axios.get(url).then((res) => {
        setQuoteObj(res.data);
        setCompleted(true);
      });
    }, 1000);
    return (
      <FadingDots
        color="#FBC1C0"
        width="150px"
        height="150px"
        duration="2s"
      /> // Return loading animation while API server responding
    );
  }

  // JSX Component
  return (
    <>
      <Navigator />
      <PageTitle title="Generate Quote" />

      <div className="quote-box">
        <div className="display-quote">
          <p className="quote">"{quoteObj.quote}"</p>
          <p className="author">- {quoteObj.author}</p>
        </div>
        <div className="button-options">
          <Link to={`/edit/${quoteObj._id}`}>
            <button className="submit-btn edit-btn">
              <i className="fas fa-edit" /> Edit
            </button>
          </Link>
          <button onClick={getNewQuote} className="submit-btn next-btn">
            Next <i className="fas fa-angle-double-right" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
