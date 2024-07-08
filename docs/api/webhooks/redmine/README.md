# Webhooks to support Redmine integration

Redmine has APIs to create issues and add comments. This project listens for GitHub and GitLab webhooks and adds comments in Redmine based on the pull request or merge request.

It'll also look for the commits in the pull request or merge request and add them to the comment.

## Format of the Redmine comment

The comment in Redmine will have the following format:

```plaintext
Merge SHA: 1a2b3c4d5e6f7g8h9i0j

Changes:
>  - Fixed issue with user login validation
>  - Updated the user profile page for better UI/UX

Author: John Doe
Component: Authentication v2.3.4
```

## Parsing Redmine issue number

These APIs require the Redmine issue number to be present in the pull request or merge request title. The issue number should be in the format `[Issue #1234]`. This is because of how ScreenBeam uses Redmine to track issues and look at the title. We might want to move this into the description instead of Title so that we can hide it from the commit message.

## APIs

Please note the `component` query parameter is required for both GitHub and GitLab webhooks. Since we have lots of components for a particular project, they could be different for each project. The component is used to set the component for the Redmine comment.

### GitHub

#### [POST] `/webhooks/redmine/github`

##### Query Parameters

- `component`: The component to use for the Redmine comment.

### GitLab

#### [POST] `/webhooks/redmine/gitlab`

##### Query Parameters

- `component`: The component to use for the Redmine comment.