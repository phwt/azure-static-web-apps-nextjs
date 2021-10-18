# Next.js on Azure Static Web Apps

Deploy statically-generated Next.js on [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) while still having a features like API routes and authentication.

## Development setup

1. Install [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) and [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli)
2. Install required dependencies in `api` and `web`

   ```zsh
   npm install # need to run in both 'api' and 'web' directories
   ```

3. Start the development server
   ```zsh
   npm run dev
   ```
   This will start both Next.js development server and Azure Functions emulator. Each can be started separately with `npm run dev:api` and `npm run dev:web`

## Motivation

I love Next.js because of SSR/SSG, folder-based routing, and many more - but deployment options for small projects are very limited when pricing is taken into account. Many PaaS providers offer a free tier with limited capabilities and having a significant monthly cost when scaling beyond the free tier.

So, I am looking for a deployment solution that's:

- Pay-as-you-use (low monthly cost)
- Easy to setup and maintain
- Easy to scale
- Secure
- Can use feature offered by Next.js (or having an alternative)

And I found a documentation on deploying [Next.js on Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs) but disappointingly it just deploy a statically-generated frontend without API, authentication or any others backend capabilities.

But I can't find another options with the capabilities listed above and I'd like to give it a try. So, that's why I created this repository.

## How it works?

This is basically a SSG Next.js with Azure Functions and Azure Active Directory B2C but packed in Azure Static Web Apps allowing simple deployment.

### Frontend

Use SSG capability of Next.js to generate, deploy and serving contents statically on Azure Static Web Apps

### Backend / API

Develop and deploy with Azure Functions using JavaScript/TypeScript

### API routes integration

Azure Static Web Apps automatically integrated the API deployed in Azure Functions into the web app - so you can call the API from `/api/YourFunctionName` in the same way you did with Next.js API routes without the need to config CORS.

### Authentication/Authorization

- **Server-side**: protection of pages and API routes will be handled by Azure Static Web Apps based on the routes defined in `staticwebapp.config.json`
- **Client-side**: the pages can be protected by wrapping page component in `withAuthorization` HOC to check for roles when client-side routing is performed

## Known Limitations

- Any of SSR capabilities cannot be used
- Next.js API routes is replaced with Azure Functions (thus no folder-based routing for API)

## Can this be used with another frameworks?

Yes, because API does not specifically tied to Next.js and authentication is handled behind the scene. The only thing specific to Next.js is client-side route protection.

You can just replace the contents inside the `web` folder with the framework of your choice.
