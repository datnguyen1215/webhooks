# Redmine Comment Integration for Merge Requests/Pull Requests

This project provides webhooks to automatically add Redmine comments based on merge requests/pull requests from both GitHub and GitLab. The aim is to streamline the development workflow by ensuring that all changes related to merge/pull requests are documented in Redmine.

## Features

- Automatically add comments in Redmine based on GitHub and GitLab merge/pull requests.
- Supports authentication for both GitHub and GitLab.
- Configurable through environment variables.

## Environment Variables

The application relies on the following environment variables to function correctly. You need to set these in your environment or `.env` file.

```plaintext
REDMINE_URL=https://aeiredmine.screenbeam.com/redmine
REDMINE_API_KEY=
HTTP_PORT=9356
GITLAB_URL=https://sbwdlab.screenbeam.com:8888
GITLAB_ACCESS_TOKEN=
GITHUB_URL=https://api.github.com
GITHUB_ACCESS_TOKEN=
```

## API Endpoints

- [Redmine APIs](./docs/api/webhooks/redmine/README.md)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed.
- [npm](https://www.npmjs.com/get-npm) installed.

### Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:datnguyen1215/webhooks.git
    cd webhooks
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:

    ```plaintext
    REDMINE_URL=https://aeiredmine.screenbeam.com/redmine
    REDMINE_API_KEY=
    HTTP_PORT=9356
    GITLAB_URL=https://sbwdlab.screenbeam.com:8888
    GITLAB_ACCESS_TOKEN=
    GITHUB_URL=https://api.github.com
    GITHUB_ACCESS_TOKEN=
    ```

### Running the server

Run the following command to start the server:

```bash
npm start
```

The server will start on the port specified in `HTTP_PORT`.