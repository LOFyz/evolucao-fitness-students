import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
    path: `.env`,
});

import siteMetadata from "./src/config/metadata";

const config: GatsbyConfig = {
    siteMetadata,
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Evolução Fitness Alunos`,
                short_name: `Alunos`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#01534d`,
                display: `standalone`,
                icon: `src/images/icon.png`,
                description: `Eu sou evolução!`,
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-plugin-nprogress",
            options: {
                color: "#01534d",
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ["GA-TRACKING_ID"],
            },
        },
        {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: "gatsby-plugin-firebase-v9.0",
            options: {
                credentials: {
                    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
                    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
                    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
                    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
                    messagingSenderId:
                        process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
                    appId: process.env.GATSBY_FIREBASE_APP_ID,
                    measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
                },
            },
        },
        "gatsby-plugin-postcss",
        "gatsby-plugin-offline",
    ],
    trailingSlash: "never",
};

export default config;
