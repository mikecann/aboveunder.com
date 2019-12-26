import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import { SuspenseFallback } from "./components/suspense/SuspenseFallback";
import { Pages } from "./routes";
import { hot } from "react-hot-loader/root";
import { Helmet } from "react-helmet";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Helmet>
        <meta
          name="keywords"
          content="drone,aerial,photography,quad,australia,beach,sun,water,wa,queensland,perth"
        />
      </Helmet> */}
      <Suspense fallback={<SuspenseFallback />}>
        <Switch>
          <Route exact path="/" component={Pages.Home} />
          <Route path="/blog" component={Pages.Blog} />
          <Route path="/contact" component={Pages.Contact} />
          <Route path="/about" component={Pages.About} />
          <Route path="/map/:print?" component={Pages.Map} />
          <Route path="/videos" component={Pages.Videos} />
          <Route path="/shop" component={Pages.Shop} />
          <Route path="/print/:id/:option?/:size?/:printer?" component={Pages.Print} />
          <Route path="/post/:id?" component={Pages.Post} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export const HotApp = hot(App);
