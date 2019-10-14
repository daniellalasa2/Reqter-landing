import React from "react";
const Home = React.lazy(() => import("./components/Home/Home"));
const AboutUs = React.lazy(() => import("./components/AboutUs/AboutUs"));
const Login = React.lazy(() => import("./components/Auth/Login/Login"));
const PrivateDesk = React.lazy(() =>
  import("./components/Forms/PrivateDesk/PrivateDesk")
);
const SharedDesk = React.lazy(() =>
  import("./components/Forms/SharedDesk/SharedDesk")
);
const DedicatedOffice = React.lazy(() =>
  import("./components/Forms/DedicatedOffice/DedicatedOffice")
);
const SessionRoom = React.lazy(() =>
  import("./components/Forms/SessionRoom/SessionRoom")
);
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
const PartnerShip = React.lazy(() =>
  import("./components/Forms/PartnerShip/PartnerShip")
);
const Security = React.lazy(() => import("./components/Security/Security"));
const MyRequests = React.lazy(() =>
  import("./components/MyPage/MyRequests/MyRequests")
);
const OfferList = React.lazy(() =>
  import("./components/MyPage/OfferList/OfferList")
);
const PartnerPanel = React.lazy(() =>
  import("./components/PartnerPanel/Panel/PartnerPanel")
);
const NotFound = React.lazy(() =>
  import("./components/Auth/NotFound/NotFound")
);
const InternalError = React.lazy(() =>
  import("./components/Auth/InternalError/InternalError")
);
//partner panel components
const PartnerProfile = React.lazy(() =>
  import("./components/PartnerPanel/Panel/PartnerPanel")
);
const PartnerLogin = React.lazy(() =>
  import("./components/PartnerPanel/PartnerLogin/PartnerLogin")
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
    path: "/:lang?/p/:slug",
    name: "partner profile",
    exact: true,
    component: PartnerProfile,
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
    path: "/:lang?/login",
    exact: true,
    name: "Login",
    component: Login,
    navStatus: true
  },

  {
    path: "/:lang?/apply/sessionroom",
    name: "Session Room",
    exact: true,
    component: SessionRoom,
    navStatus: true
  },
  {
    path: "/:lang?/apply/dedicatedoffice",
    name: "Dedicated Office",
    component: DedicatedOffice,
    navStatus: true
  },
  {
    path: "/:lang?/apply/privatedesk",
    name: "Private Desk",
    component: PrivateDesk,
    navStatus: true
  },
  {
    path: "/:lang?/apply/shareddesk",
    name: "Shared Desk",
    exact: true,
    component: SharedDesk,
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
    path: "/:lang?/partnership",
    exact: true,
    name: "Partner Ship",
    component: PartnerShip,
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
    path: "/:lang?/user/myrequests",
    exact: true,
    name: "My Requests",
    component: MyRequests,
    auth: "user",
    navStatus: true
  },
  {
    path: "/:lang?/user/offerlist",
    name: "Offer List",
    component: OfferList,
    auth: "user",
    navStatus: true
  },
  {
    path: "/:lang?/auth/internalerror",
    name: "Internal Error",
    component: InternalError,
    navStatus: false
  },
  //Notice: 404 page have to defined as the last route child
  {
    component: NotFound,
    navStatus: false
  },
  //partner panel routes
  {
    path: "/:lang?/partnerpanel/panel",
    name: "Partner Panel",
    auth: "partner",
    component: PartnerPanel,
    navStatus: true
  },
  {
    path: "/:lang?/partnerpanel/login",
    name: "Partner Panel Login",
    component: PartnerLogin,
    navStatus: true
  }
];

export default routes;
