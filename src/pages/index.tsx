import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import SEO from "../components/SEO";

const IndexPage: React.FC<PageProps> = () => {
    return <div>hello world</div>;
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
