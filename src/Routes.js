import React from "react";
const Home = React.lazy(() => import("./components/Home/Home"));
const AboutUs = React.lazy(() => import("./components/AboutUs/AboutUs"));
const PrivacyPolicy = React.lazy(() =>
  import("./components/PrivacyPolicy/PrivacyPolicy")
);
const TermsOfUse = React.lazy(() =>
  import("./components/TermsOfUse/TermsOfUse")
);
const Blog = React.lazy(() => import("./components/Blog/Blog"));
const FAQ = React.lazy(() => import("./components/FAQ/FAQ"));
const ContactUs = React.lazy(() => import("./components/ContactUs/ContactUs"));
const Careers = React.lazy(() => import("./components/Careers/Careers"));

const Security = React.lazy(() => import("./components/Security/Security"));

const NotFound = React.lazy(() =>
  import("./components/Auth/NotFound/NotFound")
);
const InternalError = React.lazy(() =>
  import("./components/Auth/InternalError/InternalError")
);

//temporary
const ComingSoon = React.lazy(() => import("./components/DefaultInnerLinks"));
const routes = [
  {
    path: "/:lang?",
    exact: true,
    name: "Home",
    component: Home,
    navTransform: true,
    navStatus: true
  },
  {
    path: "/:lang?/comingsoon",
    exact: true,
    name: "Coming Soon",
    component: ComingSoon,
    navTransform: true,
    navStatus: true
  },
  {
    path: "/:lang?/aboutus",
    exact: true,
    name: "About Us",
    component: AboutUs,
    navStatus: true
  },
  {
    path: "/:lang?/privacypolicy",
    exact: true,
    name: "Privacy Policy",
    component: PrivacyPolicy,
    navStatus: true
  },
  {
    path: "/:lang?/termsofuse",
    exact: true,
    name: "Terms Of Use",
    component: TermsOfUse,
    navStatus: true
  },
  {
    path: "/:lang?/blog",
    exact: true,
    name: "Blog",
    component: Blog,
    navStatus: true
  },
  {
    path: "/:lang?/faq",
    exact: true,
    name: "FAQ",
    component: FAQ,
    navStatus: true
  },
  {
    path: "/:lang?/contactus",
    exact: true,
    name: "Contact Us",
    component: ContactUs,
    navStatus: true
  },
  {
    path: "/:lang?/careers",
    exact: true,
    name: "Careers",
    component: Careers,
    navStatus: true
  },
  {
    path: "/:lang?/security",
    exact: true,
    name: "Security",
    component: Security,
    navStatus: true
  },
  {
    path: "/:lang?/auth/internalerror",
    name: "Internal Error",
    component: InternalError,
    navStatus: false
  },
  //Notice: 404 page have to defined as the last child of Route object
  {
    component: NotFound,
    navStatus: false
  }
];

export default routes;
