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
const PartnerProfile = React.lazy(() =>
  import("./components/User/PartnerProfile/PartnerProfile")
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
  import("./components/User/MyRequests/MyRequests")
);
const OfferList = React.lazy(() =>
  import("./components/User/OfferList/OfferList")
);
const NotFound = React.lazy(() =>
  import("./components/Auth/NotFound/NotFound")
);
//temporary
const ComingSoon = React.lazy(() => import("./components/DefaultInnerLinks"));
// const static_routes = [
const routes = [
  {
    // path: "/:lang",
    path: "/",
    exact: true,
    name: "Home",
    component: Home,
    navTransform: true
  },
  {
    path: "/p/:slug",
    name: "partner profile",
    exact: true,
    component: PartnerProfile
  },
  {
    path: "/auth/404",
    exact: true,
    name: "Not Found",
    component: NotFound
  },
  {
    path: "/comingsoon",
    exact: true,
    name: "Coming Soon",
    component: ComingSoon,
    navTransform: true
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
    path: "/apply/sessionroom",
    name: "Session Room",
    component: SessionRoom
  },
  {
    path: "/apply/dedicatedoffice",
    name: "Dedicated Office",
    component: DedicatedOffice
  },
  {
    path: "/apply/privatedesk",
    name: "Private Desk",
    component: PrivateDesk
  },
  {
    path: "/apply/shareddesk",
    name: "Shared Desk",
    exact: true,
    component: SharedDesk
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
    path: "/contactus",
    exact: true,
    name: "Contact Us",
    component: ContactUs
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
    path: "/user/myrequests",
    exact: true,
    name: "My Requests",
    component: MyRequests,
    auth: "user"
  },
  {
    path: "/user/offerlist",
    name: "Offer List",
    component: OfferList,
    auth: "user"
  }
  // {
  //   path: "/user/partnerprofile",
  //   name: "Partner Profile",
  //   component: PartnerProfile,
  //   auth: "user",
  //   navTransform: true
  // }
];
// const dynamic_routes = [];
// export { static_routes, dynamic_routes };
export default routes;
