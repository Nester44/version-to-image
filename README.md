# Project name: Version to Image

This project is an application that creates SVG images of the versions of the HWP applications and exposes them.

## Project Overview

This project is designed to fetch the version of an application from Bitbucket, generate SVG images of the versions, and expose them. It does this for both the development and production stages, and for both the backend and frontend of the application.

### Main Entry Point

The main entry point of the application is `src/index.ts`. Here, a job is scheduled to run every two hours using `node-schedule`, which calls the `generateApplicationBadges` function from `src/generateApplicationBadges.ts` with the application short names defined in the environment variables.

### Badge Generation Logic

The `generateApplicationBadges` function loops over the application names, application sides (backend and frontend), and stages (development and production). For each combination, it fetches and extracts the version of the application from Bitbucket using the `fetchAndExtractVersion` function from `src/utils/fetchAndExtractVersion.ts`.

### Fetching Version Logic

The `fetchAndExtractVersion` function constructs the URL to the raw file containing the version of the application on Bitbucket using the `getUrl` function from `src/utils/getUrl.ts`. It then fetches the raw file from Bitbucket using the fetch API, passing the Bitbucket API token from the environment variables in the `Authorization` header. If the fetch is successful, it extracts the version from the raw file using the `extractVersion` function from `src/utils/extractVersion.ts`.

### Extraction Process

The `extractVersion` function uses different logic to extract the version depending on whether the application side is frontend or backend. For the frontend, it parses the raw file as JSON and returns the `version` property. For the backend, it uses regular expressions to find the platform version in the raw `build.gradle` file.

### Generating Images

Once the version is fetched and extracted, `generateApplicationBadges` generates an SVG image of the version using the `generateImage` function from `src/utils/generateImage.ts`, and writes the image to the `versionImages` folder.

### Serving Images

The application also serves the `versionImages` folder statically using Express, so the images can be accessed via HTTP.

### Version Comparison

The versions of the applications are also compared to the current template versions, which are fetched using the `getCurrentTemplateVersions` function from `src/utils/getCurrentTemplateVersions.ts`. This function fetches and extracts the versions of the template applications from Bitbucket in the same way as for the other applications.

### Project Details

The project is built using TypeScript and Node.js, and uses npm for package management. The build and run scripts are defined in `package.json`. The project also includes unit tests using Jest, with test files located in the `test` folder.

## How to start the application

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies by running `npm install`.
4. Build the project by running `npm run build`.
5. Copy `.env.example` to `.env` add values
6. Start the application by running `npm start`.

The application will start and listen on the port specified in the environment variable `PORT`. If `PORT` is not specified, it defaults to `8080`.

## Environment Variables

The application uses the following environment variables:

- `PORT`: The port on which the application listens.
- `APPLICATION_SHORT_NAMES`: A comma-separated list of 4-letter codes representing the applications.
- `BITBUCKET_REPOS_URL`: The URL of the Bitbucket repository from which the version information is fetched.
- `BITBUCKET_API_TOKEN`: The API token used for authentication with Bitbucket.

These environment variables are defined in `src/env.ts`.

## Docker Support

The application also includes a Dockerfile for building a Docker image of the application. To build the Docker image, run `docker build -t version-to-image ..` To run the Docker image, use `docker run -p 8080:8080 version-to-image`.

### Proxy

If you are behind proxy you would need to specify `HTTP_PROXY` and `HTTPS_PROXY` with `--build-arg`.
Example: `docker build -t version-to-image . --build-arg HTTP_PROXY=$HTTP_PROXY --build-arg HTTPS_PROXY=$HTTP_PROXY`

## Testing

The application uses Jest for testing. To run the tests, use `npm run test`.

## Linting

The application uses ESLint for linting. To run the linter, use `npm run lint`.

## Author

Nikita Nesterov

