const adapter = require("gatsby-adapter-netlify").default;

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  flags: {
    DEV_SSR: false
  },
  siteMetadata: {
    title: `Board Explorer`,
    description: `Understanding Pittsburgh's unelected power structure`,
    twitterUsername: `@PublicSourcePA`,
    siteUrl: `https://boards.publicsource.org`,
    image: `/ps_logo_square.png`,
  },
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
    imageCDN: false,
  }),
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `Positions`,
            tableLinks: [`Person`, `Board`]
          },
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `Boards`,
            tableLinks: [`Positions`, `Stories`]
          },
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `People`,
            tableLinks: [`Positions`]
          },
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `Stories`,
            tableLinks: [`People`, `Boards`]
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ['Roboto']
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-24107680-1`
      }
    },
    // {
    //   resolve: `gatsby-plugin-parsely-analytics`, // not compatible with Gatsby v5
    //   options: {
    //     apikey: `publicsource.org`,
    //     enableInDevelopment: false
    //   }
    // },
  ],
};
