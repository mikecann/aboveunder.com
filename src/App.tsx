import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IDB } from './lib/types';
import { HomePage } from './components/HomePage';
import { sortLatest, shuffle, sortLatestPosts } from './lib/utils';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { ShopPage } from './components/ShopPage';
import { PostPage } from './components/PostPage';
import { getPost } from './lib/db';
import { PrintPage } from './components/PrintPage';

interface IProps
{
  db: IDB;
}

export class App extends React.Component<IProps,any> {

  render() {

    const { db } = this.props;
    const latestPrints = sortLatest(db.prints).slice(0,12);
    const featuredPrints = shuffle(db.prints.filter(p => p.featured)).slice(0,9);
    const latestPosts = sortLatestPosts(db.posts).slice(0, 3);

    return <BrowserRouter>
          <div>

            <Route component={ScrollToTop} />

            <Route exact path="/" render={q => 
              <HomePage latestPrints={latestPrints} featuredPrints={featuredPrints} latestPosts={latestPosts} />} />

            <Route exact path="/contact" render={q => <ContactPage />} />
            <Route exact path="/about" render={q => <AboutPage />} />
            <Route exact path="/blog" render={q => <BlogPage posts={db.posts} />} />
            <Route exact path="/shop/:page?" render={q => <ShopPage prints={db.prints} initialPageIndex={q.match.params.page} history={q.history} />} />
            <Route exact path="/post/:id" render={q => <PostPage post={getPost(db, q.match.params.id)} />} />

            <Route exact path="/print/:id/:option?/:size?" render={q => <PrintPage db={db} {...q} />} />
            
          </div>
          


      </BrowserRouter>
  }
}

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};