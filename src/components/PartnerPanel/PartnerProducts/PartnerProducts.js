import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import {
  QueryContent,
  Config,
  GetPartnerInfo,
  SafeValue
} from "../../ApiHandlers/ApiHandler";
import ContextApi from "../../ContextApi/ContextApi";
import PageSuspense from "../../PageSuspense";
import { FlatButton } from "../../FlatForm/FlatForm";
import AddProduct from "./AddProduct";
import classnames from "classnames";
import "./PartnerProducts.scss";
export default class PartnerProducts extends React.Component {
  static contextType = ContextApi;
  constructor(props, context) {
    super(props);
    this.lang = context.lang;
    this.translate = require(`./_locales/${this.lang}.json`);
    this.state = {
      pageLoaded: false,
      partnerProducts: [],
      partnerData: "",
      didDataChange: false,
      productType: [],
      partnerId: "",
      form: { fields: {} },
      modals: {
        addProduct: {
          openStatus: false,
          data: []
        },
        warning: {
          openStatus: false,
          data: []
        }
      }
    };
  }
  getProductTypes = () => {
    //get and update productsType
    QueryContent([Config.CONTENT_TYPE_ID.product_type], res => {
      if (res.success_result.success) {
        this.setState({
          productType: res.data
        });
      }
    });
  };
  //------------------------Toggle Modals------------------------------//
  // Functionality:
  //  1-Open and close modals
  //  2-access sent data inside opened modal
  //  3-call a callback function after data reached inside modal
  toggleModals = (modalType, dataObj, callback) => {
    const auhorizedModals = ["addProduct", "warning"];
    if (auhorizedModals.indexOf(modalType) > -1) {
      this.setState(
        {
          modals: {
            ...this.state.modals,
            [modalType]: {
              openStatus: !this.state.modals[modalType].openStatus,
              data: dataObj
            }
          }
        },
        () => {
          if (typeof callback === "function") callback();
        }
      );
    }
  };

  //data object is mandatory for type="edit" and is optional for type="add"
  addOrEditProduct = (type, dataObject = {}) => {
    const productType = {
      productType: this.state.productType,
      partnerId: this.state.partnerId
    };
    if (type === "add") {
      this.toggleModals("addProduct", productType);
    } else {
      this.toggleModals("addProduct", { ...productType, ...dataObject });
    }
  };
  generateProductsTable = () => {
    const { products } = this.state.partnerData;
    const { locale } = this.translate;
    const generatedObjects = products.map(product => (
      <tr>
        <td>
          <span>{SafeValue(product, "", "string", locale.fields.null)}</span>
        </td>
        <td>
          <span>{SafeValue(product, "", "string", locale.fields.null)}</span>
        </td>
        <td>
          <span>{SafeValue(product, "", "string", locale.fields.null)}</span>
        </td>
        <td>
          <span>{SafeValue(product, "", "string", locale.fields.null)}</span>
        </td>
      </tr>
    ));
    return generatedObjects;
  };
  getPartnerProduct = callback => {
    GetPartnerInfo({ "fields.phonenumber": this.context.auth.ID }, res => {
      if (res.success_result.success) {
        const { _id } = res.data[0];
        this.setState(
          {
            partnerData: res.data[0],
            partnerId: _id,
            pageLoaded: true
          },
          () => typeof callback === "function" && callback()
        );
      }
    });
  };
  componentDidMount() {
    this.getProductTypes();
    this.getPartnerProduct();
  }
  render() {
    const { locale, direction } = this.translate;
    const { pageLoaded, partnerProducts, didDataChange, form } = this.state;
    const { fields } = this.state.form;
    if (pageLoaded) {
      return (
        <section
          className={classnames(
            "partner-products-section form-section",
            `_${direction}`
          )}
          style={{
            backgroundColor: "whitesmoke",
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <React.Fragment>
            <Card className="form-card">
              {/* Approved requests */}
              <CardHeader>
                <strong>{locale.my_products}</strong>
                <Button
                  style={{ backgroundColor: "#6d8ae0", border: "none" }}
                  size="sm"
                  onClick={() => this.addOrEditProduct("add")}
                >
                  {" "}
                  + افزودن محصول
                </Button>
              </CardHeader>
              <CardBody>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>نام محصول</th>
                      <th>نوع محصول</th>
                      <th>عکس محصول</th>
                      <th>قیمت</th>
                      <th style={{ width: "150px" }}>ظرفیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input type="text" />
                      </td>
                      <td>
                        <Input type="select">
                          <option>صندلی اختصاصی</option>
                          <option>صندلی اشتراکی</option>
                          <option>اتاق کار خصوصی</option>
                          <option>اتاق جلسات</option>
                        </Input>
                      </td>
                      <td>
                        <Input type="file" />
                      </td>
                      <td>
                        <Input type="number" />
                      </td>
                      {/* <td>
                        <Button color="success" type="number" ></Button>
                      </td> */}
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Modal
              isOpen={this.state.modals.addProduct.openStatus}
              toggle={() => this.toggleModals("addProduct", {})}
              className={classnames("login-modal", `_${direction}`)}
              id="addProduct-modal"
            >
              <ModalHeader
                className="login-modal-header"
                toggle={() => this.toggleModals("addProduct", {})}
              >
                {locale.modals.add_product.title}
              </ModalHeader>
              <ModalBody>
                {/* add product component */}
                <AddProduct
                  data={this.state.modals.addProduct.data}
                  callback={res => console.log(res)}
                  lang={this.lang}
                />
              </ModalBody>
            </Modal>
          </React.Fragment>
        </section>
      );
    } else {
      return <PageSuspense />;
    }
  }
}
