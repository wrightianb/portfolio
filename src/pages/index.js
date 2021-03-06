import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Button, Layout, Wrapper, Job, Project, SectionTitle } from '../components'

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 6rem 2rem;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.grey.dark};

  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1rem 4rem 1rem;
  }

  p {
    font-size: 1.68rem;
    margin-top: -1rem;
    @media (max-width: ${props => props.theme.breakpoints.phone}) {
      font-size: 1.25rem;
    }
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: 1.45rem;
    }
  }
`

const Footer = styled.footer`
  display: grid;
  grid-column: 2;
  grid-gap: 1rem;
  grid-template-columns: min-content 1fr min-content min-content;
  padding: 3rem 2rem 6rem 2rem;
`

const IndexPage = ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout>
    <Wrapper>
      <Hero>
        <h1>Hello!</h1>
        <p>I&apos;m Ian Wright, a Software Engineer specializing in front-end development, JS, and React.</p>
        <Link to="/contact">
          <Button big>
            <svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z" />
            </svg>
            Contact
          </Button>
        </Link>
      </Hero>
      <Content>
        <SectionTitle>Recent Projects</SectionTitle>
        {edges
          .filter(edge => edge.node.fields.type === 'projects')
          .map(project => (
            <Project
              excerpt={project.node.excerpt}
              link={project.node.frontmatter.link}
              role={project.node.frontmatter.role}
              slug={project.node.fields.slug}
              title={project.node.frontmatter.title}
            />
          ))}
        <SectionTitle>Work</SectionTitle>
        {edges
          .filter(edge => edge.node.fields.type === 'jobs')
          .sort((a, b) => a.node.frontmatter.date < b.node.frontmatter.date)
          .map(job => (
            <Job
              excerpt={job.node.excerpt}
              link={job.node.frontmatter.link}
              role={job.node.frontmatter.role}
              slug={job.node.fields.slug}
              title={job.node.frontmatter.title}
            />
          ))}
      </Content>
      <Footer>
        <a href="mailto:wright.ianb@gmail.com">wright.ianb@gmail.com</a>
        <div />
        <a href="https://github.com/wrightianb">github</a>
        <a href="https://www.linkedin.com/in/wrightianb">linkedin</a>
      </Footer>
    </Wrapper>
  </Layout>
)
export default IndexPage
IndexPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
}
export const IndexQuery = graphql`
  query IndexQuery {
    allMdx {
      edges {
        node {
          frontmatter {
            date
            link
            role
            title
          }
          excerpt
          fields {
            slug
            type
          }
        }
      }
    }
  }
`
