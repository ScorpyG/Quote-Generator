# Quote Generator (MERN Project)

### Description
- A quote generator, this page will allow you to request API calls to the backend server MongoDB hosted by Heroku. For each fetch will give you **one** random quote available inside the server.
- The website also allow the user to add their own quotes and modification if needed.
- The project focuses on the fondation principles of full-stack project on UX/UI design for the front-end and server/database optimization.

[View Page!](https://mern-quote-generator.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/146ea0c6-f41d-45fc-a7d5-737e1311fc4d/deploy-status)](https://app.netlify.com/sites/mern-quote-generator/deploys)

## Revision!?
### Problem 
- Quote ***duplication*** as every single user allow to add their own quote. There is nothing preventing them to add a quote that already existing in the database. 
- This issue is a bad practice is the process design which lead to data redundancy cause storage constraint, poor optimization and longer response time. 
### Possible Solutions 
- Create a duplication detector, that will prevent the user to add a similar quote that already exist in the database. The solution will be handle in the back-end side (where a POST request will return an error/ message and stop the new user's quote save into the database if duplication detected)
- Duplication Detector -> The server will grab the new user's input and remove the anomalies from the string (**NO CAPITALIZATION**, **NO UNIQUE CHARACTERS**, **NO WHITE SPACE**) then compare that to the existing *non-anomalies* attribute of each quote object in the database if it's match then there is duplication. Otherwise save that new quote into the database
