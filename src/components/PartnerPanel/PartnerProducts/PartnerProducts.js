import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Input
} from "reactstrap";
import ContextApi from "../../ContextApi/ContextApi";
import PageSuspense from "../../PageSuspense";
import { FlatButton } from "../../FlatForm/FlatForm";
import classnames from "classnames";
export default class PartnerProducts extends React.Component {
  static contextType = ContextApi;
  constructor(props) {
    super(props);
    this.translate = require(`./_locales/${this.lang}.json`);
    this.state = {
      pageLoaded: false,
      partnerProducts: [],
      didDataChange: false,
      form: { fields: {} }
    };
  }
  componentDidMount() {}
  render() {
    const { locale, direction } = this.translate;
    const { pageLoaded, partnerProducts, didDataChange, form } = this.state;
    const { fields } = this.state.form;
    if (pageLoaded) {
      return (
        <section
          className={classnames(
            "partner-profile-section form-section",
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
              </CardHeader>
              <CardBody>
                <Table bordered hover>
                  <thead>
                    <th>
                      <tr>نام محصول</tr>
                      <tr>نوع محصول</tr>
                      <tr>عکس محصول</tr>
                      <tr>ظرفیت</tr>
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input type="text" />
                      </td>
                      <td>
                        <select>
                          <option> صندلی اختصاصی </option>
                          <option>صندلی اشتراکی</option>
                          <option>اتاق کار خصوصی</option>
                          <option>اتاق جلسات</option>
                        </select>
                      </td>
                      <td>
                        <Input type="file" />
                      </td>
                      <td>
                        <Input type="number" />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <FlatButton
                  disabled={!didDataChange}
                  suspense={form.isSubmitting}
                  colorr="success"
                >
                  {locale.fields.submit_changes}
                </FlatButton>
              </CardFooter>
            </Card>
          </React.Fragment>
        </section>
      );
    } else {
      return <PageSuspense />;
    }
  }
}
