import React from "react";

export default class PartnerProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  componentDidMount(){

  }
  render() {
    const { locale, direction } = this.translate;
    const {
      filterContext,
      pageLoaded,
      partnerProducts,
      didDataChange,
      form
    } = this.state;
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
                <strong>{locale.myProducts}</strong>
              </CardHeader>
              <CardBody>
             

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
