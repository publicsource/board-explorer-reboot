# Board Explorer

Board Explore is a tool from PublicSource to navigate Pittsburgh's unelected power structures. It's powered by a dataset of public authorities and the people that serve on them. Find it at https://boards.publicsource.org/

You can find our first iteration of this project from 2019 at https://github.com/publicsource/pittsburgh-powermap.

## Develop

This site is built using [Gatsby's Minimal Starter](https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter). 

```shell
cd board-explorer-reboot
npm run develop
```

Copy `.env.example` to `.evn.development` & `.env.production` and add your Airtable API key.

Resources:
- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

## Deploy

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a3b75ba-5e48-4c5a-9913-d618da39fcad/deploy-status)](https://app.netlify.com/sites/happy-kirch-e5ac5b/deploys)

This project is currently hosted and deployed on Netlify.

Two ways to deploy:
1. Edit and push code changes to GitHub. Opening a pull request will automatically generate a Netlify branch deploy preview of your changes. When your pull request is approved and merged, updates to the `main` branch of this repository are automatically published to production.

2. Edit data in Airtable (no code edits) and manually trigger a deploy on Netlify. From the site overview page navigate to "Production deploys" >> "Trigger deploy" button in upper right >> "Clear cache and deploy site". This will show up as `main@HEAD` in the list of deploys. The green "Published" tag indicates it's live. 

If something looks wrong once it's live, you can always "Go to deploy details" of the one prior deploy in the list and click "Publish Deploy" to revert your changes.
