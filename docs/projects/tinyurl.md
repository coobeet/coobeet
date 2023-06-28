# TinyURL

## Introduction

The TinyURL demo project aims to showcase the basic functionality of a URL shortening service. It provides users with the ability to shorten long URLs into shorter, more manageable links.

## System Architecture

The system architecture of the TinyURL demo project will be simplified and consist of the following components:

- User Interface: A single web page interface built with NextJS.
- Backend API: Developed using [connect-go](https://connect.build) framework.
- In-Memory Database: A simple in-memory data structure will be used to store URL mappings.
- Redirect Handler: A server-side component that resolves the shortened URLs and redirects users to the original long URLs.

## User Interface

The user interface of the TinyURL demo project will consist of a single web page with the following elements:

- Input Field: A text input field where users can enter their long URLs.
- Shorten Button: A button that triggers the URL shortening process.
- Shortened URL Display: An area where the generated shortened URL will be displayed to the user.
- Copy Button: A button that allows users to copy the shortened URL to the clipboard.

## URL Shortening Algorithm

The URL shortening algorithm used in the TinyURL demo project will be a simplified approach. It will generate a unique short code for each long URL using a counter or a hashing function. The short codes will consist of alphanumeric characters.

## Data Storage

Since this is a demo project, a full-fledged database will not be used. Instead, a simple in-memory data structure, such as a dictionary or a hashmap, will be employed to store the URL mappings temporarily during the session. The data will be lost once the server is restarted.

However, the project will be designed in a way that allows for easy integration with a persistent data storage system, such as a database, in the future.

## Redirecting and Resolving URLs

The redirect handler component will receive incoming requests for shortened URLs and retrieve the original long URL from the in-memory data structure. It will then redirect the user's browser to the corresponding long URL.

## Security

As this is a demo project, security measures will be kept minimal. No authentication or authorization mechanisms will be implemented. However, basic input validation will be performed on user inputs to prevent common security vulnerabilities.

## Deployment

The frontend will be deployed on Vercel and the backend will be deployed on Google CloudRun.

## API

The TinyURL api will be using Protobuf as the data format.

## Future Improvements

Although the TinyURL demo project is intentionally simplified, potential future improvements may include:

- Persistent Data Storage: Implementing a database system to store URL mappings persistently.
- User Management: Adding user authentication and authorization mechanisms for managing shortened URLs.
- Analytics: Incorporating basic analytics tracking, such as click counts or referrer information.

## Conclusion

The TinyURL demo project demonstrates the core functionality of a URL shortening service. By providing users with the ability to shorten and manage long URLs, it showcases the convenience and usefulness of such a service.

Please note that this is a simplified example for a demo project. You can adapt and expand upon it based on your specific requirements and goals for the project.
