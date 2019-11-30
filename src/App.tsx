import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import { SuspenseFallback } from "./components/suspense/SuspenseFallback";
import { Pages } from "./routes";
import { hot } from "react-hot-loader/root";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseFallback />}>
        <Switch>
          {/* <Route component={ScrollToTop} /> */}
          <Route exact path="/" component={Pages.Home} />
          <Route path="/blog" component={Pages.Blog} />
          <Route path="/contact" component={Pages.Contact} />
          <Route path="/about" component={Pages.About} />
          <Route path="/map/:print?" component={Pages.Map} />
          <Route path="/videos" component={Pages.Videos} />
          <Route path="/shop/:page?" component={Pages.Shop} />
          <Route path="/print/:id/:option?/:size?/:printer?" component={Pages.Print} />
          <Route path="/post/:id?" component={Pages.Post} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

// const ScrollToTop = () => {
//   window.scrollTo(0, 0);
//   return null;
// };

export const HotApp = hot(App);
