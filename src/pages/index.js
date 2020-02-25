import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>轻松入门</>,
    imageUrl: 'img/flamenco/flamenco-logged-out.svg',
    description: (
      <>
        本站的所有教程均为中文编写，所以并不适合一些有经验的开发人员，但它应该适合一些
        Linux 的爱好者和新手。所以并不推荐有经验的开发者。
      </>
    ),
  },
  {
    title: <>开源与独立</>,
    imageUrl: 'img/flamenco/flamenco-message-sent.svg',
    description: (
      <>
        网站与文章的源代码托管在 Github ，欢迎你参与进来，一起帮助更多的人。感谢 
          <a href="https://www.netlify.com/"> netlify </a> 
          的免费托管服务和
          <a href="https://www.algolia.com/"> algolia </a> 
        提供的文档搜索服务。
      </>
    ),
  },
  {
    title: <>创建本站的目的</>,
    imageUrl: 'img/flamenco/flamenco-searching.svg',
    description: (
      <>
        本网站是面向 Linux 新手和爱好者的学习网站，主要是为了解决人们在使用 Linux 作为生产环境部署时
        出现的一些问题。
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/welecome')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
