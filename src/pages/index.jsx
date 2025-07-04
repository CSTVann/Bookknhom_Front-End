import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/navbar/index.jsx';
import Dashboard from '@/components/dashboard/index.jsx';
import Ppopular from '@/components/ppopular/index.jsx';
import Bpopular from '@/components/bpopular/index.jsx';
import Banner from '@/components/banner/index.jsx';
import Footer from '@/components/footer/index.jsx';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Bookknhom</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, dashboard, popular, banner" />
        <meta name="author" content="Your Name" />
        <meta name="description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
        <meta property="og:url" content="https://www.semrush.com/blog/seo-for-developers/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="SEO for Developers: 10 Best Practices to Know"/>
        <meta property="og:description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
        <meta property="og:image" content="https://static.semrush.com/blog/uploads/media/53/82/5382a8d356a1848d5ec1dfaeb387f9db/a7ae53b9828c45f801ab5be8a0f4b030/seo-for-developers-sm.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="semrush.com"/>
        <meta property="twitter:url" content="https://www.semrush.com/blog/seo-for-developers/"/>
        <meta name="twitter:title" content="SEO for Developers: 10 Best Practices to Know"/>
        <meta name="twitter:description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
        <meta name="twitter:image" content="https://static.semrush.com/blog/uploads/media/53/82/5382a8d356a1848d5ec1dfaeb387f9db/a7ae53b9828c45f801ab5be8a0f4b030/seo-for-developers-sm.png"/>


      </Head>
      <Navbar />
      <Banner />
      <Bpopular />
      <Ppopular />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Home;
