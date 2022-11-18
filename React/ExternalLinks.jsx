import React, { Fragment, useState, useEffect, useCallback } from "react";
import debug from "sabio-debug";
import ExternalLink from "./ExternalLink";
import "../externalLinks/externallinks.css";
import externalLinkService from "services/externalLinksService";
import { Card, Row, Col, Button, CardHeader, CardBody } from "reactstrap";
import { Formik, Form } from "formik";
import { externalLinksAddSchema } from "schemas/externalLinksSchema";
import toastr from "toastr";
// import { useCallback } from "react";

const ExternalLinks = () => {
  const _logger = debug.extend("ExternalLinks");
  const [linksFormData, setLinksFormData] = useState({
    urlTypeId: 0,
    url: "",
    entityId: "",
    entityTypeId: "",
    arrayOfSocialProfiles: [],
    arrayOfSocialProfileComponents: [],
  });
  const [entityId] = useState(1);
  const [entityTypeId] = useState(1);

  useEffect(() => {
    getExistingLinks();
  }, []);

  const getExistingLinks = () => {
    externalLinkService
      .getExternalLink()
      .then(onGetExernalLinksSuccess)
      .catch(onGetExernalLinksError);
  };

  const onGetExernalLinksSuccess = (response) => {
    _logger("getExternalLinkSuccess", response);
    setLinksFormData((prevState) => {
      const ps = { ...prevState };
      ps.arrayOfSocialProfiles = response.items;

      //objects add
      ps.arrayOfSocialProfileComponents = response.items.map(mapExternalLink);
      return ps;
    });
  };

  const onGetExernalLinksError = (err) => {
    _logger(err);
  };

  const mapExternalLink = (aLink) => {
    return (
      <ExternalLink
        externalLink={aLink}
        key={"ListA-" + aLink.id}
        // onDeleteClicked={onDeleteRequested}
      />
    );
  };

  const submitExternalLink = async (values) => {
    _logger("submitExternalLink", values);

    let value;
    if (values["facebookText"]) value = { name: "youtubeText", urlTypeId: 1 };
    if (values["instagramText"]) value = { name: "youtubeText", urlTypeId: 2 };
    if (values["linkedinText"]) value = { name: "youtubeText", urlTypeId: 3 };
    if (values["twitterText"]) value = { name: "youtubeText", urlTypeId: 4 };
    if (values["youtubeText"]) value = { name: "youtubeText", urlTypeId: 5 };

    const ps = { ...linksFormData };
    ps.url = values[value.name];
    ps.urlTypeId = value.urlTypeId;
    ps.entityId = entityId;
    ps.entityTypeId = entityTypeId;
    const youtubeFormData = {
      urlTypeId: ps.urlTypeId,
      url: ps.url,
      entityId: ps.entityId,
      entityTypeId: ps.entityTypeId,
    };

    sendLinkData(youtubeFormData);
  };

  const sendLinkData = useCallback((linkPayload) => {
    externalLinkService
      .addExternalLink(linkPayload)
      .then(onLinkAddSuccess)
      .catch(onLinkAddError);
    _logger(linkPayload);
  }, []);

  const onLinkAddSuccess = (response) => {
    _logger(response);
    toastr.success("Add Success");
  };

  const onLinkAddError = (err) => {
    _logger("error", err);
    toastr.error("Comment Error");
  };

  return (
    <Fragment>
      {false ? (
        <h1>TEST</h1>
      ) : (
        <Card className="border-0">
          <CardHeader>
            <div className="mb-3 mb-lg-0">
              <h3 className="mb-0">Social Profiles</h3>
              <p className="mb-0">
                Add your social profile links in below social accounts.
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <Formik
              enableReinitialize={true}
              initialValues={linksFormData.arrayOfSocialProfiles}
              validationSchema={externalLinksAddSchema}
              onSubmit={submitExternalLink}
            >
              <Form>
                <Row className="mb-5">
                  <div>
                    {linksFormData.arrayOfSocialProfileComponents}
                    {/* {linksFormData.arrayOfSocialProfileComponents} */}
                  </div>
                  {/* <Col lg={7} md={8} sm={12}>
                    <Field
                      type="text"
                      className="text-muted form-control mb-1"
                      placeholder="Add your Facebook URL (e.g. https://www.facebook.com/johnsmith)."
                      name="facebookText"
                      id="facebookText"
                    />
                    <ErrorMessage
                      name="facebookText"
                      component="div"
                      className="has-error"
                    />
                  </Col> */}
                </Row>
                <div className="form-control">
                  {/* <label>List of Social Profiles</label> */}
                  {/* <FieldArray name="socialProfiles">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { socialProfiles } = values;
                      return (
                        <div>
                          {socialProfiles.map((socialProfile, index) => (
                            <div key={index}>
                              <Field name={`socialProfiles[${index}]`} />
                              {index > 0 &&}
                              <Button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                {" "}
                                -{" "}
                              </Button>
                              <Button type="button" onClick={() => push("")}>
                                {" "}
                                +{" "}
                              </Button>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray> */}
                </div>
                <Row className="mb-5">
                  {/* <Col lg={1} md={4} sm={12}>
                    <img
                      src={igLogo}
                      alt="Instagram Logo"
                      className="externalLinksIgLogo"
                    />
                  </Col>
                  <Col lg={2}>
                    <h5>Instagram</h5>
                  </Col>
                  <Col lg={9} md={8} sm={12}>
                    <Field
                      className="text-muted form-control mb-1"
                      placeholder="Add your Instagram URL (e.g. https://www.instagram.com/johnsmith)"
                      name="instagramText"
                      id="instagramText"
                    />
                    <ErrorMessage
                      name="instagramText"
                      component="div"
                      className="has-error"
                    />
                  </Col>
                </Row>
                
                <Row className="mb-5">
                  <Col lg={1} md={4} sm={12}>
                    <img
                      src={liLogo}
                      alt="Linkedin Logo"
                      className="externalLinksLiLogo"
                    />
                  </Col>
                  <Col lg={2}>
                    <h5>LinkedIn</h5>
                  </Col>
                  <Col lg={9} md={8} sm={12}>
                    <Field
                      className="text-muted form-control mb-1"
                      placeholder="LinkedIn Profile URL (e.g. https://www.linkedin.com/johnsmith)"
                      name="linkedinText"
                      id="linkedinText"
                    />
                    <ErrorMessage
                      name="linkedinText"
                      component="div"
                      className="has-error"
                    />
                  </Col>
                </Row>
                
                <Row className="mb-5">
                  <Col lg={1} md={4} sm={12}>
                    <img
                      src={twLogo}
                      alt="Twitter Logo"
                      className="externalLinksTwLogo"
                    />
                  </Col>
                  <Col lg={2}>
                    <h5>Twitter</h5>
                  </Col>
                  <Col lg={9} md={8} sm={12}>
                    <Field
                      className="text-muted form-control mb-1"
                      placeholder="Twitter Profile URL (e.g. https://www.twitter.com/johnsmith)"
                      name="twitterText"
                      id="twitterText"
                    />
                    <ErrorMessage
                      name="twitterText"
                      component="div"
                      className="has-error"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={1} md={4} sm={12}>
                    <img
                      src={ytLogo}
                      alt="Youtube Logo"
                      className="externalLinksYtLogo"
                    />
                  </Col>
                  <Col lg={2}>
                    <h5>YouTube</h5>
                  </Col>
                  <Col lg={9} md={8} sm={12}>
                    <Field
                      className="text-muted form-control mb-1"
                      placeholder="Youtube Profile URL (e.g. https://www.youtube.com/johnsmith)"
                      name="youtubeText"
                      id="youtubeText"
                    />
                    <ErrorMessage
                      name="youtubeText"
                      component="div"
                      className="has-error"
                    />
                  </Col> */}
                  <Col lg={{ span: 6, offset: 3 }} sm={12}>
                    <Button variant="primary" type="submit">
                      Save Social Profile
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Formik>
          </CardBody>
        </Card>
      )}
    </Fragment>
  );
};

export default ExternalLinks;
