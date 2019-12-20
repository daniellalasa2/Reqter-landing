import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import {
  QueryContent,
  Config,
  GetPartnerInfo,
  GetPartnerProducts,
  PartnerpanelDeleteProduct,
  SafeValue,
  DownloadAsset
} from "../../ApiHandlers/ApiHandler";
import ContextApi from "../../ContextApi/ContextApi";
import PageSuspense from "../../PageSuspense";
import { FlatButton } from "../../FlatForm/FlatForm";
import AddProduct from "./AddProduct";
import classnames from "classnames";
import { thousandSeprator } from "../../../assets/script/thousandSeprator";
import NoImageAlt from "../../../assets/images/alternatives/noimage.png";
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
          data: {}
        },
        warning: {
          openStatus: false,
          data: {}
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
    const initialData = {
      productTypesList: this.state.productType,
      partnerId: this.state.partnerId,
      operationType: type
    };
    if (type === "add") {
      this.toggleModals("addProduct", initialData);
    } else {
      this.toggleModals("addProduct", { ...initialData, ...dataObject });
    }
  };
  removeProduct = (productid, callback) => {
    const { locale } = this.translate;
    PartnerpanelDeleteProduct(productid, res => {
      if (res.success_result.success) {
        this.getPartnerProduct(this.state.partnerId, () =>
          this.context.displayNotif(
            "success",
            locale.notification.remove_product.success,
            () => typeof callback === "function" && callback()
          )
        );
      } else {
        return this.context.displayNotif(
          "error",
          locale.notification.remove_product.failed
        );
      }
    });
  };
  generateProductsTable = () => {
    const products = this.state.partnerProducts;
    const { locale } = this.translate;
    const generatedObjects = products.map(
      (product, idx) =>
        product.status === "published" && (
          <tr key={idx}>
            <td>
              <span>
                <img
                  className="product-image"
                  src={DownloadAsset(
                    SafeValue(
                      product,
                      `fields.media.0.${this.lang}`,
                      "string",
                      "-",
                      "fields.media.0"
                    )
                  )}
                  onError={e => {
                    e.target.src = NoImageAlt;
                    e.target.onError = null;
                  }}
                  alt="product_img"
                />
              </span>
            </td>
            <td>
              <span>
                {SafeValue(
                  product,
                  `fields.name.${this.lang}`,
                  "string",
                  locale.fields.null,
                  "fields.name"
                )}{" "}
                (
                {SafeValue(
                  product,
                  "fields.code",
                  "string",
                  locale.fields.null
                )}
                )
                <br />
                <small>
                  {SafeValue(
                    product,
                    `fields.name.${this.lang}`,
                    "string",
                    locale.fields.null,
                    "fields.name"
                  )}
                </small>
              </span>
            </td>
            <td>
              <span>
                {SafeValue(
                  product,
                  `fields.producttype.fields.name.${this.lang}`,
                  "string",
                  locale.fields.null,
                  "fields.producttype.fields.name"
                )}
              </span>
            </td>

            <td>
              {SafeValue(product, "fields.perhourprice", "string", false) && (
                <React.Fragment>
                  <small>
                    <strong>{locale.fields.hourlyprice._title}:&nbsp;</strong>
                    {thousandSeprator(
                      SafeValue(
                        product,
                        "fields.perhourprice",
                        "string",
                        locale.null
                      )
                    )}
                  </small>
                  <br />
                </React.Fragment>
              )}

              {SafeValue(product, "fields.dailyprice", "string", false) && (
                <React.Fragment>
                  <small>
                    <strong>{locale.fields.dailyprice._title}:&nbsp;</strong>
                    {thousandSeprator(
                      SafeValue(
                        product,
                        "fields.dailyprice",
                        "string",
                        locale.null
                      )
                    )}
                  </small>
                  <br />
                </React.Fragment>
              )}

              {SafeValue(product, "fields.weeklyprice", "string", false) && (
                <React.Fragment>
                  <small>
                    <strong>{locale.fields.weeklyprice._title}:&nbsp;</strong>
                    {thousandSeprator(
                      SafeValue(
                        product,
                        "fields.weeklyprice",
                        "string",
                        locale.null
                      )
                    )}
                  </small>
                  <br />
                </React.Fragment>
              )}
              {SafeValue(product, "fields.monthlyprice", "string", false) && (
                <React.Fragment>
                  <small>
                    <strong>{locale.fields.monthlyprice._title}:&nbsp;</strong>
                    {thousandSeprator(
                      SafeValue(
                        product,
                        "fields.monthlyprice",
                        "string",
                        locale.null
                      )
                    )}
                  </small>
                </React.Fragment>
              )}
            </td>
            <td>
              <span>
                {SafeValue(
                  product,
                  "fields.count",
                  "string",
                  locale.fields.null
                )}
              </span>
            </td>
            <td>
              <FlatButton
                style={{ backgroundColor: "var(--red)", border: "none" }}
                suspense={false}
                size="sm"
                onClick={() =>
                  this.toggleModals("warning", { id: product._id })
                }
              >
                {locale.fields.delete_product}
              </FlatButton>{" "}
              <Button
                style={{ backgroundColor: "var(--gray)", border: "none" }}
                onClick={() => this.addOrEditProduct("edit", product)}
                size="sm"
              >
                {locale.fields.edit_product}
              </Button>
            </td>
          </tr>
        )
    );
    return generatedObjects;
  };
  getPartnerInfo(callback) {
    GetPartnerInfo({ "fields.phonenumber": this.context.auth.ID }, res => {
      if (res.success_result.success) {
        const { _id } = res.data[0];
        this.setState(
          {
            partnerData: res.data[0],
            partnerId: _id
          },
          () => typeof callback === "function" && callback()
        );
      }
    });
  }
  getPartnerProduct = (partnerId, callback) => {
    GetPartnerProducts({ "fields.partnerid": partnerId }, res => {
      if (res.success_result.success) {
        this.setState(
          {
            partnerProducts: res.data,
            pageLoaded: true
          },
          () => {
            typeof callback === "function" && callback();
          }
        );
      }
    });
  };
  componentDidMount() {
    this.getProductTypes();
    this.getPartnerInfo(() => this.getPartnerProduct(this.state.partnerId));
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
                  style={{
                    backgroundColor: "#6d8ae0",
                    border: "none",
                    fontSize: "15px",
                    fontWeight: "bold"
                  }}
                  className="addProduct-button"
                  size="sm"
                  onClick={() => this.addOrEditProduct("add")}
                >
                  {" "}
                  افزودن محصول
                </Button>
              </CardHeader>
              <CardBody>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>عکس محصول</th>
                      <th>نام محصول</th>
                      <th>نوع محصول</th>
                      <th>قیمت</th>
                      <th style={{ width: "80px" }}>ظرفیت</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody>{this.generateProductsTable()}</tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Warning modal */}
            <Modal
              isOpen={this.state.modals.warning.openStatus}
              toggle={() => this.toggleModals("warning", {})}
              className={classnames("login-modal", `_${direction}`)}
              id="deleteProduct-warning-modal"
            >
              <ModalHeader
                className="login-modal-header"
                toggle={() => this.toggleModals("warning", {})}
              >
                {locale.alert.title}
              </ModalHeader>
              <ModalBody>
                <span>
                  {locale.alert.description}

                  <strong style={{ fontSize: "20px" }}>
                    {locale.alert.areyousure}
                  </strong>
                </span>
                <br />
                <FlatButton
                  pull={direction === "ltr" ? "left" : "right"}
                  color="primary"
                  style={{ padding: "6px 25px", margin: "20px 10px 0" }}
                  suspense={false}
                  onClick={e => {
                    this.removeProduct(this.state.modals.warning.data.id, () =>
                      this.toggleModals("warning", {})
                    );
                  }}
                >
                  {locale.alert.accept}
                </FlatButton>
                <Button
                  pull={direction === "ltr" ? "left" : "right"}
                  color="primary"
                  style={{ padding: "6px 25px", margin: "20px 10px 0" }}
                  onClick={() => this.toggleModals("warning", {})}
                >
                  {locale.alert.reject}
                </Button>
              </ModalBody>
            </Modal>
            {/* Modals */}
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
                  callback={res => {
                    if (res.success) {
                      this.getPartnerProduct(this.state.partnerId);
                      this.toggleModals("addProduct", {});
                    }
                  }}
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
