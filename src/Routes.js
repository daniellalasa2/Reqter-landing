import React from "react";

const Home = React.lazy(() => import("./components/Home"));
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const Login = React.lazy(() => import("./components/Login"));
const Coworking = React.lazy(() => import("./components/Coworking"));
const SessionRoom = React.lazy(() => import("./components/SessionRoom"));
const Investing = React.lazy(() => import("./components/Investing"));
const PrivateOffice = React.lazy(() => import("./components/PrivateOffice"));
const Startup = React.lazy(() => import("./components/Startup"));
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy"));
const TermsOfUse = React.lazy(() => import("./components/TermsOfUse"));
const Blog = React.lazy(() => import("./components/Blog"));
const FAQ = React.lazy(() => import("./components/FAQ"));
const Careers = React.lazy(() => import("./components/Careers"));
const PartnerShip = React.lazy(() => import("./components/PartnerShip"));
const Security = React.lazy(() => import("./components/Security"));
const News = React.lazy(() => import("./components/News"));

//temporary
const ComingSoon = React.lazy(() =>
  import("./components/DefaultInnerLinks.js")
);

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  {
    path: "/comingsoon",
    exact: true,
    name: "Coming Soon",
    component: ComingSoon
  },
  {
    path: "/aboutus",
    exact: true,
    name: "About Us",
    component: AboutUs
  },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login
  },
  {
    path: "/apply/coworking",
    exact: true,
    name: "Coworking",
    component: Coworking
  },
  {
    path: "/apply/sessionroom",
    exact: true,
    name: "Session Room",
    component: SessionRoom
  },
  {
    path: "/apply/investing",
    exact: true,
    name: "Investing",
    component: Investing
  },
  {
    path: "/apply/privateoffice",
    exact: true,
    name: "Private Office",
    component: PrivateOffice
  },
  {
    path: "/apply/startup",
    exact: true,
    name: "Startup",
    component: Startup
  },
  {
    path: "/privacypolicy",
    exact: true,
    name: "Privacy Policy",
    component: PrivacyPolicy
  },
  {
    path: "/termsofuse",
    exact: true,
    name: "Terms Of Use",
    component: TermsOfUse
  },
  {
    path: "/blog",
    exact: true,
    name: "Blog",
    component: Blog
  },
  {
    path: "/faq",
    exact: true,
    name: "FAQ",
    component: FAQ
  },
  {
    path: "/careers",
    exact: true,
    name: "Careers",
    component: Careers
  },
  {
    path: "/partnership",
    exact: true,
    name: "Partner Ship",
    component: PartnerShip
  },
  {
    path: "/security",
    exact: true,
    name: "Security",
    component: Security
  },
  {
    path: "/news",
    exact: true,
    name: "News",
    component: News
  }
];

export default routes;
