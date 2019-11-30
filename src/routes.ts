import { lazy, ComponentType, LazyExoticComponent } from "react";

type LazyExoticComponentWithPreload<T extends ComponentType<any> = any> = LazyExoticComponent<T> & {
  preload: () => Promise<any>;
};

const makeLazy = <T extends ComponentType<any>>(
  preload: () => Promise<{ default: T }>
): LazyExoticComponentWithPreload<T> => Object.assign(lazy(preload), { preload });

export const Pages = {
  Home: makeLazy(() => import("./home/HomePage")),
  Blog: makeLazy(() => import("./blog/BlogPage")),
  Contact: makeLazy(() => import("./contact/ContactPage")),
  About: makeLazy(() => import("./about/AboutPage")),
  Map: makeLazy(() => import("./map/MapPage")),
  Videos: makeLazy(() => import("./videos/VideosPage")),
  Shop: makeLazy(() => import("./shop/ShopPage")),
  Print: makeLazy(() => import("./print/PrintPage")),
  Post: makeLazy(() => import("./post/PostPage")),
};

export const startPreloading = async (...pages: LazyExoticComponentWithPreload[]) => {
  // Maybe we should do this in parallel... not sure what is better for perf..
  for (let comp of pages) await comp.preload();
  await Promise.all(Object.values(Pages).map(comp => comp.preload()));
};
