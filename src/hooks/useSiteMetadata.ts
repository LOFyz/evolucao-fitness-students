import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
          social {
            name
            url
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};