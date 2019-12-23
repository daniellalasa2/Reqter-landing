export default [
  {
    versioning: false,
    media: [],
    allowCustomFields: true,
    accessRight: true,
    categorization: true,
    fields: [
      {
        name: "name",
        title: {
          fa: "نام درخواست",
          en: "نام درخواست"
        },
        description: {
          fa: "نام درخواست",
          en: "نام درخواست"
        },
        type: "string",
        isTranslate: false,
        appearance: "text",
        isRequired: false,
        inVisible: false,
        isMultiLine: false
      },
      {
        name: "birthyear",
        title: {
          fa: "سال تولد",
          en: "سال تولد"
        },
        description: {
          fa: "",
          en: ""
        },
        type: "number",
        isTranslate: false,
        appearance: "number",
        isRequired: true,
        inVisible: false,
        limit: {
          type: "between",
          min: "1300",
          max: "1380"
        }
      },
      {
        name: "phonenumber",
        title: {
          fa: "شماره تماس",
          en: "شماره تماس"
        },
        description: {
          fa: "",
          en: ""
        },
        type: "string",
        isTranslate: false,
        appearance: "text"
      },
      {
        name: "educationfield",
        title: {
          fa: "رشته تحصیلی",
          en: "رشته تحصیلی"
        },
        description: {
          fa: "",
          en: ""
        },
        type: "string",
        isTranslate: false,
        appearance: "text"
      },
      {
        name: "university",
        title: {
          fa: "دانشگاه محل تحصیل",
          en: "دانشگاه محل تحصیل"
        },
        description: {
          fa: "",
          en: ""
        },
        type: "string",
        isTranslate: false,
        appearance: "text"
      },
      {
        name: "mainskill",
        title: {
          fa: "مهارت اصلی",
          en: "مهارت اصلی"
        },
        description: {
          fa: "در چه حوزه ای مهارت دارید؟",
          en: "در چه حوزه ای مهارت دارید؟"
        },
        type: "keyValue",
        isTranslate: false,
        appearance: "default"
      },
      {
        name: "resume",
        title: {
          fa: "رزومه شخصی",
          en: "رزومه شخصی"
        },
        description: {
          fa: "",
          en: ""
        },
        type: "media",
        isTranslate: false,
        appearance: "default",
        isRequired: false,
        isList: false
      },
      {
        name: "country",
        title: {
          fa: "کشور",
          en: "کشور"
        },
        description: {
          fa: "کشور محل درخواست",
          en: "کشور محل درخواست"
        },
        type: "reference",
        isTranslate: false,
        appearance: "default",
        isRequired: false,
        inVisible: false,
        isList: false,
        references: ["5d35e6e68e6e9a0017c28fcd"],
        fields: ["name", "flag"]
      },
      {
        name: "city",
        title: {
          fa: "شهر",
          en: "شهر"
        },
        description: {
          fa: "شهر محل درخواست",
          en: "شهر محل درخواست"
        },
        type: "reference",
        isTranslate: false,
        appearance: "default",
        isRequired: false,
        inVisible: false,
        isList: false,
        references: ["5d35e6fa8e6e9a0017c28fce"],
        fields: ["name", "thumbnail"]
      },
      {
        name: "seats",
        title: {
          fa: "تعداد",
          en: "تعداد"
        },
        description: {
          fa: "تعداد میز یا صندلی درخواستی",
          en: "تعداد میز یا صندلی درخواستی"
        },
        type: "number",
        isTranslate: false,
        appearance: "default"
      },
      {
        name: "avatar",
        title: {
          fa: "عکس درخواست کننده",
          en: "عکس درخواست کننده"
        },
        description: {
          fa: "عکس درخواست کننده",
          en: "عکس درخواست کننده"
        },
        type: "media",
        isTranslate: false,
        appearance: "default",
        isRequired: false,
        inVisible: false,
        isList: false,
        mediaType: ["image"]
      },
      {
        name: "product",
        title: {
          fa: "محصول درخواستی",
          en: "محصول درخواستی"
        },
        description: {
          fa: "محصول درخواستی",
          en: "محصول درخواستی"
        },
        type: "reference",
        isTranslate: false,
        appearance: "default",
        isRequired: true,
        inVisible: false,
        isList: false,
        references: ["5d36a7d18e6e9a0017c28fd6"],
        fields: ["name", "thumbnail"]
      },
      {
        name: "src",
        title: {
          fa: "منبع درخواست",
          en: "منبع درخواست"
        },
        description: {
          fa: "منبع درخواست",
          en: "منبع درخواست"
        },
        type: "string",
        isTranslate: false,
        appearance: "text"
      },
      {
        name: "fullname",
        title: {
          fa: "نام درخواست کننده",
          en: "نام درخواست کننده"
        },
        description: {
          fa: "نام درخواست کننده",
          en: "نام درخواست کننده"
        },
        type: "string",
        isTranslate: false,
        appearance: "text"
      },
      {
        name: "email",
        title: {
          fa: "ایمیل درخواست کننده",
          en: "ایمیل درخواست کننده"
        },
        description: {
          fa: "ایمیل درخواست کننده",
          en: "ایمیل درخواست کننده"
        },
        type: "string",
        isTranslate: false,
        appearance: "email",
        isRequired: false,
        inVisible: false,
        isMultiLine: false
      },
      {
        name: "stage",
        title: {
          fa: "وضعیت درخواست",
          en: "وضعیت درخواست"
        },
        description: {
          fa: "وضعیت درخواست",
          en: "وضعیت درخواست"
        },
        type: "reference",
        isTranslate: false,
        appearance: "default",
        isRequired: true,
        inVisible: false,
        isList: false,
        references: ["5d6b5d205b60dc0017c95118"],
        fields: ["name"]
      },
      {
        name: "productid",
        title: {
          fa: "محصول درخواستی همکار",
          en: "محصول درخواستی همکار"
        },
        description: {
          fa: "محصول درخواستی همکار",
          en: "محصول درخواستی همکار"
        },
        type: "reference",
        isTranslate: false,
        appearance: "default",
        isRequired: false,
        inVisible: false,
        isList: false,
        references: ["5d36a6418e6e9a0017c28fd5"],
        fields: ["name"]
      },
      {
        name: "workingfield",
        title: {
          fa: "حوزه فعالیت",
          en: "حوزه فعالیت"
        },
        description: {
          fa: "حوزه فعالیت",
          en: "حوزه فعالیت"
        },
        type: "reference",
        isTranslate: false,
        appearance: "default",
        isRequired: false,
        inVisible: false,
        isList: true,
        references: ["5d3af3a1a9602900177a5056"],
        fields: ["name", "thubmnail"]
      }
    ],
    status: true,
    _id: "5cfc95472606810017dca194",
    sys: {
      issueDate: "2019-06-09T05:12:39.722Z",
      type: "contentType",
      link: "1ejjnjwohr4fe",
      spaceId: "5cf3883dcce4de00174d48cf",
      issuer: "5cf3883dafd0b9001708b27e"
    },
    name: "coworkingspace",
    title: {
      fa: "درخواست میزکار اشتراکی یا اختصاصی",
      en: "Work Desk Requests"
    },
    description: {
      fa: "درخواست میزکار اشتراکی یا اختصاصی",
      en: "Work Desk Requests"
    },
    template: "requestform",
    __v: 75
  }
];
